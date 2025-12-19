import * as admin from 'firebase-admin';

if (!admin.apps.length) {
    try {
        // Use environment variable or fallback to basic config
        let credential;

        if (process.env.FIREBASE_SERVICE_ACCOUNT) {
            const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
            credential = admin.credential.cert(serviceAccount);
        } else if (process.env.FIREBASE_PROJECT_ID) {
            // Use application default credentials (works locally and in Cloud environments)
            credential = admin.credential.applicationDefault();
        } else {
            throw new Error('Firebase Admin credentials not configured');
        }

        admin.initializeApp({
            credential,
            projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
        });

        console.log('Firebase Admin initialized successfully');
    } catch (error) {
        console.error('Firebase admin initialization error:', error);
        // Don't re-throw to prevent app crash, but log for debugging
    }
}

export const adminDb = admin.apps.length ? admin.firestore() : null as any;
export const adminAuth = admin.apps.length ? admin.auth() : null as any;
export const adminStorage = admin.apps.length ? admin.storage() : null as any;
