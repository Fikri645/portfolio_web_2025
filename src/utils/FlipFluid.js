const FLUID_CELL = 0;
const AIR_CELL = 1;
const SOLID_CELL = 2;

function clamp(x, min, max) {
    if (x < min) return min;
    else if (x > max) return max;
    else return x;
}

export class FlipFluid {
    constructor(density, width, height, spacing, particleRadius, maxParticles) {
        // fluid
        this.density = density;
        this.fNumX = Math.floor(width / spacing) + 1;
        this.fNumY = Math.floor(height / spacing) + 1;
        this.h = Math.max(width / this.fNumX, height / this.fNumY);
        this.fInvSpacing = 1.0 / this.h;
        this.fNumCells = this.fNumX * this.fNumY;

        this.u = new Float32Array(this.fNumCells);
        this.v = new Float32Array(this.fNumCells);
        this.du = new Float32Array(this.fNumCells);
        this.dv = new Float32Array(this.fNumCells);
        this.prevU = new Float32Array(this.fNumCells);
        this.prevV = new Float32Array(this.fNumCells);
        this.p = new Float32Array(this.fNumCells);
        this.s = new Float32Array(this.fNumCells);
        this.cellType = new Int32Array(this.fNumCells);
        this.cellColor = new Float32Array(3 * this.fNumCells);

        // particles
        this.maxParticles = maxParticles;
        this.particlePos = new Float32Array(2 * this.maxParticles);
        this.particleColor = new Float32Array(3 * this.maxParticles);
        for (let i = 0; i < this.maxParticles; i++)
            this.particleColor[3 * i + 2] = 1.0;

        this.particleVel = new Float32Array(2 * this.maxParticles);
        this.particleDensity = new Float32Array(this.fNumCells);
        this.particleRestDensity = 0.0;

        this.particleRadius = particleRadius;
        this.pInvSpacing = 1.0 / (2.2 * particleRadius);
        this.pNumX = Math.floor(width * this.pInvSpacing) + 1;
        this.pNumY = Math.floor(height * this.pInvSpacing) + 1;
        this.pNumCells = this.pNumX * this.pNumY;

        this.numCellParticles = new Int32Array(this.pNumCells);
        this.firstCellParticle = new Int32Array(this.pNumCells + 1);
        this.cellParticleIds = new Int32Array(maxParticles);

        this.numParticles = 0;
    }

    integrateParticles(dt, gravity) {
        for (let i = 0; i < this.numParticles; i++) {
            this.particleVel[2 * i + 1] += dt * gravity;
            this.particlePos[2 * i] += this.particleVel[2 * i] * dt;
            this.particlePos[2 * i + 1] += this.particleVel[2 * i + 1] * dt;
        }
    }

