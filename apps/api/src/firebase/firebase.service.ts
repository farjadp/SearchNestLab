// ============================================================================
// Hardware Source: apps/api/src/firebase/firebase.service.ts
// Version: 1.1.0 — 2025-12-17
// Why: Admin-side Firebase initialization for NestJS
// Env / Identity: GOOGLE_APPLICATION_CREDENTIALS
// ============================================================================

import { Injectable, OnModuleInit } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseService implements OnModuleInit {
    onModuleInit() {
        if (!admin.apps.length) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            const serviceAccount = require('../../service-account.json');

            admin.initializeApp({
                credential: admin.credential.cert(serviceAccount),
                projectId: process.env.FIREBASE_PROJECT_ID,
            });
        }
    }

    getAuth() {
        return admin.auth();
    }

    getFirestore() {
        return admin.firestore();
    }
}
