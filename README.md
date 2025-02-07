# Ukrainische Kirche (ukrainische-kirche-be)

A Node.js REST API built with TypeScript, Express.js, Firebase Admin SDK and Firestore.

## Important features:

### VS Code debugger
  - Project includes a .vscode/launch.json configuration.
  - After running `npm run serve` command click on the VS Code sidepanel's "Run and debug" button. In the DDL select "Attach debugger" and click "Play".
  - Other option is to develop in the debug mode: click on the VS Code sidepanel's "Run and debug" button, in the DDL select "Run script: watch" and click "Play".
  - While application is up and running debugger is reattached automatically after each update of the source code.

### Environments and deployment
  - Project has three environments: local, dev and prod. File .env can be used for local emulation, it is included in .gitignore. Environment variables for dev and prod are stored in the Google Cloud.
  - In the Firebase console there are two projects created for dev and prod environment correspondingly.
  - Deployment is done via Git actions, see `.github/workflows` folder.
  - Deployment to the dev environment occurs after pushing to dev branch.
  - Deployment to the prod environment occurs after merging from dev to main branch.

### Logging
  - Within application all logging is done with [Cloud Functions logger SDK](https://firebase.google.com/docs/functions/writing-and-viewing-logs?gen=2nd).
  - Logs can be observed in [Cloud Logs Explorer](https://console.cloud.google.com/logs) for corresponding project.

### Formatting
  - Project is formatted with Prettier, rules can be found in `prettier.config.ts`.
  - Formatting can be configured to run on save, with `"editor.formatOnSave": true` in VS Code editor.
  - The formatting check is included into the pipeline in Git action.

### An API HTTP Trigger
  - API organized under the `api` folder.
  - Access Control: user access can be rejected by simply choosing what user roles can access a specific path or check the claims with a custom `request` object in the Request Handler.
  - Request can be rejected anywhere by throwing `new HttpResponseError(status, codeString, message)`.
  - Shared components are under the `core` folder.

## Commands and description
  - kill process not ended gracefully: `lsof -t -i tcp:5004 | xargs kill`
  - kill debug process not ended gracefully: `lsof -t -i tcp:9229 | xargs kill`
  - list all Firebase projects: `firebase projects:list`
  - switch to another Firebase project: `firebase use <project_name>`
  - set Firebase secret: `firebase functions:secrets:set <secret_name>`
  - generate Firebase CI token: `firebase login:ci`
  - run before deploying to hosting: `firebase init hosting:github`

## Project structure
  - Project includes two package.json files. The one in the root folder is for convenience purposes only: to be able to start the app without `cd` command. It mirrors the commands in the main package.json that is located in ./functions.
