# Development

~~~ bash
# Start Server
dotnet watch run --urls "http://localhost:8080"
~~~

~~~ bash
# Restore Electron Client
npx yarn --cwd ./electron-app
# Start Electron
npx yarn --cwd ./electron-app start
# Run typescript compile
npx -p typescript tsc
~~~

# Change Log

## 11.23.2019

Initial Commit
EventBus in browser and .NET layers.
Implemented window management, from browsers.
Creation of Window.
Closing of Window.
Parent/Window eventing/messaging.
TypeScript based browser code.
ElectronJS Application base.
