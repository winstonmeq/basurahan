'use client'

import { Button } from "@/components/ui/button";
import ImagesTable from "./images_table";
import UsersTable from "./users_table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";


export default function AdminDashboard() {



	return (
		<main className="flex flex-col p-8">
			<div className="flex flex-col gap-4 max-w-7xl mx-auto w-full">
				<div className="flex flex-col gap-2 mb-8">
					<Link href={"/dashboard"}><Button className="text-1xl font-bold">Back</Button></Link>
					<p className="mt-6 text-2xl text-muted-foreground">
					Admin Dashboard - User and Post Management					</p>
				</div>

				<Card>
					<CardHeader>
						<CardTitle>Users</CardTitle>
					</CardHeader>
					<CardContent>
					
						<div><UsersTable /></div>
					
						
						
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Images</CardTitle>
					</CardHeader>
					<CardContent>
						
						<div><ImagesTable /></div>
					
						
						
					</CardContent>
				</Card>


			</div>
		</main>
	);
}