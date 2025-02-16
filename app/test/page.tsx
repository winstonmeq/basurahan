
'use client'
import { authClient } from '@/auth-client';
import React from 'react'

const Testpage = () => {


	const handleCredentialsSignIn = async (
	) => {
		await authClient.signIn.email(
			{
				email: "admin@admin.com",
				password: "admin12345",
			},
			{
				onRequest: () => {
				},
				onSuccess: async () => {
					console.log("success")
					
				},
				
			}
		);
	};


  return (
    <div>Testpage
        <button onClick={handleCredentialsSignIn}>login</button>
    </div>
  )
}

export default Testpage