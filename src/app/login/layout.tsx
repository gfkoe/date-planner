import LoginHeader from "@/components/LoginHeader";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-screen">
      <div className="w-auto flex flex-col flex-1">
        <LoginHeader />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
