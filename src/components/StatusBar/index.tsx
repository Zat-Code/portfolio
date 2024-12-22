import { useLanguage } from '../../context/LanguageContext';

const StatusBar = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="h-6 bg-[#007acc] text-white/80 text-xs flex items-center px-2 justify-between">
      <div className="flex items-center space-x-2">
        <span>🖥️ {t('status.main')}</span>
        <span>📡 {t('status.connected')}</span>
      </div>
      
      <button 
        className="hover:bg-[#1f8ad2] px-2 py-1 rounded"
        onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
      >
        {language.toUpperCase()}
      </button>
    </div>
  );
};

export default StatusBar; 