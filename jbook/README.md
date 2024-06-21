## Introduction

An interactive, browser-based coding environment that allows users to execute code safely, similar to well-known services like CodeSandbox and CodePen.

## Features

- [x] Build an in-browser transpiler + bundler
- [x] Dynamic fetching and loading of npm modules
- [x] Mangage multi-package projects
- [x] Creating the CLI
- [x] Publishing to NPM
- [x] Caching for the imported package in IndexedDB
- [x] Safely handling untrusted code execution, handling errors
- [x] Manage state and handle complicated logic flows with redux
- [x] Cumulative code execution when bundling
- [x] Integrate formatting code editor with prettier
- [x] Draggable resizing components

## Tech Stack

- [esbuild](https://esbuild.github.io) - transiple and bundle
- [lerna](https://lerna.js.org) - manage multi-package
- [Redux](https://redux.js.org) - manage state
- [Commander](https://www.npmjs.com/package/commander) - nodejs command-line interfaces
- [localForage](https://localforage.github.io/localForage) - asynchronous data store
- [monaco editor](https://www.npmjs.com/package/@monaco-editor/react) - code editor
- [react markdown editor](https://www.npmjs.com/package/@uiw/react-markdown-editor) - markdown editor
- [immer](https://immerjs.github.io/immer) - state update
- [Typescript](https://www.typescriptlang.org) - typescript
- [Prettier](https://prettier.io) - format code editor

## License

Licensed under the MIT License. Check the [LICENSE](./LICENSE.md) file for details.
