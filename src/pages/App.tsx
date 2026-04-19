import { HeroSection } from "./_components/HeroSection.tsx";
import { ExercisesSection } from "./_components/ExercisesSection.tsx";
import { FooterSection } from "./_components/FooterSection.tsx";

function App() {
  return (
    <div className="w-full">
      <HeroSection />
      <ExercisesSection />
      <FooterSection />
      {/* Stara zawartość - na razie zakomentowana */}
      {/* <div className="min-h-screen w-full px-8 text-center bg-gray-400 flex flex-col justify-center">
        <div className="flex justify-center items-center mb-4">
          <a
            href="https://vite.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#646cff] no-underline hover:text-[#535bf2] light:hover:text-[#747bff]"
          >
            <img
              src={appLogo}
              className="h-24 p-6 transition-all duration-300 will-change-auto hover:drop-shadow-[0_0_2em_#646cffaa]"
              alt="Blinky logo"
            />
          </a>
          <a
            href="https://react.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-[#646cff] no-underline hover:text-[#535bf2] light:hover:text-[#747bff]"
          >
            <img
              src={reactLogo}
              className="h-24 p-6 transition-all duration-300 will-change-auto hover:drop-shadow-[0_0_2em_#61dafbaa] motion-safe:animate-[spin_20s_linear_infinite]"
              alt="React logo"
            />
          </a>
        </div>
        <h1 className="text-5xl leading-tight">Blinky</h1>
        <div className="text-lg">
          <ExampleTimerComponent />
        </div>
        <div className="p-8">
          <Button
            variant="outline"
            onClick={() => setCount((count) => count + 1)}
          >
            Increase
          </Button>
          <span className="m-6 text-2xl">{count}</span>
          <Button onClick={() => setCount((count) => count - 1)}>Decrease</Button>
        </div>
        <div className="text-lg">
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p>Click on the Vite and React logos to learn more</p>
        <PWABadge />
      </div> */}
    </div>
  );
}

export default App;
