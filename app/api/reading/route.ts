

import { PrismaClient } from '@prisma/client'; 
import { NextResponse, NextRequest } from 'next/server';

const prisma = new PrismaClient();


export async function POST(request: Request) {


  try {
    const formData = await request.formData();
    const temp = formData.get('temp') as string | null;
    const voltage = formData.get('voltage') as string | null; 
    const aeration = formData.get('aeration') as boolean | null;

 console.log(formData)

    if (!temp || !voltage || !aeration ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

       // Save data to the database using Prisma
    await prisma.reading.create({
      data: {
        temp,
        voltage,
        aeration
     },
    });

    return NextResponse.json({ message: 'successfully save!'}, { status: 201 });

  } catch (error) {

    console.error('error comment:', error);
    
    return NextResponse.json({ message: 'Failed to save reading' }, { status: 500 });

  } finally {

    await prisma.$disconnect();

  }
}



export async function GET(request: NextRequest) {

  try {
    const reading_data = await prisma.reading.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalRecords = await prisma.reading.count();

    
    return NextResponse.json({ reading_data, totalRecords });;


  } catch (error) {

    console.error("Error fetching emergency data:", error);

    return NextResponse.error();
    
  }
}
