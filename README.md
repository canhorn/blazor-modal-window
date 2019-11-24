# About

This project is mainly a prof of concept for an editor using Blazor.

## Features:

- Built with Blazor WebAssembly
- TypeScript bridge to cover browser managed Windows/Modals
- **[Planned]** ElectronJS standalone application

# Development

Supports multiple ways to develop, preferred way is using Docker.
Using Docker will deploy the current directory in containers and run TypeScript compile and .NET Core deployment, website will be available on Docker host port of 8080.

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
