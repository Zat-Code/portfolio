import { useState, useCallback } from 'react';
import { VscGitCommit, VscSync, VscCloudUpload } from 'react-icons/vsc';
import { useLanguage } from '../../context/LanguageContext';

interface SourceControlSidebarProps {
  width: number;
  onWidthChange: (width: number) => void;
}

const SourceControlSidebar = ({ width, onWidthChange }: SourceControlSidebarProps) => {
  const { language } = useLanguage();
  const [commitMessage, setCommitMessage] = useState('');
  const [isResizing, setIsResizing] = useState(false);
  const [commits, setCommits] = useState([
    {
      message: language === 'fr' 
        ? "🎵 ajout des musiques (promis j'ai pas piraté)" 
        : "🎵 added music (promise I didn't pirate them)",
      files: [
        { status: 'U', name: 'feel-good-inc.mp3', path: 'public/audio' },
        { status: 'U', name: 'just-the-two-of-us.mp3', path: 'public/audio' },
        { status: 'U', name: 'outer-wilds.mp3', path: 'public/audio' },
        { status: 'U', name: 'song-of-storms.mp3', path: 'public/audio' },
        { status: 'U', name: 'the-last-of-us.mp3', path: 'public/audio' }
      ],
      date: new Date()
    },
    {
      message: language === 'fr'
        ? "🖼️ ajout des covers (volées sur Google Images)" 
        : "🖼️ added covers (stolen from Google Images)",
      files: [
        { status: 'U', name: 'feel-good.jpg', path: 'public/audio/covers' },
        { status: 'U', name: 'just-the-two-of-us.jpg', path: 'public/audio/covers' },
        { status: 'U', name: 'outer-wilds.jpg', path: 'public/audio/covers' },
        { status: 'U', name: 'song-of-storms.jpg', path: 'public/audio/covers' },
        { status: 'U', name: 'the-last-of-us.jpg', path: 'public/audio/covers' }
      ],
      date: new Date()
    },
    {
      message: language === 'fr'
        ? "🐧 ajout du mode pingouin (désolé Linux)" 
        : "🐧 added penguin mode (sorry Linux)",
      files: [
        { status: 'M', name: 'package.json', path: '' },
        { status: 'M', name: 'package-lock.json', path: '' }
      ],
      date: new Date()
    },
    {
      message: language === 'fr'
        ? "🪟 ajout du mode Windows XP (Bill Gates va me tuer)" 
        : "🪟 added Windows XP mode (Bill Gates will kill me)",
      files: [
        { status: 'U', name: 'windows-xp-bliss.jpg', path: 'public' }
      ],
      date: new Date()
    }
  ]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (isResizing) {
        const newWidth = e.clientX;
        if (newWidth > 200 && newWidth < 600) {
          onWidthChange(newWidth);
        }
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [isResizing, onWidthChange]);

  const handleCommit = () => {
    if (commitMessage.trim()) {
      setCommits(prev => [{
        message: commitMessage,
        files: [
          { status: 'M', name: 'nouveau-fichier.txt', path: 'src' }
        ],
        date: new Date()
      }, ...prev]);
      setCommitMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.ctrlKey && e.key === 'Enter') {
      handleCommit();
    }
  };

  return (
    <div 
      className="bg-[#252526] border-r border-[#3c3c3c] overflow-hidden flex"
      style={{ width: `${width}px` }}
    >
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-2 uppercase tracking-wider text-xs text-white/60 flex items-center justify-between">
          <span>Source Control</span>
          <div className="flex items-center gap-2">
            <button className="text-white/60 hover:text-white" title="Sync Changes">
              <VscSync className="text-sm" />
            </button>
            <button className="text-white/60 hover:text-white" title="Push">
              <VscCloudUpload className="text-sm" />
            </button>
          </div>
        </div>

        <div className="px-4 py-2">
          <div className="flex items-center justify-between mb-4">
            <input
              type="text"
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={language === 'fr' ? "Message (Ctrl+Entrée pour commit)" : "Message (Ctrl+Enter to commit)"}
              className="w-full bg-[#3c3c3c] text-white/80 px-2 py-1 text-sm rounded border border-transparent focus:border-[#007acc] focus:outline-none"
            />
          </div>

          <button 
            onClick={handleCommit}
            className="w-full px-3 py-1.5 bg-[#3c3c3c] text-white/80 rounded flex items-center gap-2 hover:bg-[#4c4c4c]"
          >
            <VscGitCommit className="text-sm" />
            <span className="text-sm">Commit</span>
          </button>

          <div className="mt-6">
            {commits.map((commit, index) => (
              <div key={index} className="mb-4">
                <div className="flex items-center gap-2 text-white/80 mb-2">
                  <span className="text-sm font-medium">{commit.message}</span>
                  <span className="bg-[#4c4c4c] px-1 rounded text-xs">{commit.files.length}</span>
                </div>

                <div className="space-y-1">
                  {commit.files.map((file, fileIndex) => (
                    <div 
                      key={fileIndex}
                      className="flex items-center text-white/60 hover:bg-[#2a2d2e] py-1 px-2 cursor-pointer"
                    >
                      <span className={`mr-2 ${file.status === 'M' ? 'text-yellow-500' : 'text-green-500'}`}>
                        {file.status}
                      </span>
                      <span className="text-sm">{file.path ? `${file.path}/${file.name}` : file.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="w-1 hover:bg-[#007acc] cursor-col-resize"
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default SourceControlSidebar; 