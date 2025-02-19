import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/Header";
import { Analytics } from "@vercel/analytics/react";
import UserSearch from "@/components/UserSearch";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="flex h-screen w-screen">
        <AppSidebar />
        <div className="w-auto flex flex-col flex-1">
          <Header>
            <UserSearch />
          </Header>
          <hr className="border-black" />
          <main className="flex-1">
            {children}
            <Analytics />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
