import { useLanguage } from '../../../context/LanguageContext';
import { SiReact, SiTailwindcss, SiPython, SiGithub, SiVuedotjs, SiDocker, SiVercel, SiOpencv } from 'react-icons/si';
import { VscGraph } from 'react-icons/vsc';
import { FaGamepad, FaGhost, FaExternalLinkAlt } from 'react-icons/fa';
import { AiOutlineThunderbolt } from 'react-icons/ai';
import { TbPlugConnected } from 'react-icons/tb';
import { GiSpiderWeb } from 'react-icons/gi';

const PersonalProjectPreview = () => {
  const { language } = useLanguage();

  const renderProject = (
    title: string,
    subtitle: string,
    description: string,
    details: React.ReactNode,
    icon: React.ReactNode,
    links?: { github?: string; website?: string },
    gif?: string
  ) => (
    <div className="p-6 rounded-lg border-2 border-[#007acc] group hover:shadow-[0_0_15px_rgba(0,122,204,0.1)] transition-all hover:scale-105">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-start gap-4">
            <div className="text-3xl text-[#007acc] group-hover:scale-125 transition-transform duration-300">
              {icon}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-medium text-white/90 mb-1 group-hover:text-white transition-colors">{title}</h3>
              <div className="text-sm text-[#007acc]/80 italic mb-3 group-hover:text-[#007acc] transition-colors">{subtitle}</div>
              <p className="text-white/70 mb-4 group-hover:text-white/80 transition-colors">{description}</p>
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
          <div className="hidden md:block w-48 h-48 rounded-lg overflow-hidden border-2 border-[#007acc]/20 group-hover:border-[#007acc]/40 transition-colors">
            <img src={gif} alt={title} className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-full overflow-y-auto p-2 sm:p-4 bg-[#1e1e1e] text-white">
      <div className="min-h-full flex items-center">
        <div className="w-full max-w-5xl mx-auto">
          <div className="relative animate-fade-in">
            <div className="relative bg-[#1e1e1e] rounded-lg p-3 sm:p-5 space-y-4 sm:space-y-6">
              <div className="max-w-5xl mx-auto space-y-6">
                <h1 className="text-2xl sm:text-3xl font-bold text-white/90 mb-6 sm:mb-8 group cursor-default animate-fade-in flex items-center gap-2">
                  <span className="group-hover:translate-x-1 transition-transform">
                    {language === 'fr' ? 'Projets Personnels' : 'Personal Projects'}
                  </span>
                </h1>

                {/* DataStrike */}
                <div className="animate-fade-in" style={{ animationDelay: '100ms' }}>
                  {renderProject(
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

                {/* Halloween Mission */}
                <div className="animate-fade-in" style={{ animationDelay: '200ms' }}>
                  {renderProject(
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

                {/* CodinGame Challenge */}
                <div className="animate-fade-in" style={{ animationDelay: '300ms' }}>
                  {renderProject(
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
  );
};

export default PersonalProjectPreview; 