    pushParticlesApart(numIters) {
        const colorDiffusionCoeff = 0.001;

        // count particles per cell
        this.numCellParticles.fill(0);

        for (let i = 0; i < this.numParticles; i++) {
            const x = this.particlePos[2 * i];
            const y = this.particlePos[2 * i + 1];

            const xi = clamp(Math.floor(x * this.pInvSpacing), 0, this.pNumX - 1);
            const yi = clamp(Math.floor(y * this.pInvSpacing), 0, this.pNumY - 1);
            const cellNr = xi * this.pNumY + yi;
            this.numCellParticles[cellNr]++;
        }

        // partial sums
        let first = 0;
        for (let i = 0; i < this.pNumCells; i++) {
            first += this.numCellParticles[i];
            this.firstCellParticle[i] = first;
        }
        this.firstCellParticle[this.pNumCells] = first;

        // fill particles into cells
        for (let i = 0; i < this.numParticles; i++) {
            const x = this.particlePos[2 * i];
            const y = this.particlePos[2 * i + 1];

            const xi = clamp(Math.floor(x * this.pInvSpacing), 0, this.pNumX - 1);
            const yi = clamp(Math.floor(y * this.pInvSpacing), 0, this.pNumY - 1);
            const cellNr = xi * this.pNumY + yi;
            this.firstCellParticle[cellNr]--;
            this.cellParticleIds[this.firstCellParticle[cellNr]] = i;
        }

        // push particles apart
        const minDist = 2.0 * this.particleRadius;
        const minDist2 = minDist * minDist;

        for (let iter = 0; iter < numIters; iter++) {
            for (let i = 0; i < this.numParticles; i++) {
                const px = this.particlePos[2 * i];
                const py = this.particlePos[2 * i + 1];

                const pxi = Math.floor(px * this.pInvSpacing);
                const pyi = Math.floor(py * this.pInvSpacing);
                const x0 = Math.max(pxi - 1, 0);
                const y0 = Math.max(pyi - 1, 0);
                const x1 = Math.min(pxi + 1, this.pNumX - 1);
                const y1 = Math.min(pyi + 1, this.pNumY - 1);

                for (let xi = x0; xi <= x1; xi++) {
                    for (let yi = y0; yi <= y1; yi++) {
                        const cellNr = xi * this.pNumY + yi;
                        const first = this.firstCellParticle[cellNr];
                        const last = this.firstCellParticle[cellNr + 1];
                        for (let j = first; j < last; j++) {
                            const id = this.cellParticleIds[j];
                            if (id === i) continue;

                            const qx = this.particlePos[2 * id];
                            const qy = this.particlePos[2 * id + 1];

                            const dx = qx - px;
                            const dy = qy - py;
                            const d2 = dx * dx + dy * dy;
                            if (d2 > minDist2 || d2 === 0.0) continue;

                            const d = Math.sqrt(d2);
                            const s = 0.5 * (minDist - d) / d;
                            const dxs = dx * s;
                            const dys = dy * s;

                            this.particlePos[2 * i] -= dxs;
                            this.particlePos[2 * i + 1] -= dys;
                            this.particlePos[2 * id] += dxs;
                            this.particlePos[2 * id + 1] += dys;

                            // diffuse colors
                            for (let k = 0; k < 3; k++) {
                                const color0 = this.particleColor[3 * i + k];
                                const color1 = this.particleColor[3 * id + k];
                                const color = (color0 + color1) * 0.5;
                                this.particleColor[3 * i + k] = color0 + (color - color0) * colorDiffusionCoeff;
                                this.particleColor[3 * id + k] = color1 + (color - color1) * colorDiffusionCoeff;
                            }
                        }
                    }
                }
            }
        }
    }

    handleParticleCollisions(obstacleX, obstacleY, obstacleRadius) {
        const h = 1.0 / this.fInvSpacing;
        const r = this.particleRadius;
        const or = obstacleRadius;
        const or2 = or * or;
        const minDist = obstacleRadius + r;
        const minDist2 = minDist * minDist;

        const minX = h + r;
        const maxX = (this.fNumX - 1) * h - r;
        const minY = h + r;
        const maxY = (this.fNumY - 1) * h - r;

        for (let i = 0; i < this.numParticles; i++) {
            const x = this.particlePos[2 * i];
            const y = this.particlePos[2 * i + 1];

            const dx = x - obstacleX;
            const dy = y - obstacleY;
            const d2 = dx * dx + dy * dy;

            if (d2 < minDist2) {
                this.particleVel[2 * i] = 0.0;
                this.particleVel[2 * i + 1] = 0.0;
            }

            let newX = x;
            let newY = y;

            if (newX < minX) {
                newX = minX;
                this.particleVel[2 * i] = 0.0;
            }
            if (newX > maxX) {
                newX = maxX;
                this.particleVel[2 * i] = 0.0;
            }
            if (newY < minY) {
                newY = minY;
                this.particleVel[2 * i + 1] = 0.0;
            }
            if (newY > maxY) {
                newY = maxY;
                this.particleVel[2 * i + 1] = 0.0;
            }

            this.particlePos[2 * i] = newX;
            this.particlePos[2 * i + 1] = newY;
        }
    }

