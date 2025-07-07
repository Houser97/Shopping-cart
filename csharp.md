# Indice
- [Indice](#indice)
  - [1. Preparación de entorno de desarrollo](#1-preparación-de-entorno-de-desarrollo)
    - [1.1 Instalación de programas](#11-instalación-de-programas)
    - [1.2 Extensiones VS Code](#12-extensiones-vs-code)
    - [1.3 GIT](#13-git)
      - [1.3.1 Git Log - Configuración de alias](#131-git-log---configuración-de-alias)
      - [1.3.2 Creación de gitignore](#132-creación-de-gitignore)
    - [1.4 Configuraciones de servidor](#14-configuraciones-de-servidor)
      - [1.4.1 Configuración camelCase](#141-configuración-camelcase)
      - [1.4.2 Configuración de política de autorización por defecto](#142-configuración-de-política-de-autorización-por-defecto)
  - [2. Esqueleto .NET API](#2-esqueleto-net-api)
    - [2.1 Preparación de proyectos y referencias](#21-preparación-de-proyectos-y-referencias)
    - [2.2 Ejecución de proyecto](#22-ejecución-de-proyecto)
    - [2.3 Configuración de launchSettings.json](#23-configuración-de-launchsettingsjson)
  - [3. Bases de datos](#3-bases-de-datos)
    - [3.1 MongoDB](#31-mongodb)
  - [4. Autenticación](#4-autenticación)
    - [4.1 Creación de clases](#41-creación-de-clases)
      - [4.1.2 DTOs](#412-dtos)
    - [4.2 Autenticación con JWT](#42-autenticación-con-jwt)
  - [5. Funcionalidades CORE](#5-funcionalidades-core)
    - [5.1 Clase Result](#51-clase-result)
  - [6. Extras](#6-extras)
    - [6.1 SignalR](#61-signalr)




## 1. Preparación de entorno de desarrollo
### 1.1 Instalación de programas
- [Video guía]((https://www.udemy.com/course/complete-guide-to-building-an-app-with-net-core-and-react/learn/lecture/48499889#overview))

1. .NET
    - A inicios de 2025 ya se tiene la versión 9 de .NET.
    - Se descarga en [este link](https://dotnet.microsoft.com/en-us/download).
    - Al tener instalado el programa se puede ver la versión de NET que se ocupa.
        - Si se tienen varias versiones, el sistema ocupa la última que aparece en la lista del resultado del siguiente comando:
```bash
dotnet --info

# Microsoft.WindowsDesktop.App 9.0.4 [C:\Program Files\dotnet\shared\Microsoft.WindowsDesktop.App]
```


2. Node.
    - Se instala Node para poder realizar la aplicación de React. Se recomienda tener el gestor de versiones de Node.
    - https://bit.ly/nvmudemy

### 1.2 Extensiones VS Code
- [Video guía](https://www.udemy.com/course/complete-guide-to-building-an-app-with-net-core-and-react/learn/lecture/48499891#overview)

1. C# Dev Kit.
2. Material Icon Theme (iconos para VS Code). Opcional.
3. NuGet Gallery.
4. SQLite (en caso de usar SQLite).
5. SQLite Viewer (en caso de usar SQLite y querer visualizar directo las tablas en VS Code).


### 1.3 GIT
#### 1.3.1 Git Log - Configuración de alias

```bash
git log --all --decorate --oneline --graph

git config --global alias.adog "log --all --decorate --oneline --graph"
```

#### 1.3.2 Creación de gitignore
1. En root del servidor csharp ejecutar el siguiente comando:
```bash
dotnet new gitignore
```

2. Incluir siguientes archivos en .gitignore.
   1. appsettings.json
   2. Bases de datos
      1. Por ejemplo, en caso de que se ocupa algo como SQLite, en donde se tiene un archivo como: reactivities.db

### 1.4 Configuraciones de servidor
#### 1.4.1 Configuración camelCase
1. Agregar siguiente configuración en __Program.cs__.
```c#
builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
    });
```

#### 1.4.2 Configuración de política de autorización por defecto
- Es útil para proteger endpoints cuando se implementa autenticación. Permite no tener que colocar __[Authorize]__ en todos los endpoints.
- Los endpoints que no deben estar protegidos se les decora con __[AllowAnonymous]__.

1. Se coloca la siguiente configuración en:

```c#
builder.Services.AddAuthorizationBuilder()
    .SetFallbackPolicy(new Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder()
    .RequireAuthenticatedUser()
    .Build());
```


## 2. Esqueleto .NET API
### 2.1 Preparación de proyectos y referencias
- [Se puede ver una representación de la arquitectura que sigue el proyecto en el siguiente link](https://github.com/House197/NET/blob/main/Udemy/NETCore-React/02.Skeleton.NetApi.md)

1. Crear archivo de solution usando la plantilla __Solution File__, el cual tiene como short name __sln__.
    - Es un contenedor para diferentes proyectos.

```bash
dotnet new sln
```

2. Crear proyecto con la plantilla __ASP.NET Core Web API__, cuyo short name es: __webapi__.
    - Con __-n__ se especifica el nombre del proyecto.
    - Se especifica que se desea iniciar el proyecto con la configuración mínima, ya que se van a ir colocando los controladores en su respectiva carpeta, por lo que se pasa el switch de __-controllers__.

```bash
dotnet new webapi -n API -controllers
```

3. Se definen __Class libraries__. Se crea una para cada una de las siguiente opciones. Estas opciones representan la arquitectura de la aplicación.
    - Domain
    - Application
    - Persistence

```bash
dotnet new classlib -n Domain
dotnet new classlib -n Application
dotnet new classlib -n Persistence
```

4. Añadir estos proyectos en el archivo de solución.
```bash
dotnet sln add API
dotnet sln add Domain
dotnet sln add Application
dotnet sln add Persistence
```

5. Configuración de referencias. Se debe añadir una referencia de API yendo hacia APPLICATION.
    1. En VS Code, en la parte de navegación se tiene un apartado de __SOLUTION EXPLORER__, en donde aparecen los proyectos añadidos al archivo de soluciones.
    2. Hacer click derecho sobre __API__ y seleccionar opción __Add Project Reference__.
    3. Seleccionar opción de __Application__.
    4. Haciendo click izquierdo sobre __API__ se abre el archivo __API.csproj__, en donde se aprecia que aparece ya la referencia del proyecto que va a __Application__.
        - Aparece en el segundo <ItemGroup>.

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="9.0.4" />
  </ItemGroup>

  <ItemGroup>
    <ProjectReference Include="..\Application\Application.csproj" />
  </ItemGroup>

</Project>

```


6. Siguiendo con la parte de referencias, __Application__ requiere de dos referencias:
    - Domain
    - Persistence

- El dominio no depende de nada, por lo que no se agregan referencias.

7. Siguiendo con la parte de referencias, __Persistence__ requiere de una referencia a Domain.

8. Simplificar referencias del proyecto. En __API.csproj__ se elimina el siguiente apartado:
```xml
   <ItemGroup>
    <PackageReference Include="Microsoft.AspNetCore.OpenApi" Version="9.0.4" />
  </ItemGroup>
```

- Lo que hace que el archivo quede de la siguiente manera:
```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <Nullable>enable</Nullable>
    <ImplicitUsings>enable</ImplicitUsings>
  </PropertyGroup>

  <ItemGroup>
    <ProjectReference Include="..\Application\Application.csproj" />
  </ItemGroup>

</Project>

```

9. Eliminar archivo __API.http__, el cual provee una manera de testear API endpoints, lo cual requiere instalar una extensión de VS Code para usarla. Sin embargo, se usará Postman para las pruebas.

10. Archivo __Program.cs__.
    - Típicamente se ve un método __main__. Sin embargo, Microsoft eliminó ese boilerplate hace que ese método exista, pero no se ve acá, sino que está en el __background__. Entonces, se tiene un main method que hace que el código en Pogram.cs se ejecute.
    - En este archivo se tienen dos secciones:
        - Services
            - Sirve para cuando se desea usar algo entonces se crea una clase que realiza esa actividad, la cual da una funcionalidad. Se puede querer usar esa clase dentro de API controller. Entonces, se realiza inyección de dependencia, la cual está gestionada por el framework al crear una nueva instancia de esa clase así como deshacerse de ella cuando el controller ya no esté en uso.
            - Se tiene __AddOpenApi__, el cual sirve para la documentación de las APIs. En este proyecto no se usa, por lo que se elimina. De esta forma, los servicios solo se quedan con la adición de controladores por medio de __AddControllers()__.
        - Configuración de HTTP request pipeline.
            - Se configuran las middlewares.
            - Así como con los servicios, se elimina la parte de OpenAPI.
            - Se eliminan de igual forma:
                - app.UseHttpsRedirection();
                    - Se borra ya que se va a correr en HTTPS la aplicación.
                - app.UseAuthorization();
                    - Se va a configurar la autorazación después, pero por el momento no se necesita aún.
            - La parte de __app.MapControllers();__ provee de enrutamiento, lo que permitió pasar la request al controlador de weather forecast cuando se colocó en endpoint en el navegador.
```c#
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.MapControllers();

app.Run();

```

### 2.2 Ejecución de proyecto
- Se puede correr con ayuda del CLI.

1. Ubicarse en el proyecto
```bash
cd API
```

2. Ejecutar comando:
```bash
dotnet run

# o usar --watch para tener hot reload. Cambios de tipo a veces requiere refrescar con CTRL + R para ver cambios
dotnet watch
```

3. Visitar el URL dado por la terminal. De acuerdo al archivo Controllers/WeatherForecastController.cs, al agregar el endpoint: __http://localhost:5030/WeatherForecast__ se recibe la información del endpoints.

### 2.3 Configuración de launchSettings.json
- Los cambios se realizan en: __API\Properties\launchSettings.json__

1. Configuración de puerto.
2. Eliminación de __http__.
    - Esto significa que se va a iniciar la aplicación por medio de __https__.
    - .NET usa un __self-signed certificate__, pero cuando se instala el SDK ahora debería ser __trusted__.
    - Del URL de la aplicación se elimina la parte HTTP y se modifica el puerto de HTTPS por 5001, el cual es como solía ser antes de que se generara de forma aleatoria en esta versión 9.

```json
{
  "$schema": "https://json.schemastore.org/launchsettings.json",
  "profiles": {
    "https": {
      "commandName": "Project",
      "dotnetRunMessages": true,
      "launchBrowser": false,
      "applicationUrl": "https://localhost:5001",
      "environmentVariables": {
        "ASPNETCORE_ENVIRONMENT": "Development"
      }
    }
  }
}
```

- En caso de que el certificado no sea __trusted__, se debe estar en el directorio de API y correr los siguiente comandos uno tras del otro en la terminal. Finalmente, se debe reinicar el navegador.

```bash
dotnet dev-certs https --clean
dotnet dev-certs https --trust
```

## 3. Bases de datos
### 3.1 MongoDB
1. Instalar MongoDB.Driver @MongoDB Inc. en los siguientes proyectos:
   1. Persistence
   2. Domain
   3. API
      1. Se necesita para poder hacer configuraciones como evitar que se traigan campos adicionales que no estén en la clase de entidad. Por ejemplo, el campo de MongoDB \_v\_.
2. Colocar configuración de __API/appsettings.json__.
  1. Se colocan valores como:
     1. Nombre de base de datos.
     2. Nombre de las colecciones.

```json
{
  "InTouchIoDatabase": {
    "ConnectionString": "...",
    "DatabaseName": "...",
    "ChatsCollectionName": "chats",
    "UsersCollectionName": "users",
    "MessagesCollectionName": "messages"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

3. Crear __Persistence\AppDbSettings.cs__.
   1. Se usa para tener la configuración colocada en __API/appsettings.json__.

```c#
using System;

namespace Persistence;

public class AppDbSettings
{
    public string ConnectionString { get; set; } = null!;
    public string DatabaseName { get; set; } = null!;
    public string MessagesCollectionName { get; set; } = null!;
    public string ChatsCollectionName { get; set; } = null!;
    public string UsersCollectionName { get; set; } = null!;
}
```

4. Crear __Persistence\AppDbContext.cs.__, en donde se va a tener la conexión a la base de datos.
   1. En __Persistence__ se debe tener en __Persistence.csproj__ el paquete __Microsoft.Extensions.Options @Microsoft__, la cual debe ser la misma versión que tiene .NET con la que se está trabajando.

```c#
using System;

using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace Persistence;

public class AppDbContext
{
    private readonly IMongoDatabase _database;

    public AppDbContext(IOptions<AppDbSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        _database = client.GetDatabase(settings.Value.DatabaseName);
    }

    public IMongoDatabase Database => _database;
}
```

5. Realizar inyección de dependencia en Program.cs, en donde el servicio __AppDbContext__ será singleton.
   1. De igual manera se coloca __AppDbSettings__ para tener acceso a las configuraciones de base de datos. 

```c#
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Configure settings inject IOptions<AppDbSettings>
builder.Services.Configure<AppDbSettings>(
    builder.Configuration.GetSection("InTouchIoDatabase"));

// Register AppDbContext as singleton
builder.Services.AddSingleton<AppDbContext>();

// Add services to the container.

builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.

app.MapControllers();

app.Run();

```


6. Configurar MongoDB para ingorar campos que no estén definidos en la entidad Domain. Se realizan en __Program.cs__.
   1. Esto se hace para evitar errores como: Element '__v' does not match any field or property of class Domain.Message.
   2. Esto se debe hacer para cada Entidad.

```c#
using Application.Messages;
using Domain;
using MongoDB.Bson.Serialization;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

BsonClassMap.RegisterClassMap<Message>(cm =>
{
    cm.AutoMap();
    cm.SetIgnoreExtraElements(true);
});
```

## 4. Autenticación
### 4.1 Creación de clases
#### 4.1.2 DTOs
1. Crear Application\DTOs\Auth\LoginUserDto.cs
   1. Ejemplo con validaciones de __DataAnnotations__.
  
```c#
using System;
using System.ComponentModel.DataAnnotations;

namespace Application.DTOs;

public class LoginUserDto
{
    [Required(ErrorMessage = "Name is required")]
    [MinLength(3, ErrorMessage = "Name should have at least 3 characters")]
    public string Name { get; set; } = null!;

    [Required(ErrorMessage = "Password is required")]
    [MinLength(6, ErrorMessage = "Password should have at least 6 characters")]
    public string Password { get; set; } = null!;
}
```

2. Crear DTO para respuestas __Application\DTOs\Auth\AuthResultDto.cs__.
   1. Se usa para el serivico de Auth, ya que en los servicios no se cuenta con métodos como __BadRequest__.
3. Configurar política de autorización como se indica en [1.4.2 Configuración de política de autorización por defecto](#142-configuración-de-política-de-autorización-por-defecto).

### 4.2 Autenticación con JWT
1. Instalar versión correspondiente del paquere __Microsoft.AspNetCore.Authentication.JwtBearer @Microsoft.__ según la versión de .NET que se esté ocupando. Se instala en:
   1. API
   2. Application
2. Instalar paquete __BCrypt.Net-Next @Chris McKee, Ryan D. Emerl, Damien Miller__, el cual contiene el servicio que autentica y compara/crea contraseñas. Se instala en:
   1. Application 
3. Crear __Application\Auth\JwtSettings.cs__

```c#
using System;

namespace Application.Auth;

public class JwtSettings
{
    public string Key { get; set; } = null!;
    public string Issuer { get; set; } = null!; 
    public string Audience { get; set; } = null!;
    public int ExpiresInMinutes { get; set; }
}
```

4. Configurar JWT en Program.cs.

```c#
// 1. JWT configuration
builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection("Jwt")
);

var jwtSettings = builder.Configuration.GetSection("Jwt").Get<JwtSettings>();

// 2. Add authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings?.Issuer,
        ValidAudience = jwtSettings?.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings!.Key))
    };
});

// 3. Add authorization
builder.Services.AddAuthorization();

```

5. Revisar que se tengan middlewares de autenticación y autorización.

```c#
app.UseAuthentication();
app.UseAuthorization();
```

6. Agregar configuración de JWT en __API\appsettings.json__.
   
```json
"Jwt": {
  "Key": "superclaveultrasecreta",  // 🔐 cámbiala por una más segura
  "Issuer": "IntouchApp",
  "Audience": "IntouchUsers",
  "ExpiresInMinutes": 60
}
```

7. Crear generador de token __Application\Auth\JwtTokenGenerator.cs__.
   1. Se usa la entidad User para poder generar los claims que se incluyen en el token.

```c#
using System;

using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Domain;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Application.Auth;

public class JwtTokenGenerator(IOptions<JwtSettings> options)
{
    private readonly JwtSettings _settings = options.Value;

    public string GenerateToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id),
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Name, user.Name)
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_settings.Key));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _settings.Issuer,
            audience: _settings.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_settings.ExpiresInMinutes),          
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
```
8. Inyectar servicio como singleton en __Program.cs__.

```c#
builder.Services.AddSingleton<JwtTokenGenerator>();
```

## 5. Funcionalidades CORE
### 5.1 Clase Result
- Así como __Application\DTOs\Auth\AuthResultDto.cs__, se crea la clase Result para usarse en los servicios, ya que en ellos no se tiene acceso a funciones como __BadRequest, OK, etc__.

```c#
using System;

namespace Application.Core;

public class Result<T>
{
    public bool IsSuccess { get; set; }
    public T? Value { get; set; }
    public string? Error { get; set; }
    public int Code { get; set; }
    public static Result<T> Success(T value) => new() { IsSuccess = true, Value = value };
    public static Result<T> Failure(string error, int code) => new()
    {
        IsSuccess = false,
        Error = error,
        Code = code
    };
}
```

## 6. Extras
### 6.1 SignalR
1. Crear carpeta __SignarR__ en __API__.
   1. Al crear la carpeta, en el archivo de API.csproj debe aparecer.

```xml
  <ItemGroup>
    <Folder Include="SignalR\" />
  </ItemGroup>
```

2. Creación de Hub (se toma como ejemplo un chat) __API/SignalR/ChatHub.cs__.

```c#
using Application.Chats;
using Application.Messages;
using Microsoft.AspNetCore.SignalR;
using Application.DTOs.Messages;
using Application.DTOs.Chats;
using Domain;
using Application.DTOs;
using System.Text.Json;

namespace API.SignalR;

public class ChatHub(
    MessageService messageService,
    ChatsService chatService
) : Hub
{
    public async Task Setup(string userId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, userId);
        Console.WriteLine($"User {userId} joined their personal group.");
    }

    public async Task JoinChat(string chatId)
    {
        await Groups.AddToGroupAsync(Context.ConnectionId, chatId);
        Console.WriteLine($"Joined chat {chatId}");
    }

    public async Task LeaveChat(string chatId)
    {
        await Groups.RemoveFromGroupAsync(Context.ConnectionId, chatId);
        Console.WriteLine($"Left chat {chatId}");
    }

    public async Task PersonalMessage(PersonalMessagePayload payload)
    {
        Console.WriteLine(payload);
        try
        {
            var json = JsonSerializer.Serialize(payload); // convértelo a JSON string
            var deserializedPayload = JsonSerializer.Deserialize<PersonalMessagePayload>(json); // deserialízalo como DTO

            if (deserializedPayload == null) throw new Exception("Payload inválido");

            var chat = deserializedPayload.Chat;
            var messageData = deserializedPayload.Message;

            string sender = messageData.Sender;
            string content = messageData.Content;
            string image = messageData.Image;
            bool? isSeen = messageData.IsSeen;

            var (error, createMessageDto) = CreateMessageDto.Create(sender, content, chat.Id!, image, isSeen);
            if (error != null)
            {
                await Clients.Group(messageData.Sender.ToString())
                    .SendAsync("personal-message-chat", error);
                return;
            }

            // Suponiendo que puedes obtener las conexiones activas por grupo de alguna forma
            // Aquí se omite ese detalle por ser más complejo en SignalR nativamente
            //createMessageDto.IsSeen = true; // Asume que el otro está conectado

            var messageResult = await messageService.Create(createMessageDto!);
            Console.WriteLine(messageResult.Value);

            var updateChatDto = new UpdateChatDto(messageResult.Value!.Id!);

            await chatService.UpdateChat(chat.Id!.ToString(), sender, updateChatDto!);

            // Supongamos que tu método `GetById` necesita el ID del otro usuario
            var friendId = chat.Users.First(u => u.Id != messageResult.Value.Sender);
            var updatedChat = await chatService.GetById(chat.Id.ToString(), friendId.ToString()!);

            var chatPayload = (dynamic)updatedChat.Value;

            foreach (var user in chat.Users)
            {
                await Clients.Group(user.Id.ToString()!).SendAsync("personal-message-chat", new
                {
                    chat = chatPayload,
                    unseenMessages = chatPayload.unseenMessages
                });
            }

            await Clients.Group(chat.Id.ToString()).SendAsync("personal-message-local",  messageResult.Value );

        }
        catch (Exception ex)
        {
            Console.WriteLine(ex.Message);
            await Clients.Group(payload.Message.Sender.ToString())
                .SendAsync("personal-message", ex.Message);
        }
    }
}

public class UserDto
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string PictureUrl { get; set; }
    public string PictureId { get; set; }
}

public class ChatDto
{
    public string Id { get; set; }
    public List<UserDto> Users { get; set; }
    public DateTime UpdatedAt { get; set; }
    public List<MessageDto> UnseenMessages { get; set; }
}

public class MessageDto
{
    public string Sender { get; set; }
    public string Content { get; set; }
    public string Chat { get; set; }
    public string Image { get; set; }
    public bool? IsSeen { get; set; }
}


public class PersonalMessagePayload
{
    public ChatDto Chat { get; set; }
    public MessageDto Message { get; set; }
}
```


3. Agregar servicio en __Program.cs__.

```c#
builder.Services.AddSignalR();
```

4. Agregar Middleware para indicarle al servidor API a dónde enviar las solicitudes que llegan a un endpoint en particular.

```c#
app.MapHub<ChatHub>("/chats");
```
