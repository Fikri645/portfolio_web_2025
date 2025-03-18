import { useEffect, useRef } from 'react';
import { FlipFluid } from '../utils/FlipFluid';

const WaterSimulation = ({ containerRef }) => {
    const canvasRef = useRef(null);
    const glRef = useRef(null);
    const sceneRef = useRef(null);
    const fluidRef = useRef(null);
    const obstaclesRef = useRef([]);
    const animationFrameRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !containerRef.current) return;

        // Get container dimensions and set canvas size
        const container = containerRef.current;
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        // Setup WebGL
        const gl = canvas.getContext('webgl', { alpha: true });
        if (!gl) {
            console.error('WebGL not supported');
            return;
        }

        // Set clear color with transparency
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        
        // Simulation parameters
        const width = canvas.width;
        const height = canvas.height;
        const density = 1000.0; // Increased density for more realistic water behavior
        const spacing = 8; // Reduced spacing for more particles
        const particleRadius = 2.0; // Smaller particles for better visual effect
        const maxParticles = 30000; // Increased max particles
        const flipRatio = 0.9; // Higher FLIP ratio for more particle-like behavior
        const numPressureIters = 50; // Reduced pressure iterations for better performance
        const numParticleIters = 2;
        const overRelaxation = 1.9;
        const gravity = -98.1; // More realistic gravity
        
        // Initialize fluid
        const fluid = new FlipFluid(density, width, height, spacing, particleRadius, maxParticles);
        fluidRef.current = fluid;
        
        // Initialize particles to fill more of the container
        const numX = Math.floor(width / (spacing * 0.6));
        const numY = Math.floor((height - 100) / (spacing * 0.6));
        const startX = (width - numX * spacing * 0.6) / 2;
        const startY = 0;
        
        // Add particles in a more distributed pattern
        for (let i = 0; i < numX; i++) {
            for (let j = 0; j < numY; j++) {
                if (fluid.numParticles < maxParticles) {
                    // Add some randomness to the position
                    const x = startX + i * spacing * 0.6 + (Math.random() - 0.5) * spacing * 0.3;
                    const y = startY + j * spacing * 0.6 + (Math.random() - 0.5) * spacing * 0.3;
                    
                    // Only add particles if they're within the container bounds
                    if (x >= 0 && x <= width && y >= 0 && y <= height - 100) {
                        fluid.particlePos[2 * fluid.numParticles] = x;
                        fluid.particlePos[2 * fluid.numParticles + 1] = y;
                        
                        // Rainbow colors with more variation
                        const hue = (i / numX + j / numY) * 0.5;
                        const r = Math.max(0, Math.min(1, Math.abs(hue * 6 - 3) - 1));
                        const g = Math.max(0, Math.min(1, 2 - Math.abs(hue * 6 - 2)));
                        const b = Math.max(0, Math.min(1, 2 - Math.abs(hue * 6 - 4)));
                        
                        fluid.particleColor[3 * fluid.numParticles] = r;
                        fluid.particleColor[3 * fluid.numParticles + 1] = g;
                        fluid.particleColor[3 * fluid.numParticles + 2] = b;
                        
                        fluid.numParticles++;
                    }
                }
            }
        }

        // Update obstacle positions function
        const updateObstacles = () => {
            // Find all technology divs (they have the border-4 class)
            const techDivs = container.querySelectorAll('.rounded-2xl.border-4');
            const obstacles = [];
            
            // Get the position of each tech div relative to the canvas
            Array.from(techDivs).forEach(div => {
                const divRect = div.getBoundingClientRect();
                const canvasRect = canvas.getBoundingClientRect();
                
                // Calculate position relative to canvas
                const x = divRect.left - canvasRect.left + divRect.width / 2;
                const y = divRect.top - canvasRect.top + divRect.height / 2;
                
                // Use the average of width and height for radius
                const radius = Math.min(divRect.width, divRect.height) / 2;
                
                obstacles.push({ x, y, radius });
            });
            
            obstaclesRef.current = obstacles;
        };
        
        // Initialize boundaries
        for (let i = 0; i < fluid.fNumX; i++) {
            for (let j = 0; j < fluid.fNumY; j++) {
                let s = 1.0;
                
                // Set boundary conditions (make the edges solid)
                if (i === 0 || i === fluid.fNumX - 1 || j === 0 || j === fluid.fNumY - 1) {
                    s = 0.0; // Solid boundary
                }
                
                fluid.s[i * fluid.fNumY + j] = s;
            }
        }
        
        // Create shader program for rendering particles
        const vertexShaderSource = `
            attribute vec2 aPosition;
            attribute vec3 aColor;
            uniform float uPointSize;
            uniform vec2 uScale;
            varying vec3 vColor;
            
            void main() {
                gl_Position = vec4(aPosition * uScale - vec2(1.0), 0.0, 1.0);
                gl_PointSize = uPointSize;
                vColor = aColor;
            }
        `;
        
        const fragmentShaderSource = `
            precision mediump float;
            varying vec3 vColor;
            
            void main() {
                float d = 2.0 * distance(gl_PointCoord, vec2(0.5));
                if (d > 1.0) discard;
                gl_FragColor = vec4(vColor, 0.8);
            }
        `;
        
        // Compile shaders
        const vertexShader = gl.createShader(gl.VERTEX_SHADER);
        gl.shaderSource(vertexShader, vertexShaderSource);
        gl.compileShader(vertexShader);
        
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(fragmentShader, fragmentShaderSource);
        gl.compileShader(fragmentShader);
        
        // Create program
        const program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);
        
        // Get attribute locations
        const positionLoc = gl.getAttribLocation(program, 'aPosition');
        const colorLoc = gl.getAttribLocation(program, 'aColor');
        
        // Create buffers
        const positionBuffer = gl.createBuffer();
        const colorBuffer = gl.createBuffer();
        
        // Set uniform values
        const pointSizeLoc = gl.getUniformLocation(program, 'uPointSize');
        const scaleLoc = gl.getUniformLocation(program, 'uScale');
        gl.uniform1f(pointSizeLoc, particleRadius * 4);
        gl.uniform2f(scaleLoc, 2.0 / width, 2.0 / height);
        
        // Enable blending
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
        
        // Mouse interaction
        let mouse = { x: 0, y: 0, isDown: false, prevX: 0, prevY: 0, velocity: { x: 0, y: 0 } };
        
        // Use document instead of canvas for mouse events
        document.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right && 
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                
                // Calculate mouse velocity for more dynamic interaction
                const newX = e.clientX - rect.left;
                const newY = e.clientY - rect.top;
                
                mouse.velocity.x = newX - mouse.x;
                mouse.velocity.y = newY - mouse.y;
                
                mouse.prevX = mouse.x;
                mouse.prevY = mouse.y;
                mouse.x = newX;
                mouse.y = newY;
            }
        });
        
        // Add mouse down/up events for pushing particles
        document.addEventListener('mousedown', (e) => {
            const rect = canvas.getBoundingClientRect();
            if (e.clientX >= rect.left && e.clientX <= rect.right && 
                e.clientY >= rect.top && e.clientY <= rect.bottom) {
                mouse.isDown = true;
            }
        });
        
        document.addEventListener('mouseup', () => {
            mouse.isDown = false;
        });
        
        // Update obstacle positions initially
        updateObstacles();
        
        // Animation loop
        let lastTime = 0;
        const animate = (time) => {
            // Update obstacle positions every few frames
            if (time % 10 === 0) {
                updateObstacles();
            }
            
            const dt = Math.min((time - lastTime) / 1000, 0.02); // Cap dt to avoid instability
            lastTime = time;
            
            // Process each obstacle
            for (const obstacle of obstaclesRef.current) {
                fluid.handleParticleCollisions(
                    obstacle.x,
                    obstacle.y,
                    obstacle.radius
                );
            }
            
            // Enhanced mouse interaction
            const mouseRadius = mouse.isDown ? 60 : 40; // Larger radius when clicking
            
            // Apply mouse forces to nearby particles
            const mouseForceRadius = mouseRadius * 2;
            const mouseForceStrength = mouse.isDown ? 2000 : 800;
            
            // Apply forces to particles near the mouse cursor
            for (let i = 0; i < fluid.numParticles; i++) {
                const px = fluid.particlePos[2 * i];
                const py = fluid.particlePos[2 * i + 1];
                
                const dx = px - mouse.x;
                const dy = py - mouse.y;
                const distSq = dx * dx + dy * dy;
                
                if (distSq < mouseForceRadius * mouseForceRadius) {
                    // Calculate distance and normalized direction
                    const dist = Math.sqrt(distSq);
                    const nx = dx / (dist + 0.0001);
                    const ny = dy / (dist + 0.0001);
                    
                    // Force is stronger when closer to cursor
                    const force = (1.0 - dist / mouseForceRadius) * mouseForceStrength;
                    
                    // Add force in direction away from cursor + some of cursor's velocity
                    fluid.particleVel[2 * i] += nx * force * dt + mouse.velocity.x * 0.5;
                    fluid.particleVel[2 * i + 1] += ny * force * dt + mouse.velocity.y * 0.5;
                    
                    // Add some color based on velocity when mouse is down
                    if (mouse.isDown) {
                        const speed = Math.sqrt(mouse.velocity.x * mouse.velocity.x + mouse.velocity.y * mouse.velocity.y);
                        if (speed > 5) {
                            // Add color based on mouse movement direction
                            const angle = Math.atan2(mouse.velocity.y, mouse.velocity.x);
                            const hue = ((angle + Math.PI) / (2 * Math.PI)) % 1.0;
                            
                            // Convert hue to RGB (simplified HSV to RGB)
                            const h = hue * 6;
                            const i = Math.floor(h);
                            const f = h - i;
                            const p = 0;
                            const q = 1 - f;
                            const t = f;
                            
                            let r, g, b;
                            if (i % 6 === 0) { r = 1; g = t; b = p; }
                            else if (i % 6 === 1) { r = q; g = 1; b = p; }
                            else if (i % 6 === 2) { r = p; g = 1; b = t; }
                            else if (i % 6 === 3) { r = p; g = q; b = 1; }
                            else if (i % 6 === 4) { r = t; g = p; b = 1; }
                            else { r = 1; g = p; b = q; }
                            
                            // Blend current color with new color based on mouse speed
                            const blend = Math.min(speed / 50, 0.2);
                            fluid.particleColor[3 * i] = fluid.particleColor[3 * i] * (1 - blend) + r * blend;
                            fluid.particleColor[3 * i + 1] = fluid.particleColor[3 * i + 1] * (1 - blend) + g * blend;
                            fluid.particleColor[3 * i + 2] = fluid.particleColor[3 * i + 2] * (1 - blend) + b * blend;
                        }
                    }
                }
            }
            
            // Update simulation with mouse as obstacle
            fluid.simulate(
                dt,
                gravity,
                flipRatio,
                numPressureIters,
                numParticleIters,
                overRelaxation,
                true,
                true,
                mouse.x,
                mouse.y,
                mouseRadius
            );
            
            // Add artificial "floor" at the bottom of the container
            // This prevents particles from falling through the bottom
            for (let i = 0; i < fluid.numParticles; i++) {
                const y = fluid.particlePos[2 * i + 1];
                if (y > height - particleRadius * 2) {
                    fluid.particlePos[2 * i + 1] = height - particleRadius * 2;
                    fluid.particleVel[2 * i + 1] = -fluid.particleVel[2 * i + 1] * 0.3; // Bounce with damping
                }
            }
            
            // Clear canvas
            gl.clear(gl.COLOR_BUFFER_BIT);
            
            // Update position buffer
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, fluid.particlePos.subarray(0, 2 * fluid.numParticles), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(positionLoc);
            gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);
            
            // Update color buffer
            gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, fluid.particleColor.subarray(0, 3 * fluid.numParticles), gl.STATIC_DRAW);
            gl.enableVertexAttribArray(colorLoc);
            gl.vertexAttribPointer(colorLoc, 3, gl.FLOAT, false, 0, 0);
            
            // Draw particles
            gl.drawArrays(gl.POINTS, 0, fluid.numParticles);
            
            // Continue animation
            animationFrameRef.current = requestAnimationFrame(animate);
        };
        
        // Start animation
        animationFrameRef.current = requestAnimationFrame(animate);
        
        // Handle resize
        const handleResize = () => {
            if (!canvas || !containerRef.current) return;
            
            const rect = containerRef.current.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            
            // Update viewport
            gl.viewport(0, 0, canvas.width, canvas.height);
            
            // Update scale uniform
            gl.uniform2f(scaleLoc, 2.0 / canvas.width, 2.0 / canvas.height);
            
            // Update obstacles after resize
            updateObstacles();
        };
        
        window.addEventListener('resize', handleResize);
        
        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
            
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
            
            // Delete WebGL resources
            gl.deleteBuffer(positionBuffer);
            gl.deleteBuffer(colorBuffer);
            gl.deleteProgram(program);
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'auto', // Change to auto to enable interaction
                zIndex: 5, // Ensure it's above other elements but below the technology icons
            }}
        />
    );
};

export default WaterSimulation;
