import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
//import UserSearch from "@/components/UserSearch";
import { PropsWithChildren } from "react";
import Link from "next/link";

type HeaderProps = PropsWithChildren;

export default function Header({ children }: HeaderProps) {
  return (
    <div className="relative flex items-center py-2">
      <div className="flex items-center justify-between w-full">
        <SidebarTrigger />
        <h1 className="fixed left-1/2 -translate-x-1/2 text-3xl">
          Welcome to DatePlanner!
        </h1>
        <div className="flex items-center">
          <div className="w-full mr-4">{children}</div>
          <Button variant="ghost" className="text-3xl">
            <Link href="/about">about</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
