import { VscCode } from 'react-icons/vsc';
import { FaInternetExplorer, FaWindows, FaRegWindowMaximize } from 'react-icons/fa';
import { BsFolder2Open, BsFolderFill, BsXCircleFill } from 'react-icons/bs';
import { BiSolidError } from 'react-icons/bi';
import { useLanguage } from '../../context/LanguageContext';

interface WindowsXPProps {
  onRestore: () => void;
}

const WindowsXP = ({ onRestore }: WindowsXPProps) => {
  const { language } = useLanguage();
  const currentTime = new Date().toLocaleTimeString(language === 'fr' ? 'fr-FR' : 'en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="fixed inset-0 bg-[#235CDC] overflow-hidden">
      {/* Fond d'écran Windows XP */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(/windows-xp-bliss.jpg)' }}
      />

      {/* Icônes du bureau */}
      <div className="absolute top-4 left-4 space-y-4">
        <div className="flex flex-col items-center gap-1 text-white cursor-pointer group w-16 sm:w-20">
          <BsFolder2Open className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]" />
          <span className="text-xs sm:text-sm text-center px-1 bg-[#000]/20 rounded text-shadow">
            {language === 'fr' ? 'Mes documents' : 'My Documents'}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 text-white cursor-pointer group w-16 sm:w-20">
          <BsFolderFill className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform text-[#f8e14b] drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]" />
          <span className="text-xs sm:text-sm text-center px-1 bg-[#000]/20 rounded text-shadow">
            {language === 'fr' ? 'Poste de travail' : 'My Computer'}
          </span>
        </div>
        <div className="flex flex-col items-center gap-1 text-white cursor-pointer group w-16 sm:w-20">
          <FaInternetExplorer className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform text-[#0078D7] drop-shadow-[2px_2px_2px_rgba(0,0,0,0.5)]" />
          <span className="text-xs sm:text-sm text-center px-1 bg-[#000]/20 rounded text-shadow">
            Internet Explorer
          </span>
        </div>
      </div>

      {/* Fenêtre d'erreur Windows */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-[500px] bg-[#ECE9D8] rounded-t-lg shadow-xl border border-[#0054E3]">
        {/* Barre de titre */}
        <div className="h-8 bg-gradient-to-r from-[#0054E3] via-[#0054E3] to-[#0054E3] rounded-t-lg px-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BiSolidError className="text-white text-lg sm:text-xl" />
            <span className="text-white font-bold text-sm sm:text-base">Anomalie Temporelle Détectée</span>
          </div>
          <div className="flex items-center gap-1">
            <button className="text-white hover:bg-[#3C81F3] rounded px-2">
              <FaRegWindowMaximize className="text-xs sm:text-sm" />
            </button>
            <button 
              onClick={onRestore}
              className="text-white hover:bg-[#3C81F3] rounded px-2"
            >
              <BsXCircleFill className="text-base sm:text-lg" />
            </button>
          </div>
        </div>

        {/* Contenu de la fenêtre */}
        <div className="p-3 sm:p-4 flex gap-3 sm:gap-4">
          <div className="flex-shrink-0">
            <BiSolidError className="text-[#FF0000] text-4xl sm:text-5xl" />
          </div>
          <div className="flex-1">
            <p className="text-black text-sm sm:text-base mb-4 whitespace-pre-line">
              {language === 'fr' 
                ? "ALERTE SYSTÈME ⚠️\n\nUne faille spatio-temporelle a été détectée ! Vous avez été transporté(e) en 2003.\n\nAnomalies détectées :\n- Internet Explorer est encore vivant\n- Le WiFi n'existe pas encore\n- Les gens utilisent encore des disquettes 💾\n- Personne ne sait ce qu'est TikTok\n- Le MSN Messenger est le meilleur moyen de communication\n\nAttention : Ne pas mentionner les cryptomonnaies, les réseaux sociaux ou ChatGPT pour éviter un paradoxe temporel.\n\n"
                : "SYSTEM ALERT ⚠️\n\nA space-time anomaly has been detected! You have been transported to 2003.\n\nDetected anomalies:\n- Internet Explorer is still alive\n- WiFi doesn't exist yet\n- People are still using floppy disks 💾\n- Nobody knows what TikTok is\n- MSN Messenger is the best way to communicate\n\nWarning: Do not mention cryptocurrencies, social media, or ChatGPT to avoid a temporal paradox.\n\n"}
            </p>
            <div className="flex justify-center">
              <button 
                onClick={onRestore}
                className="px-4 sm:px-6 py-1 bg-[#ECE9D8] border border-[#888] rounded hover:bg-[#DDD] active:bg-[#ECE9D8] focus:outline-none focus:ring-2 focus:ring-[#0054E3] text-sm sm:text-base"
              >
                {language === 'fr' ? "Retour vers le futur" : "Back to the future"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Barre des tâches */}
      <div className="absolute bottom-0 left-0 right-0 h-[30px] bg-gradient-to-r from-[#245EDB] via-[#245EDB] to-[#245EDB] flex items-center px-0.5 sm:px-1 border-t-[1px] border-[#6B9CF5]">
        {/* Bouton démarrer */}
        <button className="h-[25px] px-1 sm:px-2 flex items-center gap-0.5 sm:gap-1 bg-gradient-to-b from-[#3C8B0A] to-[#276100] hover:from-[#4CA313] hover:to-[#307305] rounded-sm">
          <FaWindows className="text-sm sm:text-base text-white" />
          <span className="text-white font-bold text-[10px] sm:text-sm whitespace-nowrap">{language === 'fr' ? 'démarrer' : 'start'}</span>
        </button>

        {/* Applications ouvertes */}
        <div className="flex-1 flex items-center gap-0.5 sm:gap-1 px-0.5 sm:px-1">
          {/* VS Code - actif */}
          <button 
            onClick={onRestore}
            className="h-[25px] px-1 sm:px-2 flex items-center gap-1 sm:gap-2 bg-gradient-to-b from-[#F7F7F7] to-[#E3E3E3] hover:from-[#FAFAFA] hover:to-[#E6E6E6] rounded-sm min-w-[90px] sm:min-w-[150px] group border border-[#4E84F1]"
          >
            <VscCode className="text-sm sm:text-lg text-[#007ACC] group-hover:scale-110 transition-transform" />
            <span className="text-black text-[10px] sm:text-sm truncate">Visual Studio Code</span>
          </button>
        </div>

        {/* Zone de notification */}
        <div className="flex items-center h-full">
          <div className="px-1 sm:px-2 h-full flex items-center border-l border-[#0947B6] border-r border-r-[#6B9CF5] text-white text-[10px] sm:text-sm whitespace-nowrap">
            {currentTime}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WindowsXP; 