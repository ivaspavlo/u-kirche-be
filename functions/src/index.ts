import * as admin from 'firebase-admin';
import { logger, https } from 'firebase-functions';
import { apiApp } from './api';
import { KEYS } from './core/constants';

const { defineString } = require('firebase-functions/params');
const env = defineString(KEYS.MODE);

process.env.TZ = 'Europe/Vienna';

admin.initializeApp();

exports.api = https.onRequest(
  { secrets: [KEYS.ADMIN_KEY, KEYS.JWT_SECRET] },
  apiApp
);

logger.log(`App started in mode: ${env.value()}`);
