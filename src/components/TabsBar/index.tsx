import { VscClose, VscChevronDown } from 'react-icons/vsc';
import { useFiles } from '../../context/FileContext';

interface TabProps {
  file: IFile;
  isActive: boolean;
  onClose: () => void;
  onClick: () => void;
}

const Tab = ({ file, isActive, onClose, onClick }: TabProps) => (
  <div 
    className={`
      h-full flex items-center px-3 min-w-[120px] max-w-[200px]
      border-r border-[#1e1e1e] cursor-pointer group
      ${isActive 
        ? 'bg-[#1e1e1e] text-white border-b-2 border-b-[#007acc]'
        : 'bg-[#2d2d2d] text-white/60 hover:text-white/80'
      }
    `}
    onClick={onClick}
  >
    <span className="truncate text-sm flex-1">{file.name}</span>
    <button 
      className={`
        ml-2 p-0.5 rounded hover:bg-[#333] 
        ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}
        transition-opacity
      `}
      onClick={(e) => {
        e.stopPropagation();
        onClose();
      }}
    >
      <VscClose className="text-xs" />
    </button>
  </div>
);

const TabsBar = () => {
  const { activeFile, setActiveFile, openedFiles, closeFile } = useFiles();

  if (openedFiles.length === 0) {
    return <div className="h-9 bg-[#252526] border-b border-[#3c3c3c]" />;
  }

  return (
    <div className="h-9 bg-[#252526] flex items-center border-b border-[#3c3c3c]">
      <div className="flex h-full overflow-x-auto flex-1">
        {openedFiles.map((file) => (
          <Tab
            key={file.id}
            file={file}
            isActive={activeFile?.id === file.id}
            onClose={() => closeFile(file.name)}
            onClick={() => setActiveFile(file)}
          />
        ))}
      </div>
      
      {/* Menu des onglets */}
      <button className="px-2 h-full text-white/60 hover:text-white hover:bg-[#2d2d2d] flex-shrink-0">
        <VscChevronDown className="text-sm" />
      </button>
    </div>
  );
};

export default TabsBar; 