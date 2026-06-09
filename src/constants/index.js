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
import project11 from "../assets/projects/fikri-proyek-dicoding-data-analysis.streamlit.app.jpg";
import projectMovieRecsys from "../assets/projects/movie_recsys.jpg";
import projectDemandForecasting from "../assets/projects/demand_forecasting.jpg";
import projectChurnPrediction from "../assets/projects/churn_prediction.jpg";
import projectPhilosopherChat from "../assets/projects/philosopher_chat.jpg";

export const HERO_CONTENT = `Hello, I am Muhammad Fikri Wahidin, a graduate of Informatics focusing in software engineering and machine learning. With an educational background at SMK Telkom Banjarbaru and Telkom University, I have a strong foundation in programming, especially machine learning, data analysis, and web development. Let's collaborate to build a more inclusive and impactful technological future.`;

export const ABOUT_TEXT = `I come from Banjar Regency, South Kalimantan, and have been on a long journey in the world of technology. My passion for programming began when I attended SMK Telkom Banjarbaru with a Software Engineering expertise. There, I learned the basics of algorithms and software development, which became the foundation for my decision to continue my studies in the Informatics Study Program, Telkom University.

During my studies, I studied areas such as machine learning (building predictive models for real-world data), data analysis with Python and SQL, and cybersecurity principles in designing systems. I believe that technology should be a tool to solve real problems, and that is why I focus on developing code-based solutions that can be adapted across sectors, from fintech to public services.

My vision is to contribute to the advancement of Indonesian technology by encouraging sustainable innovation, accessibility for all, and security in the digital era. Let's connect and explore opportunities to create impact together through technology.`;