    updateParticleDensity() {
        const n = this.fNumY;
        const h = this.h;
        const h1 = this.fInvSpacing;
        const h2 = 0.5 * h;

        const d = this.particleDensity;
        d.fill(0.0);

        for (let i = 0; i < this.numParticles; i++) {
            const x = this.particlePos[2 * i];
            const y = this.particlePos[2 * i + 1];

            const x0 = Math.floor((x - h2) * h1);
            const tx = ((x - h2) - x0 * h) * h1;
            const x1 = Math.min(x0 + 1, this.fNumX-2);
            
            const y0 = Math.floor((y-h2)*h1);
            const ty = ((y - h2) - y0*h) * h1;
            const y1 = Math.min(y0 + 1, this.fNumY-2);

            const sx = 1.0 - tx;
            const sy = 1.0 - ty;

            if (x0 < this.fNumX && y0 < this.fNumY) d[x0 * n + y0] += sx * sy;
            if (x1 < this.fNumX && y0 < this.fNumY) d[x1 * n + y0] += tx * sy;
            if (x1 < this.fNumX && y1 < this.fNumY) d[x1 * n + y1] += tx * ty;
            if (x0 < this.fNumX && y1 < this.fNumY) d[x0 * n + y1] += sx * ty;
        }

        if (this.particleRestDensity === 0.0) {
            let sum = 0.0;
            let numFluidCells = 0;

            for (let i = 0; i < this.fNumCells; i++) {
                if (this.cellType[i] === FLUID_CELL) {
                    sum += d[i];
                    numFluidCells++;
                }
            }

            if (numFluidCells > 0)
                this.particleRestDensity = sum / numFluidCells;
        }
    }

