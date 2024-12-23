import { useEffect, useState } from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { VscScreenFull } from 'react-icons/vsc';
import { FaLinkedin, FaGithub } from 'react-icons/fa';

const HomePreview = () => {
  const { language } = useLanguage();
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    setIsFullScreen(!!document.fullscreenElement);
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
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
    <div className="h-full overflow-y-auto p-2 sm:p-4 bg-[#1e1e1e] text-white">
      <div className="min-h-full flex items-center">
        <div className="w-full max-w-5xl mx-auto">
          <div className="relative">
            <div className="relative bg-[#1e1e1e] rounded-lg p-3 sm:p-5 space-y-4 sm:space-y-6 border-2 border-[#007acc]">
              {/* Photo et informations */}
              <div className="flex flex-col items-center md:items-start md:flex-row gap-4 sm:gap-5">
                <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full overflow-hidden border-4 border-[#007acc] flex-shrink-0">
                  <img src="/benjamin-theytaz.png" alt="Benjamin THEYTAZ" className="w-full h-full object-cover" />
                </div>
                <div className="space-y-2 sm:space-y-3 text-center md:text-left">
                  <h1 className="text-2xl sm:text-4xl font-bold text-white/90">Benjamin THEYTAZ</h1>
                  <h2 className="text-xl sm:text-2xl text-[#007acc]">Full Stack Engineer</h2>
                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-white/80 text-sm sm:text-base">
                    <a href="mailto:benjamin.theytaz@hotmail.fr" className="hover:text-[#007acc] transition-colors break-all">
                      benjamin.theytaz@hotmail.fr
                    </a>
                    <div className="flex items-center gap-4">
                      <a 
                        href="https://www.linkedin.com/in/benjamin-theytaz" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-[#007acc] transition-colors flex items-center gap-1"
                      >
                        <FaLinkedin className="text-xl" />
                        <span>/benjamin-theytaz</span>
                      </a>
                      <span className="hidden sm:inline text-white/40">|</span>
                      <a 
                        href="https://github.com/Zat-Code" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-[#007acc] transition-colors flex items-center gap-1"
                      >
                        <FaGithub className="text-xl" />
                        <span>/Zat-Code</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message de bienvenue */}
              <div className="space-y-2 sm:space-y-3 text-sm sm:text-base">
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