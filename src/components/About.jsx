import aboutImg from '../assets/about.jpg';
import { ABOUT_TEXT } from '../constants';
import { motion } from 'framer-motion';

const About = () => {
    return (
        <div className="border-b border-neutral-900 pb-4">
            <h1 className="text-4xl my-20 text-center">About <span className="text-neutral-500">Me</span></h1>
            <div className="flex flex-wrap">
                <motion.div whileInView={{x: 0, opacity: 1}} initial={{x: -100, opacity: 0}} transition={{duration: 0.5}} className="w-full lg:w-1/2 lg:p-8">
                    <div className="flex items-center justify-center">
                        <img src={aboutImg} alt="About" className="w-full h-auto rounded-2xl" />
                    </div>
                </motion.div>
                <motion.div whileInView={{x: 0, opacity: 1}} initial={{x: 100, opacity: 0}} transition={{duration: 0.5}} className="w-full lg:w-1/2">
                    <div className="flex justify-center lg:justify-start">
                        <p className="my-2 max-w-xl py-6">{ABOUT_TEXT}</p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default About