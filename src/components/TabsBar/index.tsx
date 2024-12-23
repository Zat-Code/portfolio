import { useFiles } from '../../context/FileContext';
import { VscClose, VscChevronDown } from 'react-icons/vsc';

interface TabProps {
  id: string;
  name: string;
  isActive: boolean;
  onClose: () => void;
  onClick: () => void;
}

const Tab = ({ name, isActive, onClose, onClick }: TabProps) => (
  <div 
    className={`h-full flex items-center px-3 border-r border-[#1e1e1e] cursor-pointer group
      ${isActive 
        ? 'bg-[#1e1e1e] text-white border-b-2 border-b-[#007acc]'
        : 'bg-[#2d2d2d] text-white/60 hover:text-white/80'}`
    }
    onClick={onClick}
  >
    <span className="text-xs">{name}</span>
    <button 
      className={`ml-2 p-0.5 rounded hover:bg-[#333] ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
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
  const { files, activeFile, setActiveFile, openedFiles, closeFile } = useFiles();

  if (openedFiles.length === 0) {
    return <div className="h-9 bg-[#252526] border-b border-[#1e1e1e]" />;
  }

  return (
    <div className="h-9 bg-[#252526] flex items-center border-b border-[#1e1e1e]">
      <div className="flex h-full">
        {openedFiles.map((file) => (
          <Tab
            key={file.id}
            id={file.id}
            name={file.name}
            isActive={activeFile?.id === file.id}
            onClose={() => closeFile(file.id)}
            onClick={() => setActiveFile(file)}
          />
        ))}
      </div>
      
      {/* Menu des onglets */}
      <button className="px-2 h-full text-white/60 hover:text-white hover:bg-[#2d2d2d]">
        <VscChevronDown className="text-sm" />
      </button>
    </div>
  );
};

export default TabsBar; 