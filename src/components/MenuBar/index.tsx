import { 
  VscChromeMinimize, 
  VscChromeMaximize, 
  VscChromeClose,
  VscCode
} from 'react-icons/vsc';

interface MenuBarProps {
  isMobile?: boolean;
}

const MenuBar = ({ isMobile = false }: MenuBarProps) => {
  const menuItems = ['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help'];

  if (isMobile) {
    return (
      <div className="py-2">
        {menuItems.map((item) => (
          <div 
            key={item}
            className="px-4 py-2 text-white/80 hover:bg-[#505050]"
          >
            {item}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="h-8 bg-[#3c3c3c] flex items-center justify-between select-none">
      {/* Logo et Menu Items */}
      <div className="flex items-center flex-1">
        <div className="flex items-center px-3 hover:bg-[#505050]">
          <VscCode className="text-[#5FB2D7] text-xl" />
        </div>
        
        {/* Menu items - cachés sur petit écran */}
        <div className="hidden lg:flex">
          {menuItems.map((item) => (
            <button
              key={item}
              className="px-3 text-sm text-white/80 hover:bg-[#505050] h-8 flex items-center"
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {/* Titre du projet - centré et visible sur tous les écrans */}
      <div className="absolute left-1/2 transform -translate-x-1/2 text-white/80 text-sm truncate max-w-[200px] md:max-w-none">
        Portfolio - Visual Studio Code
      </div>

      {/* Window Controls - toujours visibles */}
      <div className="flex ml-auto">
        <button className="px-3 hover:bg-[#505050] h-8 flex items-center">
          <VscChromeMinimize className="text-white/80" />
        </button>
        <button className="px-3 hover:bg-[#505050] h-8 flex items-center">
          <VscChromeMaximize className="text-white/80" />
        </button>
        <button className="px-3 hover:bg-[#E81123] h-8 flex items-center">
          <VscChromeClose className="text-white/80" />
        </button>
      </div>
    </div>
  );
};

export default MenuBar;