export const EXPERIENCES = [
  {
    year: "November 2025 - May 2026",
    role: "Data Scientist Intern",
    company: "Netmonk (Telkom Indonesia — DDP)",
    description: `Developed and deployed core AI modules for Mona, Netmonk's network-monitoring chatbot used in Telkom Indonesia's production environment. Rebuilt the NLU (Natural Language Understanding) pipeline from a TF-IDF/SVM baseline to a sentence-embedding + KNN classifier, improving intent classification accuracy by over 20% on ambiguous queries. Built a Named Entity Recognition (NER) module using SpaCy to extract network entities (IP addresses, device names, metric types) from free-text user inputs. Engineered a production TTS (Text-to-Speech) service using ONNX-optimized models, reducing inference latency by 60% compared to the previous REST-based approach. Applied LLM-based data augmentation to expand the training dataset for low-resource intents, resulting in more robust model performance across edge cases.`,
    technologies: ["Python", "SpaCy", "ONNX", "FastAPI", "Sentence Transformers", "LLM", "PostgreSQL", "MongoDB"],
  },
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
    description: `Pursued undergraduate education in Informatics at Telkom University, building upon my high school specialization. Developed comprehensive expertise in Programming, Computing Systems, and Computer Logic Processes. Applied theoretical knowledge through practical projects, gaining proficiency in multiple programming languages and frameworks while developing strong analytical and problem-solving skills essential for software development and systems engineering. Earned my degree within 3.5 years (7 semesters) with OPES Scholarship, graduating with Summa Cum Laude honors.`,
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
    title: "ML Batch Fraud Scoring Pipeline - 2026",
    type: ["machine-learning"],
    image: null,
    description:
      "Production-grade fraud-detection batch pipeline built on Apache Airflow 2.9, dbt 1.8, LightGBM, and PostgreSQL 15 — all via Docker Compose. A 10-task DAG ingests 500 synthetic Indonesian transactions every 10 minutes (unique seed per run), transforms them via SQL window-function feature engineering in dbt, scores with a pre-trained LightGBM classifier (PR-AUC 0.9987), and monitors feature drift via PSI with Slack alerting. Demonstrates the complete post-training MLOps stack: orchestration, feature engineering as code, batch scoring, drift gating, and audit logging. Includes a live-stream data simulator, rolling retention policy, CI pipeline, and a GCP Cloud Run Job deployment pattern.",
    technologies: ["Apache Airflow", "dbt", "LightGBM", "PostgreSQL", "Docker", "GitHub Actions"],
    github: "https://github.com/Fikri645/ml-batch-pipeline",
  },
  {
    title: "LLM Fine-Tuning — Indonesian Transaction Extraction - 2026",
    type: ["machine-learning"],
    image: null,
    description:
      "Fine-tuning three small open LLMs (Qwen2.5-3B, Gemma-4-E2B, Phi-3.5-mini) with QLoRA, DoRA, and LoRA (PEFT + TRL SFTTrainer) to extract structured JSON from Indonesian bank-SMS and e-wallet notifications — on a single RTX 3060 12 GB. Uses 2,000 synthetic training examples across 8 transaction types and 13 financial institutions. Best result: Gemma-4-E2B achieves 98.8% whole-record exact-match (up from 55.7% zero-shot, +43 pp). All PEFT methods reach 100% valid-JSON rate. Published fine-tuned adapter on HuggingFace Hub.",
    technologies: ["PEFT", "TRL", "Qwen2.5-3B", "Gemma 4", "transformers", "bitsandbytes", "Gradio"],
    github: "https://github.com/Fikri645/indo-transaction-extraction",
    demo: "https://huggingface.co/spaces/fikri0o0/indo-transaction-extraction",
  },
  {
    title: "Indonesian Financial Research Agent - 2026",
    type: ["machine-learning"],
    image: null,
    description:
      "A LangGraph multi-agent system for end-to-end IDX company research. A deterministic supervisor routes to parallel financial data fetching (yfinance, 10 ratios, sector-aware thresholds), a ReAct news agent, and hybrid RAG over uploaded annual-report PDFs (Docling + ChromaDB + BM25 + BGE reranker) — producing a structured risk assessment in Bahasa Indonesia. Parallel fetch cuts wall-clock time from ~12s to ~7s. An evaluation harness with 7 LLM-as-judge evaluators found and fixed a real Groq enum bug silently dropping bank tickers. 124 unit tests, CI green.",
    technologies: ["LangGraph", "Groq", "Gemini", "ChromaDB", "Docling", "Pydantic v2", "Gradio"],
    github: "https://github.com/Fikri645/indo-financial-agent",
    demo: "https://huggingface.co/spaces/fikri0o0/indo-financial-agent",
  },
  {
    title: "Real-Time Credit Card Fraud Detection - 2026",
    type: ["machine-learning"],
    image: null,
    description:
      "End-to-end fraud detection on 1.85M Sparkov transactions (~0.5% fraud, temporal split). Benchmarks three modelling paradigms: cost-sensitive LightGBM (PR-AUC 0.967, recall@top-1% = 98%), directed GraphSAGE GNN (card+merchant graph, 18.5M edges), and a legit-only autoencoder for label-free anomaly detection. A custom online feature store enables ~8ms P50 real-time scoring. Key finding: cost-sensitive weighting matches SMOTE at 2.2× less compute — but collapses on the real-world ULB dataset (PR-AUC 0.025 vs 0.418), proving imbalance strategy is dataset-dependent. 35 tests, CI green.",
    technologies: ["LightGBM", "PyTorch Geometric", "SHAP", "Optuna", "MLflow", "FastAPI", "Docker", "Gradio"],
    github: "https://github.com/Fikri645/fraud-detection",
    demo: "https://huggingface.co/spaces/fikri0o0/fraud-detection",
  },
  {
    title: "A/B Testing & Causal Inference Simulator - 2026",
    type: ["machine-learning"],
    image: null,
    description:
      "Four-method experimentation toolkit on the Hillstrom e-mail marketing dataset (64K customers, 3-arm RCT). Covers the full experiment lifecycle: power analysis (sample-size calculator, MDE formula, power curves), frequentist + Bayesian inference (Z-test, Beta-Binomial, P(B>A) = 100%), CUPED variance reduction, sequential testing with mSPRT (always-valid inference — demonstrates 14% vs 5% FPR under peeking), and uplift modelling (CausalForestDML, X-Learner, T-Learner via EconML). 53 unit tests, MLflow tracking, CI green.",
    technologies: ["scipy", "EconML", "NumPy", "MLflow", "Gradio", "GitHub Actions"],
    github: "https://github.com/Fikri645/ab-testing-causal",
    demo: "https://huggingface.co/spaces/fikri0o0/ab-testing-causal",
  },
  {
    title: "Movie Recommendation System - 2026",
    type: ["machine-learning"],
    image: projectMovieRecsys,
    description:
      "A two-stage recommendation pipeline on MovieLens 1M (1M ratings, 6K users, 3.7K movies). Stage 1: Two-Tower neural retrieval model (PyTorch, BPR loss, in-batch negative sampling) encodes users and items into a shared embedding space for fast ANN retrieval. Stage 2: LightGBM LambdaRank re-ranks the top-100 candidates using rich features (retrieval score, user history, item popularity, genre signals). Final model achieves NDCG@10 = 0.1083, outperforming standalone ALS by +10% and bare Two-Tower by +173%. Includes MLflow tracking, FastAPI serving, 60 unit tests, GitHub Actions CI, and a live Gradio demo on HuggingFace Spaces.",
    technologies: ["PyTorch", "LightGBM", "FastAPI", "MLflow", "Gradio", "Docker", "GitHub Actions"],
    github: "https://github.com/Fikri645/movie-recsys",
    demo: "https://huggingface.co/spaces/fikri0o0/movie-recsys",
  },
  {
    title: "Demand Forecasting - 2026",
    type: ["machine-learning"],
    image: projectDemandForecasting,
    description:
      "Retail demand forecasting on the M5 Walmart dataset (42,840 time series, 5 years). Compares 8 models from a Seasonal Naive baseline to Amazon Chronos-2 (2025 SOTA foundation model), with a final ensemble achieving RMSLE 0.1610. Key techniques: recursive multi-step forecasting with lag/rolling/calendar features (LightGBM), fine-tuned Chronos-2 using Seq2SeqTrainer, conformal prediction intervals for uncertainty quantification, and PSI-based drift monitoring. Full MLOps stack: MLflow experiment tracking, FastAPI serving, Docker, GitHub Actions CI, and Gradio live demo on HuggingFace Spaces.",
    technologies: ["LightGBM", "Chronos-2", "HuggingFace Transformers", "FastAPI", "MLflow", "Docker", "Gradio"],
    github: "https://github.com/Fikri645/demand-forecasting",
    demo: "https://huggingface.co/spaces/fikri0o0/demand-forecasting",
  },
  {
    title: "Churn Prediction - 2026",
    type: ["machine-learning"],
    image: projectChurnPrediction,
    description:
      "End-to-end customer churn prediction on a telecom dataset (21 features, ~7K customers, 14.5% churn rate). Benchmarks 4 models (Logistic Regression, Random Forest, XGBoost, LightGBM) with Optuna hyperparameter optimization. Addresses class imbalance via SMOTE and cost-sensitive learning. Key highlights: SHAP explainability for global feature importance and individual prediction breakdowns, calibrated probability scores, and business-cost threshold optimization (profit-maximizing cutoff vs. default 0.5). Deployed with FastAPI + MLflow + Docker, live Gradio demo on HuggingFace Spaces.",
    technologies: ["XGBoost", "LightGBM", "SHAP", "Optuna", "FastAPI", "MLflow", "Docker", "Gradio"],
    github: "https://github.com/Fikri645/churn-prediction",
    demo: "https://huggingface.co/spaces/fikri0o0/churn-prediction",
  },
  {
    title: "Philosopher Chat (RAG Chatbot) - 2026",
    type: ["machine-learning"],
    image: projectPhilosopherChat,
    description:
      "A production-grade Retrieval-Augmented Generation (RAG) chatbot grounded in primary texts of Western philosophers (Nietzsche, Schopenhauer, Hume, Russell). Built a 3-stage pipeline: dense retrieval (EmbeddingGemma 768-dim) + BM25 sparse retrieval → Reciprocal Rank Fusion → BGE cross-encoder reranking → Gemma 4 generation. Evaluated rigorously with RAGAS (faithfulness, answer relevancy, context precision, context recall) across all 3 ablation stages. Reranking delivered the biggest measurable gain (+0.14 Context Recall). Includes multi-provider model comparison tab and Corrective RAG for hallucination prevention. Live on HuggingFace Spaces with ~5,735 indexed chunks.",
    technologies: ["LangChain", "ChromaDB", "EmbeddingGemma", "BGE Reranker", "Gemma 4", "RAGAS", "Gradio"],
    github: "https://github.com/Fikri645/philosopher-chat",
    demo: "https://huggingface.co/spaces/fikri0o0/philosopher-chat",
  },
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
    title: "Data Analysis with Python - 2024",
    type: ["web-development", "machine-learning"],
    image: project11,
    description:
      "This project analyzes bike rental usage data from 2011 to 2012 using Python. Leveraging Pandas for data manipulation and Matplotlib for visualization, it provides insights into seasonal, monthly, and weather-based rental patterns. The interactive dashboard, built with Streamlit, enables users to explore trends over a selected time range, displaying key metrics such as temperature, wind speed, and humidity. Additionally, scatter plots and bar charts illustrate correlations between weather conditions and rental demand, offering a comprehensive view of user behavior.",
    technologies: ["Python", "Pandas", "Matplotlib", "Seaborn", "Streamlit"],
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
