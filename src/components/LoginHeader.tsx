import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LoginHeader() {
  return (
    <div className="relative flex items-center py-2">
      <div className="flex items-center justify-end w-full">
        <Link href="/about">
          <Button variant="ghost" className="text-4xl">
            about
          </Button>
        </Link>
      </div>

      <h1 className="absolute left-1/2 -translate-x-1/2 text-5xl">Welcome!</h1>
    </div>
  );
}
