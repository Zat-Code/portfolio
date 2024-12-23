import { useState } from 'react';
import { useFiles } from '../../context/FileContext';
import { useLanguage } from '../../context/LanguageContext';
import EditorBlock from './EditorBlock';
import EditorStatusBar from './EditorStatusBar';
import TabsBar from '../TabsBar';

const Editor = () => {
  const { activeFile } = useFiles();
  const { t, language } = useLanguage();
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });

  if (!activeFile) {
    return (
      <div className="h-full flex items-center justify-center text-white/60">
        {t('select.file')}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <TabsBar />
      <div className="flex-1 overflow-auto">
        <EditorBlock
          type="code"
          content={activeFile.content[language]}
          language={activeFile.language}
          onCursorPositionChange={setCursorPosition}
        />
      </div>
      <EditorStatusBar 
        line={cursorPosition.line}
        column={cursorPosition.column}
        language={activeFile.language}
      />
    </div>
  );
};

export default Editor; 