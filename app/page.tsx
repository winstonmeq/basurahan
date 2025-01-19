import { auth } from "@/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Home() {

	const session = await auth.api.getSession({
		headers: await headers(),
	});


 if (!session) {
      return redirect('/sign-in/')
 } else {

  return redirect('/dashboard')

 }





  return (
		<main className="flex items-center justify-center grow p-8">
			<div className="flex flex-col items-center gap-4">
				<h1 className="text-7xl">Hello</h1>
				<p>You are logged in as: {session?.user?.name}</p>
			</div>
		</main>
	);
}