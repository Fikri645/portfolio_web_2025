import { FaPython, FaLaravel, FaDatabase, FaCode } from "react-icons/fa"
import { SiTailwindcss, SiTensorflow, SiScikitlearn, SiElasticsearch, SiBootstrap, SiMysql } from "react-icons/si"
import { motion } from 'framer-motion';
import SolarSimulation from './SolarSimulation';
import { useRef } from 'react';
import WaterSimulation from './WaterSimulation';

const iconVariants = (duration) => ({
    initial: { y: -10 },
    animate: { 
        y: [10, -10],
        transition: {
            duration: duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear"
        }
    }
})

// const Technologies = () => {
//     const containerRef = useRef(null);

//     return (
//         <div className="border-b border-neutral-800">
//             <motion.h2 whileInView={{opacity: 1, y: 0}} initial={{opacity: 0, y: -100}} transition={{duration: 1.5}} className="text-4xl my-20 text-center">Technologies</motion.h2>
//             <div ref={containerRef} className="relative">
//                 <WaterSimulation containerRef={containerRef} />
//                 <motion.div whileInView={{opacity: 1, x: 0}} initial={{opacity: 0, x: -100}} transition={{duration: 1.5}} className="flex flex-wrap justify-center gap-4 items-center relative z-10 pb-24">
//                     {/* Python */}
//                     <motion.div variants={iconVariants(2.5)} initial="initial" animate="animate" className="rounded-2xl border-4 border-neutral-800 p-4 flex flex-col items-center bg-black/50 backdrop-blur-sm">
//                         <FaPython className="text-7xl text-blue-500" />
//                         <span className="text-sm mt-2">Python</span>
//                     </motion.div>
//                     {/* TensorFlow */}
//                     <motion.div variants={iconVariants(3)} initial="initial" animate="animate" className="rounded-2xl border-4 border-neutral-800 p-4 flex flex-col items-center bg-black/50 backdrop-blur-sm">
//                         <SiTensorflow className="text-7xl text-orange-500" />
//                         <span className="text-sm mt-2">TensorFlow</span>
//                     </motion.div>
//                     {/* Scikit-learn */}
//                     <motion.div variants={iconVariants(5)} initial="initial" animate="animate" className="rounded-2xl border-4 border-neutral-800 p-4 flex flex-col items-center bg-black/50 backdrop-blur-sm">
//                         <SiScikitlearn className="text-7xl text-orange-600" />
//                         <span className="text-sm mt-2">Scikit-learn</span>
//                     </motion.div>
//                     {/* Elasticsearch */}
//                     <motion.div variants={iconVariants(2)} initial="initial" animate="animate" className="rounded-2xl border-4 border-neutral-800 p-4 flex flex-col items-center bg-black/50 backdrop-blur-sm">
//                         <SiElasticsearch className="text-7xl text-green-500" />
//                         <span className="text-sm mt-2">Elasticsearch</span>
//                     </motion.div>
//                     {/* MySQL */}
//                     <motion.div variants={iconVariants(6)} initial="initial" animate="animate" className="rounded-2xl border-4 border-neutral-800 p-4 flex flex-col items-center bg-black/50 backdrop-blur-sm">
//                         <SiMysql className="text-7xl text-blue-400" />
//                         <span className="text-sm mt-2">MySQL</span>
//                     </motion.div>
//                     {/* Laravel */}
//                     <motion.div variants={iconVariants(4)} initial="initial" animate="animate" className="rounded-2xl border-4 border-neutral-800 p-4 flex flex-col items-center bg-black/50 backdrop-blur-sm">
//                         <FaLaravel className="text-7xl text-red-500" />
//                         <span className="text-sm mt-2">Laravel</span>
//                     </motion.div>
//                     {/* Tailwind */}
//                     <motion.div variants={iconVariants(3)} initial="initial" animate="animate" className="rounded-2xl border-4 border-neutral-800 p-4 flex flex-col items-center bg-black/50 backdrop-blur-sm">
//                         <SiTailwindcss className="text-7xl text-cyan-400" />
//                         <span className="text-sm mt-2">Tailwind</span>
//                     </motion.div>
//                     {/* Bootstrap */}
//                     <motion.div variants={iconVariants(3.5)} initial="initial" animate="animate" className="rounded-2xl border-4 border-neutral-800 p-4 flex flex-col items-center bg-black/50 backdrop-blur-sm">
//                         <SiBootstrap className="text-7xl text-purple-500" />
//                         <span className="text-sm mt-2">Bootstrap</span>
//                     </motion.div>
//                 </motion.div>
//             </div>
//         </div>
//     )
// }

