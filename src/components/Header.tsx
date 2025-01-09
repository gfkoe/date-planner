import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Header() {
  return (
    <div className="relative flex items-center py-2">
      <div className="flex items-center justify-between w-full">
        <SidebarTrigger />
        <Link href="/about">
          <Button variant="ghost" className="text-3xl">
            about
          </Button>
        </Link>
      </div>

      <h1 className="absolute left-1/2 -translate-x-1/2 text-3xl">
        Welcome to DatePlanner!
      </h1>
    </div>
  );
}
