import { useFiles } from '../../context/FileContext';
import { useLanguage } from '../../context/LanguageContext';
import { VscChevronRight, VscFolder, VscFile } from 'react-icons/vsc';

const Sidebar = () => {
  const { files, activeFile, setActiveFile } = useFiles();
  const { t } = useLanguage();

  return (
    <div className="w-64 bg-[#252526] border-r border-[#3c3c3c]">
      <div className="p-2 text-sm text-white/70 flex items-center">
        <VscChevronRight className="mr-1" />
        <span>{t('explorer')}</span>
      </div>
      
      <div className="px-2">
        <div className="flex items-center p-1 text-sm text-white/70">
          <VscFolder className="mr-2" />
          <span>Portfolio</span>
        </div>
        
        <div className="ml-4">
          {files.map((file) => (
            <div
              key={file.id}
              className={`flex items-center p-1 text-sm cursor-pointer ${
                activeFile?.id === file.id
                  ? 'bg-[#37373d] text-white'
                  : 'text-white/70 hover:bg-[#2a2d2e]'
              }`}
              onClick={() => setActiveFile(file)}
            >
              <VscFile className="mr-2" />
              <span>{file.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 