    transferVelocities(toGrid, flipRatio) {
        const n = this.fNumY;
        const h = this.h;
        const h1 = this.fInvSpacing;
        const h2 = 0.5 * h;

        if (toGrid) {
            this.prevU.set(this.u);
            this.prevV.set(this.v);

            this.du.fill(0.0);
            this.dv.fill(0.0);
            this.u.fill(0.0);
            this.v.fill(0.0);

            for (let i = 0; i < this.fNumCells; i++) 
                this.cellType[i] = this.s[i] === 0.0 ? SOLID_CELL : AIR_CELL;

            for (let i = 0; i < this.numParticles; i++) {
                const x = this.particlePos[2 * i];
                const y = this.particlePos[2 * i + 1];
                const xi = clamp(Math.floor(x * h1), 0, this.fNumX - 1);
                const yi = clamp(Math.floor(y * h1), 0, this.fNumY - 1);
                const cellNr = xi * n + yi;
                if (this.cellType[cellNr] === AIR_CELL)
                    this.cellType[cellNr] = FLUID_CELL;
            }
        }

        for (let component = 0; component < 2; component++) {
            const dx = component === 0 ? 0.0 : h2;
            const dy = component === 0 ? h2 : 0.0;
    
            const f = component === 0 ? this.u : this.v;
            const prevF = component === 0 ? this.prevU : this.prevV;
            const d = component === 0 ? this.du : this.dv;

            for (let i = 0; i < this.numParticles; i++) {
                const x = this.particlePos[2 * i];
                const y = this.particlePos[2 * i + 1];

                const x0 = Math.min(Math.floor((x - dx) * h1), this.fNumX - 2);
                const tx = ((x - dx) - x0 * h) * h1;
                const x1 = Math.min(x0 + 1, this.fNumX-2);
                
                const y0 = Math.min(Math.floor((y-dy)*h1), this.fNumY-2);
                const ty = ((y - dy) - y0*h) * h1;
                const y1 = Math.min(y0 + 1, this.fNumY-2);

                const sx = 1.0 - tx;
                const sy = 1.0 - ty;

                const d0 = sx*sy;
                const d1 = tx*sy;
                const d2 = tx*ty;
                const d3 = sx*ty;

                const nr0 = x0*n + y0;
                const nr1 = x1*n + y0;
                const nr2 = x1*n + y1;
                const nr3 = x0*n + y1;

                if (toGrid) {
                    const pv = this.particleVel[2 * i + component];
                    f[nr0] += pv * d0;  d[nr0] += d0;
                    f[nr1] += pv * d1;  d[nr1] += d1;
                    f[nr2] += pv * d2;  d[nr2] += d2;
                    f[nr3] += pv * d3;  d[nr3] += d3;
                } else {
                    const offset = component === 0 ? n : 1;
                    const valid0 = this.cellType[nr0] !== AIR_CELL || this.cellType[nr0 - offset] !== AIR_CELL ? 1.0 : 0.0;
                    const valid1 = this.cellType[nr1] !== AIR_CELL || this.cellType[nr1 - offset] !== AIR_CELL ? 1.0 : 0.0;
                    const valid2 = this.cellType[nr2] !== AIR_CELL || this.cellType[nr2 - offset] !== AIR_CELL ? 1.0 : 0.0;
                    const valid3 = this.cellType[nr3] !== AIR_CELL || this.cellType[nr3 - offset] !== AIR_CELL ? 1.0 : 0.0;

                    const v = this.particleVel[2 * i + component];
                    const d = valid0 * d0 + valid1 * d1 + valid2 * d2 + valid3 * d3;

                    if (d > 0.0) {
                        const picV = (valid0 * d0 * f[nr0] + valid1 * d1 * f[nr1] + valid2 * d2 * f[nr2] + valid3 * d3 * f[nr3]) / d;
                        const corr = (valid0 * d0 * (f[nr0] - prevF[nr0]) + valid1 * d1 * (f[nr1] - prevF[nr1])
                            + valid2 * d2 * (f[nr2] - prevF[nr2]) + valid3 * d3 * (f[nr3] - prevF[nr3])) / d;
                        const flipV = v + corr;

                        this.particleVel[2 * i + component] = (1.0 - flipRatio) * picV + flipRatio * flipV;
                    }
                }
            }

            if (toGrid) {
                for (let i = 0; i < f.length; i++) {
                    if (d[i] > 0.0)
                        f[i] /= d[i];
                }

                // restore solid cells
                for (let i = 0; i < this.fNumX; i++) {
                    for (let j = 0; j < this.fNumY; j++) {
                        const solid = this.cellType[i * n + j] === SOLID_CELL;
                        if (solid || (i > 0 && this.cellType[(i - 1) * n + j] === SOLID_CELL))
                            this.u[i * n + j] = this.prevU[i * n + j];
                        if (solid || (j > 0 && this.cellType[i * n + j - 1] === SOLID_CELL))
                            this.v[i * n + j] = this.prevV[i * n + j];
                    }
                }
            }
        }
    }

    solveIncompressibility(numIters, dt, overRelaxation, compensateDrift = true) {
        this.p.fill(0.0);
        this.prevU.set(this.u);
        this.prevV.set(this.v);

        const n = this.fNumY;
        const cp = this.density * this.h / dt;

        for (let iter = 0; iter < numIters; iter++) {
            for (let i = 1; i < this.fNumX-1; i++) {
                for (let j = 1; j < this.fNumY-1; j++) {
                    if (this.cellType[i*n + j] !== FLUID_CELL)
                        continue;

                    const center = i * n + j;
                    const left = (i - 1) * n + j;
                    const right = (i + 1) * n + j;
                    const bottom = i * n + j - 1;
                    const top = i * n + j + 1;

                    const s = this.s[center];
                    const sx0 = this.s[left];
                    const sx1 = this.s[right];
                    const sy0 = this.s[bottom];
                    const sy1 = this.s[top];
                    const sSum = sx0 + sx1 + sy0 + sy1;
                    if (sSum === 0.0)
                        continue;

                    let div = this.u[right] - this.u[center] + 
                        this.v[top] - this.v[center];

                    if (this.particleRestDensity > 0.0 && compensateDrift) {
                        const k = 1.0;
                        const compression = this.particleDensity[i*n + j] - this.particleRestDensity;
                        if (compression > 0.0)
                            div = div - k * compression;
                    }

                    const p = -div / sSum;
                    const pOverRelaxed = p * overRelaxation;
                    this.p[center] += cp * pOverRelaxed;

                    this.u[center] -= sx0 * pOverRelaxed;
                    this.u[right] += sx1 * pOverRelaxed;
                    this.v[center] -= sy0 * pOverRelaxed;
                    this.v[top] += sy1 * pOverRelaxed;
                }
            }
        }
    }

