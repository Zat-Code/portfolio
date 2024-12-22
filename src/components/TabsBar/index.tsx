import { useFiles } from '../../context/FileContext';
import { VscClose } from 'react-icons/vsc';

const TabsBar = () => {
  const { activeFile, setActiveFile } = useFiles();

  if (!activeFile) return (
    <div className="h-9 bg-[#2d2d2d] border-b border-[#3c3c3c]" />
  );

  return (
    <div className="h-9 bg-[#2d2d2d] flex items-center px-2 border-b border-[#3c3c3c]">
      <div className="px-3 py-1 bg-[#1e1e1e] text-white/80 text-sm flex items-center group">
        {activeFile.name}
        <button 
          className="ml-2 opacity-0 group-hover:opacity-100"
          onClick={() => setActiveFile(null)}
        >
          <VscClose />
        </button>
      </div>
    </div>
  );
};

export default TabsBar; 