import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { VscScreenFull } from 'react-icons/vsc';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { SiLinkedin } from 'react-icons/si';
import { VscGithubInverted } from 'react-icons/vsc';

const HomePreview = () => {
  const { language } = useLanguage();
  const [isFullScreen, setIsFullScreen] = useState(false);
  const photoRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsFullScreen(!!document.fullscreenElement);
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!photoRef.current || !containerRef.current) return;
      
      const { width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX / width - 0.5) * 2; // Normalisation entre -1 et 1
      const y = (e.clientY / height - 0.5) * 2;
      
      const rotateX = -y * 10; // Rotation maximale réduite à 10 degrés
      const rotateY = x * 10;
      const scale = 1.05; // Scale réduit pour un effet plus subtil
      
      photoRef.current.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale(${scale})
      `;
    };

    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  const handleFullScreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      }
    } catch (e) {
      console.log("Erreur lors du passage en plein écran:", e);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="h-full overflow-y-auto p-2 sm:p-4 bg-[#1e1e1e] text-white"
    >
      <div className="min-h-full flex items-center">
        <div className="w-full max-w-5xl mx-auto">
          <div className="relative animate-fade-in">
            <div className="relative bg-[#1e1e1e] rounded-lg p-3 sm:p-5 space-y-4 sm:space-y-6 border-2 border-[#007acc]">
              {/* Photo et informations */}
              <div className="flex flex-col items-center md:items-start md:flex-row gap-4 sm:gap-5">
                <div 
                  ref={photoRef}
                  className="w-32 h-32 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-[#007acc] flex-shrink-0 transition-all duration-300 ease-out"
                >
                  <img 
                    src="/benjamin-theytaz.png" 
                    alt="Benjamin THEYTAZ" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2 sm:space-y-3 text-center md:text-left animate-slide-in-right">
                  <h1 className="text-2xl sm:text-4xl font-bold text-white/90">Benjamin THEYTAZ</h1>
                  <h2 className="text-xl sm:text-2xl text-[#007acc]">Full Stack Engineer</h2>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-white/80 text-sm sm:text-base">
                    <a 
                      href="mailto:benjamin.theytaz@hotmail.fr" 
                      className="hover:text-[#007acc] transition-colors break-all hover:scale-105 transform"
                    >
                      benjamin.theytaz@hotmail.fr
                    </a>
                    <span className="hidden sm:inline text-white/40">|</span>
                    <div className="flex items-center gap-4">
                      <a 
                        href="https://www.linkedin.com/in/benjamin-theytaz" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/80 hover:text-[#007acc] transition-all hover:scale-105"
                      >
                        <SiLinkedin className="text-xl animate-bounce-1" />
                        <span>/benjamin-theytaz</span>
                      </a>
                      <span className="hidden sm:inline text-white/40">|</span>
                      <a 
                        href="https://github.com/Zat-Code" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-white/80 hover:text-[#007acc] transition-all hover:scale-105"
                      >
                        <VscGithubInverted className="text-xl animate-bounce-2" />
                        <span>@Zat-Code</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message de bienvenue */}
              <div className="space-y-2 sm:space-y-3 text-sm sm:text-base animate-fade-in-up">
                <h2 className="text-xl sm:text-2xl text-[#007acc]">
                  {language === 'fr' ? "Bienvenue sur mon portfolio VS Code !" : "Welcome to my VS Code portfolio!"}
                </h2>
                <p className="text-white/80">
                  {language === 'fr'
                    ? "Comme dans VS Code, vous pouvez explorer les fichiers dans la barre latérale gauche. J'ai même ajouté un vrai terminal fonctionnel en bas - promis, il ne formatera pas votre disque dur ! 😉"
                    : "Just like in VS Code, you can explore files in the left sidebar. I've even added a real working terminal at the bottom - promise it won't format your hard drive! 😉"}
                </p>
                <p className="text-[#007acc] italic">
                  {language === 'fr'
                    ? "Astuce : Les boutons qui brillent ne sont pas juste pour faire joli, ils font vraiment quelque chose."
                    : "Tip: The shiny buttons aren't just for show, they actually do something."}
                </p>
                <p className="text-white/60">
                  {language === 'fr'
                    ? "P.S. : Si vous trouvez un bug, ce n'est pas un bug, c'est une feature non documentée."
                    : "P.S.: If you find a bug, it's not a bug, it's an undocumented feature."}
                </p>
              </div>

              {/* Message de plein écran */}
              {!isFullScreen && (
                <div className="mt-3 p-2 sm:p-3 bg-[#2d2d2d] rounded-lg border border-[#007acc]/20">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                    <p className="text-white/80 text-sm sm:text-base">
                      {language === 'fr'
                        ? "💡 Astuce : Cette application est encore plus immersive en plein écran !"
                        : "💡 Tip: This application is even more immersive in fullscreen!"}
                    </p>
                    <button
                      onClick={handleFullScreen}
                      className="w-full sm:w-auto px-3 sm:px-4 py-2 bg-[#007acc] hover:bg-[#006bb3] text-white rounded-sm flex items-center justify-center gap-2 relative overflow-hidden group text-sm sm:text-base flex-shrink-0"
                    >
                      <div className="absolute inset-0">
                        <div className="absolute inset-0 animate-shine-silver bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                      </div>
                      <VscScreenFull className="relative z-10" />
                      <span className="relative z-10">
                        {language === 'fr' ? "Passer en plein écran" : "Enter fullscreen"}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePreview; 