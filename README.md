# Ukrainische Kirche (ukrainische-kirche-be)

A Node.js REST API built with TypeScript, Express.js, Firebase Admin SDK, and Firestore.

## Important features:

### Firebase pricing Blaze plan
  - Pricing information regarding all aspects of the application can be found [here](https://firebase.google.com/pricing).

### VS Code debugger
  - Project includes a .vscode/launch.json configuration.
  - After running `npm run serve` command click on the VS Code sidepanel's "Run and debug" button. In the DDL select "Attach debugger" and click "Play".
  - Other option is to develop in the debug mode: click on the VS Code sidepanel's "Run and debug" button, in the DDL select "Run script: watch" and click "Play".
  - While application is up and running debugger is reattached automatically after each update of the source code.

### Environments
  - Project has three environments: local, staging and prod. For each of the environments there are .env files in the root of `./functions` folder, .env.local file is used for local emulation, while .env.staging and .env.prod are used in the corresponding github actions files inside within `./github/workflows` folder.
  - In the Firebase console there are two projects for staging and prod environment correspondingly.
  - Deployment to the staging environment occurs after merging from development to staging branch.
  - Deployment to the prod environment occurs after merging from staging to main branch.

### Logging
  - Within application all logging is done with [Cloud Functions logger SDK](https://firebase.google.com/docs/functions/writing-and-viewing-logs?gen=2nd).
  - Logs can be observed in [Cloud Logs Explorer](https://console.cloud.google.com/logs) for corresponding project.
  - Cloud logging pricing can be found [here](https://cloud.google.com/stackdriver/pricing?db=egilmore#logging-pricing-summary).

### An API HTTP Trigger
  - API organized under the `api` folder.
  - Access Control: user access can be rejected by simply choosing what user roles can access a specific path or check the claims with a custom `request` object in the Request Handler.
  - Request can be rejected anywhere by throwing `new HttpResponseError(status, codeString, message)`.
  - Shared components between API and Event Triggers are under the `core` folder.

## Commands description
  - kill process not ended gracefully: `lsof -t -i tcp:5004 | xargs kill`
  - kill debug process not ended gracefully: `lsof -t -i tcp:9229 | xargs kill`
  - list all Firebase projects: `firebase projects:list`
  - switch to another Firebase project: `firebase use <project_name>`
  - set Firebase secret: `firebase functions:secrets:set <secret_name>`
  - generate Firebase CI token: `firebase login:ci`
  - run before deploying to hosting: `firebase init hosting:github`

## Project structure
  - Project includes two package.json files. The one in the root folder is for convenience purposes only: to be able to start he app without `cd` command. It mirrors the commands in the main package.json that is located in ./functions.
