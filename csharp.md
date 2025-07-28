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
      - [1.4.2 Políticas de autenticación y autorización](#142-políticas-de-autenticación-y-autorización)
        - [1.4.2.1 Configuración de política de autenticación por defecto](#1421-configuración-de-política-de-autenticación-por-defecto)
        - [1.4.2.2 Configuración de política de autorización](#1422-configuración-de-política-de-autorización)
          - [1.4.2.2.1 Posible bug en tracking de Entity Framework](#14221-posible-bug-en-tracking-de-entity-framework)
      - [1.4.3 CORS](#143-cors)
      - [1.4.3 CORS para cookie](#143-cors-para-cookie)
  - [2. Esqueleto .NET API](#2-esqueleto-net-api)
    - [2.1 Preparación de proyectos y referencias](#21-preparación-de-proyectos-y-referencias)
    - [2.2 Ejecución de proyecto](#22-ejecución-de-proyecto)
    - [2.3 Configuración de launchSettings.json](#23-configuración-de-launchsettingsjson)
    - [2.4 Proyecto de Infrastructure](#24-proyecto-de-infrastructure)
  - [3. Bases de datos](#3-bases-de-datos)
    - [3.1 MongoDB](#31-mongodb)
    - [3.2 Configuraciones](#32-configuraciones)
      - [3.2.1 Archivo de convenciones](#321-archivo-de-convenciones)
        - [3.2.2 Parte 1. MongoDbConventions.Register()](#322-parte-1-mongodbconventionsregister)
        - [3.2.3 Parte 2. EnumSerializationConvention](#323-parte-2-enumserializationconvention)
      - [3.2.2 Ignorar campos no definidos en la entidad Domain de forma manual](#322-ignorar-campos-no-definidos-en-la-entidad-domain-de-forma-manual)
    - [3.3 Herramientas](#33-herramientas)
      - [3.3.1 Aggregation Framework](#331-aggregation-framework)
        - [3.3.2 Desglose](#332-desglose)
    - [3.4 Formas de uso](#34-formas-de-uso)
      - [3.4.1 Forma básica de un servicio](#341-forma-básica-de-un-servicio)
  - [4. Autenticación](#4-autenticación)
    - [4.1 Creación de clases](#41-creación-de-clases)
      - [4.1.2 DTOs](#412-dtos)
    - [4.2 Autenticación con JWT](#42-autenticación-con-jwt)
    - [4.3 Configuración de UserAccesor - Application/Infrastructure](#43-configuración-de-useraccesor---applicationinfrastructure)
  - [5. Funcionalidades CORE](#5-funcionalidades-core)
    - [5.1 Clase Result](#51-clase-result)
    - [5.2 AutoMapper](#52-automapper)
      - [5.2.1 Ejemplos de uso](#521-ejemplos-de-uso)
        - [5.2.1.1 DTO a entidad con coincidencia en nombre de campos](#5211-dto-a-entidad-con-coincidencia-en-nombre-de-campos)
        - [5.2.1.2 Mapeo a partir de subcampos o con campos con nombres diferente.](#5212-mapeo-a-partir-de-subcampos-o-con-campos-con-nombres-diferente)
        - [5.2.1.3 Evitar referencias cíclicas (Errores de serialización)](#5213-evitar-referencias-cíclicas-errores-de-serialización)
        - [5.2.1.4 Uso de proyecciones (Queryable extension)](#5214-uso-de-proyecciones-queryable-extension)
    - [5.3 ServiceHelper](#53-servicehelper)
  - [6. Validaciones](#6-validaciones)
    - [6.1 Data Annotations](#61-data-annotations)
    - [6.2 Fluent Validation](#62-fluent-validation)
      - [6.2.1 Aplicación usando patrón MediatR](#621-aplicación-usando-patrón-mediatr)
        - [6.2.1.1 Validation Middleware](#6211-validation-middleware)
        - [6.2.1.3 Manejo de exepciones](#6213-manejo-de-exepciones)
        - [6.2.1.3 Exception Handling Middleware](#6213-exception-handling-middleware)
        - [6.2.1.4 Ejemplo de uso](#6214-ejemplo-de-uso)
      - [6.2.2 Aplicación usando enfoque tradicional Controlador → Servicio → Lógica de negocio](#622-aplicación-usando-enfoque-tradicional-controlador--servicio--lógica-de-negocio)
        - [6.2.2.1 Ejemplo de uso](#6221-ejemplo-de-uso)
        - [6.2.2.2 Manejo de errores](#6222-manejo-de-errores)
        - [6.2.2.3 Manejo de errores personalizado con Middleware](#6223-manejo-de-errores-personalizado-con-middleware)
  - [7. Extras](#7-extras)
    - [7.1 SignalR](#71-signalr)
    - [7.2 Microsoft.Extensions.Options](#72-microsoftextensionsoptions)
      - [Ejemplo de uso](#ejemplo-de-uso)
      - [Ventajas](#ventajas)
      - [Ejemplo sin su uso](#ejemplo-sin-su-uso)
      - [TL;DR](#tldr)
    - [7.3 Dar de alta servicios en Program.cs](#73-dar-de-alta-servicios-en-programcs)
      - [7.3.1 Alta de clases genéricas](#731-alta-de-clases-genéricas)
        - [Ejemplo](#ejemplo)
        - [TL;DR](#tldr-1)
    - [7.4 Inyección de interfaces en lugar de implementación](#74-inyección-de-interfaces-en-lugar-de-implementación)
      - [¿Por qué se debe usar la interfaz y no la implementación?](#por-qué-se-debe-usar-la-interfaz-y-no-la-implementación)
      - [Ventajas de usar la interfaz](#ventajas-de-usar-la-interfaz)
      - [Desventajas de inyectar la implementación](#desventajas-de-inyectar-la-implementación)
        - [Se rompe el principio de inversión de dependencias.](#se-rompe-el-principio-de-inversión-de-dependencias)
        - [Dificulta los tests.](#dificulta-los-tests)
        - [Aumenta el acomplamiento.](#aumenta-el-acomplamiento)
    - [7.5 SOLID](#75-solid)
      - [7.5.5 Principio de inversión de dependencias (Dependency Inversion Principle DIP)](#755-principio-de-inversión-de-dependencias-dependency-inversion-principle-dip)
        - [Módulo de bajo nivel](#módulo-de-bajo-nivel)
        - [Qué es una abstracción](#qué-es-una-abstracción)
        - [Analogía](#analogía)
        - [Usos en la vida real](#usos-en-la-vida-real)
        - [TL;DR](#tldr-2)
    - [7.6 ASP.NET Core](#76-aspnet-core)
      - [7.6.1 Controladores](#761-controladores)
        - [7.6.1.1 ControllerBase](#7611-controllerbase)
        - [7.6.1.2 ActionResult](#7612-actionresult)
          - [Comparación de ActionResult usando ControllerBase y sin su uso](#comparación-de-actionresult-usando-controllerbase-y-sin-su-uso)
        - [7.6.1.3 IActionResult](#7613-iactionresult)
        - [7.6.1.4 Task\<ActionResult\>](#7614-taskactionresult)
        - [7.6.1.5 TL;DR](#7615-tldr)
      - [7.6.2 Middlewares](#762-middlewares)
        - [7.6.2.1 Ejemplo: Creación de middleware personalizada](#7621-ejemplo-creación-de-middleware-personalizada)
        - [7.6.2.2 Use, Usewhen, Run](#7622-use-usewhen-run)
        - [7.6.2.3 Ejemplos de middlewares comunes en ASP.NET Core:](#7623-ejemplos-de-middlewares-comunes-en-aspnet-core)
      - [7.6.3 Filtros y validaciones](#763-filtros-y-validaciones)
        - [7.6.3.1 Filtros](#7631-filtros)
          - [7.6.3.1.1 Tipos de filtros](#76311-tipos-de-filtros)
          - [7.6.3.1.2 Ejemplo: Action Filter personalizado](#76312-ejemplo-action-filter-personalizado)
          - [ServiceFilter](#servicefilter)
          - [TypeFilter](#typefilter)
          - [Resumen](#resumen)
          - [7.6.3.2 Validaciones del modelo con \[ApiController\]](#7632-validaciones-del-modelo-con-apicontroller)
    - [7.7 C#](#77-c)
      - [7.7.1 Listas](#771-listas)
      - [7.7.2 Switch moderno](#772-switch-moderno)
      - [7.7.3 Dicccionario](#773-dicccionario)
        - [Add(key, value)](#addkey-value)
        - [Remove(key, value)](#removekey-value)
        - [ContainsKey(key) y ContainsValue(value)](#containskeykey-y-containsvaluevalue)
        - [TryGetValue(key, out value)](#trygetvaluekey-out-value)
        - [Keys y Values](#keys-y-values)
        - [Iteración](#iteración)
        - [Clear()](#clear)
        - [Sintaxis índice](#sintaxis-índice)
      - [7.7.4 Extension Methods](#774-extension-methods)
        - [Usos](#usos)
        - [Ejemplo con tipo propio](#ejemplo-con-tipo-propio)
          - [Extension Methods + LINQ](#extension-methods--linq)
          - [Precauciones](#precauciones)
          - [Usar extensiones en todo el proyecto](#usar-extensiones-en-todo-el-proyecto)
      - [7.7.5 Constraints (restricciones genéricas)](#775-constraints-restricciones-genéricas)
        - [Tipos de constraints](#tipos-de-constraints)
          - [1. where T : class](#1-where-t--class)
          - [2. where T : struct](#2-where-t--struct)
          - [3. where T : new()](#3-where-t--new)
          - [4. where T : BaseClass](#4-where-t--baseclass)
          - [Uso común](#uso-común)
          - [Qué pasa si no se usan constraints](#qué-pasa-si-no-se-usan-constraints)
  - [Temas pendientes por documentar](#temas-pendientes-por-documentar)
    - [Shopping Cart](#shopping-cart)




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

- Así UserDto con Id, Email → se convierte en { "id": ..., "email": ... }

#### 1.4.2 Políticas de autenticación y autorización
##### 1.4.2.1 Configuración de política de autenticación por defecto
- Es útil para proteger endpoints cuando se implementa autenticación. Permite no tener que colocar __[Authorize]__ en todos los endpoints.
- Los endpoints que no deben estar protegidos se les decora con __[AllowAnonymous]__.

1. Se coloca la siguiente configuración en:

```c#
builder.Services.AddAuthorizationBuilder()
    .SetFallbackPolicy(new Microsoft.AspNetCore.Authorization.AuthorizationPolicyBuilder()
    .RequireAuthenticatedUser()
    .Build());
```

##### 1.4.2.2 Configuración de política de autorización
- Es útil para verificar que el usuario tenga los permisos requeridos para realizar una acción.

1. Creación de clase __Infrastructure\Security\IsHostRequirement.cs__
   1. El código que se muestra a continuación usa patrón MediatR.

```c#
using System;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Routing;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Security;

public class IsHostRequirement : IAuthorizationRequirement
{

}

public class IsHostRequirementHandler(AppDbContext dbContext, IHttpContextAccessor httpContextAccessor) : AuthorizationHandler<IsHostRequirement>
{
    protected override async Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostRequirement requirement)
    {
        var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null) return;

        var httpContext = httpContextAccessor.HttpContext;

        // Pattern matching expression es lo que se usa con: is 
        // Si el valor no es un string entonces simplemente se retorna. En caso de que sí sea string, se le asigna a activityId.
        // Con esta línea de código se revisa que se tiene httpContext, que se tiene el parámetro id y que sea un string; además, si se tiene ese valor se asigna a la variable activity Id. Si no se tiene el id o no es string, o no se tiene httpContext entonces se retorna.
        if (httpContext?.GetRouteValue("id") is not string activityId) return;

        var attendee = await dbContext.ActivityAttendees
            .SingleOrDefaultAsync(x => x.UserId == userId && x.ActivityId == activityId);

        if (attendee == null) return;

        if (attendee.IsHost) context.Succeed(requirement);
    }
}
```

2. Dar de alta servicio en __Program.cs__.

```c#
builder.Services.AddAuthorization(opt =>
{
    opt.AddPolicy("IsActivityHost", policy =>
    {
        policy.Requirements.Add(new IsHostRequirement());
    });
});
// Solo se requiere verificar si el usuario es el dueño, lo cual se hace de forma breve. De ahí se puede.
builder.Services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();
```

3. Usar política en controladores deseados.

```c#
[HttpPut("{id}")]
[Authorize(Policy = "IsActivityHost")]
public async Task<ActionResult> UpdateActivity(string id, UpdateActivityDto activity)
{
    activity.Id = id;
    return HandleResult(await Mediator.Send(new UpdateActivity.Command { ActivityDto = activity }));
}

[HttpDelete("{id}")]
[Authorize(Policy = "IsActivityHost")]
public async Task<ActionResult> DeleteActivity(string id)
{
    return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));
}
```

###### 1.4.2.2.1 Posible bug en tracking de Entity Framework
- El haber agregado la política hace que cada que se actualiza la actividad la lista de asistentes se limpia.
- El problema se debe al tracking de Entity Framework.
    - Ya que en IsHostRequirement se pidió obtener los asistentes, Entity Framework empieza a tener el tracking desde ahí. Luego, en UpdateActivity, se tienen esos asistentes al momento de recuperar nuevamente la actividad. 
    - Por otro lado, los asistentes no están presentes en request.Activity, ya que ahí Attendees es null. Luego, debido al mapeo que se hace de request.Activity a activity se borran todos los asistentes ya que request.Activity no tiene.

- Solución: indicar a entity framework que no se desea dar seguimiento a attendee recuperado en IsHostRequirement.

```c#
    var attendee = await dbContext.ActivityAttendees
        .AsNoTracking()
        .SingleOrDefaultAsync(x => x.UserId == userId && x.ActivityId == activityId);
```

#### 1.4.3 CORS
#### 1.4.3 CORS para cookie
- Configuración de CORS para cookie proveniente de un navegador se confiable cuando viene de un origen diferente

1. En Program.cs se agrega AllowCredentials() a la configuración de CORS.
```c#
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod()
    .AllowCredentials()
    .WithOrigins("http://localhost:3000", "https://localhost:3000"));
```


## 2. Esqueleto .NET API
### 2.1 Preparación de proyectos y referencias
- [Se puede ver una representación de la arquitectura que sigue el proyecto en el siguiente link](https://github.com/House197/NET/blob/main/Udemy/NETCore-React/02.Skeleton.NetApi.md)
- [Representación de la arquitectura incluyendo el proyecto Infrastructure](https://github.com/House197/NET/blob/main/Udemy/NETCore-React/14.EntityFrameworkRelationships.md)

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

dotnet new classlib -n Infrastructure # Su finalidad es recuperar información del usuario de modo que Application no sepa nada del usuario ni cómo se obtiene.
```

4. Añadir estos proyectos en el archivo de solución.
```bash
dotnet sln add API
dotnet sln add Domain
dotnet sln add Application
dotnet sln add Persistence

dotnet sln add Infrastructure
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

8. Siguiendo con la parte de referencias, __Infrastructure__ requiere de una referencia a __Application__.
   1. __API__ debe tener referencia a __Infrastructure__.

9.  Simplificar referencias del proyecto. En __API.csproj__ se elimina el siguiente apartado:
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
    <ProjectReference Include="..\Infrastructure\Infrastructure.csproj" />
  </ItemGroup>

</Project>

```

10. Eliminar archivo __API.http__, el cual provee una manera de testear API endpoints, lo cual requiere instalar una extensión de VS Code para usarla. Sin embargo, se usará Postman para las pruebas.

11. Archivo __Program.cs__.
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

### 2.4 Proyecto de Infrastructure
- Se recuerda que en el proyecto de __Application__ se requiere la habilidad de obtener la información del usuario sin saber nada sobre el usuario o cómo se obtiene el usuario del token.
- NOTA: Los siguientes pasos consideran una autenticación por medio de cookies.

1. Crear interfaz de acceso de usuario en proyecto de __Application__ __Application\Interfaces\IUserAccessor.cs__.
```c#
using System;
using Domain;

namespace Application.Interfaces;

public interface IUserAccessor
{
    string GetUserId();
    Task<User> GetUserAsync();
}

```

2. Colocar en __Infrastructure\Infrastructure.csproj__ lo siguiente para poder usar __HTTP Context Accessor__.
    - Se requiere acceso a httpContextAccessor ya que es en donde se contiene el user object, el cual se pasó por medio de la cookie cuando el usuario se ha autenticado.

```xml
  <ItemGroup>
    <FrameworkReference Include="Microsoft.AspNetCore.App" />
  </ItemGroup>
```

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <ProjectReference Include="..\Application\Application.csproj" />
  </ItemGroup>

  <ItemGroup>
    <FrameworkReference Include="Microsoft.AspNetCore.App" />
  </ItemGroup>

</Project>

```

3. Crear implementación de la interfaz en proyecto de Infrastructure __Infrastructure\Security\UserAccessor.cs__.

```c#
using System;
using System.Security.Claims;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure;

public class UserAccessor(IHttpContextAccessor httpContextAccessor, AppDbContext dbContext) : IUserAccessor
{
    public async Task<User> GetUserAsync()
    {
        return await dbContext.Users.FindAsync(GetUserId())
            ?? throw new UnauthorizedAccessException("No user is logged in");
    }

    public string GetUserId()
    {
        // A partir de httpContextAccessor.HttpContext.User se pueden usar los claims que están en el token de usuario. Uno de los claims es para el user id.
        // Este claim están provisto dentro del token, name identifier
        return httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? throw new Exception("No user found");
    }
}
```

4. Ya que se tiene una interfaz y una implementación clase, se debe agregar como un servicio en Program.cs.

```c#
// Se desea solo sea scoped a la petición http. De igual, se debe a que se usa HTTP Context en el código
builder.Services.AddScoped<IUserAccessor, UserAccessor>();
```

## 3. Bases de datos
### 3.1 MongoDB
1. Instalar __MongoDB.Driver @MongoDB Inc.__ en los siguientes proyectos:
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
   2. Información sobre el paquete en [7.2 Microsoft.Extensions.Options](#72-microsoftextensionsoptions).

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

### 3.2 Configuraciones
#### 3.2.1 Archivo de convenciones
- Ubicación: __Persistence/Configurations__.
- El archivo registra convenciones globales de serialización de MongoDB para:
  1. Ignorar campos que no existen en entidades domain (tal como __v).
  2. Serializar enums como strings (más legible y portable).
     1. En este ejemplar se configura de esa forma a los enums ya que en el proyecto se deseaba tener el string en lugar del entero, ya que se ocupa guardar en base de datos el string.
  3. Aplicar estas reglas a todas las clases automáticamente.

##### 3.2.2 Parte 1. MongoDbConventions.Register()
```c#
public static void Register()
{
    var pack = new ConventionPack
    {
        new EnumRepresentationConvention(BsonType.String),
        new EnumSerializationConvention(),
        new IgnoreExtraElementsConvention(true)
    };

    ConventionRegistry.Register("DefaultMongoConventions", pack, t => true); // El nombre DefaultMongoConventions puede ser cualquiera.
}
``` 

1. Crea un paquete de convenciones __(ConventionPack)__ que define reglas de serialización.
2. Registra ese paquete con __ConventionRegistry__, lo que le dice a Mongo que use esas reglas para todas las clases (t => true).
3. Se ocupa esta función para dar de alta las convenciones en __Program.cs__ antes de interactuar con Mongo.

```c#
MongoDbConventions.Register();
```

| Convención                                      | ¿Qué hace?                                                                                 |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------ |
| `EnumRepresentationConvention(BsonType.String)` | Convierte enums a strings en Mongo (en lugar de enteros)                                   |
| `EnumSerializationConvention()`                 | Personaliza cómo se serializan los enums usando `EnumSerializer<T>`                        |
| `IgnoreExtraElementsConvention(true)`           | Ignora campos que están en Mongo pero **no están** en tus clases (como `__v`, `__t`, etc.) |


##### 3.2.3 Parte 2. EnumSerializationConvention
```c#
public class EnumSerializationConvention : ConventionBase, IClassMapConvention
{
    public void Apply(BsonClassMap classMap)
    {
        foreach (var memberMap in classMap.AllMemberMaps)
        {
            if (memberMap.MemberType.IsEnum)
            {
                var enumSerializerType = typeof(EnumSerializer<>).MakeGenericType(memberMap.MemberType);
                var serializer = (IBsonSerializer)Activator.CreateInstance(enumSerializerType, BsonType.String)!;
                memberMap.SetSerializer(serializer);
            }
        }
    }
}
```
- Es básicamente un detector de enums: los detecta y los reconfigura para que no den problemas al serializar o deserializar.
- Es una convención personalizada que:
  - Revisa cada propiedad de cada clase (AllMemeberMaps).
  - Si la propiedad es un enum, le asigna un serializador __(EnumSerializer<T>)__ que lo escribe como string.

#### 3.2.2 Ignorar campos no definidos en la entidad Domain de forma manual
- Es una alternativa si no se desea hacen con el archivo de convenciones.
- Esta opción no es recomendada cuando se tienen varias entidades, ya que se debe hacer para cada una.
- Se realizan en __Program.cs__.
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

### 3.3 Herramientas
#### 3.3.1 Aggregation Framework
- El marco de agregación en MongoDB está diseñado para procesar un gran número de documentos en una colección pasándolos a través de una serie de etapas, conocidas como pipeline.

__Ejemplo c#__
```c#
var productWithReviews = await _productsCollection.Aggregate()
    .Lookup<Product, Review, ProductWithReviews>(
        _reviewsCollection,
        product => product.Id,
        review => review.ProductId,
        result => result.Reviews
    )
    .AppendStage<ProductWithReviews>(new BsonDocument("$addFields", new BsonDocument
    {
        { "rating", new BsonDocument("$avg", "$reviews.rating") },
        { "totalReviews", new BsonDocument("$size", new BsonDocument("$ifNull", new BsonArray { "$reviews", new BsonArray() })) }
    }))
    .ToListAsync();
```

- Este código hace lo siguiente:
    1. Une ($lookup) productos con sus reseñas (reviews).
    2. Calcula el promedio de calificaciones ($avg) y total de reseñas ($size).
    3. Retorna una lista de objetos enriquecidos con estos nuevos campos.

__Ejemplo node__
```js
const products = await ProductModel.aggregate([
    {
        $lookup: {
            from: "reviews",
            localField: "_id",
            foreignField: "productId",
            as: "reviews"
        },
    },
    {
        $addFields: {
            rating: { $avg: "$reviews.rating" },
            totalReviews: { $size: "$reviews" }
        }
    },
]);
```

##### 3.3.2 Desglose
1. Iniciar una consulta de agregación en MongoDB sobre la colección de productos.
```c#
var productWithReviews = await _productsCollection.Aggregate()
```

2. Aplicar __Lookup__ (JOIN entre colecciones).
   1. Mongo no tiene JOIN como SQL, pero $lookup lo simula.
      1. Une productos con reseñas usando el __Id__ del producto y el __ProductId__ de la reseña.
      2. Guarda el resultado en una propiedad llamada __Reviews__ dentro de cada __ProductWithReviews__.

```c#
    .Lookup<Product, Review, ProductWithReviews>(
        _reviewsCollection,
        product => product.Id,
        review => review.ProductId,
        result => result.Reviews
    )
```

- Internamente es como hacer:

```js
$lookup: {
  from: "reviews",
  localField: "_id",
  foreignField: "productId",
  as: "reviews"
}
```

3. Aplicar __AppendStage__ para agregar campos derivados con __addFiels__.

```c#
    .AppendStage<ProductWithReviews>(new BsonDocument("$addFields", new BsonDocument
    {
        { "rating", new BsonDocument("$avg", "$reviews.rating") },
        { "totalReviews", new BsonDocument("$size", new BsonDocument("$ifNull", new BsonArray { "$reviews", new BsonArray() })) }
    }))
```

- rating.
  - Calcula el promedio de los valores rating de la lista de reseñas.

```js
$addFields: {
  rating: { $avg: "$reviews.rating" }
}
```

- totalReviews
  - Calcula cuántas reseñas tiene.
  - Usa __$ifNull__ para evitar si reviews es null.

```js
totalReviews: {
  $size: {
    $ifNull: ["$reviews", []]
  }
}
```

4. Ejecutar la consulta y convierte los resultados en una lista de objetos ProductWithReviews.

```c#
.ToListAsync();
```

### 3.4 Formas de uso
#### 3.4.1 Forma básica de un servicio
```c#
using System;
using Application.Core;
using Domain.Entities;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Persistence;

namespace Application.Services;

public class ReviewsService(    
    AppDbContext dbContext,
    IOptions<AppDbSettings> settings,
    IMapper mapper,
    ServiceHelper<ProductsService> serviceHelper)
{
    private readonly IMongoCollection<Review> _reviewsCollection =
        dbContext.Database.GetCollection<Review>(settings.Value.ReviewsCollectionName);

    public async Task<Result<Review[]>> GetReviewsAsync()
    {
        try
        {

        }
        catch (Exception ex)
        {
            return Result<Review[]>.Failure($"Internal Server Error: {ex.Message}", 500);
        }
    }
}
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

### 4.3 Configuración de UserAccesor - Application/Infrastructure
- Se recuerda que en el proyecto de Application se requiere la habilidad de obtener la información del usuario sin saber nada sobre el usuario o cómo se obtiene el usuario del token.

1. Crear interfaz de __UserAccesor__ en __Application__.

__Application\Interfaces\IUserAccessor.cs.__
```c#
using System;
using Domain;

namespace Application.Interfaces;

public interface IUserAccessor
{
    string GetUserId();
    Task<User> GetUserAsync();
}

```

2. Colocar siguiente grupo XML en __Infrastructure\Infrastructure.csproj__ para tener acceso a __HTTP Context Accessor__.
   1. Es en __HTTP Context Accessor__ donde se tiene el objeto de __User__.

```xml
  <ItemGroup>
    <FrameworkReference Include="Microsoft.AspNetCore.App" />
  </ItemGroup>
```

__Ejemplo de xml completo__

```xml
<Project Sdk="Microsoft.NET.Sdk">

  <PropertyGroup>
    <TargetFramework>net9.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

  <ItemGroup>
    <ProjectReference Include="..\Application\Application.csproj" />
  </ItemGroup>

  <ItemGroup>
    <FrameworkReference Include="Microsoft.AspNetCore.App" />
  </ItemGroup>

</Project>

```

3. Implementar __IUserAccessor__ creado en __Application__ en el proyecto __Infrastructure__.

__Infrastructure\Security\UserAccessor.cs__
```c#
using System;
using System.Security.Claims;
using Application.Interfaces;
using Domain;
using Microsoft.AspNetCore.Http;
using Persistence;

namespace Infrastructure;

public class UserAccessor(IHttpContextAccessor httpContextAccessor, AppDbContext dbContext) : IUserAccessor
{
    public async Task<User> GetUserAsync()
    {
        return await dbContext.Users.FindAsync(GetUserId())
            ?? throw new UnauthorizedAccessException("No user is logged in");
    }

    public string GetUserId()
    {
        // A partir de httpContextAccessor.HttpContext.User se pueden usar los claims que están en el token de usuario. Uno de los claims es para el user id.
        // Este claim están provisto dentro del token, name identifier
        return httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier)
            ?? throw new Exception("No user found");
    }
}

```

4. Agregar interfaz e implementación como servicio en __Program.cs__.

```c#
// Se desea solo sea scoped a la petición http. De igual, se debe a que se usa HTTP Context en el código
builder.Services.AddScoped<IUserAccessor, UserAccessor>();
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

### 5.2 AutoMapper
1. En NuGet, se buscar __AutoMapper__, el cual fue desarrollado por la misma persona de MediatoR (Jimmy Bogard).    
    - __AutoMapper @Jimmy Bogard__, instalar en __Application__ y __API__
    - __AutoMapper.Extensions.Microsoft.DependencyInjection @Jimmy Bogard__, instalar en __API__.

2. Configurar AutoMapper para que sepa qué está mapeando.
    - Crear en __Application__: __Application\Core\MappingProfiles.cs__
```c#
using System;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        // Se indica la fuente del mapeo y hacia donde se mapea.
        CreateMap<Activity, Activity>();   
    }
}
```

1. Dar de alta servicio en __Program.cs__.
   1. Se le debe especificar donde está el assembly para registar los mapping profiles. En este caso se usa __typeof__.
   2. El assembly se muestra en Filer Explorer, ejemplo: __Application\bin\Debug\net9.0\Application.dll__. En este caso el Assembly es __Application.dll__. El compilador va a colocar acá el código, en donde acá se va a encontrar el mapping profles que se creó.

```c#
builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);
```

4. Inyectar AutoMapper en clase que lo ocupa.

```c#
    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command>
    {
        public async Task Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.FindAsync([request.Activity.Id], cancellationToken) 
                ?? throw new Exception("Cannot find activity");

            mapper.Map(request.Activity, activity);
            
            await context.SaveChangesAsync(cancellationToken);
        }
    }
```

#### 5.2.1 Ejemplos de uso
##### 5.2.1.1 DTO a entidad con coincidencia en nombre de campos
- Por lo general, se tiene que se mapea de un DTO hacia la entidad.

__Application\Activities\DTOs\BaseActivityDto__
```c#
using System;

namespace Application.Activities.DTOs;

public class BaseActivityDto
{
    public string Title { get; set; } = "";
    public DateTime Date { get; set; }
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = "";
    public string City { get; set; } = "";
    public string Venue { get; set; } = "";
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}

```

__Application\Activities\DTOs\CreateActivityDto__
```c#
using System;
using System.ComponentModel.DataAnnotations;

namespace Application.Activities.DTOs;

public class CreateActivityDto : BaseActivityDto
{

}
```

__Entidad Domain\Activity.cs__.
```c#
using System;

namespace Domain;

public class Activity
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Title { get; set; }
    public DateTime Date { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    public bool IsCancelled { get; set; }
    public required string City { get; set; }
    public required string Venue { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }

    // navigation properties
    // public ICollection<User> Attendees { get; set; } = [];
    public ICollection<ActivityAttendee> Attendees { get; set; } = [];

    public ICollection<Comment> Comments { get; set; } = [];
}
```

- En este caso el mapeo es directo.

__Application\Core\MappingProfiles.cs__
```c#
using System;
using Application.Activities.DTOs;
using Application.Profiles.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        // Se indica la fuente del mapeo y hacia donde se mapea.
        CreateMap<CreateActivityDto, Activity>();
}
```

##### 5.2.1.2 Mapeo a partir de subcampos o con campos con nombres diferente.
- Se tiene que la entidad __ActivityAttendee__ contiene un campo de tipo __User__.
  - Este mapeo quiere llenar __UserMapper__ a partir del campo __User__ de __ActivityAttendee__. Sin embargo, se tiene que hacer manual debido a que AutoMapper no sabe hacerlo.

__Application\Core\MappingProfiles.cs__
```c#
using System;
using Application.Activities.DTOs;
using Application.Profiles.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        // Se indica la fuente del mapeo y hacia donde se mapea.
        CreateMap<ActivityAttendee, UserProfile>()
            .ForMember(d => d.DisplayName, o => o.MapFrom(s => s.User.DisplayName))
            .ForMember(d => d.Bio, o => o.MapFrom(s => s.User.Bio))
            .ForMember(d => d.ImageUrl, o => o.MapFrom(s => s.User.ImageUrl))
            .ForMember(d => d.Id, o => o.MapFrom(s => s.User.Id));
}
```

__Domain\ActivityAttendee.cs__
```c#
using System;

namespace Domain;

public class ActivityAttendee
{
    public string? UserId { get; set; }
    public User User { get; set; } = null!;
    public string? ActivityId { get; set; }
    public Activity Activity { get; set; } = null!;
    public bool IsHost { get; set; }
    public DateTime DateJoined { get; set; } = DateTime.UtcNow;
}

```

__Application\Profiles\DTOs\UserProfile.cs__
```c#
using System;

namespace Application.Profiles.DTOs;

public class UserProfile
{
    public required string Id { get; set; }
    public required string DisplayName { get; set; }
    public string? Bio { get; set; }
    public string? ImageUrl { get; set; }
}

```

##### 5.2.1.3 Evitar referencias cíclicas (Errores de serialización)
- Para la entidad y el DTO se tiene el campo de __Attendees__, el cual es una lista de la entidad __ActivityAttendee__. Se aprecia que para el DTO __ActivityDto.cs__ se usa __UserProfile__ en lugar de la entidad __ActivityAttendee__.
  - Si en __ActivityDto.cs__ se usara también __ActivityAttendee__, entonces se tendría una cadena de referencias:
    - Entidad Activity -> Attendees -> User -> Attendees -> User ...
    - Por esta razón se crea __UserProfile__ para romper el ciclo, ya que acá no se coloca de nuevo __ActivityAttendee__ en los campos del user.

__Application\Core\MappingProfiles.cs__
```c#
using System;
using Application.Activities.DTOs;
using Application.Profiles.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        // Se indica que para actividades que pueden no encontrarse se configuran individualmente
        CreateMap<Activity, ActivityDto>()
            .ForMember(d => d.HostDisplayName, o => o.MapFrom(s =>
                s.Attendees.FirstOrDefault(x => x.IsHost)!.User.DisplayName))
                // Si no encuentra host entonces con ! se le asigna null y no hay problema.
            .ForMember(d => d.HostId, o => o.MapFrom(s =>
                s.Attendees.FirstOrDefault(x => x.IsHost)!.User.Id));
}
```

- __Entidad Domain\User.cs__

```c#
using System;
using Microsoft.AspNetCore.Identity;

namespace Domain;

public class User : IdentityUser
{
    public string? DisplayName { get; set; }
    public string? Bio { get; set; }
    public string? ImageUrl { get; set; }

    // navigation properties
    // public ICollection<Activity> Attendees { get; set; } = [];
    public ICollection<ActivityAttendee> Activities { get; set; } = [];

    public ICollection<Photo> Photos { get; set; } = [];
}

```

- __Entidad Domain\Activity.cs__

```c#
using System;

namespace Domain;

public class Activity
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Title { get; set; }
    public DateTime Date { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    public bool IsCancelled { get; set; }
    public required string City { get; set; }
    public required string Venue { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }

    // navigation properties
    // public ICollection<User> Attendees { get; set; } = [];
    public ICollection<ActivityAttendee> Attendees { get; set; } = [];

    public ICollection<Comment> Comments { get; set; } = [];
}

```

- __DTO Application\Activities\DTOs\ActivityDto.cs__

```c#
using System;
using Application.Profiles.DTOs;
using Domain;

namespace Application.Activities.DTOs;

public class ActivityDto
{
    public required string Id { get; set; }
    public required string Title { get; set; }
    public DateTime Date { get; set; }
    public required string Description { get; set; }
    public required string Category { get; set; }
    public bool IsCancelled { get; set; }
    public required string HostDisplayName { get; set; }
    public required string HostId { get; set; }
    public required string City { get; set; }
    public required string Venue { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }

    // navigation properties
    // public ICollection<User> Attendees { get; set; } = [];
    public ICollection<UserProfile> Attendees { get; set; } = [];
}

```

- __Entidad Domain\ActivityAttendee.cs__

```c#
using System;

namespace Domain;

public class ActivityAttendee
{
    public string? UserId { get; set; }
    public User User { get; set; } = null!;
    public string? ActivityId { get; set; }
    public Activity Activity { get; set; } = null!;
    public bool IsHost { get; set; }
    public DateTime DateJoined { get; set; } = DateTime.UtcNow;
}

```

- __DTO Application\Profiles\DTOs\UserProfile.cs__

```c#
using System;

namespace Application.Profiles.DTOs;

public class UserProfile
{
    public required string Id { get; set; }
    public required string DisplayName { get; set; }
    public string? Bio { get; set; }
    public string? ImageUrl { get; set; }
}

```

- Este error también aparece cuando se intentan traer a las actividates con códigos como:

```c#
var activity = await context.Activities
    .Include(x => x.Attendees)
    .ThenInclude(x => x.User)
    .FirstOrDefaultAsync(x => request.Id == x.Id, cancellationToken);
```

##### 5.2.1.4 Uso de proyecciones (Queryable extension)
- Con Projection se puede evitar tener que traer información de más. Se puede proyectar del nivel de la db hacia el dto.
- Solamente es usar __Select__ para tomar todas las propiedades necesarias de la entidad y entidades relacionadas. Además, cuando se usa Select ya no es necesario usar __Eager Loading__.
- AutoMapper viene con __ProjectTo Queryable extension__.
    - Al usar ProjectTo se pasa la configuración de Mapper. Además, ahora el tipo de dato del resultado es el DTO, por lo que se retorna el DTO de forma inmediata sin tener que hacer el mapeo en el return. Esto es a que ProjectTo hace el AutoMapping under the hood, por lo que ahora solo se seleccionan las propiedades que vienen en el DTO en lugar de que en la query vengan de más.

```c#
using System;
using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Queries;

public class GetActivityDetails
{
    public class Query : IRequest<Result<ActivityDto>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<ActivityDto>>
    {
        public async Task<Result<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            // Se usa [] para pasar el Id para poder eliminar el ellipsis marcado por context.
            var activity = await context.Activities
                .ProjectTo<ActivityDto>(mapper.ConfigurationProvider)
                .FirstOrDefaultAsync(x => request.Id == x.Id, cancellationToken);

            // Por el momento se lanza una excepción. Después se muestra cómo gestionar esto en mediator.
            if (activity == null) return Result<ActivityDto>.Failure("Activity not found", 404);

            return Result<ActivityDto>.Success(activity);
        }
    }
}

```

### 5.3 ServiceHelper
- Se usa para englobar los errores de servidor o exepciones no manejadas, evitando tener que duplicar código en cada método del servicio.

```c#
using System;
using Microsoft.Extensions.Logging;

namespace Application.Core;

public class ServiceHelper<T>(ILogger<T> logger)
{
    private readonly ILogger<T> _logger = logger;

    public async Task<Result<TResult>> ExecuteSafeAsync<TResult>(Func<Task<TResult>> operation)
    {
        try
        {
            var result = await operation();
            return Result<TResult>.Success(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Unhandled exception in service operation");
            return Result<TResult>.Failure("Internal Server Error", 500);
        }
    }
}

```

- Dar de alta en __Program.cs__.
  - Más información de cómo dar de alta clases genéricas en [7.3.1 Alta de clases genéricas](#731-alta-de-clases-genéricas).

```c#
builder.Services.AddScoped(typeof(ServiceHelper<>));
```

## 6. Validaciones
### 6.1 Data Annotations

### 6.2 Fluent Validation
- [FluentValidation](https://docs.fluentvalidation.net/en/latest/) es una librería .NET de validación para objetos de negocio que permite definir reglas de forma fluida y limpia, promoviendo la separación de preocupaciones y mejorando la mantenibilidad del código.

- En lugar de Data Annotations, las cuales ya vienen en el entorno de .NET, se puede optar por el paquete __Fluent Validation__.
- Se hace notar que quien hace las validaciones en realidad es __ApiController__.
    - Esta anotación se encuentra en __API\Controllers\BaseApiController.cs__. Éste revisa lo que recibe el controlador. Sin embargo, el objetivo es no tener lógica en los controladores y dejarlos lo más simple posible.
    - Entonces, se deja la validación como lógica de negocio que aplica a la capa de __Application__.

1. Descargar paquete por medio de NuGet. Se recomienda no tener seleccionado el checkbox __Prerelease__ para tener versiones estables de los paquetes.
    - __FluentValidation @ Jeremy Skinner__, instalar en __Application__ y __API__.
    - __FluentValidation.DependencyInjectionExtensions @ Jeremy Skinner__, instalar en __Application__ y __API__.

#### 6.2.1 Aplicación usando patrón MediatR
- Se toma de ejemplo una red social en donde se publican actividades.

1. Crear __Application\Activities\Validators\BaseActivityValidator.cs__.

```c#
using System;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class BaseActivityValidator<T, TDto> : AbstractValidator<T> where TDto : BaseActivityDto
{
    public BaseActivityValidator(Func<T, TDto> selector)
    {
        RuleFor(x => selector(x).Title).NotEmpty().WithMessage("Title is required");
        RuleFor(x => selector(x).Description).NotEmpty().WithMessage("Description is required");
    }
}

```

2. Crear __Application\Activities\Validators\CreateActivityValidator.cs__.
    - Se hereda de __AbstractValidator__ y se le indica lo que se desea validar (CreateActivity.Command).
        - Con esto se le indica que se desea validar la siguiente línea de __Application\Activities\Commands\CreateActivity.cs__, `public required CreateActivityDto ActivityDto { get; set; }`

```c#
using System;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class CreateActivityValidator : BaseActivityValidator<CreateActivity.Command, CreateActivityDto>
{
    public CreateActivityValidator() : base(x => x.ActivityDto)
    {

    }
}
```

3. Agregar FluentValidation como servicio.
__reactivities\API\Program.cs__
```c#
using FluentValidation;

...

builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();
```


4. Inyectar validator en Handler en __Application\Activities\Commands\CreateActivity.cs__.
    - Se inyecta __IValidator__, en donde se le especifica que se está validando __Command__.

```c#
    public class Handler(AppDbContext context, IMapper mapper, IValidator<Command> validator) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            await validator.ValidateAndThrowAsync(request, cancellationToken);

            var activity = mapper.Map<Activity>(request.ActivityDto);
            // No se usa la versión async ya que no se desea acceder a la DB para recuperar un valor generado por la DB
            // Lo único que se hace con Add es indicar a Entity Framework que tenga registro de esto en memoria.
            context.Activities.Add(activity);

            await context.SaveChangesAsync(cancellationToken);

            return activity.Id;
        }
    }
```

##### 6.2.1.1 Validation Middleware 
- Más acerca de las Middlewares en el apartado: [7.6.2 Middlewares](#762-middlewares).
- En lugar de tener que hacer la inyección en __Application\Activities\Commands\CreateActivity.cs__ como se mostró en el paso 4 de la parte anterior, se puede usar __middleware MediatR__.

1. Crear __Application\Core\ValidationBehavior.cs__.
    - Inyectar IValidator, en donde lo que se valida se pasa como un genérico.
    - Se hereda de __IPipelineBehavior__ dada por MediatR. En su genérico se le pasa tanto TRequest como TResponse.
    - Se coloca una restricción por medio de __where__ para especificar que __TRequest__ no sea nulo.

```c#
using System;
using FluentValidation;
using MediatR;

namespace Application.Core;

public class ValidationBehavior<TRequest, TResponse>(IValidator<TRequest>? validator = null)
    : IPipelineBehavior<TRequest, TResponse> where TRequest : notnull
{
    public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
    {
        if (validator == null) return await next(cancellationToken);

        var validationResult = await validator.ValidateAsync(request, cancellationToken);

        if (!validationResult.IsValid)
        {
            throw new ValidationException(validationResult.Errors);
        }

        return await next(cancellationToken);
    }
}
```

2. En Program.cs se le tiene que indicar a MediatR acerca de la nueva middleware.
    - Ya que no se conoce el tipo en __Program__ se usa <,>.

__API\Program.cs__
```c#
builder.Services.AddMediatR(x =>
{
    x.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();
    x.AddOpenBehavior(typeof(ValidationBehavior<,>));
});
```

3. Quitar de __Application\Activities\Commands\CreateActivity.cs__ la inyección del validator y la línea de código que se había colocado en la sección anterior, ya que ahora la middleware de MediatR se va a encargar.

##### 6.2.1.3 Manejo de exepciones
1. Crear __Application\Core\AppException.cs__

```c#
using System;

namespace Application.Core;

// details va a ser para stack trace. Es útil para el desarrollo, no para producción
public class AppException(int statusCode, string message, string? details)
{
    public int StatusCode { get; set; } = statusCode;
    public string Message { get; set; } = message;
    public string? Details { get; set; } = details;
}

```

- AppException.cs se va a usar en __API\Middleware\ExceptionMiddleware.cs__, el cual se crea en el paso __6.2.1.3 Exception Handling Middleware__

##### 6.2.1.3 Exception Handling Middleware
- Con lo que se dejó en el paso anterior, al hacer una petición se tiene como respuesta la excepción. Entonces, ahora se crea una middleware para gestionar la excepción.
- La middleware va a ser responsabilidad de API.
    - Ya que acá es donde entrar las peticiones, por lo que con la middleware se modificarán ya sea en su llegada o en su salida; incluso en ambas.
1. Crear __API\Middleware\ExceptionMiddleware.cs__.
    - Se recuerda que la excepción lanzada por las validaciones contiene una colección de errores, el cual se puede extraer en la middleware en el catch que se encarga de gestionar la excepción ValidationException.
    - Lo que realmente se está haciendo se está replicando lo que Microsfot daría si se usara el API Controller Attribute para gestionar esta funcionalidad.

    - Se inyecta a ExceptionMiddleware ILogger
    - Se inyecta a ExceptionMiddleware IHostEnvironment para saber si se está corriendo en desarrollo o producción.
    - Se serializan las opciones, en donde se debe especificar NamingPolicy de __camelCase__, el cual es el que por defecto usan los controladores. Sin embargo, como no se está en el contexto del controlador API, se debe especificar, en caso contrario por defecto usa __PascalCasing__ para el JSON que se está devolviendo.

```c#
using System;
using System.Text.Json;
using Application.Core;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

public class ExceptionMiddleware(ILogger<ExceptionMiddleware> logger, IHostEnvironment env) : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException ex)
        {
            await HandleValidationException(context, ex);
        }
        catch (Exception ex)
        {
            await HandleException(context, ex);
        }
    }

    private async Task HandleException(HttpContext context, Exception ex)
    {
        logger.LogError(ex, ex.Message);
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;

        var response = env.IsDevelopment()
            ? new AppException(context.Response.StatusCode, ex.Message, ex.StackTrace)
            : new AppException(context.Response.StatusCode, ex.Message, null);

        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

        var json = JsonSerializer.Serialize(response, options);

        await context.Response.WriteAsync(json);
    }

    private static async Task HandleValidationException(HttpContext context, ValidationException ex)
    {
        var validationErrors = new Dictionary<string, string[]>();

        if (ex.Errors is not null)
        {
            foreach (var error in ex.Errors)
            {
                // Con TryGetValue se busca la llave en el primer argumento, si se tiene error entonces se puede usar out
                if (validationErrors.TryGetValue(error.PropertyName, out var existingErrors))
                {
                    validationErrors[error.PropertyName] = [.. existingErrors, error.ErrorMessage];
                }
                else
                {
                    validationErrors[error.PropertyName] = [error.ErrorMessage];
                }
            }
        }

        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        var validationProblemDetails = new ValidationProblemDetails(validationErrors)
        {
            Status = StatusCodes.Status400BadRequest,
            Type = "ValidationFailure",
            Title = "Validation Error",
            Detail = "One or more validation errors has occured"
        };

        await context.Response.WriteAsJsonAsync(validationProblemDetails);
    }
}

```

2. Ya que se está usando __IMiddleware__ entonces se debe dar de alta como servicio en Program.cs.

```c#
builder.Services.AddTransient<ExceptionMiddleware>();
```

- Por otro lado, la siguiente sección tiene que ir hasta arriba del pipeline de middleware
```c#
app.UseMiddleware<ExceptionMiddleware>();
```

- Código completo de __Program.cs__ para el proyecto de reactivities.

```c#
using API.Middleware;
using Application.Activities.Queries;
using Application.Activities.Validators;
using Application.Core;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

builder.Services.AddCors();

builder.Services.AddMediatR(x =>
{
    x.RegisterServicesFromAssemblyContaining<GetActivityList.Handler>();
    x.AddOpenBehavior(typeof(ValidationBehavior<,>));
});

builder.Services.AddAutoMapper(typeof(MappingProfiles).Assembly);

builder.Services.AddValidatorsFromAssemblyContaining<CreateActivityValidator>();

builder.Services.AddTransient<ExceptionMiddleware>();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();
app.UseCors(x => x.AllowAnyHeader().AllowAnyMethod()
    .WithOrigins("http://localhost:3000", "https://localhost:3000"));

app.MapControllers();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    var context = services.GetRequiredService<AppDbContext>();
    // Aplica migraciones pendientes. Crea la DB si no existe.
    await context.Database.MigrateAsync();

    await DbInitializer.SeedData(context);
}
catch (Exception ex)
{
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "Error occured during migration.");
}

app.Run();

```

##### 6.2.1.4 Ejemplo de uso
1. Crear DTO base __Application\Activities\DTOs\BaseActivityDto.cs__, el cual va a tener todas las propiedades que tiene en este momento __CreateActivityDto.cs__.

```c#
using System;

namespace Application.Activities.DTOs;

public class BaseActivityDto
{
    public string Title { get; set; } = "";
    public DateTime Date { get; set; }
    public string Description { get; set; } = string.Empty;
    public string Category { get; set; } = "";
    public string City { get; set; } = "";
    public string Venue { get; set; } = "";
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}

```


2. Heredar __BaseActivityDto__ a __CreateActivityDto__.
```c#
using System;
using System.ComponentModel.DataAnnotations;

namespace Application.Activities.DTOs;

public class CreateActivityDto : BaseActivityDto
{

}

```

3. Crear __Application\Activities\DTOs\UpdateActivityDto.cs__.
```c#
using System;

namespace Application.Activities.DTOs;

public class UpdateActivityDto : BaseActivityDto
{
    // Ya que se valida con FluentValidation, se puede inicializar con un string vacío.
    public string Id { get; set; } = "";
}

```
4. Crear una base de las validaciones para evitar repetición de código __reactivities\Application\Activities\Validators\BaseActivityValidator.cs__. Las validaciones creadas en CreateActivityDto se pasan, en donde en lugar de usar el DTO se usa la función genérica.

```c#
using System;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class BaseActivityValidator<T, TDto> : AbstractValidator<T> where TDto : BaseActivityDto
{
    public BaseActivityValidator(Func<T, TDto> selector)
    {
        RuleFor(x => selector(x).Title).NotEmpty().WithMessage("Title is required");
        RuleFor(x => selector(x).Description).NotEmpty().WithMessage("Description is required");
    }
}

```

5. Actualizar __Application\Activities\Validators\CreateActivityValidator.cs__ para heredarle __BaseActivityValidator__.

```c#
using System;
using Application.Activities.Commands;
using Application.Activities.DTOs;
using FluentValidation;

namespace Application.Activities.Validators;

public class CreateActivityValidator : BaseActivityValidator<CreateActivity.Command, CreateActivityDto>
{
    public CreateActivityValidator() : base(x => x.ActivityDto)
    {

    }
}

```

6. Agregar en __Application\Core\MappingProfiles.cs__

```c#
using System;
using Application.Activities.DTOs;
using AutoMapper;
using Domain;

namespace Application.Core;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        // Se indica la fuente del mapeo y hacia donde se mapea.
        CreateMap<CreateActivityDto, Activity>();
    }
}

```

#### 6.2.2 Aplicación usando enfoque tradicional Controlador → Servicio → Lógica de negocio
- Se tienen las siguientes recomendaciones.

1. Mantén las reglas en clases separadas para cada DTO.
2. Valida solo en DTOs, nunca directamente sobre tus entidades.
3. Agrupa validadores comunes si compartes reglas entre DTOs (puedes crear validadores base).
4. Si tienes lógica condicional (.When(...)) o validaciones async (MustAsync), FluentValidation también lo soporta perfectamente.

1. Insalación en:
    1. __API__
    2. __Application__
 
```bash
dotnet add package FluentValidation
dotnet add package FluentValidation.AspNetCore # ASP.NET Core, al tener el paquete FluentValidation.AspNetCore, valida automáticamente los modelos decorados con [ApiController].
```

2. Configuración en __Program.cs__.

```c#
using FluentValidation;
using FluentValidation.AspNetCore;

builder.Services.AddControllers()
    .AddFluentValidation(fv =>
    {
        // Registrará automáticamente todos los validadores en el ensamblado
        fv.RegisterValidatorsFromAssemblyContaining<CreateUserValidator>();
        fv.DisableDataAnnotationsValidation = true; // Opcional: desactiva Data Annotations si solo usas FluentValidation
    });

```

##### 6.2.2.1 Ejemplo de uso
1. Crear DTO.

```c#
public class CreateUserDto
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public int Age { get; set; }
}
```

2. Crear Validator.

```c#
using FluentValidation;

public class CreateUserDtoValidator : AbstractValidator<CreateUserDto>
{
    public CreateUserDtoValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("El nombre es obligatorio")
            .MaximumLength(50);

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("El email es obligatorio")
            .EmailAddress().WithMessage("El email no tiene un formato válido");

        RuleFor(x => x.Age)
            .InclusiveBetween(18, 100).WithMessage("La edad debe estar entre 18 y 100 años");
    }
}
```

3. Validaciones automáticas en controladores.
   1. No se requiere hacer nada adicional, ni siquiera llamar manualmente al validator. ASP.NET Core valida automáticamente los modelos decorados con __[ApiController]__ gracias al paquete __FluentValidation.AspNetCore__

```c#
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    [HttpPost]
    public IActionResult Create([FromBody] CreateUserDto userDto)
    {
        // Si hay errores de validación, ASP.NET Core devuelve automáticamente 400 Bad Request.
        return Ok("Usuario creado exitosamente");
    }
}
```

4. Validación manual (opcional) para casos que lo requieran. Por ejemplo, dentro de un servicio.

```c#
public class UserService
{
    private readonly IValidator<CreateUserDto> _validator;

    public UserService(IValidator<CreateUserDto> validator)
    {
        _validator = validator;
    }

    public async Task CreateAsync(CreateUserDto userDto)
    {
        var result = await _validator.ValidateAsync(userDto);

        if (!result.IsValid)
            throw new ValidationException(result.Errors);

        // Continúa con la lógica de creación del usuario...
    }
}

```

##### 6.2.2.2 Manejo de errores
- Se puede personalizar la respuesta de errores validando manualmente o usando un middleware. Por defecto, __[ApiController]__ devuelve un __ValidationProblemDetails__ con los errores de modelo.

```json
{
  "errors": {
    "Email": [
      "El email es obligatorio",
      "El email no tiene un formato válido"
    ]
  },
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "One or more validation errors occurred.",
  "status": 400,
  "traceId": "|abc123..."
}
```

##### 6.2.2.3 Manejo de errores personalizado con Middleware
- Es muy útil si no se está usando [ApiController] o si se desea un control completo sobre la estructura de los errores.

- Si el controlador ya tiene [ApiController], ASP.NET Core ya maneja las validaciones automáticas y lanza el mismo tipo de respuesta ValidationProblemDetails. Pero con este middleware se puede:
    - Personalizar aún más el formato de respuesta.
    - Capturar errores fuera del contexto de los controladores (por ejemplo, desde los servicios).
    - Unificar errores técnicos y de validación en un solo lugar.

1. Crear clase de expeción custom (opcional).
   1. Útil si se quiere encapsular datos de error personalizados.

```c#
// Application/Exceptions/AppException.cs
public class AppException(int statusCode, string message, string? details = null)
{
    public int StatusCode { get; set; } = statusCode;
    public string Message { get; set; } = message;
    public string? Details { get; set; } = details;
}
```

2. Crear Middleware

```c#
// API/Middleware/ExceptionMiddleware.cs
using System.Text.Json;
using FluentValidation;
using Microsoft.AspNetCore.Mvc;

public class ExceptionMiddleware(ILogger<ExceptionMiddleware> logger, IHostEnvironment env) : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            await next(context);
        }
        catch (ValidationException ex)
        {
            await HandleValidationException(context, ex);
        }
        catch (Exception ex)
        {
            await HandleException(context, ex);
        }
    }

    private async Task HandleValidationException(HttpContext context, ValidationException ex)
    {
        var errors = new Dictionary<string, string[]>();

        foreach (var error in ex.Errors)
        {
            if (errors.TryGetValue(error.PropertyName, out var existing))
            {
                errors[error.PropertyName] = [.. existing, error.ErrorMessage];
            }
            else
            {
                errors[error.PropertyName] = [error.ErrorMessage];
            }
        }

        var validationProblem = new ValidationProblemDetails(errors)
        {
            Status = StatusCodes.Status400BadRequest,
            Title = "Validation Error",
            Type = "https://tools.ietf.org/html/rfc7231#section-6.5.1",
            Detail = "One or more validation errors occurred."
        };

        context.Response.StatusCode = StatusCodes.Status400BadRequest;
        await context.Response.WriteAsJsonAsync(validationProblem);
    }

    private async Task HandleException(HttpContext context, Exception ex)
    {
        logger.LogError(ex, ex.Message);

        var response = env.IsDevelopment()
            ? new AppException(StatusCodes.Status500InternalServerError, ex.Message, ex.StackTrace)
            : new AppException(StatusCodes.Status500InternalServerError, "Server error");

        context.Response.ContentType = "application/json";
        context.Response.StatusCode = StatusCodes.Status500InternalServerError;

        var options = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };
        var json = JsonSerializer.Serialize(response, options);
        await context.Response.WriteAsync(json);
    }
}
```

3. Registrar Middleware.
__Registrar el servicio:__
```bash
builder.Services.AddTransient<ExceptionMiddleware>();
```

__Agregarlo al pipeline (debe ir al principio)__
```bash
app.UseMiddleware<ExceptionMiddleware>();
```

- Ejemplo de resultado.

```json
POST /api/users

Body:
{
  "email": "",
  "age": 17
}

Response:
400 Bad Request
Content-Type: application/json

{
  "type": "https://tools.ietf.org/html/rfc7231#section-6.5.1",
  "title": "Validation Error",
  "status": 400,
  "detail": "One or more validation errors occurred.",
  "errors": {
    "Email": [ "El email es obligatorio" ],
    "Age": [ "La edad debe estar entre 18 y 100 años" ]
  }
}
```

## 7. Extras
### 7.1 SignalR
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


### 7.2 Microsoft.Extensions.Options
- Este paquete forma parte del ecosistema de configuración de .NET, y permite vincular secciones del archivo appsettings.json a clases fuertemente tipadas (como AppDbSettings). Es decir:
    - En lugar de andar leyendo Configuration["DatabaseSettings:ConnectionString"] usas una clase como AppDbSettings que automáticamente se llena con los valores de appsettings.json.

#### Ejemplo de uso

```json
"DatabaseSettings": {
  "ConnectionString": "mongodb://localhost:27017",
  "DatabaseName": "MiSuperBase"
}
```

- Clase

```c#
public class AppDbSettings
{
    public string ConnectionString { get; set; }
    public string DatabaseName { get; set; }
}

```

- Cuando usas el sistema de configuración de .NET y haces:

```c#
services.Configure<AppDbSettings>(Configuration.GetSection("DatabaseSettings"));
```

- .NET guarda esa configuración internamente y te la inyecta donde la necesites, pero a través de IOptions<T>. Entonces cuando se hace lo siguiente, se está pidiendo una instancia ya configurada de AppDbSettings.

```c#
public AppDbContext(IOptions<AppDbSettings> settings)
```

- Se accede al valor por medio de:

```c#
settings.Value.ConnectionString
```

#### Ventajas
1. Fuertemente tipado.
2. Validación automática (si se requiere añadirla con lo siguiente por ejemplo).

```c#
services.Configure<AppDbSettings>().ValidateDataAnnotations()
```

3. Separación clara de configuración y lógica de negocio
    - AppDbContext no se preocupa de dónde viene la conexión, solo sabe que AppDbSettings ya tiene los datos correctos.

4. Cambio de configuración según entorno
    - En producción se puede tener un appsettings.Production.json y .NET lo tomará sin que muevas nada en el código.

#### Ejemplo sin su uso
```c#
public AppDbContext(string connectionString, string databaseName)
```

- Obliga a inyectar manualmente dos valores, y se pierde:
    - La validación de configuración
    - El tipado centralizado
    - La consistencia al cambiar los valores en todos lados

- Además, si mañana se decide cambiar a SQL Server, PostgreSQL, o Cosmos DB, solo se cambia una sección del JSON y listo.

#### TL;DR
- Microsoft.Extensions.Options permite vincular configuraciones desde appsettings.json a clases.
- IOptions<AppDbSettings> da acceso a esa configuración lista para usarse.
- Es limpio, escalable y la forma moderna de configurar en .NET Core y superior.

### 7.3 Dar de alta servicios en Program.cs
#### 7.3.1 Alta de clases genéricas
- Se toma de ejemplo la clase [5.3 ServiceHelper](#53-servicehelper). 

```c#
builder.Services.AddScoped(typeof(ServiceHelper<>));
```
- ¿Por qué typeof(ServiceHelper<>) y no ServiceHelper<Algo>?
    - Porque se está registrando la clase genérica abierta ServiceHelper<T>, no una implementación concreta todavía. Eso significa que:
    - Cada vez que algún servicio solicite un ServiceHelper<MiServicio>, el contenedor sabrá cómo construirlo automáticamente.

- Si no se usara __typeof()__ se tendría que registrar de forma manual cada versión concreta.

```c#
builder.Services.AddScoped<ServiceHelper<ProductsService>>();
builder.Services.AddScoped<ServiceHelper<ReviewsService>>();
```

##### Ejemplo
```c#
public class ProductsService(AppDbContext dbContext, ..., ServiceHelper<ProductsService> serviceHelper)
```

- Entonces, cuando .NET vea que ProductsService necesita un ServiceHelper<ProductsService>, como ya se registró ServiceHelper<>, el sistema genera una instancia de ServiceHelper<ProductsService> automáticamente y la inyecta. Como es Scoped, se crea una por cada request HTTP.

##### TL;DR
- AddScoped(typeof(ServiceHelper<>)) es una manera genérica de decir:
    - “Cuando alguien pida ServiceHelper<LoQueSea>, crea uno automáticamente”.
- Se usa typeof(...) porque se está registrando un tipo genérico abierto.
- Scoped: una instancia por request HTTP.


### 7.4 Inyección de interfaces en lugar de implementación
- Se tiene el ejemplo de la implementación (realizada en Infrastructure) de la interfaz IPhotoService (la cual se definió en Application).
  - Al inyectar en __Program.cs__ se tiene de la siguiente manera:

```c#
builder.Services.AddScoped<IPhotoService, PhotoService>();
```

- En el servicio se inyecta usando la interfaz:

```c#
public class UserService(
    AppDbContext dbContext,
    IOptions<AppDbSettings> settings,
    ServiceHelper<UserService> serviceHelper,
    IPhotoService photoService
)
```

#### ¿Por qué se debe usar la interfaz y no la implementación?
- Principio de inversión de dependencias (Dependency Inversion Principle - DIP), parte de los principios SOLID

#### Ventajas de usar la interfaz
1. Testeabilidad.
   1. Se pueden hacer mocks de IPhotoService en las pruebas unitarias.

```c#
var mockPhotoService = new Mock<IPhotoService>();
mockPhotoService.Setup(x => x.DeletePhotoAsync(It.IsAny<string>()))
                .ReturnsAsync(Result<bool>.Success(true));

```

2. Flexibilidad y extensibilidad.
   1. Si en un futuro debe cambiarse a otro servicio (ejemplo: cloudinary a s3), solo debe actualizarse la inyección en Program.cs:

```c#
builder.Services.AddScoped<IPhotoService, S3PhotoService>();
```

3. Claridad de responsabilidades.
    1. El servicio en donde se inyecta no debe saber cómo funciona la implementación, solo le interesa que haga su función.
    2. Esto reduce el acoplamiento, y facilita la lectura, mantenimiento y refactorización del código.
4. Reutilización.
   1. Si otra clase debe trabajar con la función de la interfaz (fotos en este caso), se puede usar la interfaz sin tener que duplicar lógica ni crear un God Service.


#### Desventajas de inyectar la implementación
##### Se rompe el principio de inversión de dependencias.
- Más información sobre el principio en el aparato [7.5.5 Principio de inversión de dependencias](#755-principio-de-inversión-de-dependencias).
- UserService es un módulo de alto nivel. PhotoService es de bajo nivel (es el que “hace cosas”). Si UserService depende de la implementación concreta, se está rompiendo la independencia.
- Esto hace a una arquitectura frágil.
- 
##### Dificulta los tests.
1. Se tienen que instanciar la clase en los tests, lo cual puede requerir muchas dependencias.
2. No permite simular comportamientos fácilmente.
3. No se puede verificar llamadas o validar que se ejecutaron métodos esperados.

##### Aumenta el acomplamiento.
1. Es el grado de dependencia entre componentes del software.
2. Cuando una clase depende directamente de otra clase concreta, se dice que hay un acomplamiento fuerte.
3. si se desea cambiar la implementación, se tienen que tocar en todas las clases que la usaban.
4. Se rompe el principio de diseño __programa contra interfaces, no implementaciones__.
5. Hace más difícil la reutilización de componentes en otros contextos.


### 7.5 SOLID
#### 7.5.5 Principio de inversión de dependencias (Dependency Inversion Principle DIP)
"Los módulos de alto nivel no deberían depender de módulos de bajo nivel. Ambos deberían depender de abstracciones."

También

"Las abstracciones no deben depender de los detalles. Los detalles deben depender de las abstracciones"

- Este principio resuelve acomplamientos altos entre mòdulos de alto nivel y módulos de bajo nivel.

```c#
public interface IPhotoService
{
    Task<string> UploadPhotoAsync(Stream file);
}
```

```c#
public class PhotoService : IPhotoService
{
    public Task<string> UploadPhotoAsync(Stream file)
    {
        // implementación concreta
    }
}
```

```c#
// UserService ya no depende del detalle, sino de la abstracción
public class UserService
{
    private readonly IPhotoService _photoService;

    public UserService(IPhotoService photoService)
    {
        _photoService = photoService;
    }

    public async Task<string> UpdatePhoto(Stream file)
    {
        return await _photoService.UploadPhotoAsync(file);
    }
}
```

- Y en Program.cs

```c#
builder.Services.AddScoped<IPhotoService, PhotoService>();
```

##### Módulo de alto nivel
- Orquestra la lógica de negocio.
- Toma decisiones, coordina acciones.
- Ejemplos:
  - UserService (servicios en una aplicación ASP.NET Core).
  - OrderManager.
  - PaymentProcessor.

##### Módulo de bajo nivel
- Es el que hace el trabajo específico o concreto.
- Interactúa con APIs, bases de datos, archivos, etc.
- Ejemplos:
  - PhotoService.
  - SqlUserRepository.
  - CloudStorageClient.

##### Qué es una abstracción
- Una interfaz o clase base que define lo que se puede hacer, sin importar cómo lo hace.
- Por ejemplo: IPhotoService define UploadPhotoAsync, pero no le importa si se usa Cloudinary, S3 o USB.

##### Analogía
- Se imagina que se tiene un restaurante (UserService) y se requiere comprar verduras frescas todos los días.
  - ❌ Sin inversión de dependencias:
    - El restaurante depende directamente de un solor proveedor (PhotoService). Si el proveedor queda ausente, el negocio se ve afectado.
  - ✅ Con inversión de dependencias
    - Se pide la verdura por medio de una agencia (IPhotoService).
    - La agencia se encarga de que el proveedor cumpla el contrato. En caso de que el proveedor falle, se busca a alguien más para que el cliente (el restaurante) opere sin problemas.

##### Usos en la vida real
- Cambiar base de datos sin reescribir toda la app.
- Se pueden hacer pruebas unitarios con __Mock<IPhotoService>__ en lugar de dependenr de servicios reales.
- Se puede tener múltiples implementaciones para diferentes entornos y necesidades.

##### TL;DR
| Concepto                  | Significado                                                               |
| ------------------------- | ------------------------------------------------------------------------- |
| Módulo de alto nivel      | Orquesta lógica (UserService, OrderService)                               |
| Módulo de bajo nivel      | Ejecuta tareas concretas (PhotoService, FileStorage, EmailSender)         |
| Abstracción               | Interfaz o clase base (`IPhotoService`)                                   |
| Inversión de dependencias | Hacer que ambos dependan de la **interfaz**, no uno del otro directamente |

### 7.6 ASP.NET Core
#### 7.6.1 Controladores
- En ASP.NET Core, un controlador es una clase que responde a solicitudes HTTP. Normalmente representa un recurso de API: usuarios, productos, mensajes, etc.

```c#
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    [HttpGet]
    public ActionResult<List<UserDto>> GetAll() => _userService.GetUsers();
}
```

- Ciclo de vida de una petición.
  1. 🌐 Llega una petición HTTP a /api/users/1.
  2. 🚦 ASP.NET Core la enruta con ayuda de los [Route] y [Http...].
  3. 🧠 Encuentra el controlador correcto (e.g. UsersController).
  4. 🧮 Llama al método decorado (por ejemplo, [HttpGet("{id}")]).
  5. 🗃️ Tu método ejecuta lógica, posiblemente accediendo a la base de datos.
  6. 📨 Devuelves un ActionResult<T> (200 OK, 404, etc.).
  7. 💡 ASP.NET convierte todo a una respuesta HTTP (headers + JSON).
  8. 📤 Se envía la respuesta al cliente (Postman, navegador, app frontend...).

##### 7.6.1.1 ControllerBase
- En ASP.NET Core, cuando se crea una API, los controladores generalmente heredan de la clase __ControllerBase__.
- Es una base para los controladores de APIs REST.
- A diferencia de Controller, ControllerBase es más ligero y enfocado en APIs.
  - Controller incluye funcionalidad para vistas Razor, como View(), RedirectToAction(), etc.

Entonces
| Clase base       | Uso recomendado           |
| ---------------- | ------------------------- |
| `ControllerBase` | APIs REST                 |
| `Controller`     | Aplicaciones MVC (vistas) |


- Proporciona métodos y propiedades útiles como:
  - Ok(), NotFound(), BadRequest(), Created(), etc.
    - ControllerBase da la comidad de invocar ActionResult fàcilmente con los métodos mencionados.
  - __ModelState__ para validaciones.
  - __User__ para infor del usuario autenticado.
  - Request, Response, etc.

```c#
[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    [HttpGet("{id}")]
    public ActionResult<UserDto> GetUser(string id)
    {
        // lógica aquí...
    }
}
```



##### 7.6.1.2 ActionResult<T>
- Viene del namespace __Microsoft.AspNetCore.Mvc__, y se puede usar en cualquier clase aunque no se herede de ControllerBase.
- Es una clase concreta que implementa IActionResult.
  - Permite hacer lo siguiente:
    - Devikver una respuesta común como Ok(), BadRequest(), etc.
    - Devolver directamente un objeto que será convertido en JSON.
- ActionResult es un poco más flexible que IActionResult.
  - Puede devolver lo que sea, siempre y cuando sea algo serializable o una repsuesta válida del servidor.
- Es el más modero. Es un tipo genérico que:
  - Indica que le método normalmente retorna un tipo específico T.
  - Pero también puede retornar cualquier coma que implemente IActionResult, tal como un error HTTP.
- Es un tipo de retorno que representa una respuesta HTTP válida.
  - Por ejemplo: 200 OK, 404 Not Found, 500 Internal Server Error, etc.
- Es una forma de decir:
  - Este método retorna un objeto de tipo T o un resultado acción (como NotFound, BadRequest, etc.)

```c#
[HttpGet("{id}")]
public ActionResult<UserDto> GetUser(string id)
{
    var user = FindUserById(id);

    if (user == null)
        return NotFound("No se encontró al usuario");

    return Ok(user);
}
```

- ⚠️ ¿Y qué pasa si no usas ActionResult?
  - Si solo se devuelve UserDto, el controlador siempre devuelve 200 OK, incluso si se quiere devolver un error. Con ActionResult<T> se tiene control sobre la respuesta HTTP.

- ¿Cuál uso y cuándo usar ActionResult y IActionResult?
| Escenario                             | Recomendación                       |
| ------------------------------------- | ----------------------------------- |
| Solo devolver códigos de estado HTTP  | `IActionResult`                     |
| Quieres devolver un objeto o un error | `ActionResult<T>` ✅ Moderno y claro |
| Respuesta mixta sin indicar tipo      | `ActionResult`                      |


###### Comparación de ActionResult usando ControllerBase y sin su uso
- Con ControllerBase.

```c#
public class UsersController : ControllerBase
{
    [HttpGet("{id}")]
    public ActionResult<UserDto> GetUser(string id)
    {
        var user = _userService.FindById(id);
        if (user == null) return NotFound();
        return Ok(user); // ← Helper que devuelve ActionResult<UserDto>
    }
}
```

- Sin ControllerBase.

```c#
public class UglyController
{
    [HttpGet("{id}")]
    public IActionResult GetUser(string id)
    {
        var result = new ObjectResult(new { message = "No controller magic" })
        {
            StatusCode = 200
        };
        return result;
    }
}
```


##### 7.6.1.3 IActionResult<T>
- Es una interfaz que define el contrato para cualquier tipo de respuesta que un controlador puede devolver.
- Cualquier cosa que implemente IActionResult puede ser devuelta por un endpoint.

```c#
[HttpGet]
public IActionResult Get()
{
    return Ok("Hola Arturo");
}
```

- Acá Ok() devuelve un __OkObjectResult__, que implementa IActionResult.
  - Entonces, este método puede devolver Ok(), BadRequest(), NotFound(), etc.
  - Todlo lo que sea resultado HTTP lo cubre IActionResult.

##### 7.6.1.4 Task<ActionResult<T>>
- Task<> indica que el método es asíncrono.
- Los métodos asíncronos ayudan a que el servidor pueda:
  - Manejar varias peticiones simultáneamente.
  - No bloquear hilos mientras espera una consulta a base de datos, API externa, etc.

```c#
public async Task<ActionResult<UserDto>> GetUser(string id)
```

- Lo anterior significa:
  - Este método será ejecutado de forma asíncrona y eventualmente devolverá una respuesta HTTP que contiene un UserDto o algún tipo de resultado de error.
- Por convención en ASP.NET Core:
  - Si se usa async, se debe retornar Task<T>.
  - Si es síncrono, solo ActionResult<T>.

##### 7.6.1.5 TL;DR
| Elemento                | Qué es                                                     |
| ----------------------- | ---------------------------------------------------------- |
| `ControllerBase`        | Clase base para APIs, con helpers HTTP (`Ok()`, etc.)      |
| `ActionResult<T>`       | Resultado que puede ser un objeto **o** un código de error |
| `Task<ActionResult<T>>` | Resultado asíncrono que puede ser objeto o código HTTP     |
| `Ok()`, `NotFound()`    | Métodos helper para devolver códigos HTTP estándar         |
| `async/await`           | Permiten manejar operaciones no bloqueantes (como BD/API)  |

#### 7.6.2 Middlewares
- Una middleware es una pieza del pipeline HTTP que procesa peticiones y/o respuestas.
- Una middleware puede decidir:
  - Pasar la petición al siguiente middleware.
  - Deneter el proceso y devolver una respuesta.
  - Hacer algo antes o después de que las demás se procesen.

```
-> [Middleware A] -> [Middleware B] -> [Middleware C] -> Controlador
                                   <-    <-    <-
```

- Cada middleware puede actuar en la ida o en el regreso de la petición.
- Se configuran en __Program.css__.

```c#
var app = builder.Build();

app.UseHttpsRedirection();     // Middleware que fuerza HTTPS
app.UseAuthentication();       // Middleware para autenticar tokens
app.UseAuthorization();        // Middleware para validar roles/políticas
app.UseMiddleware<LoggingMiddleware>(); // Middleware personalizado

app.MapControllers();          // ¡Hasta aquí llegan las peticiones!
```

##### 7.6.2.1 Ejemplo: Creación de middleware personalizada
1. Crear una clase middleware.

```c#
public class LoggingMiddleware
{
    private readonly RequestDelegate _next;

    public LoggingMiddleware(RequestDelegate next)
    {
        _next = next;
    }

    public async Task Invoke(HttpContext context)
    {
        Console.WriteLine($"[{DateTime.Now}] Request: {context.Request.Method} {context.Request.Path}");

        await _next(context); // ⬅️ Muy importante: pasa la petición al siguiente middleware

        Console.WriteLine($"[{DateTime.Now}] Response: {context.Response.StatusCode}");
    }
}
```

2. Registrarla en Program.cs.

```c#
app.UseMiddleware<LoggingMiddleware>();
```

##### 7.6.2.2 Use, Usewhen, Run
- Use ➝ pasa al siguiente middleware si se llama next()
- Run ➝ termina la tubería, no hay "siguiente"
- UseWhen ➝ ejecuta middleware solo si se cumple una condición.

```c#
app.UseWhen(context => context.Request.Path.StartsWithSegments("/admin"),
    adminApp =>
    {
        adminApp.UseMiddleware<AdminLoggingMiddleware>();
    });
```

##### 7.6.2.3 Ejemplos de middlewares comunes en ASP.NET Core:
| Middleware            | Propósito                                     |
| --------------------- | --------------------------------------------- |
| `UseHttpsRedirection` | Redirige HTTP ➜ HTTPS                         |
| `UseAuthentication`   | Procesa el JWT o cookie                       |
| `UseAuthorization`    | Revisa si el usuario tiene permisos           |
| `UseCors`             | Maneja políticas CORS                         |
| `UseExceptionHandler` | Manejador global de errores                   |
| `UseStaticFiles`      | Sirve archivos estáticos (imágenes, JS, etc.) |

#### 7.6.3 Filtros y validaciones
##### 7.6.3.1 Filtros
- Son componentes que se ejecuten antes o después de ciertas etapas del ciclo de vida de una acción del controlador.
- Se pueden pensar como hooks que interceptan la ejecuciòn para hacer algo adicional como:
  - Validar modelo.
  - Manejar excepciones.
  - Registrar logs.
  - Modificar la respuesta.

###### 7.6.3.1.1 Tipos de filtros
| Tipo                    | ¿Cuándo se ejecuta?                                            |
| ----------------------- | -------------------------------------------------------------- |
| **AuthorizationFilter** | Antes de todo (decide si alguien puede entrar)                 |
| **ResourceFilter**      | Antes y después de leer el cuerpo del request                  |
| **ActionFilter**        | Antes y después de ejecutar la acción del controlador          |
| **ExceptionFilter**     | Si se lanza una excepción durante la acción                    |
| **ResultFilter**        | Antes y después de enviar el resultado (como una vista o JSON) |

###### 7.6.3.1.2 Ejemplo: Action Filter personalizado
- Se tiene como ejemplo que se desea medir cuánto tiempo toma cada acción del controlador.

```c#
public class TimingActionFilter : IActionFilter
{
    private Stopwatch _stopwatch = new();

    public void OnActionExecuting(ActionExecutingContext context)
    {
        _stopwatch.Start();
    }

    public void OnActionExecuted(ActionExecutedContext context)
    {
        _stopwatch.Stop();
        Console.WriteLine($"⏱ Acción ejecutada en {_stopwatch.ElapsedMilliseconds} ms");
    }
}
```

- Se registra de la siguiente forma:

__Program.cs__
```c#
builder.Services.AddScoped<TimingActionFilter>();
```

```c#
[ServiceFilter(typeof(TimingActionFilter))]
public class UsersController : ControllerBase
{
    // tus acciones aquí
}
```

- De igual forma, se puede aplicar de forma global en Program.cs con:

```c#
builder.Services.AddControllers(options =>
{
    options.Filters.Add<TimingActionFilter>();
});
```

###### ServiceFilter
- Indica que se desea buscar una instancia del filtro especificado para poder usarse. La instancia la busca en el contenedor de dependencias (DI).
- Permite inyectar dependencias de un filtro.

```c#
[ServiceFilter(typeof(TimingActionFilter))]
public class UsersController : ControllerBase
{
    // tus acciones aquí
}
```

###### TypeFilter
- Alternativa de ServiceFilter.
- Además de hacer lo mismo que ServiceFilter también permite pasar parámetros manualmente al constructor del filtro.

```c#
[TypeFilter(typeof(MyFilter), Arguments = new object[] { "valor" })]
```

- Otra opción más válida es aplicar el filtro como clase sin usar DI.
  - No se recomienda ya que se pierde el beneficio de DI.

```c#
[MyFilter] // si no necesitas inyecciones
```

###### Resumen
| Elemento               | ¿Qué hace?                                                |
| ---------------------- | --------------------------------------------------------- |
| `ServiceFilter`        | Usa una clase registrada en DI para aplicarla como filtro |
| `typeof(...)`          | Especifica el tipo de clase que ASP.NET debe buscar       |
| `[ServiceFilter(...)]` | Aplica ese filtro a un controlador o acción               |

###### 7.6.3.2 Validaciones del modelo con [ApiController]
- Cuando un controlador hereda de ControllerBase y se usa el atributo [ApiController], se obtiene validación automática del modelo.
- Si el __ModelState__ no es válido, ASP.NET Core retorna automáticamente un 400 Bad Request.

```c#
public class UserDto
{
    [Required]
    public string Name { get; set; }

    [EmailAddress]
    public string Email { get; set; }
}

[HttpPost]
public IActionResult CreateUser(UserDto userDto)
{
    // No necesitas hacer esto:
    // if (!ModelState.IsValid) return BadRequest(ModelState);

    return Ok("Usuario creado");
}
```


- Para validaciones más complejas se puede usar FluentValidation, el cual se aborda con más detalle en el apartado: [6.2 Fluent Validation](#62-fluent-validation).

```c#
public class UserDtoValidator : AbstractValidator<UserDto>
{
    public UserDtoValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("El nombre es obligatorio");

        RuleFor(x => x.Email)
            .EmailAddress().WithMessage("El correo no es válido");
    }
}
```

- Se registran los validadores de la siguiente forma:

```c#
builder.Services.AddFluentValidationAutoValidation()
                .AddFluentValidationClientsideAdapters()
                .AddValidatorsFromAssemblyContaining<UserDtoValidator>();
```

### 7.7 C#
#### 7.7.1 Listas
- Declaración.

```c#
var nombres = new List<string> { "Ana", "Luis", "Carlos" };
```

- Iteración.

```c#
// Clásico foreach
foreach (var nombre in nombres)
{
    Console.WriteLine(nombre);
}

// Alternativamente, usando for si necesitas el índice
for (int i = 0; i < nombres.Count; i++)
{
    Console.WriteLine(nombres[i]);
}
```

#### 7.7.2 Switch moderno
```c#
string rol = "admin";

switch (rol)
{
    case "admin":
        Console.WriteLine("Tiene acceso total.");
        break;
    case "user":
        Console.WriteLine("Acceso limitado.");
        break;
    default:
        Console.WriteLine("Rol no reconocido.");
        break;
}

```

- Versión C# 8+:

```c#
string rol = "admin";

switch (rol)
{
    case "admin":
        Console.WriteLine("Tiene acceso total.");
        break;
    case "user":
        Console.WriteLine("Acceso limitado.");
        break;
    default:
        Console.WriteLine("Rol no reconocido.");
        break;
}
```

#### 7.7.3 Dicccionario
- Definición

```c#
var edades = new Dictionary<string, int>
{
    { "Ana", 28 },
    { "Luis", 35 },
    { "Carlos", 42 }
};
```

##### Add(key, value)
```c#
edades.Add("Sofía", 30);
```

- Lanza excepción si la llave ya existe.

##### Remove(key, value)
```c#
edades.Remove("Luis"); // true si lo eliminó, false si no existía
```

##### ContainsKey(key) y ContainsValue(value)
```c#
edades.ContainsKey("Ana");     // true
edades.ContainsValue(35);      // true
```

##### TryGetValue(key, out value)
```c#
if (edades.TryGetValue("Carlos", out int edadCarlos))
{
    Console.WriteLine($"Carlos tiene {edadCarlos} años.");
}
else
{
    Console.WriteLine("Carlos no fue encontrado.");
}
```

##### Keys y Values
```c#
foreach (var nombre in edades.Keys)
    Console.WriteLine(nombre);

foreach (var edad in edades.Values)
    Console.WriteLine(edad);
```

##### Iteración
1. Clave y valor juntos:

```c#
foreach (var kvp in edades)
{
    Console.WriteLine($"{kvp.Key} tiene {kvp.Value} años.");
}
```

- kvp significa KeyValuePair. También puedes hacer:

```c#
foreach (KeyValuePair<string, int> persona in edades)
{
    Console.WriteLine($"{persona.Key} - {persona.Value}");
}
```

##### Clear()
- Borra todas las entradas.

```c#
edades.Clear();
```

##### Sintaxis índice
```c#
edades["Sergio"] = 29; // Si no existía, lo agrega; si ya estaba, actualiza el valor
```

#### 7.7.4 Extension Methods
- Un Extension Method permite agregar métodos a tipos existente (como string, List<T>, DateTime, clases propias, etc.) sin la necesidad de heredar o modificar su código original.

- Definición de un Extension Method.
    1. Debe tener una clase estática.
    2. El método debe ser estático.
    3. El primer parámetro lleva el modificaro this y el tipo al que se quiere extender.

```c#
public static class StringExtensions
{
    public static int CountVowels(this string input)
    {
        return input.Count(c => "aeiouAEIOU".Contains(c));
    }
}
```

- Se usa de la siguiente forma:

```c#
string nombre = "Arturo";
int vocales = nombre.CountVowels();
Console.WriteLine($"Tu nombre tiene {vocales} vocales.");
```

##### Usos
- ✔️ Limpian tu código al agrupar lógica específica de un tipo.
- 🧩 Te ayudan a crear código reutilizable y elegante.
- 💬 Mejoran la legibilidad de tus expresiones (fluyen como lenguaje natural).
- 🔄 Los usa LINQ todo el tiempo (Where, Select, OrderBy... ¡todos son extensiones!)

##### Ejemplo con tipo propio
```c#
public class User
{
    public string Name { get; set; }
}
```

- Se extiende de la siguente forma:

```c#
public static class UserExtensions
{
    public static string SayHi(this User user)
    {
        return $"Hola, soy {user.Name}";
    }
}
```

- Uso:

```c#
var user = new User { Name = "Arturo" };
Console.WriteLine(user.SayHi()); // Hola, soy Arturo
```

###### Extension Methods + LINQ
```c#
.Where(x => x != null)
.Select(x => x.Propiedad)
```

- LINQ se basa en un conjunto gigante de métodos de extensión sobre IEnumerable<T>.

###### Precauciones
- No se debe abusar, ya que pueden ensuciar la API si no están bien organizados.
- Solo se debe extender lo que tiene sentido semántico para el tipo.
- Si hay una instancia de método con el mismo nombre, el método normal gana prioridad.

###### Usar extensiones en todo el proyecto
- Colocar en carpeta de Extensions/ y una clase estática bien nombrada (por ejemplo, StringExtensions.cs, etc.).
- Importar con:

```c#
using TuProyecto.Extensions;
```

#### 7.7.5 Constraints (restricciones genéricas)
- Son reglas que se colocan a los type parameters para que se comporten como se necesita. Se pueden ver como los "filtros de acceso" del sistema genérico de C#.
- Cuando se usan genéricos (T, TKey, TValue, etc.), C# no sabe de antemano qué tipo se va a usar. Los constraints permiten indica:
  - "Este tipo T solo va a funcionar si cumple ciertas condiciones".
- Esta permite:
  - Tener más seguridad en tiempo de compilación.
  - La posibilidad de usar miembros específicos del tipo (métodos, propiedades).
  - Código más limpio y mantenible.

##### Tipos de constraints
###### 1. where T : class
- Significa que T debe ser una clase de referencia (no struct, ni primitive).

```c#
public class Repository<T> where T : class
{
    public void Add(T entity)
    {
        Console.WriteLine(entity.ToString());
    }
}
```

###### 2. where T : struct
- Significa que T debe ser un tipo de valor (como int, DateTime, bool).

```c#
public class NullableWrapper<T> where T : struct
{
    public T? Value { get; set; }
}
```

###### 3. where T : new()
- Indica que T debe tener un constructor público sin parámetros, lo cual permite hacer new T() dentro del código.
  - Puede combinarse con otros constraints, pero debe ir al final.

```c#
public class Factory<T> where T : new()
{
    public T CreateInstance() => new T();
}
```

###### 4. where T : BaseClass
- Restringe T para que gerede de una clase específica o implemente un interfaz.

```c#
public class Service<T> where T : EntityBase
{
    public Guid GetId(T entity) => entity.Id;
}
```

###### 5. where T : ISomeInterface
- Solo permite tipos que implement una interfaz.

```c#
public class Logger<T> where T : ILoggable
{
    public void Log(T item) => item.Log();
}
```

###### 6. where T : notnull
- Es parte de los nullable reference types. Dice que T no puede ser null. Útil desde C# 8 para mayor seguridad.

```c#
public class SafeHolder<T> where T : notnull
{
    public T Value { get; }
    public SafeHolder(T value) => Value = value;
}
```

###### 7. Múltiples restricciones
- Se puede combinar por comas.

```c#
public class Processor<T>
    where T : class, ISomeInterface, new()
{
    public T CreateAndUse()
    {
        var instance = new T();
        instance.DoSomething();
        return instance;
    }
}
```

###### Uso común
- En repositorios genéricos (Repository<T>)
- En factories (new() constructor)
- En lógica reusable donde se necesita que T tenga propiedades comunes
- En behaviors (como viste en ValidationBehavior<TRequest, TResponse>). [https://github.com/House197/NET/blob/main/Udemy/NETCore-React/10.ValidationErrors.md](Link de documentación).

###### Qué pasa si no se usan constraints
- se pueden teminar con errores en tiempo de ejecución:

```c#
public void DoSomething<T>(T input)
{
    var x = input.ToJson(); // 🚨 Error: C# no sabe si T tiene ese método
}
```

- Pero con constraints:

```c#
public void DoSomething<T>(T input) where T : ISerializable
{
    var x = input.ToJson(); // ✅ Ok, ya sabe que T tiene ese método
}
```



## Temas pendientes por documentar
- EntityFrameworkRelationShips
- Autenticación por cookies
- Configuración de Identity
- Cloudinary

### Shopping Cart
- Documentar la creación de Enum para las reacciones. Para esto se crearon convenciones para que los valores se guarden con la primera letra en minúscula.
- Agregar configuración en Program.cs para indicar que los demás campos del documento para cada entidad se ignoren si no están definidas en la entidad.


https://github.com/TryCatchLearn/Reactivities/blob/main/Application/Activities/Queries/GetActivityDetails.cs