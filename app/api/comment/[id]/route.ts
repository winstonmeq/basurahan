import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const id = request.url.split("/comment/")[1];
    const limitParam = request.nextUrl.searchParams.get('limit'); // Get limit from query parameter
    const limit = limitParam ? parseInt(limitParam, 10) : undefined; // Parse limit to integer, default to undefined if not provided

    console.log('imageId', id);
    console.log('limit', limit);

    const comment_data = await prisma.comment.findMany({
      where: {
        imageId: id,
      },
      include: {
        user: true,
      },
      take: limit, // Apply the limit
    });

    if (!comment_data) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    return NextResponse.json({ comment_data });
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Failed to get comments' }, { status: 500 });
  }
}