

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {

  try {

    const id = request.url.split("/comment/")[1]

    console.log('imageId',id)


    const comment_data = await prisma.comment.findMany({
      where: {
        imageId: id,       
      },

      include: {
        user: true
      }
     
    });

    if (!comment_data) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    return NextResponse.json({comment_data });

  } catch (error) {

    console.error('Error fetching comments:', error);

    return NextResponse.json({ error: 'Failed to get comments' }, { status: 500 });
  }
}
