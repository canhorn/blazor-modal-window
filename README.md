# About

This project is mainly a prof of concept for an editor using Blazor.

## Features:

- Built with Blazor WebAssembly
- TypeScript bridge to cover browser managed Windows/Modals
- ElectronJS application, displays the ASP.NET website that hosts the WASM files.
- **[Planned]** ElectronJS standalone application

# Electron Application

The Electorn application can be use to interface with the WASM produced by the site.

## Logging

The Electron application will log to the host root, electron-app/src/app.log is the log file.

# Development

Supports multiple ways to develop, preferred way is using Docker.
Using Docker will deploy the current directory in containers and run TypeScript compile and .NET Core deployment, website will be available on the Docker host port of 8080.
Using the 

~~~ bash
# TypeScript Compile and .NET Core Run
docker-compose up
~~~

The commands below can be used to deploy and compile on the local machine.

~~~ bash
# Start Local Server
dotnet watch run --urls "http://localhost:8080"

# Run Local TypeScript Compile
npx -p typescript tsc
~~~

The ElectronJS application can be built and started with the below commands.

~~~ bash
# Restore Electron Client
npx yarn --cwd ./electron-app
# Start Electron
npx yarn --cwd ./electron-app start
~~~

# Notes

Some URLs to check available version of ASP.NET and .NET Core SDK docker versions.

- https://mcr.microsoft.com/v2/dotnet/core/aspnet/tags/list
- https://mcr.microsoft.com/v2/dotnet/core/sdk/tags/list


# Change Log

Electron Application
Added bridge/client logic for Blazor to Electron communication.
Electron is implemented with TypeScript.
Electron uses nodemon to restart application on changes.
Created Electron/Node based Event File generation.
Fixed name of Modal Event Data file.
Added declaration generation to Blazor supplied JavaScript.
Created Electron Client/Host TypeScript compiling.

> ## **11.24.2019**
> 
> **Code Generation**
> - Added way to generate TS from Generation List.
> - Fixed typo in modal/window events name.
>   - Was fixed by generation of event files, required updates to usages
> - Removed not needed Dockerfile's.
> - Created Docker Compose file for:
>   - TypeScript generation
>   - Blazor deployment
>   - File Generation

> ## **11.23.2019**
> 
> **Initial Commit**
> - EventBus in browser and .NET layers.
> - Implemented window management, from browsers. 
> - Creation of Window. 
> - Closing of Window. 
> - Parent/Window eventing/messaging. 
> - TypeScript based browser code. 
> - ElectronJS Application base.