const Technologies = () => {
    return (
        <div className="border-b border-neutral-800 pb-24">
            <motion.h2 whileInView={{opacity: 1, y: 0}} initial={{opacity: 0, y: -100}} transition={{duration: 1.5}} className="text-4xl my-20 text-center">Technologies</motion.h2>
            <motion.div whileInView={{opacity: 1, x: 0}} initial={{opacity: 0, x: -100}} transition={{duration: 1.5}} className="flex flex-wrap justify-center gap-4 items-center">
                {/* Python */}
                <motion.div variants={iconVariants(2.5)} initial="initial" animate="animate" className="rounded-2xl border-4 border-neutral-800 p-4 flex flex-col items-center">
                    <FaPython className="text-7xl text-blue-500" />
                    <span className="text-sm mt-2">Python</span>
                </motion.div>
                {/* TensorFlow */}
                <motion.div variants={iconVariants(3)} initial="initial" animate="animate" className="rounded-2xl border-4 border-neutral-800 p-4 flex flex-col items-center">
                    <SiTensorflow className="text-7xl text-orange-500" />
                    <span className="text-sm mt-2">TensorFlow</span>
                </motion.div>
                {/* Scikit-learn */}
                <motion.div variants={iconVariants(5)} initial="initial" animate="animate" className="rounded-2xl border-4 border-neutral-800 p-4 flex flex-col items-center">
                    <SiScikitlearn className="text-7xl text-orange-600" />
                    <span className="text-sm mt-2">Scikit-learn</span>
                </motion.div>
                {/* Elasticsearch */}
                <motion.div variants={iconVariants(2)} initial="initial" animate="animate" className="rounded-2xl border-4 border-neutral-800 p-4 flex flex-col items-center">
                    <SiElasticsearch className="text-7xl text-green-500" />
                    <span className="text-sm mt-2">Elasticsearch</span>
                </motion.div>
                {/* MySQL */}
                <motion.div variants={iconVariants(6)} initial="initial" animate="animate" className="rounded-2xl border-4 border-neutral-800 p-4 flex flex-col items-center">
                    <SiMysql className="text-7xl text-blue-400" />
                    <span className="text-sm mt-2">MySQL</span>
                </motion.div>
                {/* Laravel */}
                <motion.div variants={iconVariants(4)} initial="initial" animate="animate" className="rounded-2xl border-4 border-neutral-800 p-4 flex flex-col items-center">
                    <FaLaravel className="text-7xl text-red-500" />
                    <span className="text-sm mt-2">Laravel</span>
                </motion.div>
                {/* Tailwind */}
                <motion.div variants={iconVariants(3)} initial="initial" animate="animate" className="rounded-2xl border-4 border-neutral-800 p-4 flex flex-col items-center">
                    <SiTailwindcss className="text-7xl text-cyan-400" />
                    <span className="text-sm mt-2">Tailwind</span>
                </motion.div>
                {/* Bootstrap */}
                <motion.div variants={iconVariants(3.5)} initial="initial" animate="animate" className="rounded-2xl border-4 border-neutral-800 p-4 flex flex-col items-center">
                    <SiBootstrap className="text-7xl text-purple-500" />
                    <span className="text-sm mt-2">Bootstrap</span>
                </motion.div>
            </motion.div>
            
            {/* Solar System Simulation */}
            <SolarSimulation />

            
        </div>
    )
}

export default Technologies