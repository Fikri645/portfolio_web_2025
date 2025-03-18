import React, { useState, useEffect, useRef } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Technologies from './components/Technologies'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import SolarSimulation from './components/SolarSimulation'

const App = () => {
  const [showSolarSimulation, setShowSolarSimulation] = useState(false);
  const solarSimulationRef = useRef(null);

  const toggleSolarSimulation = () => {
    setShowSolarSimulation(!showSolarSimulation);
    
    // Small delay to ensure the component exists before scrolling
    setTimeout(() => {
      if (!showSolarSimulation && solarSimulationRef.current) {
        solarSimulationRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 100);
  }

  return (
    <div className="overflow-x-hidden text-neutral-300 antialiased selection:bg-cyan-300 selection:text-cyan-900">
      <div className="fixed top-0 -z-10 w-full h-full">
        <div className="fixed inset-0 bg-slate-950">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>
      </div>
      <div className="container mx-auto px-8">
        <Navbar />
        <Hero />
        <About />
        <Technologies />
        <Experience />
        <Projects />
        <Contact onShowSolarSimulation={toggleSolarSimulation} />
        
        {showSolarSimulation && (
          <div 
            ref={solarSimulationRef} 
            className="transition-all duration-1000 ease-in-out opacity-100 mt-10"
          >
            <SolarSimulation />
          </div>
        )}
        
        <div className="pb-20"></div>
      </div>
    </div>
  )
}

export default App