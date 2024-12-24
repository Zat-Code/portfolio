import { ReactNode } from 'react';
import CodeEditor from './CodeEditor';

type BlockType = 'code' | 'component';

interface EditorBlockProps {
  type: BlockType;
  content: string | ReactNode;
  language?: string;
  onCursorPositionChange?: (position: { line: number; column: number }) => void;
}

const EditorBlock = ({ type, content, language, onCursorPositionChange }: EditorBlockProps) => {
  // Fonction pour normaliser le langage
  const getNormalizedLanguage = (lang?: string) => {
    if (!lang) return 'typescript';
    
    // Map des extensions vers les langages Prism
    const languageMap: { [key: string]: string } = {
      'tsx': 'tsx',
      'jsx': 'jsx',
      'ts': 'typescript',
      'js': 'javascript',
      'json': 'json'
    };

    return languageMap[lang.toLowerCase()] || lang;
  };

  if (type === 'code') {
    return (
      <div className="h-full overflow-x-auto">
        <CodeEditor 
          code={content as string}
          language={getNormalizedLanguage(language)}
          onCursorPositionChange={onCursorPositionChange}
        />
      </div>
    );
  }

  return (
    <div className="h-full overflow-x-auto">
      <pre className="p-4 text-white/80 font-mono text-sm leading-6">
        {content}
      </pre>
    </div>
  );
};

export default EditorBlock; 