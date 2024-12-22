import { useState } from 'react';
import { useFiles } from '../../context/FileContext';
import { useLanguage } from '../../context/LanguageContext';
import CodeEditor from './CodeEditor';
import EditorBlock from './EditorBlock';
import EditorStatusBar from './EditorStatusBar';
import CounterDemo from './demos/CounterDemo';

interface EditorBlock {
  id: string;
  type: 'code' | 'component';
  content: string | React.ReactNode;
  language?: string;
}

const DEMO_COMPONENTS: Record<string, React.ReactNode> = {
  'Counter.tsx': <CounterDemo />
};

const Editor = () => {
  const { activeFile } = useFiles();
  const { t, language } = useLanguage();
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 });

  if (!activeFile) {
    return (
      <div className="flex-1 bg-[#1e1e1e] text-white/60 flex items-center justify-center">
        <span>{t('select.file')}</span>
      </div>
    );
  }

  const demoComponent = DEMO_COMPONENTS[activeFile.name];

  return (
    <div className="flex-1 bg-[#1e1e1e] text-white/80 flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        {/* Zone de code */}
        <div className="flex-1 p-4 font-mono overflow-auto">
          <EditorBlock
            type="code"
            content={activeFile.content[language]}
            language={activeFile.language}
            onCursorPositionChange={setCursorPosition}
          />
        </div>

        {/* Zone de démo */}
        {demoComponent && (
          <div className="w-80 border-l border-[#333] p-4 overflow-auto">
            {demoComponent}
          </div>
        )}
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