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
  if (type === 'code') {
    return (
      <CodeEditor 
        code={content as string}
        language={language || 'text'}
        onCursorPositionChange={onCursorPositionChange}
      />
    );
  }

  return (
    <div className="my-4 px-4">
      {content as ReactNode}
    </div>
  );
};

export default EditorBlock; 