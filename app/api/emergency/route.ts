import { PrismaClient } from '@prisma/client'; 
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();



export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const emergency = formData.get('emergency') as string | null;    
    const lat = formData.get('lat') as string | null;    
    const long = formData.get('long') as string | null;    
    const mobile = formData.get('mobile') as string | null;    
    const position = formData.get('position') as string | null;    

    const barangay = formData.get('barangay') as string | null;
    const name = formData.get('name') as string | null;

  

    if (!emergency || !lat || !long || !barangay || !name || !position || !mobile) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Save data to the database using Prisma
    await prisma.emergency.create({
      data: {
        emergency,
        lat, long, name, barangay, position, mobile
      },
    });

    return NextResponse.json({ message: 'emergency successfully' }, { status: 201 });

  } catch (error) {

    console.error('Error during saving data:', error);

    return NextResponse.json({ message: 'Failed to save data' }, { status: 500 });

  } finally {

    await prisma.$disconnect();

  }
}



export async function GET(request:NextRequest) {

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '50', 10);
  const skip = (page - 1) * limit;

  try {

    const emergency_data = await prisma.emergency.findMany({
      skip,
      take: limit,

      orderBy: {
        createdAt: 'desc', // Assumes `createdAt` is a field in your `image` table
      },
      
    })
    
    const totalRecords = await prisma.emergency.count(); // Total number of records

    return NextResponse.json({emergency_data, totalRecords})

  } catch (error) {

    console.error("Error fetching patients:", error)

    return NextResponse.error()
  }
}


