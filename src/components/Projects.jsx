import { PROJECTS } from '../constants';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Projects = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeTab, setActiveTab] = useState('all'); // Default to showing all projects
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3; // Number of projects to display per page

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  // Define project categories
  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'machine-learning', label: 'Machine Learning/Data Analysis' },
    { id: 'web-development', label: 'Web Development' },
    { id: 'game-development', label: 'Game Development' }
  ];

  // Filter projects based on active tab
  const filteredProjects = activeTab === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(project => project.type.includes(activeTab));

  // Calculate pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Reset to page 1 when changing tabs
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentPage(1);
  };

  return (
    <div className="border-b border-neutral-900 pb-4">
        <motion.h2 whileInView={{opacity: 1, y: 0}} initial={{opacity: 0, y: -100}} transition={{duration: 0.5}} className="text-4xl my-20 text-center">Projects</motion.h2>
        
        {/* Category Tabs */}
        <div className="flex justify-center mb-12 flex-wrap">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleTabChange(category.id)}
              className={`px-4 py-2 mx-2 mb-2 rounded-md transition-colors ${
                activeTab === category.id 
                  ? 'bg-purple-800 text-white' 
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        <div>
            {currentProjects.map((project, index) => (
                <motion.div whileInView={{opacity: 1, x: 0}} initial={{opacity: 0, x: -100}} transition={{duration: 1}} className="mb-8 flex flex-wrap lg:justify-center" key={index}>
                    <motion.div className="w-full lg:w-1/4">
                        <img 
                          src={project.image} 
                          alt={project.title} 
                          width={150} 
                          height={150} 
                          className="mb-6 rounded cursor-pointer hover:opacity-80 transition-opacity" 
                          onClick={() => openModal(project.image)}
                        />
                    </motion.div>
                    <motion.div whileInView={{opacity: 1, x: 0}} initial={{opacity: 0, x: 100}} transition={{duration: 1}} className="w-full max-w-xl lg:w-3/4">
                        <h6 className="mb-2 font-semibold">{project.title}</h6>
                        <p className="mb-4 text-neutral-400">{project.description}</p>
                        <div className="flex flex-wrap">
                        {project.technologies.map((technology, index) => (
                            <span key={index} className="mr-2 mt-4 rounded bg-neutral-900 px-2 py-1 text-sm text-purple-800 font-medium">{technology}</span>
                        ))}
                        </div>
                    </motion.div>
                </motion.div>
            ))}
        </div>
        
        {/* Pagination Controls */}
        {totalPages > 1 && (
          <motion.div 
            whileInView={{opacity: 1, y: 0}} 
            initial={{opacity: 0, y: 50}} 
            transition={{duration: 0.5}} 
            className="flex justify-center items-center mt-10 mb-4"
          >
            <button 
              onClick={prevPage} 
              disabled={currentPage === 1}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === 1 
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
                  : 'bg-neutral-800 text-white hover:bg-neutral-700'
              }`}
            >
              &laquo;
            </button>
            
            {/* Page Numbers */}
            <div className="flex items-center">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`mx-1 px-3 py-1 rounded ${
                    currentPage === number
                      ? 'bg-purple-800 text-white'
                      : 'bg-neutral-800 text-white hover:bg-neutral-700'
                  }`}
                >
                  {number}
                </button>
              ))}
            </div>
            
            <button 
              onClick={nextPage} 
              disabled={currentPage === totalPages}
              className={`mx-1 px-3 py-1 rounded ${
                currentPage === totalPages 
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
                  : 'bg-neutral-800 text-white hover:bg-neutral-700'
              }`}
            >
              &raquo;
            </button>
          </motion.div>
        )}

        {/* Image Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={closeModal}>
            <div className="relative max-w-4xl max-h-[90vh] p-2">
              <button 
                className="absolute -top-10 right-0 w-8 h-8 flex items-center justify-center rounded-full bg-white text-black"
                onClick={(e) => {
                  e.stopPropagation();
                  closeModal();
                }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              <img 
                src={selectedImage} 
                alt="Project Detail" 
                className="max-w-full max-h-[80vh] object-contain rounded"
                onClick={(e) => e.stopPropagation()} 
              />
            </div>
          </div>
        )}
    </div>
  )
}

export default Projects