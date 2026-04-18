import { SidebarProvider } from "@/components/ui/sidebar";
import Header from "@/components/layout/app-header";
import { AppSidebar } from "@/components/layout/app-sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 w-full min-h-screen flex flex-col bg-surface text-on-surface overflow-hidden">
        <Header />
        {children}
      </main>
    </SidebarProvider>
  );
}