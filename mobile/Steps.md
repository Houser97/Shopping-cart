# What is APS.NET Core?
- Cross-platform, high performance, and open source.
    - It can run in Windows, Linux and Docker.
- Built- in support for building Web APIs.
- Tools to handle all aspects with minimal effort.

# Paso 0. Instalación de SDK en Linux.
- https://learn.microsoft.com/en-us/dotnet/core/install/linux-scripted-manual#scripted-install

- Se debe tener cerrado VS Code para poder instalar, de lo contrario el path del SDK no podrá ser encontrado.

``` sh
wget https://dot.net/v1/dotnet-install.sh -O dotnet-install.sh
```

``` sh
chmod +x ./dotnet-install.sh
```

``` sh
./dotnet-install.sh
```

## Set environment variables system-wide
- Se corren los siguientes comandos desde el root de la consola.

``` bash
export DOTNET_ROOT=$HOME/.dotnet
```

``` bash
export PATH=$PATH:$DOTNET_ROOT:$DOTNET_ROOT/tools
```

- Al siguiente día después de apagar la compu ya no se encontraba el SDK de .NET, por lo que se tuvo que volver a exportar la variable path de la siguiente manera:

``` bash
export PATH=$PATH:/home/houser/.dotnet
```

## Desinstalar SDK (En caso de haberlo instalado con VS Code abierto)
https://learn.microsoft.com/en-us/dotnet/core/install/remove-runtime-sdk-versions?pivots=os-linux

``` bash
sudo rm -rf /home/houser/.dotnet/sdk/8.0.101 
```

# Paso 1. Instalación de extensiones en VS Code.
- C# Dev Kit
- NuGet Gallery (Se abre por medio de CTRL + SHIFT + p y escribri NuGet)

# Paso 2. Creación de proyecto
## Opción 1. Comando
``` sh
dotnet new webapi -o api
```
## Opción 3. Creación desde VS Code
1. Se presiona CTRL + SHIFT + p.
2. Se escribe .NET Create Proyect en el input emergente y se selecciona.
3. Se tiene la opción de minimal API y full API, en donde debido a que se tienen diferentes modelos y controladores se prefiere el uso de full API.
    - Seleccionar opción ASP.NET Core Empty para minimal API.
    - Seleccionar opción ASP.NET Core Web API

# Paso 3. Colocar archivos a ignorar en .gitignore.
https://www.toptal.com/developers/gitignore/api/aspnetcore

# Paso 4. Instalar dependencias
## MongoDB
``` bash
dotnet add package MongoDB.Driver
```
## DotEnv.env
``` bash
dotnet add package dotenv.net
```

# Paso 5. Configuración de MongoDB Atlas
1. En el apartado de Overview del cluster deseado se oprime el botón connect.
2. Se selecciona la opción de Drivers.
3. Se escoge la opción de C#/.NET, con una versión 2.13 o superior.
4. Se obtiene la connection string.
5. Se descarga la dependencia de MongoDB por medio de NuGet o el siguiente comando:

```bash
dotnet add package MongoDB.Driver
```

# Paso 6. Creación de archivo .env
1. Se debe tener instalado el paquete dotenv.env.
``` bash
dotnet add package dotenv.net
```
2. Se crea el archivo .env.
3. Se colocan las variables de entorno.
    - Con las variables de entorno se usa __ para Linux, y : para Windows: Env:Variable, Env__Variable.
    - NOTA: Colocar el nombre como siempre se ha hecho con otros proyectos, ya que el uso de __ hace que no se reconozca la variable de entorno al quererla recuperar.
3. En Program.cs se coloca lo siguiente para poder usar las variables de entorno.

``` C#
using dotenv.net;
using MongoDB.Driver;
using server.Models;

DotEnv.Load();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var configuration = new ConfigurationBuilder().AddEnvironmentVariables().Build();

```

# Paso 7. Creación del modelo de la base de datos.
- En este modelo se pueden colocar los settings de la base de datos, tales como DatabaseName y ConnectionString. Sin embargo, estos valores se obtienen directamente en Program.cs por medio de DotEnv.net para tener solo una instancia de IMongoClient en lugar de crear esa instancia para cada colección.
- Entonces, se crea la clases DatabaseCollections para tener en un solo lugar las definiciones de los nombres de las colecciones.

``` C#
namespace server.Models
{
    public record class DatabaseCollections : IDatabaseCollections
    {
        public string ReviewsCollection { get; set; } = "reviews";
        public string UsersCollection { get; set; } = "users";
        public string ProductsCollection { get; set; } = "products";
    }

    public interface IDatabaseCollections
    {
        public string ReviewsCollection { get; set; }
        public string UsersCollection { get; set; }
        public string ProductsCollection { get; set; }
    }
}
```

