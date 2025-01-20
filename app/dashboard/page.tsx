
// import { auth } from "@/auth";
// import { headers } from "next/headers";
// import { redirect } from "next/navigation";
import Datatable  from "./data_tables";
import Navbar from "@/components/navbar";


const Dashboard_page = async () => {

    // const session = await auth.api.getSession({
    //   headers: await headers(),
    // });

    // if (!session) {
    //   return redirect('/sign-in/')
    // }

  return (

    <div className='flex flex-col items-center w-full bg-gray-100'>

            
            <div className="flex flex-row w-full">
            <Navbar />
            </div>
            <div>
           
            <Datatable />
            </div>
           
            

         
            
           
    </div>
  )
}

export default Dashboard_page