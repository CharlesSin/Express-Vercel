// import firebase module.
const admin = require("firebase-admin");

require("dotenv").config();

const keyString = process.env.FIREBASE_PRIVATE_KEY ?? '{"privateKey": ""}'; //Since it's a TypeScript so need to ensure that I pass a valid string to the JSON.parse as FB_ADMIN_PRIVATE_KEY can be undefined

const { privateKey } = JSON.parse(keyString);

if (privateKey === "") {
  //In case you want to confirm things in Server Logs
  console.log("FIREBASE_PRIVATE_KEY is not set");
}

// firebase config.
const SERVICE_ACCOUNT = {
  type: process.env.FIREBASE_TYPE,
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: privateKey,
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
};

const defaultAppConfig = {
  credential: admin.credential.cert(SERVICE_ACCOUNT),
  databaseURL: `${process.env.FIREBASE_DATABASE_URL}`,
};

// firebase init
const FIREBASE_CONFIG = admin.initializeApp(defaultAppConfig, "DEFAULT");

module.exports = {
  FIREBASE_CONFIG,
};
