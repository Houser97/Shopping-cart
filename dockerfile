# Stage 1. React app
FROM node:22-alpine AS client-build
WORKDIR /usr/src/client

COPY client/package*.json ./
RUN npm install
COPY client/ .
RUN npm run build

# Stage 2. ASP.NET app
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS server-build
WORKDIR /usr/src/server

COPY ServerNET/API/API.csproj API/
COPY ServerNET/Application/Application.csproj Application/
COPY ServerNET/Domain/Domain.csproj Domain/
COPY ServerNET/Persistence/Persistence.csproj Persistence/
COPY ServerNET/Infrastructure/Infrastructure.csproj Infrastructure/

RUN dotnet restore API/API.csproj

COPY ServerNET/ .

WORKDIR /usr/src/server/API
RUN dotnet publish "API.csproj" -c Release -o /app/publish

# Stage 3. Final Image
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /usr/src/app

COPY --from=server-build /app/publish .

COPY --from=client-build /usr/src/client/dist ./wwwroot

EXPOSE 8080
ENTRYPOINT [ "dotnet", "API.dll" ]