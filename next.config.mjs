/** @type {import("next").NextConfig} */
import "./src/env.js";

const nextConfig = {
  // Other Next.js configurations go here
};

// Initialize Firebase Admin SDK before any server-side rendering
// This ensures adminAuth and adminDb are available when needed
import admin from 'firebase-admin';

let app = null;
let initialized = false;

function resolveCredential() {
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_B64;
  if (b64) {
    try {
      const json = Buffer.from(b64, 'base64').toString('utf8');
      const sa = JSON.parse(json);
      if (typeof sa.private_key === 'string' && sa.private_key.includes('\\n')) {
        sa.private_key = sa.private_key.replace(/\\n/g, '\n');
      }
      return sa;
    } catch (error) {
      console.error('[Firebase Admin] Invalid FIREBASE_SERVICE_ACCOUNT_B64:', error);
    }
  }
  return undefined;
}

function initializeFirebase() {
  if (initialized && app) {
    return { app, adminAuth: admin.auth(app), adminDb: admin.firestore(app) };
  }

  const existing = admin.apps[0];
  if (existing) {
    initialized = true;
    app = existing;
    return {
      app,
      adminAuth: admin.auth(app),
      adminDb: admin.firestore(app),
    };
  }

  const credential = resolveCredential();
  if (!credential) {
    console.error('[Firebase Admin] No valid credentials found');
    return { app: null, adminAuth: null, adminDb: null };
  }

  try {
    app = admin.initializeApp({
      credential: admin.credential.cert(credential),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
    initialized = true;
    return {
      app,
      adminAuth: admin.auth(app),
      adminDb: admin.firestore(app),
    };
  } catch (error) {
    console.error('[Firebase Admin] Initialization error:', error);
    return { app: null, adminAuth: null, adminDb: null };
  }
}

// Execute initialization on module load
initializeFirebase();

export default nextConfig;
