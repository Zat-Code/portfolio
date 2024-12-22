import { 
  VscChromeMinimize, 
  VscChromeMaximize, 
  VscChromeClose,
  VscCode,
  VscChevronLeft,
  VscChevronRight,
  VscSearch
} from 'react-icons/vsc'

const MenuBar = () => {
  const menuItems = ['File', 'Edit', 'Selection', 'View', 'Go', 'Run', 'Terminal', 'Help']

  return (
    <div className="h-8 bg-[#3c3c3c] flex items-center justify-between select-none">
      {/* Logo et Menu Items */}
      <div className="flex items-center">
        <div className="flex items-center px-3 hover:bg-[#505050]">
          <VscCode className="text-[#5FB2D7] text-xl" />
        </div>
        
        {menuItems.map((item) => (
          <button
            key={item}
            className="px-3 text-sm text-white/80 hover:bg-[#505050] h-8 flex items-center"
          >
            {item}
          </button>
        ))}
      </div>

      {/* Titre du projet */}
      <div className="flex-1 text-center text-white/80 text-sm">
        Portfolio - Visual Studio Code
      </div>

      {/* Window Controls */}
      <div className="flex">
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
  )
}

export default MenuBar