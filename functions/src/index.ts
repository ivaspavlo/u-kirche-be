import 'dotenv/config';
import { initializeApp } from 'firebase-admin/app';
import { https } from 'firebase-functions';
import { apiApp } from './api';
import { ENV_KEY } from './core/constants';

process.env.TZ = 'Europe/Vienna';

initializeApp();

exports.api = https.onRequest(
    {
        timeoutSeconds: 30,
        secrets: [ENV_KEY.SEND_GRID_SECRET, ENV_KEY.RECAPTCHA_SECRET]
    },
    apiApp
);
