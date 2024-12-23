import { useState } from 'react';
import MenuBar from '../components/MenuBar';
import ActivityBar from '../components/ActivityBar';
import Sidebar from '../components/Sidebar';
import Editor from '../components/Editor';
import StatusBar from '../components/StatusBar';
import Terminal from '../components/Terminal';
import { VscMenu } from 'react-icons/vsc';

const VSCodeLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);

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