# Paso 8. Obtener MongoClient en Program.cs
- A partir de las variables de entorno se obtiene el cliente de mongo, el cual provee de la instancia de la base de datos que se usará para los Services para efectuar las operaciones contra la base de datos.
- El siguiente código se coloca antes de obtener la instancia de app.
- La instancia de base de datos que se obtiene del cliente se registra como servicio en la aplicación.

``` C#
// Configure MongoDB connection
var mongoClient = new MongoClient(configuration["ConnectionString"]);
var databaseName = configuration["DatabasetName"];
var database = mongoClient.GetDatabase(databaseName);

// Register MongoDB database instance as a service
builder.Services.AddSingleton<IMongoDatabase>(database);
```

# Paso 9. Creación de modelos (Reviews)
1. Crear carpeta Models.
2. Crear archivo Review.cs.
3. Definir modelo usando elementos de MongoDB.
4. Ignotar __v, la cual viene de mongoose para indicar cuántas veces se ha actualizado un documento (está presente debido a que anteriormente se había trabajado con un servidor de NodeJS).

``` C#
using MongoDB.Bson.Serialization.Attributes;

namespace server.Models
{
    public record class Review
    {
        [BsonId]
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        public string Id { get; init; } = String.Empty;
        [BsonRepresentation(MongoDB.Bson.BsonType.ObjectId)]
        [BsonElement("author")]
        public string Author { get; init; } = String.Empty;
        [BsonElement("item")]
        public int Item { get; set; }
        [BsonElement("rating")]
        public int Rating { get; set; }
        [BsonElement("likes")]
        public List<string> Likes { get; init; } = [];
        [BsonElement("dislikes")]
        public List<string> Dislikes { get; init; } = [];
        [BsonElement("date")]
        public DateTime Date { get; init; }
        [BsonElement("comment")]
        public string Comment { get; init; } = String.Empty;
        [BsonIgnoreIfDefault]
        [BsonElement("__v")]
        public int? VersionKey { get; set; }
    }
}
```

# Paso 10. Creación de Servicios (ReviewsService)
Así como un repositorio, contendrá la lógica relacionada a la base de datos.

1. Crear carpeta de Services.
2. Crear archivo ReviewsService.cs
3. Crear variables privadas (_reviews).
4. Implementar inyección de dependencia para obtener las colecciones y la base de datos.
5. Definir métodos para realizar operaciones contra la base de datos.

``` C#
using MongoDB.Driver;
using server.Models;

namespace server.Services
{
    public class ReviewsService
    {
        private readonly IMongoCollection<Review> _reviews;

        public ReviewsService(IDatabaseCollections collections, IMongoDatabase database)
        {
            _reviews = database.GetCollection<Review>(collections.ReviewsCollection);
        }

        public List<Review> GetAll() => _reviews.Find(FilterDefinition<Review>.Empty).ToList();
    }
}
```

# Paso 11. Creación de controladores (ReviewsController)
1. Crear carpeta de Controllers.
2. Crear archivo ReviewsController.cs.
3. Definir ruta del controlador.
4. Definir que su uso será un Controlador API.
5. Crear variables privadas para usar servicio correspondiente.
6. Realizar inyección de dependencia para obtener el servicio correspondiente.
7. Crear controlador en conjunto con su verbo HTTP.

``` C#
using server.Services;

namespace server.Controllers
{
    [Route("api/reviews")]
    [ApiController]
    public class ReviewsController : ControllerBase
    {

        private readonly ReviewsService _reviewsService;
        public ReviewsController(ReviewsService reviewsService)
        {
            _reviewsService = reviewsService;
        }

        [HttpGet]
        public ActionResult GetReviews()
        {
            // Realiza una consulta para obtener todas las reviews
            var reviews = _reviewsService.GetAll();

            return Ok(reviews);
        }
    }
}
```

# Paso 12. Inyección de dependencias en Program.cs
1. Se regista DatabaseCollection para poder realizar inyección de dependencias.
    - Se debe registar la interfaz, para que se inyecte IDatabaseCollections en las clases, obteniendo una instancia de DatabaseCollections.
2. Se registran los Services para poder realizar su inyección de dependencia en los Controladores.

``` C#
// Register DatabaseCollections
builder.Services.AddSingleton<IDatabaseCollections, DatabaseCollections>();

// Register ReviewsService
builder.Services.AddSingleton<ReviewsService>();
```

# Paso 13. Repetir pasos 9-12 para cada modelo deseado.