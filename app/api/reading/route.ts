

import { PrismaClient } from '@prisma/client'; 
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


export async function POST(request: Request) {


  try {
    const formData = await request.formData();
    const temp = formData.get('temp') as string | null;
    const voltage = formData.get('voltage') as string | null;    

 console.log(formData)

    if (!temp || !voltage ) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

       // Save data to the database using Prisma
    await prisma.reading.create({
      data: {
        temp,
        voltage,
     },
    });

    return NextResponse.json({ message: 'successfully save!'}, { status: 201 });

  } catch (error) {

    console.error('error comment:', error);
    
    return NextResponse.json({ message: 'Failed to save comment' }, { status: 500 });

  } finally {

    await prisma.$disconnect();

  }
}
