import { useLanguage } from '../../context/LanguageContext';
import { VscGlobe } from 'react-icons/vsc';

const SettingsEditor = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="h-full bg-[#1e1e1e] text-white/80 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6 text-[#e8e8e8]">
          Common Settings
        </h2>
        
        <div className="mb-6 hover:bg-[#2a2d2e] p-4 rounded group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <VscGlobe className="text-lg" />
              <div>
                <div className="font-medium text-[#e8e8e8]">editor.language</div>
                <div className="text-sm text-white/60 mt-1">
                  {t('settings.languageDescription')}
                </div>
              </div>
            </div>
            
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as 'fr' | 'en')}
              className="
                bg-[#3c3c3c] text-white/80 
                px-3 py-1 rounded 
                border border-transparent
                hover:border-[#007acc]
                focus:border-[#007acc] focus:outline-none
                cursor-pointer
                appearance-none
                pr-8
                relative
                opacity-100 group-hover:opacity-100 transition-opacity
                hover:opacity-100
                overflow-hidden
                group
              "
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='white'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.5rem center',
                backgroundSize: '1.2em'
              }}
            >
              <option value="fr" className="bg-[#3c3c3c]">Français</option>
              <option value="en" className="bg-[#3c3c3c]">English</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsEditor; 