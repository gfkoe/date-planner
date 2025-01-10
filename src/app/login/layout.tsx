import LoginHeader from "@/components/LoginHeader";
import { Analytics } from "@vercel/analytics/react";
export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen">
      <div className="w-auto flex flex-col flex-1">
        <LoginHeader />
        <hr className="border-black" />
        <main className="flex-1">
          {children}
          <Analytics />
        </main>
      </div>
    </div>
  );
}
