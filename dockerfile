# ---------------------------
# Stage 1: Client build
# ---------------------------
FROM node:22-alpine AS client-build
WORKDIR /usr/src/client
COPY client/package*.json ./
RUN npm ci
COPY client/ ./
ARG VITE_API
ENV VITE_API=$VITE_API
RUN npm run build

# ---------------------------
# Stage 2: Server base
# ---------------------------
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS server-base
WORKDIR /usr/src/server
COPY ServerNET/API/API.csproj API/
COPY ServerNET/Application/Application.csproj Application/
COPY ServerNET/Domain/Domain.csproj Domain/
COPY ServerNET/Persistence/Persistence.csproj Persistence/
COPY ServerNET/Infrastructure/Infrastructure.csproj Infrastructure/
COPY ServerNET/Application.Tests/Application.Tests.csproj Application.Tests/
RUN dotnet restore API/API.csproj

# ---------------------------
# Stage 3: Run tests
# ---------------------------
FROM server-base AS test
COPY ServerNET/ ./
RUN dotnet test

# ---------------------------
# Stage 4: Publish API
# ---------------------------
FROM test AS server-build
WORKDIR /usr/src/server/API
RUN dotnet publish API.csproj -c Release -o /app/publish

# ---------------------------
# Stage 5: Final runtime
# ---------------------------
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /usr/src/app
COPY --from=server-build /app/publish ./
COPY --from=client-build /usr/src/client/dist ./wwwroot
ENV ASPNETCORE_URLS=http://+:$PORT
EXPOSE 8080
ENTRYPOINT ["dotnet", "API.dll"]
