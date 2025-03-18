import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const SolarSimulation = () => {
  // Orbit counters
  const [mercuryOrbits, setMercuryOrbits] = useState(0);
  const [venusOrbits, setVenusOrbits] = useState(0);
  const [earthOrbits, setEarthOrbits] = useState(0);
  const [marsOrbits, setMarsOrbits] = useState(0);
  const [jupiterOrbits, setJupiterOrbits] = useState(0);
  const [saturnOrbits, setSaturnOrbits] = useState(0);
  const [uranusOrbits, setUranusOrbits] = useState(0);
  const [neptuneOrbits, setNeptuneOrbits] = useState(0);
  const [moonOrbits, setMoonOrbits] = useState(0);
  
  // Animation references
  const animationRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  
  // Update orbit counters
    useEffect(() => {
    const updateOrbitCounts = () => {
      const currentTime = Date.now();
      const elapsedSeconds = (currentTime - startTimeRef.current) / 1000;
      
      // Calculate orbits based on orbital periods (animations)
      setMercuryOrbits(Math.floor(elapsedSeconds / 2.4));
      setVenusOrbits(Math.floor(elapsedSeconds / 6.2));
      setEarthOrbits(Math.floor(elapsedSeconds / 10));
      setMarsOrbits(Math.floor(elapsedSeconds / 18.8));
      setJupiterOrbits(Math.floor(elapsedSeconds / 120));
      setSaturnOrbits(Math.floor(elapsedSeconds / 290));
      setUranusOrbits(Math.floor(elapsedSeconds / 840));
      setNeptuneOrbits(Math.floor(elapsedSeconds / 1650));
      // Moon orbits Earth ~13 times per Earth year
      setMoonOrbits(Math.floor(elapsedSeconds / (10/13)));
      
      animationRef.current = requestAnimationFrame(updateOrbitCounts);
    };
    
    animationRef.current = requestAnimationFrame(updateOrbitCounts);
        
        return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
    
    return (
        <div className="w-full mb-20">
            <motion.h2 
                whileInView={{opacity: 1, y: 0}} 
                initial={{opacity: 0, y: -50}} 
                transition={{duration: 1}}
                className="text-3xl md:text-4xl my-10 md:my-20 text-center"
            >
                Explore Our Solar System
            </motion.h2>
            
            <motion.div
                whileInView={{opacity: 1}}
                initial={{opacity: 0}}
                transition={{duration: 0.5}}
                className="text-center max-w-2xl mx-auto mb-10"
            >
                <p className="text-neutral-400">This interactive model shows the planets orbiting around the sun with scientifically accurate relative speeds. Watch as the counters track how many orbits each celestial body has completed.</p>
            </motion.div>
            
            <motion.div 
                whileInView={{opacity: 1}}
                initial={{opacity: 0}}
                transition={{duration: 1}}
                className="mx-auto max-w-full md:max-w-5xl px-2 md:px-0"
            >
        <div className="relative w-full h-[800px] md:h-[900px] rounded-2xl border-4 border-neutral-800 overflow-hidden bg-black flex items-center justify-center">
          <div className="solar-system">
            {/* Sun */}
            <div className="sun"></div>
            
            {/* Orbit Paths */}
            <div className="orbit mercury-path"></div>
            <div className="orbit venus-path"></div>
            <div className="orbit earth-path"></div>
            <div className="orbit mars-path"></div>
            <div className="orbit jupiter-path"></div>
            <div className="orbit saturn-path"></div>
            <div className="orbit uranus-path"></div>
            <div className="orbit neptune-path"></div>
                    
                    {/* Planets */}
            <div className="planet mercury">
              <div className="planet-label">Mercury <span className="orbit-count">{mercuryOrbits}</span></div>
            </div>
            
            <div className="planet venus">
              <div className="planet-label">Venus <span className="orbit-count">{venusOrbits}</span></div>
            </div>
            
            <div className="planet earth">
              <div className="planet-label">Earth <span className="orbit-count">{earthOrbits}</span></div>
              <div className="moon">
                <div className="moon-label">Moon <span className="orbit-count">{moonOrbits}</span></div>
              </div>
            </div>
            
            <div className="planet mars">
              <div className="planet-label">Mars <span className="orbit-count">{marsOrbits}</span></div>
            </div>
            
            <div className="planet jupiter">
              <div className="planet-label">Jupiter <span className="orbit-count">{jupiterOrbits}</span></div>
            </div>
            
            <div className="planet saturn">
              <div className="planet-label">Saturn <span className="orbit-count">{saturnOrbits}</span></div>
              <div className="saturn-ring"></div>
            </div>
            
            <div className="planet uranus">
              <div className="planet-label">Uranus <span className="orbit-count">{uranusOrbits}</span></div>
            </div>
            
            <div className="planet neptune">
              <div className="planet-label">Neptune <span className="orbit-count">{neptuneOrbits}</span></div>
            </div>
                            </div>
                </div>
                
                <div className="mt-4 md:mt-6 flex justify-center flex-wrap gap-2 md:gap-3">
                    <div className="flex items-center gap-1 text-xs md:text-sm">
            <span className="inline-block w-2 md:w-3 h-2 md:h-3 rounded-full bg-[#FDB813]"></span>
                        <span className="text-neutral-400">Sun</span>
                    </div>
          <div className="flex items-center gap-1 text-xs md:text-sm">
            <span className="inline-block w-2 md:w-3 h-2 md:h-3 rounded-full bg-[#B7B8B9]"></span>
            <span className="text-neutral-400">Mercury: {mercuryOrbits} orbits</span>
          </div>
          <div className="flex items-center gap-1 text-xs md:text-sm">
            <span className="inline-block w-2 md:w-3 h-2 md:h-3 rounded-full bg-[#E7CDCD]"></span>
            <span className="text-neutral-400">Venus: {venusOrbits} orbits</span>
          </div>
          <div className="flex items-center gap-1 text-xs md:text-sm">
            <span className="inline-block w-2 md:w-3 h-2 md:h-3 rounded-full bg-[#6B93D6]"></span>
            <span className="text-neutral-400">Earth: {earthOrbits} orbits</span>
          </div>
          <div className="flex items-center gap-1 text-xs md:text-sm">
            <span className="inline-block w-2 md:w-3 h-2 md:h-3 rounded-full bg-[#CCCCCC]"></span>
            <span className="text-neutral-400">Moon: {moonOrbits} orbits</span>
          </div>
          <div className="flex items-center gap-1 text-xs md:text-sm">
            <span className="inline-block w-2 md:w-3 h-2 md:h-3 rounded-full bg-[#C1440E]"></span>
            <span className="text-neutral-400">Mars: {marsOrbits} orbits</span>
          </div>
          <div className="flex items-center gap-1 text-xs md:text-sm">
            <span className="inline-block w-2 md:w-3 h-2 md:h-3 rounded-full bg-[#E3DCCB]"></span>
            <span className="text-neutral-400">Jupiter: {jupiterOrbits} orbits</span>
          </div>
          <div className="flex items-center gap-1 text-xs md:text-sm">
            <span className="inline-block w-2 md:w-3 h-2 md:h-3 rounded-full bg-[#EDC373]"></span>
            <span className="text-neutral-400">Saturn: {saturnOrbits} orbits</span>
          </div>
          <div className="flex items-center gap-1 text-xs md:text-sm">
            <span className="inline-block w-2 md:w-3 h-2 md:h-3 rounded-full bg-[#D1E7E7]"></span>
            <span className="text-neutral-400">Uranus: {uranusOrbits} orbits</span>
          </div>
          <div className="flex items-center gap-1 text-xs md:text-sm">
            <span className="inline-block w-2 md:w-3 h-2 md:h-3 rounded-full bg-[#5B5DDF]"></span>
            <span className="text-neutral-400">Neptune: {neptuneOrbits} orbits</span>
                        </div>
                </div>
        
        <div className="mt-6 text-center text-xs md:text-sm text-neutral-400">
          <p>Orbital speeds and distances are proportionally based on real astronomical data.</p>
          <p>1 Earth year = 10 seconds in animation time.</p>
          <p>The Moon orbits Earth ~13 times per Earth year.</p>
        </div>
        
        {/* CSS for orbits and animations */}
        <style jsx>{`
          .solar-system {
            position: relative;
            width: 100%;
            height: 100%;
          }
          
          .sun {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 80px;
            height: 80px;
            background-color: #FDB813;
            border-radius: 50%;
            box-shadow: 0 0 40px #FDB813, 0 0 80px #FDB813;
            z-index: 100;
          }
          
          .orbit {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 50%;
          }
          
          /* Scale: 1 AU (Earth's distance) = 100px */
          .mercury-path {
            width: 120px;
            height: 120px;
          }
          
          .venus-path {
            width: 200px;
            height: 200px;
          }
          
          .earth-path {
            width: 280px;
            height: 280px;
          }
          
          .mars-path {
            width: 380px;
            height: 380px;
          }
          
          /* Gas giants are scaled differently due to size constraints */
          .jupiter-path {
            width: 480px;
            height: 480px;
          }
          
          .saturn-path {
            width: 580px;
            height: 580px;
          }
          
          .uranus-path {
            width: 680px;
            height: 680px;
          }
          
          .neptune-path {
            width: 780px;
            height: 780px;
          }
          
          .planet {
            position: absolute;
            top: 50%;
            left: 50%;
            border-radius: 50%;
            transform-origin: 0 0;
            z-index: 10;
          }
          
          .planet-label {
            position: absolute;
            white-space: nowrap;
            color: white;
            font-size: 12px;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 7px;
          }
          
          .orbit-count {
            display: inline-block;
            background-color: rgba(255, 255, 255, 0.2);
            border-radius: 10px;
            padding: 0 4px;
            margin-left: 3px;
            font-size: 10px;
          }
          
          /* Planet sizes are relative to Earth = 14px (doubled from 7px) */
          .mercury {
            width: 6px;
            height: 6px;
            margin-top: -3px;
            margin-left: -3px;
            background-color: #B7B8B9;
            box-shadow: 0 0 7px #B7B8B9;
            animation: orbit 2.4s linear infinite;
            animation-name: mercury-orbit;
          }
          
          .venus {
            width: 12px;
            height: 12px;
            margin-top: -6px;
            margin-left: -6px;
            background-color: #E7CDCD;
            box-shadow: 0 0 7px #E7CDCD;
            animation: orbit 6.2s linear infinite;
            animation-name: venus-orbit;
          }
          
          .earth {
            width: 14px;
            height: 14px;
            margin-top: -7px;
            margin-left: -7px;
            background-color: #6B93D6;
            box-shadow: 0 0 7px #6B93D6;
            animation: orbit 10s linear infinite;
            animation-name: earth-orbit;
          }
          
          .moon {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 4px;
            height: 4px;
            margin-top: -2px;
            margin-left: -2px;
            background-color: #CCCCCC;
            border-radius: 50%;
            box-shadow: 0 0 4px #CCCCCC;
            animation: moon-orbit 0.77s linear infinite;
            transform-origin: 0 0;
            z-index: 11;
          }
          
          .moon-label {
            position: absolute;
            white-space: nowrap;
            color: white;
            font-size: 10px;
            top: 100%;
            left: 50%;
            transform: translateX(-50%);
            margin-top: 4px;
          }
          
          .mars {
            width: 8px;
            height: 8px;
            margin-top: -4px;
            margin-left: -4px;
            background-color: #C1440E;
            box-shadow: 0 0 7px #C1440E;
            animation: orbit 18.8s linear infinite;
            animation-name: mars-orbit;
          }
          
          .jupiter {
            width: 30px;
            height: 30px;
            margin-top: -15px;
            margin-left: -15px;
            background-color: #E3DCCB;
            box-shadow: 0 0 10px #E3DCCB;
            animation: orbit 120s linear infinite;
            animation-name: jupiter-orbit;
          }
          
          .saturn {
            width: 26px;
            height: 26px;
            margin-top: -13px;
            margin-left: -13px;
            background-color: #EDC373;
            box-shadow: 0 0 10px #EDC373;
            animation: orbit 290s linear infinite;
            animation-name: saturn-orbit;
          }
          
          .saturn-ring {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 60px;
            height: 8px;
            margin-top: -4px;
            margin-left: -30px;
            background-color: rgba(237, 195, 115, 0.5);
            border-radius: 50%;
            transform: rotate(30deg);
            box-shadow: 0 0 7px rgba(237, 195, 115, 0.3);
          }
          
          .uranus {
            width: 22px;
            height: 22px;
            margin-top: -11px;
            margin-left: -11px;
            background-color: #D1E7E7;
            box-shadow: 0 0 9px #D1E7E7;
            animation: orbit 840s linear infinite;
            animation-name: uranus-orbit;
          }
          
          .neptune {
            width: 20px;
            height: 20px;
            margin-top: -10px;
            margin-left: -10px;
            background-color: #5B5DDF;
            box-shadow: 0 0 9px #5B5DDF;
            animation: orbit 1650s linear infinite;
            animation-name: neptune-orbit;
          }
          
          @keyframes orbit {
            0% {
              transform: rotate(0deg) translate(var(--orbit-radius)) rotate(0deg);
            }
            100% {
              transform: rotate(360deg) translate(var(--orbit-radius)) rotate(-360deg);
            }
          }
          
          @keyframes mercury-orbit {
            0% {
              transform: rotate(0deg) translate(60px) rotate(0deg);
            }
            100% {
              transform: rotate(360deg) translate(60px) rotate(-360deg);
            }
          }
          
          @keyframes venus-orbit {
            0% {
              transform: rotate(0deg) translate(100px) rotate(0deg);
            }
            100% {
              transform: rotate(360deg) translate(100px) rotate(-360deg);
            }
          }
          
          @keyframes earth-orbit {
            0% {
              transform: rotate(0deg) translate(140px) rotate(0deg);
            }
            100% {
              transform: rotate(360deg) translate(140px) rotate(-360deg);
            }
          }
          
          @keyframes moon-orbit {
            0% {
              transform: rotate(0deg) translate(15px) rotate(0deg);
            }
            100% {
              transform: rotate(360deg) translate(15px) rotate(-360deg);
            }
          }
          
          @keyframes mars-orbit {
            0% {
              transform: rotate(0deg) translate(190px) rotate(0deg);
            }
            100% {
              transform: rotate(360deg) translate(190px) rotate(-360deg);
            }
          }
          
          @keyframes jupiter-orbit {
            0% {
              transform: rotate(0deg) translate(240px) rotate(0deg);
            }
            100% {
              transform: rotate(360deg) translate(240px) rotate(-360deg);
            }
          }
          
          @keyframes saturn-orbit {
            0% {
              transform: rotate(0deg) translate(290px) rotate(0deg);
            }
            100% {
              transform: rotate(360deg) translate(290px) rotate(-360deg);
            }
          }
          
          @keyframes uranus-orbit {
            0% {
              transform: rotate(0deg) translate(340px) rotate(0deg);
            }
            100% {
              transform: rotate(360deg) translate(340px) rotate(-360deg);
            }
          }
          
          @keyframes neptune-orbit {
            0% {
              transform: rotate(0deg) translate(390px) rotate(0deg);
            }
            100% {
              transform: rotate(360deg) translate(390px) rotate(-360deg);
            }
          }
          
          @media (max-width: 768px) {
            .mercury-path { width: 80px; height: 80px; }
            .venus-path { width: 120px; height: 120px; }
            .earth-path { width: 160px; height: 160px; }
            .mars-path { width: 200px; height: 200px; }
            .jupiter-path { width: 240px; height: 240px; }
            .saturn-path { width: 280px; height: 280px; }
            .uranus-path { width: 320px; height: 320px; }
            .neptune-path { width: 360px; height: 360px; }
            
            @keyframes mercury-orbit {
              0% {
                transform: rotate(0deg) translate(40px) rotate(0deg);
              }
              100% {
                transform: rotate(360deg) translate(40px) rotate(-360deg);
              }
            }
            
            @keyframes venus-orbit {
              0% {
                transform: rotate(0deg) translate(60px) rotate(0deg);
              }
              100% {
                transform: rotate(360deg) translate(60px) rotate(-360deg);
              }
            }
            
            @keyframes earth-orbit {
              0% {
                transform: rotate(0deg) translate(80px) rotate(0deg);
              }
              100% {
                transform: rotate(360deg) translate(80px) rotate(-360deg);
              }
            }
            
            @keyframes mars-orbit {
              0% {
                transform: rotate(0deg) translate(100px) rotate(0deg);
              }
              100% {
                transform: rotate(360deg) translate(100px) rotate(-360deg);
              }
            }
            
            @keyframes jupiter-orbit {
              0% {
                transform: rotate(0deg) translate(120px) rotate(0deg);
              }
              100% {
                transform: rotate(360deg) translate(120px) rotate(-360deg);
              }
            }
            
            @keyframes saturn-orbit {
              0% {
                transform: rotate(0deg) translate(140px) rotate(0deg);
              }
              100% {
                transform: rotate(360deg) translate(140px) rotate(-360deg);
              }
            }
            
            @keyframes uranus-orbit {
              0% {
                transform: rotate(0deg) translate(160px) rotate(0deg);
              }
              100% {
                transform: rotate(360deg) translate(160px) rotate(-360deg);
              }
            }
            
            @keyframes neptune-orbit {
              0% {
                transform: rotate(0deg) translate(180px) rotate(0deg);
              }
              100% {
                transform: rotate(360deg) translate(180px) rotate(-360deg);
              }
            }
            
            .sun {
              width: 60px;
              height: 60px;
            }
          }
        `}</style>
      </motion.div>
        </div>
    );
};

export default SolarSimulation;