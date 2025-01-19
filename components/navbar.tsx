import Link from "next/link";
import AuthButtons from "@/components/auth-buttons";

import { auth } from "@/auth";
import { headers } from "next/headers";


export default async function Navbar() {

	const session = await auth.api.getSession({
			headers: await headers(),
		});
	


	return (
		<nav className="flex flex-row justify-between w-full items-center p-2 bg-slate-50">
			<Link href="/" className="text-xl font-bold">
				<span className="font-light text-xl">Welcome back: {session?.user?.name}</span>
			</Link>
			<AuthButtons />
		</nav>
	);
}