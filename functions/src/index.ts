import * as admin from 'firebase-admin';
import { logger, https } from 'firebase-functions';
import { apiApp } from './api';
import { eventTriggers } from './event-triggers';
import { KEYS } from './core/constants';

export type UserRole = 'user' | 'manager' | 'admin';
export type MyClaims = 'authenticated' | UserRole; // TODO: add OR operation with our own claims;

process.env.TZ = 'Europe/Vienna';

admin.initializeApp();

exports.api = https.onRequest(
  { secrets: [KEYS.ADMIN_KEY] },
  apiApp
);

Object.assign(exports, eventTriggers());

logger.log('App was initialized');
