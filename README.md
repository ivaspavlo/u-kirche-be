# Ukrainische Kirche (ukrainische-kirche-be)

A Node.js REST API built with TypeScript, Express, Firebase Authentication, Firebase Admin SDK, and Firestore.

Important features:

-  **An API HTTP Trigger:**
  - API organized under the `api` folder
  - Access Control: user access can be rejected by simply choosing what user roles can access a specific path or check the claims with a custom `request` object in the Request Handler
  - Request can be rejected anywhere by throwing `new HttpResponseError(status, codeString, message)`
- Shared components between API and Event Triggers are under the `core` folder
