import { PrismaClient } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    // Parse the JSON body from the request
    const requestBody = await request.json();

    // Extract fields from the JSON body
    const { emergency, lat, long, barangay, name, mobile, position } = requestBody;

    console.log(requestBody);

    // Validate required fields
    if (!emergency || !lat || !long || !barangay || !name || !position || !mobile) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save data to the database using Prisma
    await prisma.emergency.create({
      data: {
        emergency,
        lat,
        long,
        barangay,
        name,
        mobile,
        position,
      },
    });

    return NextResponse.json({ message: 'Emergency data saved successfully' }, { status: 201 });

  } catch (error) {
    console.error('Error during saving data:', error);
    return NextResponse.json({ message: 'Failed to save data' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '50', 10);
  const skip = (page - 1) * limit;

  try {
    const emergency_data = await prisma.emergency.findMany({
      skip,
      take: 5,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalRecords = await prisma.emergency.count();

    const response = NextResponse.json({ emergency_data, totalRecords });

    // Add CORS headers
    // response.headers.set('Access-Control-Allow-Origin', '*');
    // response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    // response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    return response;
  } catch (error) {
    console.error("Error fetching emergency data:", error);
    return NextResponse.error();
  }
}