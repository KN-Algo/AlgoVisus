import { useState } from 'react'
import reactLogo from './assets/react.svg'
import appLogo from '/favicon.svg'
import PWABadge from './PWABadge.tsx'
import { Button } from './components/ui/button.tsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen w-full px-8 text-center bg-gray-400 flex flex-col justify-center">
      <div className="flex justify-center items-center mb-4">
        <a 
          href="https://vite.dev" 
          target="_blank"
          className="font-medium text-[#646cff] no-underline hover:text-[#535bf2] light:hover:text-[#747bff]"
        >
          <img 
            src={appLogo} 
            className="h-24 p-6 transition-all duration-300 will-change-auto hover:drop-shadow-[0_0_2em_#646cffaa]" 
            alt="AlgoVisus logo" 
          />
        </a>
        <a 
          href="https://react.dev" 
          target="_blank"
          className="font-medium text-[#646cff] no-underline hover:text-[#535bf2] light:hover:text-[#747bff]"
        >
          <img 
            src={reactLogo} 
            className="h-24 p-6 transition-all duration-300 will-change-auto hover:drop-shadow-[0_0_2em_#61dafbaa] motion-safe:animate-[spin_20s_linear_infinite]" 
            alt="React logo" 
          />
        </a>
      </div>
      <h1 className="text-5xl leading-tight">AlgoVisus</h1>
      <div className="p-8">
        <Button variant="outline" onClick={() => setCount((count) => count + 1)}>
          Increase
        </Button>
        <span className="m-6 text-2xl">{count}</span>
        <Button onClick={() => setCount((count) => count - 1)}>
          Decrease
        </Button>
      </div>
      <div className="text-lg">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p>
        Click on the Vite and React logos to learn more
      </p>
      <PWABadge />
    </div>
  )
}

export default App
