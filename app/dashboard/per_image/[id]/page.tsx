

import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import DetailPage from './detailPage'

const page = async () => {


    const session = await auth.api.getSession({
      headers: await headers(),
    });
  
    if (!session) {
      return redirect("/sign-in/");
    }
  

  return (

    
      <DetailPage userId={session?.user.id}/>
    

  )


}

export default page