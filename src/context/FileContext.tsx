import React, { createContext, useContext, useState } from 'react';
import { IFile } from '../types/file';

// Contenus des fichiers
const homeContentFr = `// Composant d'accueil
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
    </div>
  );
};

export default Home;`;

const homeContentEn = `// Home component
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
    </div>
  );
};

export default Home;`;

const experienceContentFr = `# -*- coding: utf-8 -*-

class Profile:
    def __init__(self):
        self.description = """
        Ingénieur passionné par la conception et le déploiement de solutions complètes,
        de l'architecture logicielle à l'intégration sur des plateformes SaaS.
        
        Je m'épanouis dans la prise de responsabilités techniques sur des projets
        de grande envergure, en contribuant activement aux décisions stratégiques
        concernant les choix d'architecture, les performances et la sécurité des solutions.
        
        Mon expertise en vision par ordinateur et en développement full-stack me permet
        de créer des solutions innovantes et robustes.
        
        # Note personnelle:
        # Parfois je me demande si je suis un développeur qui aime l'IA
        # ou une IA qui aime le développement... 🤖
        """

        self.experience = {
            "Agreenculture": {
                "poste": "Full stack Engineer / Computer vision",
                "periode": "03/2019 - 10/2024",
                "niveau_cafe_consomme": "∞",  # Merci la machine à café !
                "bugs_resolus": "Plus que les étoiles visibles depuis la Terre",
                "realisations": [
                    {
                        "titre": "Framework d'entraînement de modèles de vision",
                        "description": "Architecture microservices Docker pour l'entraînement de modèles de vision par ordinateur",
                        "technologies": ["React/Shadcn", "Flask", "MongoDB", "Prisma", "Docker", "CVAT"],
                        "details": [
                            "Interface moderne pour la configuration et le suivi des entraînements",
                            "Support de multiples architectures (YOLO-NAS, YOLOv7, DSNet)",
                            "Versionning complet des modèles et paramètres",
                            "# Fun fact: Les modèles sont tellement bien entraînés qu'ils reconnaissent",
                            "# même les fruits déguisés en légumes ! 🥸"
                        ],
                        "easter_egg": "Les GPU ont tellement chauffé qu'on a pu faire cuire des œufs dessus"
                    },
                    {
                        "titre": "Plateforme de téléopération robotique",
                        "description": "Solution sécurisée pour le contrôle à distance de robots agricoles",
                        "technologies": ["Vue.js", "Flask", "WebRTC", "GStreamer", "RabbitMQ"],
                        "details": [
                            "Streaming vidéo temps réel (plus rapide que mon cerveau le matin)",
                            "Communication bidirectionnelle sécurisée (même les hackers n'y comprennent rien)",
                            "Déploiement cloud avec architecture microservices",
                            "# Note: Les robots sont devenus tellement autonomes qu'ils ont commencé",
                            "# à organiser leurs propres pauses café ☕"
                        ],
                        "fun_fact": "Un robot a essayé de prendre un selfie une fois... #TrueStory"
                    },
                    {
                        "titre": "Système d'analyse de fruits",
                        "description": "Framework d'analyse d'images pour la détection de défauts",
                        "technologies": ["Qt", "OpenCV", "TensorFlow", "Kafka"],
                        "details": [
                            "Interface multi-threadée pour l'acquisition (aussi multitâche que moi avec du café)",
                            "Algorithmes de reconstruction 3D (on peut presque voir la 4ème dimension)",
                            "Traitement de plus de 500 000 échantillons (et pas un seul fruit n'a été mangé pendant les tests)",
                            "# Achievement unlocked: Faire la différence entre une pomme et une poire",
                            "# (plus difficile qu'il n'y paraît à 3h du matin)"
                        ],
                        "statistiques_importantes": {
                            "fruits_analyses": "500k+",
                            "taux_precision": "99.9%",
                            "fruits_manges_pendant_debug": "42"
                        }
                    }
                ],
                "competences_bonus": [
                    "Capacité à déboguer du code en dormant",
                    "Expert en transformation de café en code",
                    "Maître Jedi de la documentation (quand elle existe)",
                    "Capable de lire les stacktraces à l'envers"
                ]
            }
        }

        self.philosophie_dev = [
            "Le code est comme une blague : s'il faut l'expliquer, il est mauvais",
            "Il n'y a pas de bugs, que des features non documentées",
            "La documentation, c'est comme le café : jamais assez",
            "Un bon développeur est un développeur fainéant (qui automatise tout)"
        ]

        # Petit secret : J'ai une collection de rubber ducks pour le debugging
        # Ils sont tous nommés d'après des algorithmes de tri

profile = Profile()
print(f"Description: {profile.description}")

# Si vous lisez ce commentaire, vous avez trouvé un easter egg !
# Félicitations, vous êtes officiellement aussi curieux que moi 🎉
`;

