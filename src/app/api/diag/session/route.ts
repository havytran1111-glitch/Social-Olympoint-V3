import { NextRequest, NextResponse } from 'next/server';
import { getFirebaseSession } from '@/lib/server/firebase-session';

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available in production' }, { status: 404 });
  }



  try {
    const sessionUser = await getFirebaseSession();
    if (sessionUser) {
      return NextResponse.json({
        status: 'Session cookie is valid.',
        user: sessionUser,
      });
    } else {
      return NextResponse.json(
        {
          status: 'Session cookie is invalid or expired.',
          error: 'getFirebaseSession returned null',
        },
        { status: 401 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'Error verifying session cookie.',
        error: error.message,
        code: error.code,
      },
      { status: 500 }
    );
  }
}
