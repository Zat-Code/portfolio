import MenuBar from '../components/MenuBar'
import ActivityBar from '../components/ActivityBar'
import Sidebar from '../components/Sidebar'
import Editor from '../components/Editor'
import StatusBar from '../components/StatusBar'
import { useState } from 'react'
import { VscMenu, VscChromeMinimize, VscChromeMaximize, VscChromeClose } from 'react-icons/vsc'

const VSCodeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
          <button className="px-2 hover:bg-[#E81123] h-8 flex items-center">
            <VscChromeClose className="text-white/80" size={16} />
          </button>
        </div>
      </div>

      {/* MenuBar version desktop */}
      <div className="hidden lg:block">
        <MenuBar />
      </div>

      {/* Menu mobile déroulant */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-12 left-0 right-0 bg-[#3c3c3c] z-50">
          <MenuBar isMobile={true} />
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

        {/* Sidebar - avec taille responsive */}
        <div 
          className={`
            transition-all duration-300 ease-in-out
            ${isSidebarOpen 
              ? 'w-[20%] min-w-[200px] max-w-[400px] opacity-100' 
              : 'w-0 opacity-0'
            }
            overflow-hidden flex-shrink-0 bg-[#252526]
          `}
        >
          <div className="h-full" style={{ width: '20vw', minWidth: '200px' }}>
            <Sidebar />
          </div>
        </div>

        {/* Editor - avec flex-1 pour prendre l'espace restant */}
        <div className="flex-1 min-w-0">
          <Editor />
        </div>
      </div>

      <StatusBar />
    </div>
  );
};

export default VSCodeLayout; 