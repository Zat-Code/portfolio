import { useState } from 'react';
import { useFiles } from '../../context/FileContext';
import { useLanguage } from '../../context/LanguageContext';
import EditorBlock from './EditorBlock';
import EditorStatusBar from './EditorStatusBar';
import TabsBar from '../TabsBar';
import { VscPreview, VscCode } from 'react-icons/vsc';
import ContactPreview from './previews/ContactPreview';
import HomePage from './HomePage';

const Editor = () => {
  const { activeFile, setActiveFile, files } = useFiles();
  const { t, language } = useLanguage();
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });
  const [isPreviewMode, setIsPreviewMode] = useState(true);

  const handleOpenHome = () => {
    const homeFile = files.find(f => f.name === 'home.tsx');
    if (homeFile) {
      setActiveFile(homeFile);
    }
  };

  // Vérifier si le fichier peut avoir une preview ET un mode éditeur
  const canTogglePreview = activeFile?.name === 'contact.json' || (activeFile?.language === 'tsx' && activeFile.name !== 'home.tsx');

  return (
    <div className="h-full flex flex-col">
      <TabsBar />
      <div className="flex-1 overflow-y-auto relative">
        {(!activeFile) ? (
          <div className="h-full flex flex-col items-center justify-center text-white/60">
            <button 
              onClick={handleOpenHome}
              className="px-4 py-2 border border-[#3c3c3c] rounded hover:bg-[#2d2d2d] transition-colors group relative overflow-hidden"
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 animate-shine-silver bg-gradient-to-r from-transparent via-[#C0C0C0]/20 to-transparent" />
                <div className="absolute inset-0 animate-shine-silver-delayed bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                <div className="absolute inset-0 animate-shine-silver-bright bg-gradient-to-r from-transparent via-[#E8E8E8]/10 to-transparent" />
              </div>
              <span className="relative z-10">{t('open.file')}</span>
            </button>
          </div>
        ) : (
          <>
            {/* Bouton de basculement Preview/Editor seulement pour les fichiers qui le permettent */}
            {canTogglePreview && (
              <button
                onClick={() => setIsPreviewMode(!isPreviewMode)}
                className="absolute top-4 right-4 z-10 px-3 py-1.5 
                  bg-[#2d2d2e] hover:bg-[#3d3d3e] 
                  text-white/80 rounded flex items-center gap-2 
                  border border-[#3d3d3e] overflow-hidden
                  transition-colors duration-200 group"
              >
                <div className="absolute inset-0">
                  <div className="absolute inset-0 animate-shine-silver bg-gradient-to-r from-transparent via-[#C0C0C0]/20 to-transparent" />
                  <div className="absolute inset-0 animate-shine-silver-delayed bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                  <div className="absolute inset-0 animate-shine-silver-bright bg-gradient-to-r from-transparent via-[#E8E8E8]/10 to-transparent" />
                </div>
                <div className="relative z-10 flex items-center gap-2">
                  {isPreviewMode ? (
                    <>
                      <VscCode className="text-lg" />
                      <span className="text-sm">Editor</span>
                    </>
                  ) : (
                    <>
                      <VscPreview className="text-lg" />
                      <span className="text-sm">Preview</span>
                    </>
                  )}
                </div>
              </button>
            )}

            {/* Contenu de l'éditeur */}
            {(isPreviewMode && canTogglePreview) || activeFile.name === 'home.tsx' ? (
              <div className="h-full p-4">
                {activeFile.name === 'contact.json' ? (
                  <ContactPreview />
                ) : activeFile.name === 'home.tsx' ? (
                  <HomePage />
                ) : (
                  <PreviewComponent code={activeFile.content[language]} />
                )}
              </div>
            ) : (
              <EditorBlock
                type="code"
                content={activeFile.content[language]}
                language={activeFile.language}
                onCursorPositionChange={setCursorPosition}
              />
            )}
          </>
        )}
      </div>
      <EditorStatusBar 
        line={cursorPosition.line}
        column={cursorPosition.column}
        language={activeFile?.language || 'plaintext'}
      />
    </div>
  );
};

// Composant de preview qui affichera le rendu du code
const PreviewComponent = ({ code }: { code: string }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      {/* Ici, vous pouvez implémenter la logique pour rendre le composant React dynamiquement */}
      <div className="text-gray-800">
        {/* Pour l'instant, affichons juste un placeholder */}
        <p className="text-sm mb-4 text-gray-500">Preview du composant</p>
        <div className="p-4 border border-gray-200 rounded">
          {/* Le vrai rendu du composant viendra ici */}
          {/* Vous devrez probablement utiliser une approche plus sophistiquée pour évaluer et rendre le code React */}
        </div>
      </div>
    </div>
  );
};

export default Editor; 