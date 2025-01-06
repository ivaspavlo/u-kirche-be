import 'dotenv/config';
import * as admin from 'firebase-admin';
import { https } from 'firebase-functions';
import { apiApp } from './api';
import { GOOGLE_SECRET_KEY } from './core/constants';

process.env.TZ = 'Europe/Vienna';

admin.initializeApp();

exports.api = https.onRequest({ secrets: [GOOGLE_SECRET_KEY.ADMIN_KEY] }, apiApp);
