import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const SolarSimulation = () => {
    const [celestialBodies, setCelestialBodies] = useState([]);
    const containerRef = useRef(null);
    const [sunPosition, setSunPosition] = useState({ x: 0, y: 0 });
    const [isOrbiting, setIsOrbiting] = useState(false);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [isMobile, setIsMobile] = useState(false);
    
    // Solar system data with focus on visibility - dramatically spaced out
    const planets = [
        { name: "Mercury", relativeSize: 1.2, relativeOrbitSpeed: 1.59, color: "#B7B8B9", distance: 8.0 },
        { name: "Venus", relativeSize: 1.2, relativeOrbitSpeed: 1.18, color: "#E7CDCD", distance: 12.0 },
        { name: "Earth", relativeSize: 1.2, relativeOrbitSpeed: 1, color: "#6B93D6", distance: 16.0 },
        { name: "Mars", relativeSize: 1.2, relativeOrbitSpeed: 0.81, color: "#C1440E", distance: 20.0 },
        { name: "Jupiter", relativeSize: 1.8, relativeOrbitSpeed: 0.44, color: "#E3DCCB", distance: 26.0 },
        { name: "Saturn", relativeSize: 1.6, relativeOrbitSpeed: 0.32, color: "#EDC373", distance: 32.0 },
        { name: "Uranus", relativeSize: 1.4, relativeOrbitSpeed: 0.23, color: "#D1E7E7", distance: 38.0 },
        { name: "Neptune", relativeSize: 1.4, relativeOrbitSpeed: 0.18, color: "#5B5DDF", distance: 44.0 }
    ];
    
    // Check for mobile/small screens and handle resize events
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            
            // If switching to mobile, ensure interactive mode is disabled
            if (mobile && isOrbiting) {
                setIsOrbiting(false);
            }
        };
        
        // Initial check
        checkMobile();
        
        // Set up resize listener
        window.addEventListener('resize', handleResize);
        
        function handleResize() {
            checkMobile();
            initializeSystem();
        }
        
        return () => window.removeEventListener('resize', handleResize);
    }, [isOrbiting]);
    
    // Initialize the solar system
    const initializeSystem = () => {
        if (!containerRef.current) return;
        
        const width = containerRef.current.offsetWidth;
        const height = containerRef.current.offsetHeight;
        setDimensions({ width, height });
        
        // Center position
        const centerX = width / 2;
        const centerY = height / 2;
        setSunPosition({ x: centerX, y: centerY });
        
        // Scale factor to fit all planets in view - adjusts based on screen size
        const maxDistance = Math.max(...planets.map(p => p.distance));
        const isMobileView = window.innerWidth < 768;
        const scaleFactor = Math.min(width, height) * (isMobileView ? 0.35 : 0.45) / maxDistance;
        
        // Fixed size for all planets - smaller on mobile
        const baseSize = Math.min(width, height) * (isMobileView ? 0.012 : 0.016);
        
        const bodies = planets.map((planet, index) => {
            // Evenly distribute planets around their orbits for initial setup
            const angle = (index / planets.length) * Math.PI * 2;
            const orbitRadius = planet.distance * scaleFactor;
            
            // Calculate position based on angle and distance
            const x = centerX + Math.cos(angle) * orbitRadius;
            const y = centerY + Math.sin(angle) * orbitRadius;
            
            // Calculate orbital speed (radians per frame)
            const baseSpeed = 0.005; // Base speed for Earth
            const speed = baseSpeed * planet.relativeOrbitSpeed;
            
            // Calculate size - focusing more on visibility than accurate relative sizes
            const size = baseSize * planet.relativeSize;
            
            // Calculate trail density inversely proportional to speed
            // Slower planets will leave more frequent trail points
            const trailDensity = Math.ceil(0.2 / planet.relativeOrbitSpeed);
            
            return {
                id: index,
                name: planet.name,
                x,
                y,
                angle,
                orbitRadius,
                orbitSpeed: speed,
                size: size,
                color: planet.color,
                trail: [], // Initialize an empty trail
                maxTrailLength: isMobileView ? 60 : 100, // Fewer trail points on mobile
                trailDensity: trailDensity,
                frameCount: 0,
                revolutionCount: 0,
                lastAngleQuadrant: Math.floor(angle / (Math.PI/2)),
            };
        });
        
        setCelestialBodies(bodies);
    };
    
    // Initialize on mount and when container ref is available
    useEffect(() => {
        initializeSystem();
    }, [containerRef.current]);
    
    // Physics animation loop
    useEffect(() => {
        if (celestialBodies.length === 0) return;
        
        let animationFrameId;
        
        const updateOrbits = () => {
            setCelestialBodies(bodies => {
                // If orbiting, sun position follows mouse
                const center = isOrbiting ? sunPosition : { 
                    x: dimensions.width / 2, 
                    y: dimensions.height / 2 
                };
                
                return bodies.map(body => {
                    // Update angle based on orbital speed
                    const newAngle = body.angle + body.orbitSpeed;
                    
                    // Calculate new position
                    const x = center.x + Math.cos(newAngle) * body.orbitRadius;
                    const y = center.y + Math.sin(newAngle) * body.orbitRadius;
                    
                    // Increment frame counter
                    const frameCount = body.frameCount + 1;
                    
                    // Check for revolution completion by monitoring quadrant transitions
                    // Specifically detect crossing from 4th quadrant back to 1st quadrant
                    const currentQuadrant = Math.floor(newAngle % (2 * Math.PI) / (Math.PI/2));
                    let revolutionCount = body.revolutionCount;
                    
                    // Detect when we cross from quadrant 3 to quadrant 0 (complete revolution)
                    if (body.lastAngleQuadrant === 3 && currentQuadrant === 0) {
                        revolutionCount += 1;
                    }
                    
                    // Determine whether to add a trail point based on trailDensity
                    // Slower planets will add points more frequently
                    let trail = [...body.trail];
                    
                    if (frameCount % Math.max(1, Math.floor(5 / body.trailDensity)) === 0) {
                        if (trail.length >= body.maxTrailLength) {
                            trail.shift();
                        }
                        trail.push({ x, y });
                    }
                    
                    return { 
                        ...body, 
                        x, 
                        y, 
                        angle: newAngle,
                        trail,
                        frameCount,
                        revolutionCount,
                        lastAngleQuadrant: currentQuadrant
                    };
                });
            });
            
            animationFrameId = requestAnimationFrame(updateOrbits);
        };
        
        animationFrameId = requestAnimationFrame(updateOrbits);
        
        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [celestialBodies.length, sunPosition, isOrbiting, dimensions]);
    
    // Handle mouse events - only enable on desktop
    const handleMouseMove = (e) => {
        if (isMobile || !containerRef.current) return;
        
        const rect = containerRef.current.getBoundingClientRect();
        setSunPosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        });
    };
    
    const handleMouseDown = () => {
        if (!isMobile) {
            setIsOrbiting(true);
        }
    };
    
    const handleMouseUp = () => {
        if (!isMobile) {
            setIsOrbiting(false);
        }
    };
    
    // Calculate the current sun position (center when not orbiting, mouse position when orbiting)
    const currentSunPosition = isOrbiting 
        ? sunPosition 
        : { x: dimensions.width / 2, y: dimensions.height / 2 };
    
    // Make the sun clearly larger than Jupiter
    // Find Jupiter's size (if present) to ensure sun is larger
    const jupiterSize = celestialBodies.find(body => body.name === "Jupiter")?.size || 0;
    const sunSize = Math.max(
        Math.min(dimensions.width, dimensions.height) * (isMobile ? 0.055 : 0.07), // Smaller on mobile
        jupiterSize * 2.2
    );
    const sunRadius = sunSize / 2;
    
    // Helper function to determine trail thickness based on planet size
    const getTrailThickness = (body) => {
        // Make trail thickness proportional to planet size
        // Much thinner than before and scaled to planet size
        const baseFactor = isMobile ? 0.2 : 0.3;
        return Math.max(0.5, body.size * baseFactor);
    };
    
    // Helper function to determine trail opacity based on planet speed
    const getTrailOpacity = (orbitSpeed) => {
        // Make trails more transparent overall
        // But still inversely proportional to speed so slower planets have more visible trails
        return Math.min(0.4, Math.max(0.15, 0.1 / orbitSpeed));
    };
    
    // Determine appropriate container height based on screen size
    const containerHeight = isMobile 
        ? "h-[350px]" // Smaller height on mobile
        : "h-[600px]"; // Normal height on desktop
    
    return (
        <div className="w-full mb-20">
            <motion.h2 
                whileInView={{opacity: 1, y: 0}} 
                initial={{opacity: 0, y: -50}} 
                transition={{duration: 1}}
                className="text-3xl md:text-4xl my-10 md:my-20 text-center"
            >
                Interactive Solar System
            </motion.h2>
            
            <motion.div 
                whileInView={{opacity: 1}}
                initial={{opacity: 0}}
                transition={{duration: 1}}
                className="mx-auto max-w-full md:max-w-5xl px-2 md:px-0"
            >
                <div 
                    ref={containerRef}
                    className={`relative w-full ${containerHeight} rounded-2xl border-4 border-neutral-800 overflow-hidden bg-black`}
                    onMouseMove={handleMouseMove}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseUp}
                    onTouchStart={isMobile ? undefined : handleMouseDown}
                    onTouchEnd={isMobile ? undefined : handleMouseUp}
                    onTouchMove={isMobile ? undefined : handleMouseMove}
                >
                    {/* Orbit circles */}
                    {!isOrbiting && celestialBodies.map(body => (
                        <div 
                            key={`orbit-${body.id}`}
                            className="absolute rounded-full border border-gray-800"
                            style={{
                                width: body.orbitRadius * 2,
                                height: body.orbitRadius * 2,
                                left: dimensions.width / 2 - body.orbitRadius,
                                top: dimensions.height / 2 - body.orbitRadius,
                            }}
                        />
                    ))}
                    
                    {/* Trails for all planets - with thickness based on planet size and increased transparency */}
                    {celestialBodies.map(body => (
                        body.trail.length > 0 && (
                            <svg key={`trail-${body.id}`} className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
                                <path
                                    d={`M ${body.trail[0].x} ${body.trail[0].y} ${body.trail.map(point => `L ${point.x} ${point.y}`).join(' ')}`}
                                    stroke={body.color}
                                    strokeWidth={getTrailThickness(body)}
                                    strokeOpacity={getTrailOpacity(body.orbitSpeed)}
                                    fill="none"
                                />
                            </svg>
                        )
                    ))}
                    
                    {/* The Sun - always visible and properly sized */}
                    <motion.div
                        className="absolute rounded-full z-10"
                        style={{
                            width: sunSize,
                            height: sunSize,
                            backgroundColor: "#FDB813",
                            boxShadow: `0 0 ${sunRadius}px #FDB813, 0 0 ${sunSize}px #FDB813`,
                            x: currentSunPosition.x - sunRadius,
                            y: currentSunPosition.y - sunRadius
                        }}
                        initial={false}
                        animate={{
                            x: currentSunPosition.x - sunRadius,
                            y: currentSunPosition.y - sunRadius
                        }}
                        transition={{
                            duration: 0,
                            ease: "linear"
                        }}
                    />
                    
                    {/* Planets */}
                    {celestialBodies.map(body => (
                        <motion.div
                            key={body.id}
                            className="absolute rounded-full z-5"
                            style={{
                                width: body.size * 2,
                                height: body.size * 2,
                                backgroundColor: body.color,
                                boxShadow: `0 0 ${body.size}px ${body.color}`,
                                x: body.x - body.size,
                                y: body.y - body.size,
                            }}
                            initial={false}
                            animate={{
                                x: body.x - body.size,
                                y: body.y - body.size
                            }}
                            transition={{
                                duration: 0,
                                ease: "linear"
                            }}
                        >
                            {/* Planet name labels with revolution counter - smaller on mobile */}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 text-[8px] md:text-xs text-white whitespace-nowrap font-semibold">
                                <span className="opacity-90">{body.name}</span>
                                <span className="ml-1 opacity-70 bg-black bg-opacity-40 px-1 rounded">
                                    {body.revolutionCount}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                <div className="mt-4 md:mt-6 flex justify-center flex-wrap gap-2 md:gap-3">
                    <div className="flex items-center gap-1 text-xs md:text-sm">
                        <span className="inline-block w-2 md:w-3 h-2 md:h-3 rounded-full" style={{ backgroundColor: "#FDB813" }}></span>
                        <span className="text-neutral-400">Sun</span>
                    </div>
                    {planets.map((planet, index) => (
                        <div key={index} className="flex items-center gap-1 text-xs md:text-sm">
                            <span className="inline-block w-2 md:w-3 h-2 md:h-3 rounded-full" style={{ backgroundColor: planet.color }}></span>
                            <span className="text-neutral-400">{planet.name}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default SolarSimulation;