import { VscFiles, VscSearch, VscSourceControl, VscExtensions } from 'react-icons/vsc';

interface ActivityBarProps {
  onSidebarToggle: () => void;
  isSidebarOpen: boolean;
}

const ActivityBar = ({ onSidebarToggle, isSidebarOpen }: ActivityBarProps) => {
  return (
    <div className="h-full flex flex-col items-center py-2">
      <button 
        className={`
          w-12 h-12 flex items-center justify-center
          relative
          ${isSidebarOpen 
            ? 'text-white after:absolute after:left-0 after:top-0 after:h-full after:w-[2px] after:bg-[#d4d4d4]' 
            : 'text-white/60 hover:text-white'
          }
          transition-all duration-200
          hover:bg-[#2a2d2e]
          overflow-hidden
          group
        `}
        onClick={onSidebarToggle}
      >
        <VscFiles className="text-2xl relative z-10" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 animate-shine-silver bg-gradient-to-r from-transparent via-[#C0C0C0]/20 to-transparent" />
          <div className="absolute inset-0 animate-shine-silver-delayed bg-gradient-to-r from-transparent via-white/15 to-transparent" />
          <div className="absolute inset-0 animate-shine-silver-bright bg-gradient-to-r from-transparent via-[#E8E8E8]/10 to-transparent" />
        </div>
      </button>
      
      <button className="w-12 h-12 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#2a2d2e]">
        <VscSearch className="text-2xl" />
      </button>
      
      <button className="w-12 h-12 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#2a2d2e]">
        <VscSourceControl className="text-2xl" />
      </button>
      
      <button className="w-12 h-12 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#2a2d2e]">
        <VscExtensions className="text-2xl" />
      </button>
    </div>
  );
};

export default ActivityBar; 