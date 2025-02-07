

import React from 'react'
import UploadPage from './upload_image'
import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from 'next/navigation';


const Cloudinary_page  = async () => {

const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect('/')
  }

  const user = session?.user



  return (
    <div className='flex w-full h-screen justify-center items-center'>
        <UploadPage userId={user?.id} />
    </div>
  )
}

export default Cloudinary_page