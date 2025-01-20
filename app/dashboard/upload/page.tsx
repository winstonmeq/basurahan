

import React from 'react'
import UploadPage from './upload'
import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from 'next/navigation';


const Upload_page  = async () => {

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

export default Upload_page