    updateParticleColors() {
        const h1 = this.fInvSpacing;

        for (let i = 0; i < this.numParticles; i++) {
            const s = 0.01;

            this.particleColor[3 * i] = clamp(this.particleColor[3 * i] - s, 0.0, 1.0);
            this.particleColor[3 * i + 1] = clamp(this.particleColor[3 * i + 1] - s, 0.0, 1.0);
            this.particleColor[3 * i + 2] = clamp(this.particleColor[3 * i + 2] + s, 0.0, 1.0);

            const x = this.particlePos[2 * i];
            const y = this.particlePos[2 * i + 1];
            const xi = clamp(Math.floor(x * h1), 1, this.fNumX - 1);
            const yi = clamp(Math.floor(y * h1), 1, this.fNumY - 1);
            const cellNr = xi * this.fNumY + yi;

            const d0 = this.particleRestDensity;

            if (d0 > 0.0) {
                const relDensity = this.particleDensity[cellNr] / d0;
                if (relDensity < 0.7) {
                    const s = 0.8;
                    this.particleColor[3 * i] = s;
                    this.particleColor[3 * i + 1] = s;
                    this.particleColor[3 * i + 2] = 1.0;
                }
            }
        }
    }

    setSciColor(cellNr, val, minVal, maxVal) {
        val = Math.min(Math.max(val, minVal), maxVal - 0.0001);
        const d = maxVal - minVal;
        val = d === 0.0 ? 0.5 : (val - minVal) / d;
        const m = 0.25;
        const num = Math.floor(val / m);
        const s = (val - num * m) / m;
        let r, g, b;

        switch (num) {
            case 0: r = 0.0; g = s; b = 1.0; break;
            case 1: r = 0.0; g = 1.0; b = 1.0-s; break;
            case 2: r = s; g = 1.0; b = 0.0; break;
            case 3: r = 1.0; g = 1.0 - s; b = 0.0; break;
        }

        this.cellColor[3 * cellNr] = r;
        this.cellColor[3 * cellNr + 1] = g;
        this.cellColor[3 * cellNr + 2] = b;
    }

    updateCellColors() {
        this.cellColor.fill(0.0);
    
        for (let i = 0; i < this.fNumCells; i++) {
            if (this.cellType[i] === SOLID_CELL) {
                this.cellColor[3*i] = 0.5;
                this.cellColor[3*i + 1] = 0.5;
                this.cellColor[3*i + 2] = 0.5;
            }
            else if (this.cellType[i] === FLUID_CELL) {
                const d = this.particleDensity[i];
                if (this.particleRestDensity > 0.0)
                    this.setSciColor(i, d / this.particleRestDensity, 0.0, 2.0);
            }
        }
    }

    simulate(dt, gravity, flipRatio, numPressureIters, numParticleIters, overRelaxation, compensateDrift, separateParticles, obstacleX, obstacleY, obstacleRadius) {
        const numSubSteps = 1;
        const sdt = dt / numSubSteps;

        for (let step = 0; step < numSubSteps; step++) {
            this.integrateParticles(sdt, gravity);
            if (separateParticles)
                this.pushParticlesApart(numParticleIters);
            this.handleParticleCollisions(obstacleX, obstacleY, obstacleRadius);
            this.transferVelocities(true);
            this.updateParticleDensity();
            this.solveIncompressibility(numPressureIters, sdt, overRelaxation, compensateDrift);
            this.transferVelocities(false, flipRatio);
        }

        this.updateParticleColors();
        this.updateCellColors();
    }
} 