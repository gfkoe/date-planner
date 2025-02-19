import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginHeader() {
  return (
    <div className="relative flex items-center py-2">
      <div className="flex items-center justify-end w-full">
        <Button variant="ghost" className="text-3xl" asChild>
          <Link href="/about">about</Link>
        </Button>
      </div>

      <h1 className="absolute left-1/2 -translate-x-1/2 text-3xl">
        Welcome to DatePlanner!
      </h1>
      <hr className="border-black" />
    </div>
  );
}
