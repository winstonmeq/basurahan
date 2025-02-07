import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
// import { Readable } from 'stream';
import { PrismaClient } from '@prisma/client'; 


const prisma = new PrismaClient();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export const runtime = 'nodejs'; // Ensure compatibility with Cloudinary SDK


export async function POST(req: NextRequest) {




    const formData = await req.formData();

    const file = formData.get('image') as Blob | null;

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

    // Convert the Blob to a Buffer
    const buffer = Buffer.from(await file.arrayBuffer());


    const mime = file.type
    const encoding = 'base64'
    const base64Data = Buffer.from(buffer).toString('base64')
    const fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data

    // Convert Buffer to Readable Stream
    // const stream = Readable.from(buffer);

    console.log(formData)

    try {

      const uploadToCloudinary = () => {
        return new Promise((resolve, reject) => {
          const result = cloudinary.uploader.upload(fileUri,{
            folder: 'basurahan',
            invalidate: true,
          }) 
             .then ((result) => {
            console.log(result)
            resolve(result)
          })
            .catch((error) => {
              console.log(error)
              reject(error)
            })
            console.log(result)
        })
        
      }
    

      const uploadResult =  await uploadToCloudinary()

    
    
    // // Cloudinary Upload
    // const uploadResult = await new Promise((resolve, reject) => {
    //   const uploadStream = cloudinary.uploader.upload_stream(
    //     { folder: 'basurahan' }, // Optional: specify folder
    //     (error, result) => {
    //       if (error) {
    //         return reject(error);
    //       }
    //       resolve(result);
    //     }
    //   );
    //   stream.pipe(uploadStream); // Pipe the readable stream to Cloudinary
    // });

    // Ensure the result has `secure_url`

    const { secure_url } = uploadResult as { secure_url: string };


    await prisma.image.create({
      data: {
        filename: secure_url,
        title,
        latitude,
        longitude,
        userId
      },
    });

    return NextResponse.json({ secure_url });

  } catch (error) {

    console.error('Error uploading image:', error);

    return NextResponse.json({ error: 'Failed to upload image' }, { status: 500 });
  }
}
