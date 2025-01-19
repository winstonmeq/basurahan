


import { AppSidebar } from "@/components/app_sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"



export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
            

                <SidebarProvider> 
                      <AppSidebar />
                    <SidebarTrigger />
                    {children}
                </SidebarProvider>
              
            
				
			
	);
}
