import { PrismaClient } from '@prisma/client'; 
import { writeFile} from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';
import { NextResponse } from 'next/server';
import path from 'path';

const prisma = new PrismaClient();



export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File | null;
    const title = formData.get('title') as string | null;    
    const latitude = formData.get('latitude') as string | null;
    const longitude = formData.get('longitude') as string | null;
    const userId = formData.get('userId') as string | null; // Assuming userId is passed from the frontend

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!title || !latitude || !longitude || !userId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const fileBuffer = await file.arrayBuffer();
    const fileExtension = file.name.split('.').pop();
    const uniqueFilename = `${uuidv4()}.${fileExtension}`;
    const filePath = path.join(process.cwd(), 'public', 'images', uniqueFilename);

    await writeFile(filePath, Buffer.from(fileBuffer));

    // Save data to the database using Prisma
    await prisma.image.create({
      data: {
        filename: uniqueFilename,
        title,
        latitude,
        longitude,
        userId
      },
    });

    return NextResponse.json({ message: 'Image uploaded successfully', filename: uniqueFilename }, { status: 201 });
  } catch (error) {
    console.error('Error during image upload:', error);
    return NextResponse.json({ message: 'Failed to upload image' }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