const experienceContentEn = `# -*- coding: utf-8 -*-

class Profile:
    def __init__(self):
        self.description = """
        Engineer passionate about designing and deploying complete solutions,
        from software architecture to SaaS platform integration.
        
        I thrive on taking technical responsibilities in large-scale projects,
        actively contributing to strategic decisions regarding architecture choices,
        performance, and solution security.
        
        My expertise in computer vision and full-stack development enables me
        to create innovative and robust solutions.
        
        # Personal note:
        # Sometimes I wonder if I'm a developer who loves AI
        # or an AI who loves development... 🤖
        """

        self.experience = {
            "Agreenculture": {
                "position": "Full stack Engineer / Computer vision",
                "period": "03/2019 - 10/2024",
                "coffee_level_consumed": "∞",  # Thanks to the coffee machine!
                "bugs_solved": "More than visible stars from Earth",
                "achievements": [
                    {
                        "title": "Computer Vision Training Framework",
                        "description": "Docker-based microservices architecture for training computer vision models",
                        "technologies": ["React/Shadcn", "Flask", "MongoDB", "Prisma", "Docker", "CVAT"],
                        "details": [
                            "Modern interface for training configuration and monitoring",
                            "Support for multiple architectures (YOLO-NAS, YOLOv7, DSNet)",
                            "Complete versioning of models and parameters",
                            "# Fun fact: The models are so well trained they can recognize",
                            "# fruits disguised as vegetables! 🥸"
                        ],
                        "easter_egg": "GPUs got so hot we could cook eggs on them"
                    },
                    {
                        "title": "Robotic Teleoperation Platform",
                        "description": "Secure solution for remote control of agricultural robots",
                        "technologies": ["Vue.js", "Flask", "WebRTC", "GStreamer", "RabbitMQ"],
                        "details": [
                            "Real-time video streaming (faster than my brain in the morning)",
                            "Secure bidirectional communication (even hackers can't figure it out)",
                            "Cloud deployment with microservices architecture",
                            "# Note: The robots became so autonomous they started",
                            "# organizing their own coffee breaks ☕"
                        ],
                        "fun_fact": "A robot tried to take a selfie once... #TrueStory"
                    },
                    {
                        "title": "Fruit Analysis System",
                        "description": "Image analysis framework for defect detection",
                        "technologies": ["Qt", "OpenCV", "TensorFlow", "Kafka"],
                        "details": [
                            "Multi-threaded acquisition interface (as multitasking as me with coffee)",
                            "3D reconstruction algorithms (we can almost see the 4th dimension)",
                            "Processing of over 500,000 samples (and not a single fruit was eaten during testing)",
                            "# Achievement unlocked: Telling apart an apple from a pear",
                            "# (harder than it seems at 3 AM)"
                        ],
                        "important_stats": {
                            "fruits_analyzed": "500k+",
                            "accuracy_rate": "99.9%",
                            "fruits_eaten_during_debug": "42"
                        }
                    }
                ],
                "bonus_skills": [
                    "Ability to debug code while sleeping",
                    "Expert at turning coffee into code",
                    "Jedi Master of documentation (when it exists)",
                    "Can read stacktraces backwards"
                ]
            }
        }

        self.dev_philosophy = [
            "Code is like a joke: if you have to explain it, it's bad",
            "There are no bugs, only undocumented features",
            "Documentation is like coffee: never enough",
            "A good developer is a lazy developer (who automates everything)"
        ]

        # Little secret: I have a collection of rubber ducks for debugging
        # They're all named after sorting algorithms

profile = Profile()
print(f"Description: {profile.description}")

# If you're reading this comment, you've found an easter egg!
# Congratulations, you're officially as curious as I am 🎉
`;

