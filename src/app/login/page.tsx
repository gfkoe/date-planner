import LoginForm from "@/components/LoginForm";
export default function LoginPage() {
  return (
    <div className="flex flex-col justify-center min-h-full">
      <div className="flex flex-auto justify-center items-center">
        <LoginForm />
      </div>
    </div>
  );
}
