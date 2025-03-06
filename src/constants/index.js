import project1 from "../assets/projects/harvest_scan.jpg";
import project2 from "../assets/projects/erpeel_shop.jpg";
import project3 from "../assets/projects/brain_tumor_detection.jpg";
import project4 from "../assets/projects/zombie-apocalypse_scratch_rougelike-shooter.jpg";
import project5 from "../assets/projects/consulife.jpg";
import project6 from "../assets/projects/2ways_game.jpg";
import project7 from "../assets/projects/myfirst_portfolio_web.jpg";
import project8 from "../assets/projects/libre_e-commerce.jpg";
import project9 from "../assets/projects/cj_shortest_path_web.jpg";
import project10 from "../assets/projects/portfolio_web.jpg";

export const HERO_CONTENT = `Hello, I am Muhammad Fikri Wahidin, a graduate of Informatics focusing in software engineering and machine learning. With an educational background at SMK Telkom Banjarbaru and Telkom University, I have a strong foundation in programming, especially machine learning, data analysis, and web development. Let's collaborate to build a more inclusive and impactful technological future.`;

export const ABOUT_TEXT = `I come from Banjar Regency, South Kalimantan, and have been on a long journey in the world of technology. My passion for programming began when I attended SMK Telkom Banjarbaru with a Software Engineering expertise. There, I learned the basics of algorithms and software development, which became the foundation for my decision to continue my studies in the Informatics Study Program, Telkom University.

During my studies, I studied areas such as machine learning (building predictive models for real-world data), data analysis with Python and SQL, and cybersecurity principles in designing systems. I believe that technology should be a tool to solve real problems, and that is why I focus on developing code-based solutions that can be adapted across sectors, from fintech to public services.

My vision is to contribute to the advancement of Indonesian technology by encouraging sustainable innovation, accessibility for all, and security in the digital era. Let's connect and explore opportunities to create impact together through technology.`;

export const EXPERIENCES = [
  {
    year: "September 2024 - November 2024",
    role: "Data Analyst Intern",
    company: "Telkom Indonesia",
    description: `Designed and implemented an ELK Stack-based security monitoring system within the Network Function Virtualization division to detect suspicious multi-device login activities across Telkom's infrastructure. Leveraged Elasticsearch for efficient log indexing and Kibana for comprehensive visualization, developing custom anomaly detection rules that identified high-risk IP addresses for proactive threat mitigation. Integrated Telegram API to deliver real-time alerts for critical security events, including simultaneous logins from 4+ devices within a one-minute window. Created interactive Kibana dashboards highlighting the top 10 users with abnormal login patterns, enabling faster decision-making for cybersecurity operations.`,
    technologies: ["Elasticsearch", "Kibana", "Logstash", "Telegram API"],
  },
  {
    year: "Feb 2024 - July 2024",
    role: "Machine Learning Cohort",
    company: "Bangkit Academy led by Google, Tokopedia, Gojek, and Traveloka",
    description: `Completed 500+ hours of intensive technical training in machine learning fundamentals, TensorFlow, and end-to-end model deployment. Earned 35 professional certifications from Coursera and Dicoding, developing expertise in data preprocessing, model optimization, and production-grade ML workflows. Led development of "Harvest Scan" capstone project, implementing a CNN model using transfer learning with MobileNetV2 that achieved 95% validation accuracy for plant disease detection. Collaborated with Android and Cloud teams to integrate the model into a scalable application, employing Agile methodologies and tools including Git and Jupyter Notebook. Successfully delivered an ML solution addressing real-world agricultural challenges while mastering Python, TensorFlow, and cross-functional teamwork.`,
    technologies: ["Python",
      "TensorFlow",
      "Keras",
      "Pandas/Numpy",
      "Git/GitHub",
      "Jupyter Notebook",],
  },
  {
    year: "September 2021 - March 2025",
    role: "Informatics Student",
    company: "Telkom University",
    description: `Pursued undergraduate education in Informatics at Telkom University, building upon my high school specialization. Developed comprehensive expertise in Programming, Computing Systems, and Computer Logic Processes. Applied theoretical knowledge through practical projects, gaining proficiency in multiple programming languages and frameworks while developing strong analytical and problem-solving skills essential for software development and systems engineering.`,
    technologies: ["Python", "R", "GoLang", "C++", "C", "Java", "Laravel", "MySQL", "Cyber Security"],
  },
  {
    year: "January 2020 - March 2020",
    role: "Game Developer Intern",
    company: "Rumah Koding Indonesia",
    description: `Completed a game development internship at Rumah Koding Indonesia, a coding bootcamp company based in Banjarbaru, during my second year of high school. Developed a 3D platformer game using Unity and C#, implementing game mechanics, user interfaces, and interactive elements. I also created a shooting game using Scratch, demonstrating versatility in development platforms while strengthening foundational programming concepts and game design principles.`,
    technologies: ["Unity", "C#", "Scratch"],
  },
  {
    year: "July 2018 - July 2021",
    role: "Software Engineering Student",
    company: "SMK Telkom Banjarbaru",
    description: `I studied at SMK Telkom Banjarbaru with Software Engineering Skills Competence. I chose that major because I'm interested in programming and algorithms.`,
    description: `Specialized in Software Engineering at SMK Telkom Banjarbaru, focusing on programming fundamentals and algorithmic thinking. Developed strong technical foundations through hands-on projects in web development, database management, and application programming. Mastered multiple programming languages and frameworks, building practical skills in software design, development methodologies, and problem-solving techniques essential for professional software engineering. During my studies, I also actively participated in competitions. In October 2020, I won 2nd place in the Scientific Writing Contest by ByteComp. Later, in May 2021, I secured 1st place in the Scientific Writing Contest by KalPhyCo, where I presented a paper on the utilization of Kalimantan's natural resources potential with appropriate technology.`, 
    technologies: ["Laravel", "MySQL", "HTML", "CSS", "JavaScript", "PHP", "C#", "Java", "Pascal"],
  },
];

