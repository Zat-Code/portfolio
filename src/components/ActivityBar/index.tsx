import { useState } from 'react';
import { VscFiles, VscSourceControl, VscExtensions, VscGear } from 'react-icons/vsc';
import { GiCubes } from 'react-icons/gi';
import { useExtensions } from '../../context/ExtensionsContext';
import { useFiles } from '../../context/FileContext';
import Tetris from '../Tetris';

interface ActivityBarProps {
  onSidebarToggle: () => void;
  onExtensionsToggle: () => void;
  onSourceControlToggle: () => void;
  isSidebarOpen: boolean;
  isExtensionsOpen: boolean;
  isSourceControlOpen: boolean;
}

const ActivityBar = ({ 
  onSidebarToggle, 
  onExtensionsToggle,
  onSourceControlToggle,
  isSidebarOpen,
  isExtensionsOpen,
  isSourceControlOpen
}: ActivityBarProps) => {
  const { isExtensionInstalled } = useExtensions();
  const { setActiveFile } = useFiles();
  const [isTetrisOpen, setIsTetrisOpen] = useState(false);

  const handleSettingsClick = () => {
    setActiveFile({
      id: 'settings',
      name: 'settings.json',
      language: 'json',
      content: {
        fr: '',
        en: ''
      },
      isSettings: true
    });
  };

  return (
    <>
      <div className="w-12 bg-[#333333] flex flex-col items-center py-2">
        <button
          onClick={onSidebarToggle}
          className={`w-12 h-12 flex items-center justify-center hover:text-white ${
            isSidebarOpen ? 'text-white border-l-2 border-white bg-[#2d2d2d]' : 'text-[#858585]'
          }`}
          title="Explorer"
        >
          <VscFiles className="text-2xl" />
        </button>

        <button
          onClick={onSourceControlToggle}
          className={`w-12 h-12 flex items-center justify-center hover:text-white ${
            isSourceControlOpen ? 'text-white border-l-2 border-white bg-[#2d2d2d]' : 'text-[#858585]'
          }`}
          title="Source Control"
        >
          <VscSourceControl className="text-2xl" />
        </button>

        <button
          onClick={onExtensionsToggle}
          className={`w-12 h-12 flex items-center justify-center hover:text-white relative overflow-hidden group  ${
            isExtensionsOpen ? 'text-white border-l-2 border-white bg-[#2d2d2d]' : 'text-[#858585]'
          }`}
          title="Extensions"
        >
            <div className="absolute inset-0">
                <div className="absolute inset-0 animate-shine-silver bg-gradient-to-r from-transparent via-[#C0C0C0]/20 to-transparent" />
                <div className="absolute inset-0 animate-shine-silver-delayed bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <div className="absolute inset-0 animate-shine-silver-bright bg-gradient-to-r from-transparent via-[#E8E8E8]/10 to-transparent" />
              </div>
          <VscExtensions className="text-2xl relative z-10" />
        </button>

        {isExtensionInstalled('tetris-break') && (
          <button
            onClick={() => setIsTetrisOpen(true)}
            className="w-12 h-12 flex items-center justify-center text-[#858585] hover:text-white"
            title="Tetris Break"
          >
            <GiCubes className="text-2xl text-[#ff0000]" />
          </button>
        )}

        <div className="flex-1" />

        <button
          onClick={handleSettingsClick}
          className="w-12 h-12 flex items-center justify-center hover:text-white"
          title="Settings"
        >
          <VscGear className="text-2xl text-[#858585] hover:text-white" />
        </button>
      </div>

      {isTetrisOpen && (
        <Tetris onClose={() => setIsTetrisOpen(false)} />
      )}
    </>
  );
};

export default ActivityBar; 