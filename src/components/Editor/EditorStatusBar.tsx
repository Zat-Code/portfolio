interface EditorStatusBarProps {
  line: number;
  column: number;
  language: string;
  encoding?: string;
}

const EditorStatusBar = ({ line, column, language, encoding = 'UTF-8' }: EditorStatusBarProps) => {
  return (
    <div className="h-6 bg-[#1e1e1e] text-white/60 text-xs flex items-center justify-between px-4 border-t border-[#333]">
      <div className="flex items-center space-x-4">
        <span>
          Ln {line}, Col {column}
        </span>
        <span>|</span>
        <span className="capitalize">{language}</span>
      </div>
      <div className="flex items-center space-x-4">
        <span>{encoding}</span>
      </div>
    </div>
  );
};

export default EditorStatusBar; 