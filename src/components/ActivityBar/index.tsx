import { VscFiles, VscSearch, VscSourceControl, VscExtensions, VscGear } from 'react-icons/vsc';
import { useFiles } from '../../context/FileContext';

interface ActivityBarProps {
  onSidebarToggle: () => void;
  isSidebarOpen: boolean;
}

const ActivityBar = ({ onSidebarToggle, isSidebarOpen }: ActivityBarProps) => {
  const { setActiveFile, activeFile } = useFiles();

  const handleSettingsClick = () => {
    setActiveFile({
      id: 'settings',
      name: 'settings.json',
      language: 'json',
      content: {
        fr: `{
  "editor.language": "fr",
  "editor.fontSize": 14,
  "editor.fontFamily": "Consolas, 'Courier New', monospace",
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "editor.minimap.enabled": true,
  "workbench.colorTheme": "Default Dark+",
  "workbench.iconTheme": "vs-seti"
}`,
        en: `{
  "editor.language": "en",
  "editor.fontSize": 14,
  "editor.fontFamily": "Consolas, 'Courier New', monospace",
  "editor.tabSize": 2,
  "editor.wordWrap": "on",
  "editor.minimap.enabled": true,
  "workbench.colorTheme": "Default Dark+",
  "workbench.iconTheme": "vs-seti"
}`
      },
      isSettings: true
    });
  };

  const isSettingsActive = activeFile?.id === 'settings';

  return (
    <div className="w-12 flex-shrink-0 bg-[#333333] h-full flex flex-col items-center justify-between">
      <div className="flex flex-col">
        <button 
          className={`
            w-12 h-12 flex items-center justify-center
            relative -mt-[2px]
            ${isSidebarOpen
              ? 'text-white after:absolute after:left-0 after:top-0 after:h-full after:w-[2px] after:bg-[#d4d4d4]' 
              : 'text-white/60 hover:text-white'
            }
            transition-all duration-200
            hover:bg-[#2a2d2e]
            overflow-hidden
            group
          `}
          onClick={onSidebarToggle}
        >
          <VscFiles className="text-2xl relative z-10" />
          <div className="absolute inset-0">
            <div className="absolute inset-0 animate-shine-silver bg-gradient-to-r from-transparent via-[#C0C0C0]/20 to-transparent" />
            <div className="absolute inset-0 animate-shine-silver-delayed bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            <div className="absolute inset-0 animate-shine-silver-bright bg-gradient-to-r from-transparent via-[#E8E8E8]/10 to-transparent" />
          </div>
        </button>
        
        <button className="w-12 h-12 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#2a2d2e]">
          <VscSearch className="text-2xl" />
        </button>
        
        <button className="w-12 h-12 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#2a2d2e]">
          <VscSourceControl className="text-2xl" />
        </button>
        
        <button className="w-12 h-12 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#2a2d2e]">
          <VscExtensions className="text-2xl" />
        </button>
      </div>

      <button 
        className={`
          w-12 h-12 flex items-center justify-center relative mb-2
          ${isSettingsActive 
            ? 'text-white after:absolute after:left-0 after:top-0 after:h-full after:w-[2px] after:bg-[#d4d4d4]' 
            : 'text-white/60 hover:text-white'
          }
          transition-all duration-200
          hover:bg-[#2a2d2e]
          overflow-hidden
          group
        `}
        onClick={handleSettingsClick}
      >
        <VscGear className="text-2xl relative z-10" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 animate-shine-silver bg-gradient-to-r from-transparent via-[#C0C0C0]/20 to-transparent" />
          <div className="absolute inset-0 animate-shine-silver-delayed bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="absolute inset-0 animate-shine-silver-bright bg-gradient-to-r from-transparent via-[#E8E8E8]/10 to-transparent" />
        </div>
      </button>
    </div>
  );
};

export default ActivityBar; 