import { useState } from 'react';
import ActivityBar from '../components/ActivityBar';
import Sidebar from '../components/Sidebar';
import ExtensionsSidebar from '../components/ExtensionsSidebar';
import TabsBar from '../components/TabsBar';
import Editor from '../components/Editor';
import StatusBar from '../components/StatusBar';
import MenuBar from '../components/MenuBar';
import Terminal from '../components/Terminal';
import WindowsXP from '../components/WindowsXP';
import PenguinConfetti from '../components/PenguinConfetti';
import AudioPlayer from '../components/AudioPlayer';
import { ExtensionsProvider, useExtensions } from '../context/ExtensionsContext';
import { useFiles } from '../context/FileContext';
import { VscFolderOpened } from 'react-icons/vsc';
import SourceControlSidebar from '../components/SourceControlSidebar';

interface VSCodeLayoutProps {
  onClose: () => void;
}

const VSCodeLayoutContent = ({ onClose }: VSCodeLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isExtensionsOpen, setIsExtensionsOpen] = useState(false);
  const [isSourceControlOpen, setIsSourceControlOpen] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(300);
  const [extensionsWidth, setExtensionsWidth] = useState(300);
  const [sourceControlWidth, setSourceControlWidth] = useState(300);
  const { isExtensionInstalled } = useExtensions();
  const { isInterfaceOpen, openInterface, closeInterface } = useFiles();

  const handleClose = () => {
    closeInterface();
    onClose();
  };

  const handleTerminalToggle = () => {
    setIsTerminalOpen(!isTerminalOpen);
  };

  const handleFullScreenToggle = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleRestore = () => {
    setIsMinimized(false);
  };

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsExtensionsOpen(false);
    setIsSourceControlOpen(false);
  };

  const handleExtensionsToggle = () => {
    setIsExtensionsOpen(!isExtensionsOpen);
    setIsSidebarOpen(false);
    setIsSourceControlOpen(false);
  };

  const handleSourceControlToggle = () => {
    setIsSourceControlOpen(!isSourceControlOpen);
    setIsSidebarOpen(false);
    setIsExtensionsOpen(false);
  };

  if (isMinimized) {
    return <WindowsXP onRestore={handleRestore} />;
  }

  if (!isInterfaceOpen) {
    return (
      <div className="flex flex-col h-screen bg-[#1e1e1e] text-white">
        <MenuBar 
          onClose={handleClose}
          onTerminalToggle={handleTerminalToggle}
          onFullScreenToggle={handleFullScreenToggle}
          onMinimize={handleMinimize}
          isFullScreen={isFullScreen}
        />
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
        <PenguinConfetti isActive={isExtensionInstalled('penguin-mode')} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-[#1e1e1e] text-white">
      <MenuBar 
        onClose={handleClose}
        onTerminalToggle={handleTerminalToggle}
        onFullScreenToggle={handleFullScreenToggle}
        onMinimize={handleMinimize}
        isFullScreen={isFullScreen}
      />
      
      <div className="flex-1 flex overflow-hidden">
        <ActivityBar 
          onSidebarToggle={handleSidebarToggle}
          onExtensionsToggle={handleExtensionsToggle}
          onSourceControlToggle={handleSourceControlToggle}
          isSidebarOpen={isSidebarOpen}
          isExtensionsOpen={isExtensionsOpen}
          isSourceControlOpen={isSourceControlOpen}
        />
        
        {isSidebarOpen && (
          <Sidebar 
            width={sidebarWidth}
            onWidthChange={setSidebarWidth}
          />
        )}

        {isExtensionsOpen && (
          <ExtensionsSidebar 
            width={extensionsWidth}
            onWidthChange={setExtensionsWidth}
          />
        )}

        {isSourceControlOpen && (
          <SourceControlSidebar 
            width={sourceControlWidth}
            onWidthChange={setSourceControlWidth}
          />
        )}
        
        <div className="flex-1 flex flex-col min-w-0">
          <div className="flex-none">
            <TabsBar />
          </div>
          
          <div className="flex-1 overflow-hidden">
            <Editor />
          </div>
          
          {isTerminalOpen && (
            <Terminal onClose={() => setIsTerminalOpen(false)} />
          )}
        </div>
      </div>

      <PenguinConfetti isActive={isExtensionInstalled('penguin-mode')} />
      
      {isExtensionInstalled('guitar-player') && (
        <div className="flex-none">
          <AudioPlayer onClose={() => uninstallExtension('guitar-player')} />
        </div>
      )}
      
      <StatusBar />
    </div>
  );
};

const VSCodeLayout = (props: VSCodeLayoutProps) => (
  <ExtensionsProvider>
    <VSCodeLayoutContent {...props} />
  </ExtensionsProvider>
);

export default VSCodeLayout; 