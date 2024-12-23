import { useState } from 'react';
import { useFiles } from '../../context/FileContext';
import { useLanguage } from '../../context/LanguageContext';
import CodeEditor from './CodeEditor';
import HomePage from './HomePage';
import SettingsEditor from './SettingsEditor';
import ContactPreview from './previews/ContactPreview';
import { VscPreview, VscCode } from 'react-icons/vsc';
import TabsBar from '../TabsBar';

const Editor = () => {
  const { activeFile } = useFiles();
  const { language } = useLanguage();
  const [previewModeFiles, setPreviewModeFiles] = useState<{ [key: string]: boolean }>({});

  const isPreviewMode = (fileName: string) => {
    // home.tsx est toujours en mode preview
    if (fileName === 'home.tsx') return true;
    // Pour les autres fichiers, on utilise l'état stocké ou true par défaut
    return fileName in previewModeFiles ? previewModeFiles[fileName] : true;
  };

  const togglePreviewMode = (fileName: string) => {
    setPreviewModeFiles(prev => ({
      ...prev,
      [fileName]: !prev[fileName]
    }));
  };

  return (
    <div className="h-full flex flex-col">
      <TabsBar />
      <div className="flex-1 relative">
        {!activeFile && <HomePage />}
        
        {activeFile && activeFile.isSettings && <SettingsEditor />}

        {activeFile && !activeFile.isSettings && (
          <>
            {/* Bouton de basculement Preview/Editor seulement pour les fichiers qui le permettent */}
            {(activeFile.name === 'contact.json' || (activeFile.language === 'tsx' && activeFile.name !== 'home.tsx')) && (
              <button
                onClick={() => togglePreviewMode(activeFile.name)}
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
                  {isPreviewMode(activeFile.name) ? (
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
            {isPreviewMode(activeFile.name) ? (
              <div className="h-full p-4">
                {activeFile.name === 'contact.json' ? (
                  <ContactPreview />
                ) : activeFile.name === 'home.tsx' ? (
                  <HomePage />
                ) : (
                  <CodeEditor 
                    code={activeFile.translations ? activeFile.translations[language] : activeFile.content} 
                    language={activeFile.language}
                    onCursorPositionChange={() => {}}
                  />
                )}
              </div>
            ) : (
              <CodeEditor 
                code={activeFile.translations ? activeFile.translations[language] : activeFile.content} 
                language={activeFile.language}
                onCursorPositionChange={() => {}}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Editor; 