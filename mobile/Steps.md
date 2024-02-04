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

## Desinstalar SDK (En caso de haberlo instalado con VS Code abierto)
https://learn.microsoft.com/en-us/dotnet/core/install/remove-runtime-sdk-versions?pivots=os-linux

``` bash
sudo rm -rf /home/houser/.dotnet/sdk/8.0.101 
```

# Paso 1. Instalación de extensiones en VS Code.
- C# Dev Kit

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

# Paso 4.