const personalProjectContentFr = `# Projet Personnel - DataStrike

## Description
Plateforme web open source pour l'analyse des données de match d'Overwatch

## Technologies utilisées
- React.js
- Graph.js
- Node.js
- Kafka
- Postgresql

## Statistiques
- 200 utilisateurs actifs
- Plus de 5000 matches analysés

## Liens
- [GitHub](https://github.com/DataStrike)
- [Site Web](https://datastrike.cloud/)`;

const personalProjectContentEn = `# Personal Project - DataStrike

## Description
Open source web platform for Overwatch match data analysis

## Technologies
- React.js
- Graph.js
- Node.js
- Kafka
- Postgresql

## Statistics
- 200 active users
- Over 5000 matches analyzed

## Links
- [GitHub](https://github.com/DataStrike)
- [Website](https://datastrike.cloud/)`;

const contactContentFr = `{
  "contact": {
    "nom": "Benjamin THEYTAZ",
    "titre": "Full Stack Engineer",
    "email": "benjamin.theytaz@hotmail.fr",
    "telephone": "+33652242463",
    "social": {
      "linkedin": "https://www.linkedin.com/in/benjamin-theytaz",
      "github": "https://github.com/Zat-Code"
    }
  }
}`;

const contactContentEn = `{
  "contact": {
    "name": "Benjamin THEYTAZ",
    "title": "Full Stack Engineer",
    "email": "benjamin.theytaz@hotmail.fr",
    "phone": "+33652242463",
    "social": {
      "linkedin": "https://www.linkedin.com/in/benjamin-theytaz",
      "github": "https://github.com/Zat-Code"
    }
  }
}`;

interface FileContextType {
  files: IFile[];
  activeFile: IFile | null;
  openedFiles: IFile[];
  setActiveFile: (file: IFile | null) => void;
  closeFile: (fileName: string) => void;
  isInterfaceOpen: boolean;
  closeInterface: () => void;
  openInterface: () => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeFile, setActiveFile] = useState<IFile | null>(null);
  const [openedFiles, setOpenedFiles] = useState<IFile[]>([]);
  const [isInterfaceOpen, setIsInterfaceOpen] = useState(true);

  const initialFiles = [
    {
      id: 'home',
      name: 'home.tsx',
      content: {
        fr: homeContentFr,
        en: homeContentEn
      },
      language: 'typescript',
      translations: true
    },
    {
      id: 'experience',
      name: 'experience.py',
      content: {
        fr: experienceContentFr,
        en: experienceContentEn
      },
      language: 'python',
      translations: true
    },
    {
      id: 'personal_project',
      name: 'personal_project.md',
      content: {
        fr: personalProjectContentFr,
        en: personalProjectContentEn
      },
      language: 'markdown',
      translations: true
    },
    {
      id: 'contact',
      name: 'contact.json',
      content: {
        fr: contactContentFr,
        en: contactContentEn
      },
      language: 'json',
      translations: true
    }
  ];

  const [files] = useState<IFile[]>(initialFiles);

  const handleSetActiveFile = (file: IFile | null) => {
    if (file) {
      if (!openedFiles.find(f => f.id === file.id)) {
        setOpenedFiles([...openedFiles, file]);
      }
      setActiveFile(file);
    } else {
      setActiveFile(null);
    }
  };

  const closeFile = (fileName: string) => {
    const newOpenedFiles = openedFiles.filter(f => f.name !== fileName);
    setOpenedFiles(newOpenedFiles);
    
    if (activeFile?.name === fileName) {
      setActiveFile(newOpenedFiles[newOpenedFiles.length - 1] || null);
    }

    if (newOpenedFiles.length === 0) {
      closeInterface();
    }
  };

  const closeInterface = () => {
    setIsInterfaceOpen(false);
    setActiveFile(null);
    setOpenedFiles([]);
  };

  const openInterface = () => {
    setIsInterfaceOpen(true);
  };

  return (
    <FileContext.Provider value={{ 
      files, 
      activeFile, 
      openedFiles,
      setActiveFile: handleSetActiveFile,
      closeFile,
      isInterfaceOpen,
      closeInterface,
      openInterface
    }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error('useFiles must be used within a FileProvider');
  }
  return context;
}; 