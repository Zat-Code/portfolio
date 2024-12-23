import MenuBar from '../components/MenuBar'
import ActivityBar from '../components/ActivityBar'
import Sidebar from '../components/Sidebar'
import Editor from '../components/Editor'
import StatusBar from '../components/StatusBar'
import { useState } from 'react'
import { VscMenu, VscChromeMinimize, VscChromeMaximize, VscChromeClose, VscFolderOpened } from 'react-icons/vsc'
import Terminal from '../components/Terminal'

const VSCodeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isInterfaceClosed, setIsInterfaceClosed] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(300);

  const handleClose = () => {
    setIsInterfaceClosed(true);
  };

  const handleReopen = () => {
    // Animation de reload
    setIsInterfaceClosed(false);
    // Optionnel : reset d'autres états si nécessaire
    setIsSidebarOpen(true);
    setIsMobileMenuOpen(false);
  };

  const handleTerminalToggle = () => {
    setIsTerminalOpen(!isTerminalOpen);
  };

  if (isInterfaceClosed) {
    return (
      <div className="h-screen flex flex-col bg-[#1e1e1e] text-white">
        {/* MenuBar mobile */}
        <div className="lg:hidden flex items-center h-8 bg-[#3c3c3c] px-4 justify-between">
          <button 
            className="text-white/80 hover:text-white"
          >
            <VscMenu size={20} />
          </button>

          <div className="text-white/80 text-sm truncate max-w-[200px]">
            Portfolio - Visual Studio Code
          </div>

          <div className="flex">
            <button className="px-2 hover:bg-[#505050] h-8 flex items-center">
              <VscChromeMinimize className="text-white/80" size={16} />
            </button>
            <button className="px-2 hover:bg-[#505050] h-8 flex items-center">
              <VscChromeMaximize className="text-white/80" size={16} />
            </button>
            <button className="px-2 hover:bg-[#E81123] h-8 flex items-center">
              <VscChromeClose className="text-white/80" size={16} />
            </button>
          </div>
        </div>

        {/* MenuBar version desktop */}
        <div className="hidden lg:block">
          <MenuBar 
            onClose={handleClose} 
            onTerminalToggle={handleTerminalToggle}
          />
        </div>

        {/* Contenu central avec bouton de réouverture */}
        <div className="flex-1 flex items-center justify-center bg-[#1e1e1e]">
          <button
            onClick={handleReopen}
            className="group relative px-4 py-2 bg-[#007acc] hover:bg-[#007acc]/90 rounded flex items-center gap-2 overflow-hidden"
          >
            {/* Effet argenté similaire */}
            <div className="absolute inset-0">
              <div className="absolute inset-0 animate-shine-silver bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="absolute inset-0 animate-shine-silver-delayed bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>
            <div className="relative z-10 flex items-center gap-2">
              <VscFolderOpened className="text-lg" />
              <span>Open Folder</span>
            </div>
          </button>
        </div>

        {/* StatusBar original */}
        <StatusBar />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e] text-white overflow-hidden">
      {/* MenuBar mobile */}
      <div className="lg:hidden flex items-center h-8 bg-[#3c3c3c] px-4 justify-between">
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-white/80 hover:text-white"
        >
          <VscMenu size={20} />
        </button>

        {/* Titre centré */}
        <div className="text-white/80 text-sm truncate max-w-[200px]">
          Portfolio - Visual Studio Code
        </div>

        {/* Window Controls */}
        <div className="flex">
          <button className="px-2 hover:bg-[#505050] h-8 flex items-center">
            <VscChromeMinimize className="text-white/80" size={16} />
          </button>
          <button className="px-2 hover:bg-[#505050] h-8 flex items-center">
            <VscChromeMaximize className="text-white/80" size={16} />
          </button>
          <button className="px-2 hover:bg-[#E81123] h-8 flex items-center" onClick={handleClose}>
            <VscChromeClose className="text-white/80" size={16} />
          </button>
        </div>
      </div>

      {/* MenuBar version desktop */}
      <div className="hidden lg:block">
        <MenuBar 
          onClose={handleClose} 
          onTerminalToggle={handleTerminalToggle}
        />
      </div>

      {/* Menu mobile déroulant */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-12 left-0 right-0 bg-[#3c3c3c] z-50">
          <MenuBar 
            isMobile={true} 
            onClose={handleClose}
            onTerminalToggle={handleTerminalToggle}
          />
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* ActivityBar */}
        <div className="w-12 flex-shrink-0 bg-[#333333]">
          <ActivityBar 
            onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)}
            isSidebarOpen={isSidebarOpen}
          />
        </div>

        {/* Sidebar */}
        <div 
          className={`
            transition-all duration-300 ease-in-out
            ${isSidebarOpen 
              ? 'opacity-100' 
              : 'w-0 opacity-0'
            }
            overflow-hidden flex-shrink-0 bg-[#252526]
          `}
          style={{ 
            width: isSidebarOpen ? `${sidebarWidth}px` : '0',
            minWidth: isSidebarOpen ? '200px' : '0',
            maxWidth: isSidebarOpen ? '800px' : '0'
          }}
        >
          <Sidebar 
            width={sidebarWidth}
            onWidthChange={setSidebarWidth}
          />
        </div>

        {/* Zone Editor + Terminal */}
        <div className="flex-1 min-w-0 flex flex-col">
          {/* Editor */}
          <div className="flex-1 min-h-0">
            <Editor />
          </div>

          {/* Terminal */}
          {isTerminalOpen && (
            <Terminal onClose={() => setIsTerminalOpen(false)} />
          )}
        </div>
      </div>

      <StatusBar />
    </div>
  );
};

export default VSCodeLayout; 