export const PROJECTS = [
  {
    title: "Harvest Scan (Plant Disease Detection) - 2024",
    type: ["machine-learning"],
    image: project1,
    description:
      "Harvest Scan is a mobile application that leverages computer vision and deep learning to detect and diagnose plant diseases from smartphone photos. Built with TensorFlow and using transfer learning with MobileNetV2 architecture, this model achieves 95% validation accuracy while remaining lightweight enough for mobile deployment. The application helps farmers identify crop diseases early, providing timely treatment recommendations to reduce crop losses and improve agricultural productivity.",
    technologies: ["Python", "TensorFlow", "Keras", "MobileNetV2"],
  },
  {
    title: "Consulife (Mental Health Classification) - 2024",
    type: ["machine-learning", "web-development"],
    image: project5,
    description:
      "Consulife is a comprehensive mental health platform available on both web and mobile. As a key member of both the machine learning and backend teams, We developed and implemented the NLP classification system that analyzes users' text inputs to assess psychological states. We engineered the BERT-based model that classifies potential depression, anxiety, and stress levels with clinical relevance, achieving high accuracy in sentiment detection. Additionally, We built the Flask-based backend API infrastructure to process user journal entries, store results securely, and serve appropriate responses based on classification outcomes. My dual role ensured seamless integration between the ML model and the application's core functionality, creating a cohesive user experience that connects individuals with appropriate mental health resources when concerning patterns are detected.",
    technologies: ["Python", "BERT", "Flask", "Laravel", "MySQL"],
  },
  {
    title: "Brain Tumor Detection YOLO Model - 2024",
    type: ["machine-learning"],
    image: project3,
    description:
      "This medical imaging project implements a customized YOLO (You Only Look Once) object detection model to identify and localize brain tumors in MRI scans. I optimized the model's hyperparameters using Ray Tune, implementing distributed hyperparameter tuning to systematically explore the parameter space and maximize detection accuracy. The system was trained on annotated medical imaging datasets with particular attention to balancing precision and recall to minimize false negatives in this critical diagnostic application.",
    technologies: ["Python", "YOLO", "Ray Tune"],
  },
  {
    title: "Portfolio Website (This Website) - 2025",
    type: ["web-development"],
    image: project10,
    description:
      "This is my portfolio website that I built using React and Tailwind CSS. I deployed the website using Vercel.",
    technologies: ["React", "Tailwind CSS", "Vercel"],
  },
  {
    title: "Erpeel Shop (E-Commerce Website) - 2023",
    type: ["web-development"],
    image: project2,
    description:
      "Erpeel Shop is a specialized e-commerce platform built with Laravel that focuses exclusively on computer accessories including mouse, keyboard, headset, and mousepad. The admin dashboard provides comprehensive inventory management. ",
    technologies: ["Laravel", "MySQL", "HTML", "CSS", "PHP"],
  },
  {
    title: "Libre (E-Commerce Website) - 2020",
    type: ["web-development"],
    image: project8,
    description:
      "Libre is a specialized e-commerce marketplace focusing on books and literary products, featuring advanced search capabilities with filtering by genre, author, and publication date. The platform includes personalized recommendation algorithms based on user browsing history and purchase patterns. Built with Laravel and MySQL, Libre incorporates a rating and review system, wishlists, and integration with major payment gateways. The responsive design ensures seamless shopping experiences across all devices.",
    technologies: ["Laravel", "MySQL", "HTML", "CSS", "PHP"],
  },
  {
    title: "My First Portfolio Website - 2021",
    type: ["web-development"],
    image: project7,
    description:
      "My First Portfolio Website is a portfolio website that uses HTML, CSS, and JavaScript to create the website. I deployed the website using GitHub Pages",
    technologies: ["HTML", "CSS", "JavaScript"],
  },
  {
    title: "CJ Shortest Path (Web) - 2023",
    type: ["web-development"],
    image: project9,
    description:
      "CJ Shortest Path is an interactive web application that visualizes pathfinding algorithms in action. The application implements both Dijkstra's algorithm and Bellman-Ford algorithm, allowing users to compare their performance in finding optimal routes through various graph networks. The interface enables users to create custom maps with weighted paths, demonstrating algorithm efficiency. This educational tool illustrates key concepts in graph theory and algorithmic optimization through an engaging, interactive experience.",
    technologies: ["HTML", "CSS", "JavaScript", "Dijkstra", "Bellman-Ford"],
  },
  {
    title: "Zombie Apocalypse Game (Scratch Rougelike Shooter) - 2020",
    type: ["game-development"],
    image: project4,
    description:
      "Zombie Apocalypse is a top-down roguelike shooter game developed in Scratch, featuring procedurally generated levels, permadeath mechanics, and progressive difficulty scaling. The game includes various weapon types, enemy varieties with distinct behaviors, and power-up systems that create unique gameplay experiences in each run. Despite the platform limitations, the game implements collision detection, basic AI for enemy pathfinding, and resource management systems that challenge players to strategize their survival approach.",
    technologies: ["Scratch"],
  },
  {
    title: "2 Ways Ball Game (3D Platformer) - 2020",
    type: ["game-development"],
    image: project6,
    description:
      "2 Ways Ball Game is a minimalist 3D platformer developed in Unity that centers around a simple yet challenging core mechanic: each player click alternates the ball's direction between left and right. The game features procedurally generated platforms that create a vertical climbing path, challenging players to time their direction changes perfectly to navigate upward. Collectible coins placed strategically on platforms add an additional layer of challenge, encouraging players to take risks for higher scores. The clean, focused design emphasizes gameplay over graphics while demonstrating fundamental game development principles.",
    technologies: ["Unity", "C#"],
  },  
  
];

export const CONTACT = {
  address: "Bandung, Indonesia",
  phoneNo: "+62 812-4250-2971",
  email: "fikriw.contact@gmail.com",
};
