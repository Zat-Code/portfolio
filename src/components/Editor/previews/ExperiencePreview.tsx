import { useLanguage } from '../../../context/LanguageContext';
import { SiPython, SiReact, SiAngular, SiVuedotjs, SiD3Dotjs, SiLeaflet, SiFigma, SiFlask, SiDjango, SiNodedotjs, SiAdonisjs, SiMongodb, SiPostgresql, SiPrisma, SiTensorflow, SiPytorch, SiOpencv, SiScikitlearn, SiDocker, SiNginx, SiKubernetes, SiKong } from 'react-icons/si';
import { VscGraph, VscSymbolClass, VscMortarBoard, VscCode, VscTools } from 'react-icons/vsc';
import { BsPersonVcard } from 'react-icons/bs';

const ExperiencePreview = () => {
  const { language } = useLanguage();

  const quotes = {
    fr: [
      {
        text: "Un bon développeur est un développeur fainéant (qui automatise tout)",
        author: "Philosophie Dev #1"
      },
      {
        text: "Le code est comme une blague : s'il faut l'expliquer, il est mauvais",
        author: "Philosophie Dev #2"
      }
    ],
    en: [
      {
        text: "A good developer is a lazy developer (who automates everything)",
        author: "Dev Philosophy #1"
      },
      {
        text: "Code is like a joke: if you have to explain it, it's bad",
        author: "Dev Philosophy #2"
      }
    ]
  };

  const skillsWithIcons = {
    "Front-end": [
      { name: 'React', icon: <SiReact className="text-[#61DAFB] hover:text-[#61DAFB]/80" /> },
      { name: 'Angular', icon: <SiAngular className="text-[#DD0031] hover:text-[#DD0031]/80" /> },
      { name: 'Vue.js', icon: <SiVuedotjs className="text-[#4FC08D] hover:text-[#4FC08D]/80" /> },
      { name: 'Graph.js', icon: <VscGraph className="text-[#FF6384] hover:text-[#FF6384]/80" /> },
      { name: 'Leaflet', icon: <SiLeaflet className="text-[#199900] hover:text-[#199900]/80" /> },
      { name: 'Figma', icon: <SiFigma className="text-[#F24E1E] hover:text-[#F24E1E]/80" /> }
    ],
    "Back-end": [
      { name: 'Flask', icon: <SiFlask className="text-white hover:text-white/80" /> },
      { name: 'Django', icon: <SiDjango className="text-[#092E20] hover:text-[#092E20]/80" /> },
      { name: 'Node.js', icon: <SiNodedotjs className="text-[#339933] hover:text-[#339933]/80" /> },
      { name: 'Adonis.js', icon: <SiAdonisjs className="text-[#5A45FF] hover:text-[#5A45FF]/80" /> },
      { name: 'MongoDB', icon: <SiMongodb className="text-[#47A248] hover:text-[#47A248]/80" /> },
      { name: 'PostgreSQL', icon: <SiPostgresql className="text-[#4169E1] hover:text-[#4169E1]/80" /> },
      { name: 'Prisma', icon: <SiPrisma className="text-white hover:text-white/80" /> }
    ],
    "Machine Learning": [
      { name: 'TensorFlow', icon: <SiTensorflow className="text-[#FF6F00] hover:text-[#FF6F00]/80" /> },
      { name: 'PyTorch', icon: <SiPytorch className="text-[#EE4C2C] hover:text-[#EE4C2C]/80" /> },
      { name: 'OpenCV', icon: <SiOpencv className="text-[#5C3EE8] hover:text-[#5C3EE8]/80" /> },
      { name: 'Scikit-learn', icon: <SiScikitlearn className="text-[#F7931E] hover:text-[#F7931E]/80" /> }
    ],
    "Infrastructure": [
      { name: 'Docker', icon: <SiDocker className="text-[#2496ED] hover:text-[#2496ED]/80" /> },
      { name: 'Nginx', icon: <SiNginx className="text-[#009639] hover:text-[#009639]/80" /> },
      { name: 'Kubernetes', icon: <SiKubernetes className="text-[#326CE5] hover:text-[#326CE5]/80" /> },
      { name: 'Kong', icon: <SiKong className="text-[#003459] hover:text-[#003459]/80" /> }
    ]
  };

  const renderSkillCloud = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-[#1e1e1e] rounded-lg p-4 md:p-8 border border-[#007acc]/20">
        {Object.entries(skillsWithIcons).map(([category, skills], categoryIndex) => (
          <div key={category} className="relative">
            <h3 className="text-lg font-medium mb-6 text-[#007acc] text-center">{category}</h3>
            <div className="relative h-[200px] md:h-[250px]">
              {skills.map((skill, index) => {
                const totalItems = skills.length;
                const angle = (index * (360 / totalItems)) * (Math.PI / 180);
                const radius = window.innerWidth < 768 
                  ? (totalItems <= 4 ? 30 : 35)  // Rayon plus petit sur mobile
                  : (totalItems <= 4 ? 35 : 40); // Rayon normal sur desktop
                const x = 50 + radius * Math.cos(angle);
                const y = 50 + radius * Math.sin(angle);

                return (
                  <div
                    key={skill.name}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 hover:scale-110 cursor-default group"
                    style={{
                      left: `${x}%`,
                      top: `${y}%`,
                    }}
                  >
                    <div className="flex flex-col items-center gap-1 md:gap-2">
                      <div className="text-2xl md:text-3xl transition-colors">
                        {skill.icon}
                      </div>
                      <span className="text-xs md:text-sm text-white/60 group-hover:text-white/80 transition-colors whitespace-nowrap bg-[#1e1e1e]/80 px-1.5 md:px-2 py-0.5 rounded">
                        {skill.name}
                      </span>
                    </div>
                  </div>
                );
              })}
              {/* Cercle central décoratif - caché sur mobile */}
              <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <div className="w-20 h-20 rounded-full border-2 border-[#007acc]/20 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-[#007acc]/10" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="h-full overflow-y-auto p-4 bg-[#1e1e1e] text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl text-[#007acc] flex items-center gap-2">
            <BsPersonVcard />
            <span>Description</span>
          </h2>
          <div className="rounded-lg p-6 border-2 border-[#007acc]">
            <p className="text-white/80 text-lg leading-relaxed">
              {language === 'fr'
                ? <>Développeur passionné avec une <span className="text-[#007acc]">double expertise en vision par ordinateur et développement full-stack</span>. J'aime relever des défis techniques complexes et transformer des idées innovantes en solutions concrètes. Mon approche ? Concevoir des architectures élégantes et robustes, tout en gardant un œil sur les dernières technologies (oui, je suis ce dev qui s'enthousiasme pour chaque nouvelle feature de React 😄). Spécialisé dans la <span className="text-[#007acc]">création de solutions end-to-end</span>, de l'architecture à l'intégration cloud, je m'épanouis particulièrement dans les projets qui repoussent les limites technologiques.</>
                : <>Passionate developer with <span className="text-[#007acc]">dual expertise in computer vision and full-stack development</span>. I love tackling complex technical challenges and turning innovative ideas into concrete solutions. My approach? Designing elegant and robust architectures while keeping an eye on the latest technologies (yes, I'm that dev who gets excited about every new React feature 😄). Specialized in <span className="text-[#007acc]">creating end-to-end solutions</span>, from architecture to cloud integration, I particularly thrive in projects that push technological boundaries.</>}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl text-[#007acc] flex items-center gap-2">
            <VscSymbolClass />
            <span>Philosophies</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quotes[language].map((quote, index) => (
              <div 
                key={index}
                className="relative p-6 rounded-lg border-2 border-[#007acc] group hover:border-[#007acc] transition-colors"
              >
                <div className="absolute -top-3 left-4 px-2 bg-[#1e1e1e] text-[#007acc] text-sm">
                  {quote.author}
                </div>
                <p className="text-white/80 italic">
                  "{quote.text}"
                </p>
                <div className="absolute bottom-2 right-2 text-[#007acc] opacity-10 text-4xl font-serif group-hover:opacity-20 transition-opacity">
                  "
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl text-[#007acc] flex items-center gap-2">
            <VscCode />
            <span>Expérience</span>
          </h2>
          
          <div className="rounded-lg p-6 border-2 border-[#007acc] space-y-8">
            <div>
              <h3 className="text-xl font-medium mb-3 text-white/90 flex items-center gap-2">
                {language === 'fr' ? "Référent Technique" : "Technical Lead"}
                <span className="text-xs text-[#007acc]/60">
                  {language === 'fr' ? "(aka Le Jedi du Code)" : "(aka The Code Jedi)"}
                </span>
              </h3>
              <p className="text-white/70 mb-2">
                {language === 'fr' 
                  ? "Référent technique sur les choix d'architecture et les orientations technologiques, guidant une équipe de développeurs dans l'implémentation des meilleures pratiques et standards de développement"
                  : "Technical reference for architecture choices and technological orientations, guiding a team of developers in implementing best practices and development standards"}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3 text-white/90 flex items-center gap-2">
                {language === 'fr' ? "Framework d'entraînement de modèles de vision" : "Computer Vision Training Framework"}
                <span className="text-xs text-[#007acc]/60">
                  {language === 'fr' ? "(aka Le Dresseur d'IA)" : "(aka The AI Trainer)"}
                </span>
              </h3>
              <ul className="list-disc list-inside space-y-3 text-white/70">
                <li>
                  {language === 'fr'
                    ? <>Création d'une <span className="text-[#007acc]">interface intuitive et moderne</span> avec React/Shadcn offrant une expérience fluide pour la configuration des modèles de vision (YOLO-NAS, YOLOv7, DSNet). Tableaux de bord en temps réel pour suivre les métriques d'entraînement et visualiser les prédictions</>
                    : <>Creation of an <span className="text-[#007acc]">intuitive and modern interface</span> with React/Shadcn offering a smooth experience for configuring vision models (YOLO-NAS, YOLOv7, DSNet). Real-time dashboards to track training metrics and visualize predictions</>}
                </li>
                <li>
                  {language === 'fr'
                    ? <>Architecture backend robuste en Flask avec <span className="text-[#007acc]">pipeline d'entraînement automatisé</span> : intégration CVAT pour les annotations, orchestration Docker pour le scaling, et système de versioning intelligent des modèles</>
                    : <>Robust Flask backend with <span className="text-[#007acc]">automated training pipeline</span>: CVAT integration for annotations, Docker orchestration for scaling, and intelligent model versioning system</>}
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3 text-white/90 flex items-center gap-2">
                {language === 'fr' ? "Plateforme de téléopération robotique" : "Robotic Teleoperation Platform"}
                <span className="text-xs text-[#007acc]/60">
                  {language === 'fr' ? "(aka Le Dompteur de Robots)" : "(aka The Robot Whisperer)"}
                </span>
              </h3>
              <p className="text-white/70 mb-2">
                {language === 'fr'
                  ? "Conception d'une plateforme sécurisée et évolutive pour le contrôle à distance de robots agricoles autonomes, intégrant streaming vidéo temps réel et communication bidirectionnelle"
                  : "Design of a secure and scalable platform for remote control of autonomous agricultural robots, integrating real-time video streaming and bidirectional communication"}
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70">
                <li>Vue.js, Flask, WebRTC, GStreamer</li>
                <li>Architecture micro-services avec Docker</li>
                <li>Déploiement cloud et intégration RabbitMQ</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium mb-3 text-white/90 flex items-center gap-2">
                {language === 'fr' ? "Système d'analyse de fruits" : "Fruit Analysis System"}
                <span className="text-xs text-[#007acc]/60">
                  {language === 'fr' ? "(aka Le Fruit Ninja)" : "(aka The Fruit Ninja)"}
                </span>
              </h3>
              <p className="text-white/70 mb-2">
                {language === 'fr'
                  ? <>Développement d'applications desktop Qt et mise en place d'algorithmes de vision pour la détection de défauts. Le système a analysé avec succès <span className="text-[#007acc]">plus de 500 000 fruits</span> en conditions réelles</>
                  : <>Development of Qt desktop applications and implementation of vision algorithms for defect detection. The system has successfully analyzed <span className="text-[#007acc]">over 500,000 fruits</span> in real conditions</>}
              </p>
              <ul className="list-disc list-inside space-y-2 text-white/70">
                <li>TensorFlow, OpenCV, reconstruction 3D</li>
                <li>Intégration Docker et Kafka</li>
                <li>Interface multi-threadée pour l'acquisition d'images</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl text-[#007acc] flex items-center gap-2">
            <VscTools />
            <span>Compétences</span>
          </h2>
          
          <div className="rounded-lg p-6 border-2 border-[#007acc]">
            {renderSkillCloud()}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl text-[#007acc] flex items-center gap-2">
            <VscMortarBoard />
            <span>Formation</span>
          </h2>
          
          <div className="rounded-lg p-6 border-2 border-[#007acc]">
            <div>
              <h3 className="text-xl font-medium text-white/90">
                {language === 'fr'
                  ? "Master Système Embarqués pour le traitement d'image"
                  : "Master's in Embedded Systems for Image Processing"}
              </h3>
              <div className="text-white/70">EUPI</div>
              <div className="text-sm text-white/60">Clermont-Ferrand, France | 2017 - 2019</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExperiencePreview; 