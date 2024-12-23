import { useLanguage } from '../../context/LanguageContext';
import { VscSourceControl, VscError, VscWarning, VscBell, VscFeedback, VscRemote } from 'react-icons/vsc';

const StatusBar = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="h-6 bg-[#1e1e1e] text-white/80 text-xs flex items-center justify-between border-t border-[#333]">
      {/* Section gauche avec logo bleu */}
      <div className="flex items-center h-full">
        <div className="flex items-center justify-center w-8 h-full bg-[#007acc] hover:bg-[#007acc]/90 cursor-pointer">
          <VscRemote className="text-sm" />
        </div>
        
        <div className="flex items-center px-2 h-full hover:bg-[#2d2d2d] cursor-pointer gap-1">
          <VscSourceControl className="text-sm" />
          <span>main</span>
        </div>
        
        <div className="flex items-center px-2 h-full hover:bg-[#2d2d2d] cursor-pointer gap-1">
          <VscError className="text-sm text-red-500" />
          <span>0</span>
          <VscWarning className="text-sm text-yellow-500" />
          <span>0</span>
        </div>
      </div>

      {/* Section droite */}
      <div className="flex items-center h-full">
        <div className="flex items-center px-2 h-full hover:bg-[#2d2d2d] cursor-pointer">
          <VscBell className="text-sm" />
        </div>
        <div className="flex items-center px-2 h-full hover:bg-[#2d2d2d] cursor-pointer">
          <VscFeedback className="text-sm" />
        </div>
        <button 
          className="relative px-2 h-full hover:bg-[#2d2d2d] uppercase overflow-hidden group"
          onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
        >
          <div className="absolute inset-0">
            <div className="absolute inset-0 animate-shine-silver bg-gradient-to-r from-transparent via-[#C0C0C0]/20 to-transparent" />
            <div className="absolute inset-0 animate-shine-silver-delayed bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="absolute inset-0 animate-shine-silver-bright bg-gradient-to-r from-transparent via-[#E8E8E8]/10 to-transparent" />
          </div>
          <span className="relative z-10">{language}</span>
        </button>
      </div>
    </div>
  );
};

export default StatusBar; 