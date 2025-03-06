import logo from '../assets/fikri_w.png'
import {FaLinkedin} from 'react-icons/fa'
import {FaGithub} from 'react-icons/fa'
import {FaInstagram} from 'react-icons/fa'
import {FaYoutube} from 'react-icons/fa'
import { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="mb-12 md:mb-20 px-4 py-4 md:py-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img className="mx-2 w-32 md:w-48" src={logo} alt="logo" />
          </div>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2 rounded-md focus:outline-none" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg 
              className="h-6 w-6" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
        
        {/* Social media icons - desktop and mobile */}
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex flex-row justify-center mt-4 md:mt-0 md:m-0 gap-4 items-center text-xl md:text-2xl`}>
          <a href="https://www.linkedin.com/in/fikriwahidin/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors">
            <FaLinkedin />
          </a>
          <a href="https://github.com/Fikri645" target="_blank" rel="noopener noreferrer" className="hover:text-gray-600 transition-colors">
            <FaGithub />
          </a>
          <a href="https://instagram.com/fikri0o0" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500 transition-colors">
            <FaInstagram />
          </a>
          <a href="https://www.youtube.com/@Fikri0o0" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 transition-colors">
            <FaYoutube />
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar