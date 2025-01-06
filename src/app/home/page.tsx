import Header from "@/components/Header";
export default function Home() {
  return (
    <main>
      <div className="flex flex-col justify-center bg-gray-800 min-h-full h-screen">
        <Header />
        <div className="flex flex-auto flex-1 justify-center items-center">
          <div className="flex items-center justify-center w-1/2 h-1/2 text-center bg-gradient-to-r from-pink-500 to-yellow-500 p-0.5">
            <div className="flex bg-gray-800 h-full w-full items-center justify-center back">
              <p className="text-white text-center text-2xl">⌜Coming Soon!⌟</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
