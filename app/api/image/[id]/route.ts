import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';




const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const id = request.url.split("/image/")[1];

    console.log('imageId', id);

    const image_data = await prisma.image.findUnique({
      where: {
        id: id,
      },
      include: {
        comments: true, // Include related comments
        user: true,     // Include related user data
      },
    });

    if (!image_data) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    return NextResponse.json({ image_data });
  } catch (error) {
    console.error('Error fetching image:', error);
    return NextResponse.json({ error: 'Failed to fetch image' }, { status: 500 });
  }
}







export async function DELETE(request: NextRequest) {
    try {
        // const { id } = params;
        const id = request.url.split("/image/")[1];

      console.log(id)
     

        // Delete the image from the database
        await prisma.image.delete({
            where: {
                id: id,
            },
        });

        return NextResponse.json({ message: 'Image deleted successfully' }, { status: 200 });

    } catch (error) { // Explicitly type the error as 'any' or 'Error'

        console.error('Error deleting image:', error); // Log the error message or the entire error

        return NextResponse.json({ error: 'Failed to delete image'}, { status: 500 }); // Provide more error details

    } finally {
        await prisma.$disconnect(); // Disconnect Prisma client (if applicable)
    }
}