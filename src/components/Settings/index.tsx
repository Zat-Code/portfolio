import { useLanguage } from '../../context/LanguageContext';
import { VscGlobe } from 'react-icons/vsc';

const Settings = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="h-full text-white/80">
      <div className="px-4 py-2 uppercase tracking-wider text-xs text-white/60">
        {t('settings')}
      </div>

      <div className="px-4 py-2">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <VscGlobe className="text-lg" />
            <span className="font-medium">{t('settings.language')}</span>
          </div>
          
          <div className="space-y-2 ml-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="language"
                value="fr"
                checked={language === 'fr'}
                onChange={() => setLanguage('fr')}
                className="form-radio text-[#007acc] focus:ring-[#007acc] bg-[#1e1e1e] border-[#3c3c3c]"
              />
              <span>Français</span>
            </label>
            
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="language"
                value="en"
                checked={language === 'en'}
                onChange={() => setLanguage('en')}
                className="form-radio text-[#007acc] focus:ring-[#007acc] bg-[#1e1e1e] border-[#3c3c3c]"
              />
              <span>English</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 