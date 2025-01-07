import { signOut } from "@/auth";
import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button variant="ghost" className="text-4xl">
            Sign Out
          </Button>
        </form>
      </SidebarContent>
    </Sidebar>
  );
}
