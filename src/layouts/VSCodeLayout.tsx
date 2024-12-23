import { useState } from 'react';
import MenuBar from '../components/MenuBar';
import ActivityBar from '../components/ActivityBar';
import Sidebar from '../components/Sidebar';
import Editor from '../components/Editor';
import StatusBar from '../components/StatusBar';
import Terminal from '../components/Terminal';
import { VscMenu, VscFolderOpened } from 'react-icons/vsc';
import { useFiles } from '../context/FileContext';

const VSCodeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const { isInterfaceOpen, openInterface, closeInterface } = useFiles();

  const handleClose = () => {
    setIsSidebarOpen(false);
    setIsTerminalOpen(false);
    closeInterface();
  };

  if (!isInterfaceOpen) {
    return (
      <div className="h-screen flex flex-col bg-[#1e1e1e] text-white">
        <MenuBar onClose={handleClose} onTerminalToggle={() => {}} />
        <div className="flex-1 flex items-center justify-center">
          <button
            onClick={openInterface}
            className="px-4 py-2 bg-[#0e639c] hover:bg-[#1177bb] text-white rounded-sm flex items-center gap-2 relative overflow-hidden group"
          >
            <div className="absolute inset-0">
              <div className="absolute inset-0 animate-shine-silver bg-gradient-to-r from-transparent via-[#C0C0C0]/20 to-transparent" />
              <div className="absolute inset-0 animate-shine-silver-delayed bg-gradient-to-r from-transparent via-white/15 to-transparent" />
              <div className="absolute inset-0 animate-shine-silver-bright bg-gradient-to-r from-transparent via-[#E8E8E8]/10 to-transparent" />
            </div>
            <VscFolderOpened className="text-xl relative z-10" />
            <span className="relative z-10">Open Folder</span>
          </button>
        </div>
        <StatusBar />
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-[#1e1e1e] text-white">
      {/* MenuBar mobile */}
      <div className="lg:hidden">
        <div className="h-9 bg-[#3c3c3c] flex items-center justify-between px-3">
          <button className="text-white/80">
            <VscMenu className="text-xl" />
          </button>
          <div className="text-white/80 text-sm">Portfolio - VS Code</div>
        </div>
      </div>

      {/* MenuBar desktop */}
      <div className="hidden lg:block">
        <MenuBar 
          onTerminalToggle={() => setIsTerminalOpen(!isTerminalOpen)} 
          onClose={handleClose}
        />
      </div>

      <div className="flex-1 flex overflow-hidden">
        <ActivityBar 
          onSidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} 
          isSidebarOpen={isSidebarOpen}
        />

        {isSidebarOpen && (
          <Sidebar 
            width={sidebarWidth} 
            onWidthChange={setSidebarWidth}
          />
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-auto">
            <Editor />
          </div>
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