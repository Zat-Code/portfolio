import { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useExtensions } from '../../context/ExtensionsContext';
import { VscSearch, VscRefresh, VscClearAll, VscCloudDownload, VscTrash } from 'react-icons/vsc';
import { GiPenguin, GiGuitar, GiCubes } from 'react-icons/gi';

interface Extension {
  id: string;
  name: string;
  description: string;
  icon: JSX.Element;
  author: string;
  downloads: string;
  rating: number;
}

interface ExtensionsSidebarProps {
  width?: number;
  onWidthChange?: (width: number) => void;
}

const ExtensionsSidebar = ({ width = 300, onWidthChange }: ExtensionsSidebarProps) => {
  const { language } = useLanguage();
  const { isExtensionInstalled, installExtension, uninstallExtension } = useExtensions();
  const [searchQuery, setSearchQuery] = useState('');

  const extensions: Extension[] = [
    {
      id: 'guitar-player',
      name: 'Guitar Player',
      description: language === 'fr' 
        ? '🎸 Transformez votre IDE en scène de concert ! Écoutez mes riffs de guitare pendant que vous codez comme une rock star. Bonus : Peut transformer mystérieusement vos bugs en solos de guitare endiablés !'
        : '🎸 Transform your IDE into a concert stage! Listen to my guitar riffs while coding like a rock star. Bonus: Can mysteriously transform your bugs into wild guitar solos!',
      icon: <GiGuitar className="text-[#1db954]" />,
      author: 'Zat',
      downloads: '13',
      rating: 5.0
    },
    {
      id: 'penguin-mode',
      name: 'Penguin Mode',
      description: language === 'fr' 
        ? '🐧 Linux n\'est plus le seul à avoir des pingouins ! Une extension qui fait pleuvoir des pingouins à chaque clic. Parfait pour les développeurs qui trouvent que leur code manque de manchots volants.\n\n⚠️ PS : Aucun pingouin n\'a été maltraité pendant le développement de cette extension ! 🐧'
        : '🐧 Linux is no longer the only one with penguins! An extension that makes it rain penguins with every click. Perfect for developers who think their code lacks flying penguins.\n\n⚠️ PS: No penguins were harmed in the making of this extension! 🐧',
      icon: <GiPenguin className="text-[#000000]" />,
      author: 'Zat',
      downloads: '42',
      rating: 5.0
    },
    {
      id: 'tetris-break',
      name: 'Tetris Break',
      description: language === 'fr'
        ? '🎮 Besoin d\'une pause code ? Faites une partie de Tetris ! Cette extension ajoute un bouton magique dans votre barre d\'activité qui ouvre un Tetris classique. Attention : peut créer une dépendance et des "erreurs de productivité" !'
        : '🎮 Need a coding break? Play some Tetris! This extension adds a magical button to your activity bar that opens a classic Tetris game. Warning: may cause addiction and "productivity errors"!',
      icon: <GiCubes className="text-[#ff0000]" />,
      author: 'Zat',
      downloads: '27',
      rating: 5.0
    }
  ];

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startX = e.pageX;
    const startWidth = width;

    const handleMouseMove = (e: MouseEvent) => {
      if (onWidthChange) {
        const newWidth = startWidth + e.pageX - startX;
        onWidthChange(Math.max(200, Math.min(800, newWidth)));
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleExtensionToggle = (id: string) => {
    if (isExtensionInstalled(id)) {
      uninstallExtension(id);
    } else {
      installExtension(id);
    }
  };

  const filteredExtensions = extensions.filter(extension => 
    extension.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    extension.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    extension.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-full relative" style={{ width: `${width}px` }}>
      {/* En-tête */}
      <div className="px-4 py-2 uppercase tracking-wider text-xs text-white/60">
        {language === 'fr' ? 'Extensions' : 'Extensions'}
      </div>

      {/* Barre de recherche */}
      <div className="px-4 py-2">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={language === 'fr' ? 'Rechercher des extensions...' : 'Search extensions...'}
            className="w-full bg-[#3c3c3c] text-white/80 px-8 py-1.5 rounded text-sm focus:outline-none focus:ring-1 focus:ring-[#007acc]"
          />
          <VscSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/60" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
            >
              <VscClearAll />
            </button>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="px-4 py-2 flex items-center gap-2">
        <button className="text-white/60 hover:text-white">
          <VscRefresh className="text-lg" />
        </button>
      </div>

      {/* Liste des extensions */}
      <div className="overflow-y-auto" style={{ height: 'calc(100% - 120px)' }}>
        {filteredExtensions.map((extension) => (
          <div
            key={extension.id}
            className="px-4 py-3 hover:bg-[#2a2d2e] border-b border-[#3c3c3c] group"
          >
            <div className="flex items-start gap-3">
              <div className="text-2xl flex-shrink-0 mt-1">
                {extension.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-[#e8e8e8] font-medium">{extension.name}</h3>
                  <button
                    onClick={() => handleExtensionToggle(extension.id)}
                    className={`
                      px-2 py-0.5 rounded text-xs flex items-center gap-1
                      ${isExtensionInstalled(extension.id)
                        ? 'text-white bg-red-600 hover:bg-red-700'
                        : 'text-white bg-[#007acc] hover:bg-[#006bb3]'}
                      transition-colors duration-200
                    `}
                  >
                    {isExtensionInstalled(extension.id) ? (
                      <>
                        <VscTrash className="text-sm" />
                        <span>{language === 'fr' ? 'Désinstaller' : 'Uninstall'}</span>
                      </>
                    ) : (
                      <>
                        <VscCloudDownload className="text-sm" />
                        <span>{language === 'fr' ? 'Installer' : 'Install'}</span>
                      </>
                    )}
                  </button>
                </div>
                <p className="text-white/60 text-sm whitespace-pre-wrap">{extension.description}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-white/40">
                  <span>{extension.author}</span>
                  <span>•</span>
                  <span>{extension.downloads} {language === 'fr' ? 'téléchargements' : 'downloads'}</span>
                  <span>•</span>
                  <span>★ {extension.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Redimensionnement */}
      <div 
        className="absolute top-0 right-0 w-1 h-full cursor-col-resize group"
        onMouseDown={handleMouseDown}
      >
        <div className="w-[1px] h-full bg-[#333] group-hover:bg-[#007acc] transition-colors" />
      </div>
    </div>
  );
};

export default ExtensionsSidebar; 