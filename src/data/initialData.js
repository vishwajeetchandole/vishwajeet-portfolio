export const initialData = {
  hero: {
    badge: "👋 Hello, Welcome to my Portfolio",
    name: "Vishwajeet",
    role: "AI & Full Stack Developer",
    tagline: "Building intelligent solutions through Artificial Intelligence, Full Stack Development, and innovative thinking.",
    description: "I'm a third-year B.Tech student specializing in Artificial Intelligence and Machine Learning at KIT College of Engineering, Kolhapur. I enjoy building AI-powered applications, exploring emerging technologies, and transforming ideas into meaningful digital products.",
    institute: "KIT College of Engineering",
    location: "Kolhapur, Maharashtra",
    stats: [
      { value: "10", suffix: "+", label: "Projects Built" },
      { value: "3", suffix: "+", label: "Years of Coding" },
      { value: "30", prefix: "Top ", label: "Sankalpan Ideathon" },
      { value: "Co-Founder", label: "ByteProjex", isStatic: true }
    ]
  },
  about: {
    subtitle: "Passionate about building technology that creates real-world impact.",
    bio1: "My journey in technology began with a Diploma in Computer Engineering, where I developed a strong foundation in programming and problem-solving. Today, as an AIML undergraduate, I focus on combining Artificial Intelligence with modern web technologies to create practical and impactful solutions.",
    bio2: "I enjoy working across the entire development lifecycle—from designing intuitive interfaces to building backend systems and integrating AI capabilities. Beyond academics, I'm continuously improving my problem-solving skills, contributing to projects, and preparing myself for opportunities in the tech industry.",
    focusAreas: [
      "Agentic AI Workflows",
      "Full-Stack SaaS Architectures",
      "Computer Vision & OCR",
      "Data Structures & OOP"
    ],
    highlights: [
      { iconName: "Terminal", title: "Development", desc: "Full Stack & Web Dev" },
      { iconName: "Cpu", title: "AI & ML", desc: "Models & Computer Vision" },
      { iconName: "Award", title: "Distinction", desc: "Diploma in Comp Eng" },
      { iconName: "Code", title: "Solving", desc: "DSA & Problem Solving" }
    ]
  },
  education: [
    {
      id: 1,
      order: 1,
      degree: "B.Tech in Artificial Intelligence & Machine Learning",
      institute: "KIT College of Engineering, Kolhapur",
      duration: "2025 - Present",
      score: "",
      status: "Ongoing",
      description: "Currently pursuing my Bachelor's degree with a focus on Artificial Intelligence, Machine Learning, Full Stack Development, and emerging technologies."
    },
    {
      id: 2,
      order: 2,
      degree: "Diploma in Computer Engineering",
      institute: "Shivaji Polytechnic College, Sangola",
      duration: "2022 - 2025",
      score: "Distinction",
      status: "Completed",
      description: "Built a strong foundation in programming, software development, databases, and problem-solving while actively participating in technical activities and projects."
    },
    {
      id: 3,
      order: 3,
      degree: "Secondary School Certificate (SSC)",
      institute: "State Board, Maharashtra",
      duration: "Completed 2022",
      score: "First Class",
      status: "Completed",
      description: "Completed secondary education with a strong academic foundation and an early interest in technology and computers."
    }
  ],
  skills: [
    {
      id: 1,
      title: "Languages",
      iconName: "FileCode",
      skills: ["Python", "JavaScript", "Java", "C"]
    },
    {
      id: 2,
      title: "Frontend Development",
      iconName: "Layout",
      skills: ["React.js", "HTML5", "CSS3", "Tailwind CSS", "Vite"]
    },
    {
      id: 3,
      title: "Backend Development",
      iconName: "Server",
      skills: ["Flask", "FastAPI", "Node.js", "REST APIs"]
    },
    {
      id: 4,
      title: "Artificial Intelligence & ML",
      iconName: "Brain",
      skills: ["Machine Learning", "OpenCV", "Scikit-Learn", "Tesseract OCR", "Pandas", "NumPy"]
    },
    {
      id: 5,
      title: "Databases",
      iconName: "Database",
      skills: ["PostgreSQL", "MySQL", "SQLite"]
    },
    {
      id: 6,
      title: "Tools & Platforms",
      iconName: "Wrench",
      skills: ["Git", "GitHub", "VS Code", "Figma", "Postman", "Linux"]
    },
    {
      id: 7,
      title: "Core Concepts",
      iconName: "Cpu",
      skills: ["Data Structures & Algorithms", "Object-Oriented Programming", "DBMS", "Operating Systems", "Computer Networks"]
    }
  ],
  projects: [
    {
      id: 1,
      order: 1,
      title: "ParkSync",
      tagline: "Smart Parking Management System",
      description: "An intelligent parking management platform featuring automatic number plate recognition (ANPR), ticket generation, dashboard analytics, and digital invoice generation.",
      tech: ["React", "Flask", "PostgreSQL", "OpenCV"],
      iconName: "Car",
      accent: "orange",
      github: "https://github.com/vishwajeetchandole",
      demo: ""
    },
    {
      id: 2,
      order: 2,
      title: "BrainVault",
      tagline: "AI-Powered Knowledge Workspace",
      description: "A centralized workspace designed to organize notes, documents, and resources with intelligent semantic search and AI-driven tag classification.",
      tech: ["React", "FastAPI", "AI Integration"],
      iconName: "Database",
      accent: "violet",
      github: "https://github.com/vishwajeetchandole",
      demo: ""
    },
    {
      id: 3,
      order: 3,
      title: "Clario",
      tagline: "Lung Disease Detection via X-Ray",
      description: "A machine learning application that assists in identifying lung-related diseases using chest X-ray images with highly accurate classification models.",
      tech: ["React", "Flask", "Machine Learning"],
      iconName: "Eye",
      accent: "sky",
      github: "https://github.com/vishwajeetchandole",
      demo: ""
    },
    {
      id: 4,
      order: 4,
      title: "QuPDF",
      tagline: "Chat with Any PDF using AI",
      description: "An AI-powered document interactions platform that enables users to upload PDF manuals and converse with them using Gemini natural language model APIs.",
      tech: ["Flask", "Gemini API"],
      iconName: "MessageSquare",
      accent: "emerald",
      github: "https://github.com/vishwajeetchandole",
      demo: ""
    },
    {
      id: 5,
      order: 5,
      title: "FlowML",
      tagline: "Visual ML Pipeline Builder",
      description: "A graphical drag-and-drop workspace that simplifies the process of creating, configuring, training, and testing machine learning pipeline workflows.",
      tech: ["React", "FastAPI", "Scikit-Learn"],
      iconName: "Workflow",
      accent: "rose",
      github: "https://github.com/vishwajeetchandole",
      demo: ""
    }
  ],
  journey: [
    {
      id: 1,
      year: "2022",
      iconName: "BookOpen",
      content: "Started my Diploma in Computer Engineering and discovered my passion for software development.",
      tag: "Education"
    },
    {
      id: 2,
      year: "2023",
      iconName: "Code2",
      content: "Built my first full-stack project and started exploring Python and machine learning fundamentals.",
      tag: "Development"
    },
    {
      id: 3,
      year: "2024",
      iconName: "Award",
      content: "Completed Diploma with distinction and gained valuable experience through technical projects and ideathons.",
      tag: "Achievement"
    },
    {
      id: 4,
      year: "2025",
      iconName: "GraduationCap",
      content: "Joined KIT College of Engineering to pursue B.Tech in Artificial Intelligence and Machine Learning.",
      tag: "Education"
    },
    {
      id: 5,
      year: "Present",
      iconName: "Zap",
      content: "Actively building projects, improving problem-solving skills, exploring AI, and preparing for placement opportunities.",
      tag: "Current"
    }
  ],
  achievements: [
    {
      id: 1,
      order: 1,
      title: "Top 30 Team - Sankalpan 2025 Ideathon",
      desc: "Recognized among top teams in a prestigious tech ideathon for innovative project design.",
      iconName: "Trophy",
      image: "",
      link: ""
    },
    {
      id: 2,
      order: 2,
      title: "Diploma in Computer Engineering with Distinction",
      desc: "Graduated with outstanding academic performance.",
      iconName: "GraduationCap",
      image: "",
      link: ""
    },
    {
      id: 3,
      order: 3,
      title: "Built 10+ Technical Projects",
      desc: "Designed and developed web apps, AI systems, and OCR utilities over three years.",
      iconName: "Code",
      image: "",
      link: "https://github.com/vishwajeetchandole"
    },
    {
      id: 4,
      order: 4,
      title: "Co-Founder of ByteProjex",
      desc: "Led development and collaboration initiatives inside a technical developer collective.",
      iconName: "Rocket",
      image: "",
      link: ""
    },
    {
      id: 5,
      order: 5,
      title: "Exploring Open Source Contributions",
      desc: "Contributing to community packages and collaborating with other developers.",
      iconName: "Globe",
      image: "",
      link: "https://github.com/vishwajeetchandole"
    },
    {
      id: 6,
      order: 6,
      title: "Pursuing B.Tech in AIML",
      desc: "Studying advanced engineering modules including neural networks, databases, and ML models.",
      iconName: "Award",
      image: "",
      link: ""
    }
  ],
  beyondCoding: {
    description: "When I'm not coding, I enjoy exploring new technologies, contributing to collaborative projects, learning about startups, and staying updated with advancements in Artificial Intelligence. I believe continuous learning and curiosity are essential qualities for every engineer.",
    quote: "Curiosity is the engine of achievement.",
    cards: [
      { title: "Open Source Enthusiast", desc: "Passionate about contributing to open repositories and collaborating with worldwide developers.", iconName: "GitBranch" },
      { title: "Startup Explorer", desc: "Interested in the startup lifecycle, business models, and building SaaS products.", iconName: "Rocket" },
      { title: "Lifelong Learner", desc: "Curious about emerging AI research, new frameworks, and architectural design patterns.", iconName: "BookOpen" },
      { title: "Problem Solver", desc: "Enjoy tackling complex computational problems and building streamlined workflows.", iconName: "BrainCircuit" }
    ]
  },
  contact: {
    email: "vishwajeetchandole@gmail.com",
    location: "Kolhapur, Maharashtra, India",
    github: "https://github.com/vishwajeetchandole",
    linkedin: "https://linkedin.com/in/vishwajeetchandole"
  },
  emailjs: {
    serviceId: "YOUR_EMAILJS_SERVICE_ID",
    templateId: "YOUR_EMAILJS_TEMPLATE_ID",
    publicKey: "YOUR_EMAILJS_PUBLIC_KEY"
  }
};
