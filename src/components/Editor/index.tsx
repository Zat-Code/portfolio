import { useState } from 'react';
import { useFiles } from '../../context/FileContext';
import { useLanguage } from '../../context/LanguageContext';
import { IFile } from '../../types/file';
import CodeEditor from './CodeEditor';
import HomePreview from './previews/HomePreview';
import SettingsEditor from './SettingsEditor';
import ContactPreview from './previews/ContactPreview';
import ExperiencePreview from './previews/ExperiencePreview';
import PersonalProjectPreview from './previews/PersonalProjectPreview';
import { VscPreview, VscCode } from 'react-icons/vsc';

const Editor = () => {
  const { activeFile } = useFiles();
  const { language } = useLanguage();
  const [previewModeFiles, setPreviewModeFiles] = useState<{ [key: string]: boolean }>({
    'home.tsx': true,
    'contact.json': true,
    'experience.py': true,
    'personal_project.md': true
  });

  const getFileContent = (file: IFile): string => {
    return file.content?.[language as keyof typeof file.content] || '';
  };

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
      <div className="flex-1 flex flex-col min-h-0">
        {!activeFile && <HomePreview />}
        
        {activeFile && activeFile.isSettings && <SettingsEditor />}

        {activeFile && !activeFile.isSettings && (
          <div className="flex flex-col h-full">
            {/* Bouton de basculement Preview/Editor */}
            {(activeFile.name === 'contact.json' || 
              activeFile.name === 'experience.py' || 
              activeFile.name === 'personal_project.md' ||
              (activeFile.language === 'tsx' && activeFile.name !== 'home.tsx')) && (
              <div className="flex-none flex px-4 py-2 border-b border-[#2d2d2e] bg-[#1e1e1e]">
                <button
                  onClick={() => togglePreviewMode(activeFile.name)}
                  className="
                    px-3 sm:px-4 py-2 
                    bg-[#007acc] hover:bg-[#006bb3] 
                    text-white rounded-sm 
                    flex items-center gap-2 
                    relative overflow-hidden group 
                    text-sm sm:text-base
                    min-w-[100px]
                    justify-center
                  "
                >
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 animate-shine-silver bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </div>
                  {isPreviewMode(activeFile.name) ? (
                    <>
                      <VscCode className="relative z-10 text-lg" />
                      <span className="relative z-10">Editor</span>
                    </>
                  ) : (
                    <>
                      <VscPreview className="relative z-10 text-lg" />
                      <span className="relative z-10">Preview</span>
                    </>
                  )}
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
                    <HomePreview />
                  ) : activeFile.name === 'experience.py' ? (
                    <ExperiencePreview />
                  ) : activeFile.name === 'personal_project.md' ? (
                    <PersonalProjectPreview />
                  ) : (
                    <CodeEditor 
                      code={getFileContent(activeFile)} 
                      language={activeFile.language}
                      onCursorPositionChange={() => {}}
                    />
                  )}
                </div>
              ) : (
                <CodeEditor 
                  code={getFileContent(activeFile)} 
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