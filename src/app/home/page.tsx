import CreateEventForm from "@/components/CreateEventForm";
export default function Home() {
  return (
    <div className="flex flex-col justify-center min-h-full">
      <div className="flex flex-auto justify-center items-center">
        <div className="flex h-full w-full items-center justify-center">
          <CreateEventForm />
        </div>
      </div>
    </div>
  );
}
