import { 
  VscChromeMinimize, 
  VscChromeMaximize, 
  VscChromeClose,
  VscCode
} from 'react-icons/vsc';
import { useLanguage } from '../../context/LanguageContext';

interface MenuBarProps {
  isMobile?: boolean;
  onClose: () => void;
  onTerminalToggle: () => void;
  onFullScreenToggle: () => void;
  isFullScreen: boolean;
}

const MenuBar = ({ isMobile = false, onClose, onTerminalToggle, onFullScreenToggle }: MenuBarProps) => {
  const { t } = useLanguage();
  const menuItems = [
    t('menu.file'),
    t('menu.edit'),
    t('menu.selection'),
    t('menu.view'),
    t('menu.go'),
    t('menu.run'),
    t('menu.terminal'),
    t('menu.help')
  ];

  const handleMenuClick = (item: string) => {
    if (item === t('menu.terminal')) {
      onTerminalToggle();
    }
  };

  if (isMobile) {
    return (
      <div className="py-2">
        {menuItems.map((item) => (
          <div 
            key={item}
            className={`
              px-4 py-2 text-white/80 hover:bg-[#505050] cursor-pointer
              ${item === t('menu.terminal') ? 'relative overflow-hidden group' : ''}
            `}
            onClick={() => handleMenuClick(item)}
          >
            {item === t('menu.terminal') && (
              <div className="absolute inset-0">
                <div className="absolute inset-0 animate-shine-silver bg-gradient-to-r from-transparent via-[#C0C0C0]/20 to-transparent" />
                <div className="absolute inset-0 animate-shine-silver-delayed bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <div className="absolute inset-0 animate-shine-silver-bright bg-gradient-to-r from-transparent via-[#E8E8E8]/10 to-transparent" />
              </div>
            )}
            <span className={item === t('menu.terminal') ? 'relative z-10' : ''}>
              {item}
            </span>
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
          <VscCode className="w-5 h-5 text-white/80" />
        </div>
        
        {/* Menu items - cachés sur petit écran */}
        <div className="hidden lg:flex">
          {menuItems.map((item) => (
            <button
              key={item}
              className={`
                px-3 text-sm text-white/80 hover:bg-[#505050] h-8 flex items-center
                ${item === t('menu.terminal') ? 'relative overflow-hidden group' : ''}
              `}
              onClick={() => handleMenuClick(item)}
            >
              {item === t('menu.terminal') && (
                <div className="absolute inset-0">
                  <div className="absolute inset-0 animate-shine-silver bg-gradient-to-r from-transparent via-[#C0C0C0]/20 to-transparent" />
                  <div className="absolute inset-0 animate-shine-silver-delayed bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  <div className="absolute inset-0 animate-shine-silver-bright bg-gradient-to-r from-transparent via-[#E8E8E8]/10 to-transparent" />
                </div>
              )}
              <span className={item === t('menu.terminal') ? 'relative z-10' : ''}>
                {item}
              </span>
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
        <button 
          className="px-3 hover:bg-[#505050] h-8 flex items-center"
          onClick={onFullScreenToggle}
        >
          <VscChromeMaximize className="text-white/80" />
        </button>
        <button 
          className="px-3 bg-[#E81123] hover:bg-[#F1707A] h-8 flex items-center"
          onClick={onClose}
        >
          <VscChromeClose className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default MenuBar;