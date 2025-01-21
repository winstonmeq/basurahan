import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import Datatable from "./data_tables";
import Navbar from "@/components/navbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SignoutButton from "@/components/signout-button";

const Dashboard_page = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/sign-in/");
  }

 

  return (
    <div className="flex flex-col items-center w-full bg-gray-100">
      <div className="flex flex-row w-full items-end justify-end gap-2 pr-8">
        {!session ? (
          <div className="flex gap-2 justify-center">
            <Link href="/sign-in">
              <Button>Sign In</Button>
            </Link>
            <Link href="/sign-up">
              <Button>Sign Up</Button>
            </Link>
          </div>
        ) : (
          <div className="flex w-full items-center justify-between bg-slate-200 p-2">
            <div>Welcome back: <span className="font-bold">{session.user.name}</span> </div>
            <div><SignoutButton /></div>
          </div>
        )}
      </div>
      <div>
        <Datatable />
      </div>
    </div>
  );
};

export default Dashboard_page;
