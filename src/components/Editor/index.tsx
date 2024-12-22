import { ReactNode } from 'react';
import CodeEditor from './CodeEditor';
import { useFiles } from '../../context/FileContext';

interface EditorProps {
  topBar?: ReactNode;      // Composants au-dessus de l'éditeur
  sideBar?: ReactNode;     // Composants sur le côté
  bottomBar?: ReactNode;   // Composants en bas
  overlay?: ReactNode;     // Composants en superposition
  controls?: ReactNode;    // Contrôles flottants
}

const Editor = ({ topBar, sideBar, bottomBar, overlay, controls }: EditorProps) => {
  const { activeFile, currentLanguage } = useFiles();

  if (!activeFile) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Sélectionnez un fichier pour commencer
      </div>
    );
  }

  return (
    <div className="relative flex flex-col h-full">
      {/* Barre supérieure personnalisée */}
      {topBar && (
        <div className="border-b border-[#1e1e1e]">
          {topBar}
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Barre latérale personnalisée */}
        {sideBar && (
          <div className="border-r border-[#1e1e1e] w-64">
            {sideBar}
          </div>
        )}

        {/* Conteneur principal de l'éditeur */}
        <div className="relative flex-1">
          <CodeEditor 
            code={activeFile.content[currentLanguage]} 
            language={activeFile.language}
          />

          {/* Contrôles flottants */}
          {controls && (
            <div className="absolute top-4 right-4 z-10">
              {controls}
            </div>
          )}

          {/* Overlay/Modal */}
          {overlay && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              {overlay}
            </div>
          )}
        </div>
      </div>

      {/* Barre inférieure personnalisée */}
      {bottomBar && (
        <div className="border-t border-[#1e1e1e]">
          {bottomBar}
        </div>
      )}
    </div>
  );
};

export default Editor; 