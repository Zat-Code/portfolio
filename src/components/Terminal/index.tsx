import { useState, useEffect, useRef } from 'react';
import { VscClose, VscAdd, VscChevronDown } from 'react-icons/vsc';
import { useFiles } from '../../context/FileContext';
import { useLanguage } from '../../context/LanguageContext';
import { IFile } from '../../types/file';

interface TerminalLine {
  content: string;
  type: 'input' | 'output' | 'error';
}

interface TerminalProps {
  onClose: () => void;
}

const Terminal = ({ onClose }: TerminalProps) => {
  const { files } = useFiles();
  const { language } = useLanguage();
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [height, setHeight] = useState(300);
  const [isDragging, setIsDragging] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const startDragY = useRef<number>(0);
  const startHeight = useRef<number>(0);

  // Gestion des commandes
  const handleCommand = (command: string) => {
    const args = command.trim().split(' ');
    const cmd = args[0].toLowerCase();

    switch (cmd) {
      case 'penguin':
        return `
        .___.
       /     \\
      | O _ O |
      /  \\_/  \\
    .' /     \\ '.
   / _|       |_ \\
  (_/ |       | \\_)
      \\       /
     __\\_>-<_/__   
     ~;/     \\;~

Tux winks at you! 🐧`;

      case 'ls':
        return files.map(f => f.name).join('\n');
      
      case 'cat':
        if (args.length < 2) return 'Usage: cat <filename>';
        const file = files.find(f => f.name === args[1]);
        if (!file) return `File not found: ${args[1]}`;
        return getFileContent(file);
      
      case 'pwd':
        return '/portfolio';
      
      case 'clear':
        setLines([]);
        return null;
      
      case 'help':
        return `
Available Commands:
------------------

Fun:
  penguin              🐧 Affiche un joli pingouin ASCII (Easter egg!)

File Operations:
  ls                    List all files in the current directory
  cat <filename>        Display the content of a specific file
                       Example: cat README.md

Navigation:
  pwd                   Print current working directory
  cd <dir>             Change directory (coming soon)

Terminal Control:
  clear                Clear the terminal screen
  help                 Display this help message

Tips:
  - Commands are case-insensitive
  - Use Tab for auto-completion (coming soon)
  - Press Ctrl+L to clear the screen
  - Type 'cat' followed by a filename to view its contents
  - All commands work with the current virtual file system
  - Try the 'penguin' command for a surprise! 🐧

Examples:
  $ ls                 # List all files
  $ cat Counter.tsx    # View Counter component code
  $ pwd               # See current directory
  $ penguin           # Show ASCII penguin
`;
      
      default:
        return `Command not found: ${cmd}. Type 'help' for available commands.`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && currentInput.trim()) {
      // Ajouter la commande à l'historique
      setLines(prev => [...prev, { 
        content: `$ ${currentInput}`, 
        type: 'input' 
      }]);

      // Exécuter la commande
      const output = handleCommand(currentInput);
      if (output !== null) {
        setLines(prev => [...prev, { 
          content: output, 
          type: output.startsWith('Command not found') ? 'error' : 'output'
        }]);
      }

      // Réinitialiser l'input
      setCurrentInput('');
      
      // Scroll to bottom
      setTimeout(() => {
        if (terminalRef.current) {
          terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
      }, 0);
    }
  };

  // Focus l'input quand on clique n'importe où dans le terminal
  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const deltaY = startDragY.current - e.clientY;
      const minHeight = 150; // Hauteur minimale
      const maxHeight = window.innerHeight * 0.8; // 80% de la hauteur de la fenêtre
      const newHeight = Math.min(Math.max(startHeight.current + deltaY, minHeight), maxHeight);
      setHeight(newHeight);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startDragY.current = e.clientY;
    startHeight.current = height;
  };

  useEffect(() => {
    // Simuler l'affichage progressif des lignes du terminal
    const initialLines = [
      'VITE v6.0.5  ready in 527 ms',
      '',
      '➜  Local:   http://localhost:5173/',
      '➜  Network: use --host to expose',
      '➜  press h + enter to show help'
    ];

    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < initialLines.length) {
        setLines(prev => [...prev, { 
          content: initialLines[currentIndex], 
          type: 'output' 
        }]);
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const getFileContent = (file: IFile): string => {
    return file.content[language as keyof typeof file.content] || '';
  };

  return (
    <div 
      className="bg-[#1e1e1e] border-t border-[#333] flex flex-col relative"
      style={{ height: `${height}px` }}
      onClick={handleTerminalClick}
    >
      {/* Poignée de redimensionnement */}
      <div 
        className="absolute top-0 left-0 right-0 h-1 cursor-row-resize group"
        onMouseDown={handleMouseDown}
      >
        <div className="h-[1px] w-full bg-[#333] group-hover:bg-[#007acc] transition-colors" />
      </div>

      {/* Terminal header */}
      <div className="h-9 bg-[#252526] flex items-center justify-between px-4 select-none">
        <div className="flex items-center">
          <span className="text-white/80 text-sm">TERMINAL</span>
          <button className="ml-2 p-1 hover:bg-[#333] rounded">
            <VscChevronDown className="text-white/80" />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:bg-[#333] rounded">
            <VscAdd className="text-white/80" />
          </button>
          <button 
            className="p-1 hover:bg-[#333] rounded"
            onClick={onClose}
          >
            <VscClose className="text-white/80" />
          </button>
        </div>
      </div>

      {/* Terminal content */}
      <div 
        ref={terminalRef}
        className="flex-1 font-mono text-sm text-white/80 p-2 overflow-y-auto"
      >
        <div className="h-full">
          {/* Message initial */}
          <div className="mb-4">
            <div className="text-green-500">Terminal v1.0.0</div>
            <div className="text-gray-500">Type 'help' for available commands</div>
          </div>

          {/* Historique des commandes */}
          {lines.map((line, index) => (
            <div 
              key={index} 
              className={`leading-5 whitespace-pre-wrap ${
                line.type === 'error' ? 'text-red-400' :
                line.type === 'input' ? 'text-white' : 'text-gray-300'
              }`}
            >
              {line.content}
            </div>
          ))}

          {/* Ligne de commande active */}
          <div className="flex items-center">
            <span className="text-green-400">$</span>
            <input
              ref={inputRef}
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 ml-2 bg-transparent outline-none text-white"
              autoFocus
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal; 