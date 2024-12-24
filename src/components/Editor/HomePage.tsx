import { useLanguage } from '../../context/LanguageContext';
import { VscMail } from 'react-icons/vsc';
import { SiLinkedin } from 'react-icons/si';

const HomePage = () => {
  const { t } = useLanguage();

  return (
    <div className="h-full bg-[#1e1e1e] text-white/80 p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        {/* En-tête avec photo */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
          <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-[#007acc]/30 flex-shrink-0">
            <img 
              src="/benjamin-theytaz.png" 
              alt="Benjamin THEYTAZ"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold mb-2">Benjamin THEYTAZ</h1>
            <h2 className="text-2xl text-[#007acc] mb-4">{t('home.title')}</h2>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-white/60 justify-center md:justify-start">
              <a href="mailto:benjamin.theytaz@hotmail.fr" className="flex items-center gap-2 hover:text-[#007acc] transition-colors">
                <VscMail className="text-xl" />
                <span>benjamin.theytaz@hotmail.fr</span>
              </a>
              <a href="https://www.linkedin.com/in/benjamin-theytaz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#007acc] transition-colors">
                <SiLinkedin className="text-xl" />
                <span>/benjamin-theytaz</span>
              </a>
            </div>
          </div>
        </div>

        {/* Guide d'utilisation */}
        <div className="bg-[#252526] rounded-lg p-6 space-y-4">
          <h3 className="text-xl font-semibold text-[#007acc]">
            {t('home.welcome')}
          </h3>
          <p className="text-white/70 leading-relaxed">
            {t('home.guide')}
          </p>
          <p className="text-[#007acc] italic">
            {t('home.tip')}
          </p>
          <p className="text-white/50 text-sm">
            {t('home.ps')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 