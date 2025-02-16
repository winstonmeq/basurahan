import { auth } from "../../../../auth"; // path to your Better Auth server instance
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Parse the JSON body from the request
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const response = await auth.api.signInEmail({
      body: {
        email,
        password
      },
      // asResponse: true // returns a response object instead of data
    });

    return NextResponse.json({ response });

  } catch (error: any) { // Use 'any' or 'Error' for type safety

    console.error('Error signing in:', error);

    // Properly handle the error and return a useful message
    return NextResponse.json({ message: 'Failed to sign in', error: error.message || 'Unknown error' }, { status: 500 });

  } finally {
    await prisma.$disconnect();
  }
}