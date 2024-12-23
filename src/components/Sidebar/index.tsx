import { useFiles } from '../../context/FileContext';
import { useLanguage } from '../../context/LanguageContext';
import { VscChevronRight, VscChevronDown } from 'react-icons/vsc';

const Sidebar = () => {
  const { files, setActiveFile } = useFiles();
  const { t } = useLanguage();
  
  return (
    <div className="h-full text-sm">
      <div className="px-4 py-2 uppercase tracking-wider text-xs text-white/60">
        {t('explorer')}
      </div>
      
      <div className="text-white/80">
        <div className="flex items-center px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer">
          <VscChevronDown className="mr-1" />
          <span>Portfolio</span>
        </div>
        
        <div className="pl-6">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer"
              onClick={() => setActiveFile(file)}
            >
              <span>{file.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 