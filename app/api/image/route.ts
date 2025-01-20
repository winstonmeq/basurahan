

import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()



export async function GET(request:NextRequest) {

  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get('page') || '1', 10);
  const limit = parseInt(searchParams.get('limit') || '50', 10);
  const skip = (page - 1) * limit;

  try {

    const image_data = await prisma.image.findMany({
      skip,
      take: limit,

      orderBy: {
        createdAt: 'desc', // Assumes `createdAt` is a field in your `image` table
      },
      
      include: {
        comments: true,
        user: true
      }
    })
    
    const totalRecords = await prisma.image.count(); // Total number of records

    return NextResponse.json({image_data, totalRecords})

  } catch (error) {

    console.error("Error fetching patients:", error)

    return NextResponse.error()
  }
}

