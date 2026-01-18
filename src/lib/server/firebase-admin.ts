import admin from 'firebase-admin';

let app: admin.app.App | null = null;
let initialized = false;

function resolveCredential(): admin.ServiceAccount | undefined {
  const b64 = process.env.FIREBASE_SERVICE_ACCOUNT_B64;
  if (b64) {
    try {
      const json = Buffer.from(b64, 'base64').toString('utf8');
      const sa = JSON.parse(json);
      if (typeof sa.private_key === 'string' && sa.private_key.includes('\\n')) {
        sa.private_key = sa.private_key.replace(/\\n/g, '\n');
      }
      return sa as admin.ServiceAccount;
    } catch (error) {
      console.error('[Firebase Admin] Invalid FIREBASE_SERVICE_ACCOUNT_B64:', error);
    }
  }
  return undefined;
}

export let adminAuth: admin.auth.Auth | null = null;
export let adminDb: FirebaseFirestore.Firestore | null = null;

function refreshExports() {
  const existing = app ?? admin.apps[0] ?? null;
  if (existing) {
    app = existing;
    initialized = true;
    adminAuth = admin.auth(app as admin.app.App);
    adminDb = admin.firestore(app as admin.app.App);
  }
}

export function initializeFirebaseFromConfig(appInstance: admin.app.App) {
  app = appInstance;
  initialized = true;
  refreshExports();
  return {
    app,
    adminAuth,
    adminDb,
  };
}

export function initializeFirebase() {
  if (initialized && app) {
    refreshExports();
    return { app, adminAuth, adminDb };
  }

  const existing = admin.apps[0];
  if (existing) {
    app = existing;
    initialized = true;
    refreshExports();
    return { app, adminAuth, adminDb };
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
    refreshExports();
    return {
      app,
      adminAuth,
      adminDb,
    };
  } catch (error) {
    console.error('[Firebase Admin] Initialization error:', error);
    return { app: null, adminAuth: null, adminDb: null };
  }
}

// Try to refresh exports if admin was initialized ahead of this module
refreshExports();
