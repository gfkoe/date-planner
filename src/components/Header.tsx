import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
export default function Header() {
  return (
    <div className="text-center bg-black py-2">
      <h1 className="text-white text-4xl">Welcome!</h1>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button>Sign Out</Button>
      </form>
    </div>
  );
}
