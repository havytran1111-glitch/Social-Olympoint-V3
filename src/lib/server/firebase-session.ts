import { cookies } from 'next/headers';
import { adminAuth } from './firebase-admin';

export interface FirebaseSession {
  user: {
    id: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
  };
}

export async function getFirebaseSession(): Promise<FirebaseSession | null> {
  try {
    if (!adminAuth) {
      return null;
    }

    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('session')?.value;

    if (!sessionCookie) {
      return null;
    }

    // Verify session cookie
    try {
      const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
      
      // Get user document from Firestore
      const db = require('./firebase-admin').adminDb;
      if (db) {
        const userDoc = await db.collection('users').doc(decoded.uid).get();
        const userData = userDoc.data();
        
        return {
          user: {
            id: decoded.uid,
            email: userData?.email || decoded.email || null,
            displayName: userData?.displayName || null,
            photoURL: userData?.photoURL || null,
          },
        };
      } else {
        // Fallback to decoded token data
        return {
          user: {
            id: decoded.uid,
            email: decoded.email || null,
            displayName: decoded.name || null,
            photoURL: null,
          },
        };
      }
    } catch (error: any) {
      console.error('Session verification error:', error);
      // Cookie might be expired or invalid
      return null;
    }
  } catch (error) {
    console.error('Error getting Firebase session:', error);
    return null;
  }
}

export async function getSessionUser(): Promise<{ id: string } | null> {
  const session = await getFirebaseSession();
  if (session?.user?.id) {
    return { id: session.user.id };
  }
  return null;
}
