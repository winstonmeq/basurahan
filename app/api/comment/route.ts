

import { PrismaClient } from '@prisma/client'; 
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


export async function POST(request: Request) {


  try {
    const formData = await request.formData();
    const comment = formData.get('comment') as string | null;
    const imageId = formData.get('imageId') as string | null;    
    const userId = formData.get('userId') as string | null; // Assuming userId is passed from the frontend

 console.log(formData)

    if (!comment || !imageId || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

       // Save data to the database using Prisma
    await prisma.comment.create({
      data: {
        comment,
        imageId,
        userId,
      },
    });

    return NextResponse.json({ message: 'comment save!'}, { status: 201 });
  } catch (error) {
    console.error('error comment:', error);

    return NextResponse.json({ message: 'Failed to save comment' }, { status: 500 });

  } finally {

    await prisma.$disconnect();

  }
}
