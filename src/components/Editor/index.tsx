import { useState } from 'react';
import { useFiles } from '../../context/FileContext';
import { useLanguage } from '../../context/LanguageContext';
import CodeEditor from './CodeEditor';
import HomePage from './HomePage';
import SettingsEditor from './SettingsEditor';
import ContactPreview from './previews/ContactPreview';
import ExperiencePreview from './previews/ExperiencePreview';
import { VscPreview, VscCode } from 'react-icons/vsc';
import TabsBar from '../TabsBar';

const Editor = () => {
  const { activeFile } = useFiles();
  const { language } = useLanguage();
  const [previewModeFiles, setPreviewModeFiles] = useState<{ [key: string]: boolean }>({
    'home.tsx': true,
    'contact.json': true,
    'experience.py': true
  });

  const isPreviewMode = (fileName: string) => {
    if (fileName === 'home.tsx') return true;
    return fileName in previewModeFiles ? previewModeFiles[fileName] : true;
  };

  const togglePreviewMode = (fileName: string) => {
    if (fileName === 'home.tsx') return;
    setPreviewModeFiles(prev => ({
      ...prev,
      [fileName]: !prev[fileName]
    }));
  };

  return (
    <div className="h-full flex flex-col">
      <TabsBar />
      <div className="flex-1 flex flex-col min-h-0">
        {!activeFile && <HomePage />}
        
        {activeFile && activeFile.isSettings && <SettingsEditor />}

        {activeFile && !activeFile.isSettings && (
          <div className="flex flex-col h-full">
            {/* Bouton de basculement Preview/Editor */}
            {(activeFile.name === 'contact.json' || activeFile.name === 'experience.py' || (activeFile.language === 'tsx' && activeFile.name !== 'home.tsx')) && (
              <div className="flex-none flex px-4 py-2 border-b border-[#2d2d2e] bg-[#1e1e1e]">
                <button
                  onClick={() => togglePreviewMode(activeFile.name)}
                  className="
                    px-3 py-1.5 
                    bg-[#2d2d2e] hover:bg-[#3d3d3e] 
                    text-white/80 rounded-md
                    border border-[#3d3d3e] hover:border-[#007acc]
                    transition-all duration-200
                    flex items-center gap-2
                    min-w-[100px]
                    justify-center
                    sm:text-sm md:text-base
                    relative
                    group
                  "
                >
                  {isPreviewMode(activeFile.name) ? (
                    <>
                      <VscCode className="text-lg text-[#007acc]" />
                      <span>Editor</span>
                    </>
                  ) : (
                    <>
                      <VscPreview className="text-lg text-[#007acc]" />
                      <span>Preview</span>
                    </>
                  )}
                  <div className="absolute inset-0 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="absolute inset-0 rounded-md bg-[#007acc]/5" />
                  </div>
                </button>
              </div>
            )}

            {/* Contenu de l'éditeur */}
            <div className="flex-1 min-h-0">
              {isPreviewMode(activeFile.name) ? (
                <div className="h-full">
                  {activeFile.name === 'contact.json' ? (
                    <ContactPreview />
                  ) : activeFile.name === 'home.tsx' ? (
                    <HomePage />
                  ) : activeFile.name === 'experience.py' ? (
                    <ExperiencePreview />
                  ) : (
                    <CodeEditor 
                      code={activeFile.content ? activeFile.content[language] : ''} 
                      language={activeFile.language}
                      onCursorPositionChange={() => {}}
                    />
                  )}
                </div>
              ) : (
                <CodeEditor 
                  code={activeFile.content ? activeFile.content[language] : ''} 
                  language={activeFile.language}
                  onCursorPositionChange={() => {}}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor; 