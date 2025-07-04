# Indice
- [Indice](#indice)
  - [1. Preparación de entorno de desarrollo](#1-preparación-de-entorno-de-desarrollo)
    - [1.1 Instalación de programas](#11-instalación-de-programas)
    - [1.2 Extensiones VS Code](#12-extensiones-vs-code)
    - [1.3 GIT](#13-git)
      - [1.3.1 Git Log - Configuración de alias](#131-git-log---configuración-de-alias)
  - [2. Esqueleto .NET API](#2-esqueleto-net-api)
    - [2.1 Preparación de proyectos y referencias](#21-preparación-de-proyectos-y-referencias)
    - [2.2 Ejecución de proyecto](#22-ejecución-de-proyecto)
    - [2.3 Configuración de launchSettings.json](#23-configuración-de-launchsettingsjson)




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
