# Ukrainische Kirche (ukrainische-kirche-be)

A Node.js REST API built with TypeScript, Express, Firebase Authentication, Firebase Admin SDK, and Firestore.

## Important features:

### Visual Studio Code debugger
  - Project includes a .vscode/launch.json configuration.
  - After running `npm run serve` command click on the VS Code sidepanel's "Run and debug" button. In the DDL select "Attach debugger" and click "Play". In this case after changing source code debugger needs to be attached once more.
  - Other option is to develop in the debug mode: click on the VS Code sidepanel's "Run and debug" button, in the DDL select "Run script: watch" and click "Play". Debugger will be auto-attached after each reload of the project.

### An API HTTP Trigger
  - API organized under the `api` folder.
  - Access Control: user access can be rejected by simply choosing what user roles can access a specific path or check the claims with a custom `request` object in the Request Handler.
  - Request can be rejected anywhere by throwing `new HttpResponseError(status, codeString, message)`.
  - Shared components between API and Event Triggers are under the `core` folder.

## Commands description
  - kill process not ended gracefully: `lsof -t -i tcp:5004 | xargs kill`
  - list all Firebase projects: `firebase projects:list`
  - switch to another Firebase project: `firebase use <project_name>`
