import 'dotenv/config';
import * as admin from 'firebase-admin';
import { https } from 'firebase-functions';
import { apiApp } from './api';

process.env.TZ = 'Europe/Vienna';

admin.initializeApp();

exports.api = https.onRequest(
    {
        timeoutSeconds: 30
    },
    apiApp
);
