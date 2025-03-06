import { TypeAnimation } from 'react-type-animation';
import { HERO_CONTENT } from '../constants';
import profilePic from '../assets/profilepic.jpg';
import { motion } from 'framer-motion';

const container = (delay) => ({
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: delay } }
})

const Hero = () => {
    return (
        <div className="border-b border-neutral-900 pb-4 lg:mb-35">
            <div className="flex flex-wrap">
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-col items-center lg:items-start">
                        <motion.h1 variants={container(0)} initial="hidden" animate="visible" className="pb-16 text-6xl font-thin tracking-tight lg:mt-16 lg:text-8xl">
                            Fikri Wahidin
                        </motion.h1>
                        <motion.div 
                        variants={container(0.5)} 
                        initial="hidden" 
                        animate="visible"
                        className="h-16"
                        >
                            <TypeAnimation
                                sequence={[
                                    'Data Scientist',
                                    2000,
                                    'Data Analyst',
                                    2000,
                                    'Data Engineer',
                                    2000,
                                    'Web Developer',
                                    2000,
                                    'Game Developer',
                                    2000,
                                ]}
                                wrapper="span"
                                speed={50}
                                repeat={Infinity}
                                className="bg-gradient-to-r from-pink-300 via-slate-500 to-purple-500 text-transparent bg-clip-text text-4xl tracking-tight"
                            />
                        </motion.div>
                        <motion.p variants={container(1)} initial="hidden" animate="visible" className="my-2 max-w-xl py-6 font-light tracking-tight">
                            {HERO_CONTENT}
                        </motion.p>
                    </div>
                </div>
                <div className="w-full lg:w-1/2 lg:p-8">
                    <div className="flex justify-center">
                        <motion.img initial={{x: 100, opacity: 0}} animate={{x: 0, opacity: 1}} transition={{duration: 1, delay: 1.2}} src={profilePic} alt="Profile" className="w-full h-auto" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero