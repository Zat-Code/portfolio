import { useEffect } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { useExtensions } from '../../../context/ExtensionsContext';
import { VscCode, VscGraph } from 'react-icons/vsc';
import { SiReact, SiTailwindcss, SiPython, SiVuedotjs, SiDocker, SiVercel, SiOpencv, SiGithub } from 'react-icons/si';
import { FaGhost, FaExternalLinkAlt } from 'react-icons/fa';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { TbPlugConnected } from 'react-icons/tb';
import { GiSpiderWeb } from 'react-icons/gi';
import MatrixRain from '../../MatrixRain';

const PersonalProjectPreview = () => {
  const { language } = useLanguage();
  const { isExtensionInstalled } = useExtensions();

  useEffect(() => {
    const keyframes = `
      @keyframes slideInFromBottom {
        from {
          opacity: 0;
          transform: translateY(20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    const style = document.createElement('style');
    style.innerHTML = keyframes;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const renderProjectContent = (
    title: string,
    subtitle: string,
    description: string,
    details: React.ReactNode,
    icon: React.ReactNode,
    links?: { github?: string; website?: string },
    gif?: string
  ) => (
    <div className="flex items-start gap-4">
      <div className="flex-1">
        <div className="flex items-start gap-4">
          <div className="text-3xl text-[#007acc] transition-transform duration-300">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-medium text-white/90 mb-1 transition-colors">{title}</h3>
            <div className="text-sm text-[#007acc]/80 italic mb-3 transition-colors">{subtitle}</div>
            <p className="text-white/70 mb-4 transition-colors">{description}</p>
            {details}
            {links && (
              <div className="flex gap-4 mt-4">
                {links.github && (
                  <a 
                    href={links.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-all hover:scale-110 hover:-translate-y-1"
                  >
                    <SiGithub className="animate-bounce-1" />
                    GitHub
                  </a>
                )}
                {links.website && (
                  <a 
                    href={links.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-white/60 hover:text-white/90 transition-all hover:scale-110 hover:-translate-y-1"
                  >
                    <FaExternalLinkAlt className="animate-bounce-2" />
                    Website
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {gif && (
        <div className="hidden md:block w-48 h-48 rounded-lg overflow-hidden border-2 border-[#007acc]/20 transition-colors">
          <img src={gif} alt={title} className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );

  return (
    <div className="relative h-full">
      {isExtensionInstalled('matrix-mode') && (
        <>
          <MatrixRain className="z-0" />
        </>
      )}
      <div className="h-full overflow-auto relative z-20 p-4">
        <div className="min-h-full py-4">
          <div className="w-full max-w-4xl mx-auto p-6 bg-[#1e1e1e] rounded-lg">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl text-[#007acc] flex items-center gap-2 group cursor-default">
                  <VscCode className="group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1 transition-transform">
                    {language === 'fr' ? 'Projets Personnels' : 'Personal Projects'}
                  </span>
                </h2>
              </div>

              {/* Projects */}
              <div className="space-y-6">
                {/* DataStrike */}
                <div className="animate-fade-in opacity-0 [animation-delay:100ms] [animation-fill-mode:forwards]">
                  <div className="group rounded-lg border-2 border-[#007acc] hover:shadow-[0_0_15px_rgba(0,122,204,0.1)] p-6 transform transition-all duration-300 hover:scale-[1.05]">
                    {renderProjectContent(
                      'DataStrike (2024)',
                      language === 'fr' ? 'Le Sherlock Holmes des Matchs Overwatch 🔍' : 'The Overwatch Match Detective 🔍',
                      language === 'fr' 
                        ? "Plateforme web open source pour l'analyse des données de match d'Overwatch, utilisée par plusieurs équipes professionnelles."
                        : "Open source web platform for Overwatch match data analysis, used by several professional teams.",
                      <div className="space-y-4">
                        <div>
                          <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-1 text-[#61DAFB]"><SiReact /> React</div>
                            <div className="flex items-center gap-1 text-[#38BDF8]"><SiTailwindcss /> Tailwind</div>
                            <div className="flex items-center gap-1 text-[#FF6384]"><VscGraph /> Chart.js</div>
                            <div className="flex items-center gap-1 text-[#5A45FF]"><AiOutlineThunderbolt /> AdonisJS</div>
                            <div className="flex items-center gap-1 text-white"><TbPlugConnected /> WebSocket</div>
                            <div className="flex items-center gap-1 text-[#3776AB]"><SiPython /> Python</div>
                          </div>
                        </div>
                        <div className="text-sm text-white/60 italic border-l-2 border-[#007acc]/30 pl-3">
                          {language === 'fr'
                            ? "Fun fact : Les graphiques sont tellement précis qu'ils peuvent même détecter quand un joueur rage quit avant que ça n'arrive 🎯"
                            : "Fun fact: The graphs are so accurate they can detect when a player is about to rage quit before it happens 🎯"}
                        </div>
                      </div>,
                      <img src="/overwatch.svg" alt="Overwatch" className="w-8 h-8" />,
                      {
                        github: 'https://github.com/DataStrike',
                        website: 'https://datastrike.cloud/'
                      },
                      '/datastrike.gif'
                    )}
                  </div>
                </div>

                {/* Halloween Mission */}
                <div className="animate-fade-in opacity-0 [animation-delay:250ms] [animation-fill-mode:forwards]">
                  <div className="group rounded-lg border-2 border-[#007acc] hover:shadow-[0_0_15px_rgba(0,122,204,0.1)] p-6 transform transition-all duration-300 hover:scale-[1.05]">
                    {renderProjectContent(
                      'Halloween Mission AGC (2022)',
                      language === 'fr' ? 'Le Site qui fait Peur... aux Développeurs Front-end 👻' : 'The Website that Scares... Front-end Developers 👻',
                      language === 'fr'
                        ? "Site web interactif créé pour un événement Halloween, mélangeant ambiance effrayante et éléments d'escape game."
                        : "Interactive website created for a Halloween event, mixing spooky atmosphere with escape game elements.",
                      <div className="space-y-4">
                        <div>
                          <div className="flex flex-wrap gap-3">
                            <div className="flex items-center gap-1 text-[#4FC08D]"><SiVuedotjs /> Vue.js</div>
                            <div className="flex items-center gap-1 text-[#2496ED]"><SiDocker /> Docker</div>
                            <div className="flex items-center gap-1 text-black"><SiVercel /> Vercel</div>
                          </div>
                        </div>
                        <div className="text-sm text-white/60 italic border-l-2 border-[#007acc]/30 pl-3">
                          {language === 'fr'
                            ? "Note : Non responsive par manque de temps... ou par choix artistique ? 🤔 (Disons que c'est un feature, pas un bug)"
                            : "Note: Not responsive due to time constraints... or artistic choice? 🤔 (Let's call it a feature, not a bug)"}
                        </div>
                      </div>,
                      <FaGhost className="text-orange-500" />,
                      {
                        github: 'https://github.com/Zat-Code/Halloween-web',
                        website: 'https://halloween-web-taz3.vercel.app/'
                      },
                      '/halloween.gif'
                    )}
                  </div>
                </div>

                {/* CodinGame Challenge */}
                <div className="animate-fade-in opacity-0 [animation-delay:400ms] [animation-fill-mode:forwards]">
                  <div className="group rounded-lg border-2 border-[#007acc] hover:shadow-[0_0_15px_rgba(0,122,204,0.1)] p-6 transform transition-all duration-300 hover:scale-[1.05]">
                    {renderProjectContent(
                      'CodinGame Spring Challenge 2022',
                      language === 'fr' ? "L'Art de la Guerre avec des Monstres 🎮" : 'The Art of Monster Warfare 🎮',
                      language === 'fr'
                        ? "Participation au challenge 'Spider Attack' - un jeu de stratégie en temps réel où l'objectif est de protéger sa base des vagues de monstres."
                        : "Participation in the 'Spider Attack' challenge - a real-time strategy game where the goal is to protect your base from monster waves.",
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-3 mb-4">
                          <div className="flex items-center gap-1 text-[#3776AB]"><SiPython /> Python</div>
                          <div className="flex items-center gap-1 text-[#5C3EE8]"><SiOpencv /> OpenCV</div>
                        </div>
                        <ul className="list-disc list-inside text-white/70 space-y-1">
                          <li>{language === 'fr' ? "Création de multiples classes pour chaque héros" : "Creation of multiple classes for each hero"}</li>
                          <li>{language === 'fr' ? "Analyse en temps réel de la stratégie adverse" : "Real-time analysis of opponent's strategy"}</li>
                          <li>{language === 'fr' ? "Des centaines de milliers de matchs d'entraînement" : "Hundreds of thousands of training matches"}</li>
                        </ul>
                        <div className="text-sm text-white/60 italic border-l-2 border-[#007acc]/30 pl-3">
                          {language === 'fr'
                            ? "Fun fact : Les araignées ont développé une phobie de mon IA après avoir perdu tant de fois 🕷️"
                            : "Fun fact: The spiders developed a phobia of my AI after losing so many times 🕷️"}
                        </div>
                      </div>,
                      <GiSpiderWeb className="text-purple-500" />,
                      {
                        github: 'https://github.com/Zat-Code/simulator-springchallenge2022-codeingame',
                        website: 'https://www.codingame.com/multiplayer/bot-programming/spring-challenge-2022'
                      },
                      '/codingame.gif'
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalProjectPreview; 