import { CONTACT } from '../constants';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const Contact = ({ onShowSolarSimulation }) => {
  return (
    <div className="pb-20 mt-20">
        <motion.h2 whileInView={{opacity: 1, y: 0}} initial={{opacity: 0, y: -100}} transition={{duration: 0.5}} className="text-4xl my-10 text-center">Contact</motion.h2>
        <div className="text-center tracking-tighter">
            <motion.p whileInView={{opacity: 1, x: 0}} initial={{opacity: 0, x: -100}} transition={{duration: 1}} className="my-4">{CONTACT.address}</motion.p>
            <motion.p whileInView={{opacity: 1, x: 0}} initial={{opacity: 0, x: 100}} transition={{duration: 1}} className="my-4">{CONTACT.phoneNo}</motion.p>
            <a className="border-b mb-10 inline-block" href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
            
            <div className="mt-24 flex flex-col items-center justify-center">
                <p className="mb-4 text-sm text-cyan-400">Explore Solar System</p>
                <motion.button
                    onClick={onShowSolarSimulation}
                    className="flex items-center justify-center w-14 h-14 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors border-2 border-cyan-800"
                    whileHover={{ y: 5, scale: 1.1 }}
                    animate={{ y: [0, 8, 0] }}
                    transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "loop"
                    }}
                >
                    <FaChevronDown className="text-2xl text-cyan-400" />
                </motion.button>
            </div>
        </div>
    </div>
  )
}

export default Contact