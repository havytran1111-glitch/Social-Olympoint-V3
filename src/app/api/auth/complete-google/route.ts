import { NextRequest, NextResponse } from 'next/server';
import { adminAuth, adminDb } from '@/lib/server/firebase-admin';

export async function POST(request: NextRequest) {
  try {
    if (!adminAuth || !adminDb) {
      return NextResponse.json(
        { ok: false, error: 'Firebase not configured' },
        { status: 503 }
      );
    }

    // Get token from Authorization header
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { ok: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const idToken = authHeader.replace('Bearer ', '').trim();
    if (!idToken) {
      return NextResponse.json(
        { ok: false, error: 'Invalid token format' },
        { status: 401 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { googleUser } = body;

    if (!googleUser || !googleUser.uid) {
      return NextResponse.json(
        { ok: false, error: 'Invalid user data' },
        { status: 400 }
      );
    }

    // Verify ID token with Firebase Admin SDK
    let decodedToken: any;
    try {
      decodedToken = await adminAuth.verifyIdToken(idToken);
    } catch (error: any) {
      console.error('Token verification error:', {
        code: error.code,
        message: error.message,
      });
      return NextResponse.json(
        { ok: false, error: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Verify UID match
    if (decodedToken.uid !== googleUser.uid) {
      return NextResponse.json(
        { ok: false, error: 'Token UID mismatch' },
        { status: 403 }
      );
    }

    const { uid, email, displayName, photoURL, emailVerified } = googleUser;

    // Create or update user document in Firestore
    try {
      const userRef = adminDb.collection('users').doc(uid);
      const userDoc = await userRef.get();

      const userData: any = {
        uid,
        email,
        displayName: displayName || '',
        photoURL: photoURL || '',
        emailVerified: emailVerified || false,
        authMethod: 'google',
        updatedAt: new Date().toISOString(),
      };

      if (!userDoc.exists) {
        userData.createdAt = new Date().toISOString();
        await userRef.set(userData);
      } else {
        await userRef.update(userData);
      }
    } catch (firestoreError: any) {
      console.error('Firestore error:', {
        code: firestoreError.code,
        message: firestoreError.message,
      });
      // Continue even if Firestore fails - user is authenticated
      // This allows graceful degradation if Firestore is misconfigured
    }

    return NextResponse.json(
      {
        ok: true,
        success: true,
        user: {
          uid,
          email,
          displayName: displayName || '',
          photoURL: photoURL || '',
          emailVerified: emailVerified || false,
          authMethod: 'google',
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in complete-google:', {
      message: error.message,
      code: error.code,
      stack: error.stack,
    });
    return NextResponse.json(
      { ok: false, error: 'Authentication failed' },
      { status: 500 }
    );
  }
}
