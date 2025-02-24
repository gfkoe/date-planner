import { FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
import { auth, signOut } from "@/auth";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import Link from "next/link";

const items = [{ title: "Home", url: "/home", icon: FaHome }];

export async function AppSidebar() {
  const session = await auth();
  const u = session?.user;

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>DatePlanner Navigation</SidebarGroupLabel>
          <SidebarGroupLabel>
            Currently signed in as {u?.firstName} {u?.lastName}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.url}>
                    <SidebarMenuButton>
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem>
                <Link href={"/" + u?.id}>
                  <SidebarMenuButton>
                    <FaUser />
                    <span>Profile</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/login" });
                  }}
                >
                  <SidebarMenuButton>
                    {" "}
                    <FaSignOutAlt />
                    Sign Out
                  </SidebarMenuButton>
                </form>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
