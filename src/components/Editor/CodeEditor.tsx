import { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';

// Theme
import 'prismjs/themes/prism-tomorrow.css';

// Languages in correct order
import 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-python';

// Initialisation des langages
(() => {
  // Markdown
  if (!Prism.languages.markup) {
    Prism.languages.markup = {
      'tag': {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: true,
        inside: {
          'tag': {
            pattern: /^<\/?[^\s>\/]+/,
            inside: {
              'punctuation': /^<\/?/,
              'namespace': /^[^\s>\/:]+:/
            }
          }
        }
      }
    };
  }

  Prism.languages.markdown = Prism.languages.extend('markup', {});
  Prism.languages.markdown = {
    'heading': {
      pattern: /^#{1,6}.+$/m,
      inside: {
        'punctuation': /^#{1,6}/,
        'content': /.+/
      }
    },
    'bold': {
      pattern: /\*\*(?:(?!\*\*).)+\*\*|__(?:(?!__).)+__/,
      inside: {
        'punctuation': /^\*\*|^__|\*\*$|__$/,
        'content': /^.+$/
      }
    },
    'italic': {
      pattern: /\*(?:(?!\*).)+\*|_(?:(?!_).)+_/,
      inside: {
        'punctuation': /^\*|^_|\*$|_$/,
        'content': /^.+$/
      }
    },
    'list': {
      pattern: /^[\s*+-]{1,2}(?:[\t ].+(?:\r?\n|$))+/m,
      inside: {
        'punctuation': /^[*+-]/
      }
    },
    'code': {
      pattern: /(`{3,})[^`]*\1|`[^`\n]+`/,
      inside: {
        'punctuation': /`/
      }
    }
  };

  // Python
  Prism.languages.python = {
    'comment': {
      pattern: /(^|[^\\])#.*/,
      lookbehind: true
    },
    'string': {
      pattern: /(?:[rub]|rb|br)?(?:"""[\s\S]*?"""|'''[\s\S]*?'''|"(?:\\.|[^"\\\r\n])*"|'(?:\\.|[^'\\\r\n])*')/i,
      greedy: true
    },
    'function': {
      pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
      lookbehind: true
    },
    'keyword': /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
    'builtin': /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
    'boolean': /\b(?:True|False|None)\b/,
    'number': /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?j?\b/i,
    'operator': /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
    'punctuation': /[{}[\];(),.:]/
  };

  // TSX
  if (!Prism.languages.jsx) {
    Prism.languages.jsx = Prism.languages.extend('markup', {});
  }

  Prism.languages.tsx = Prism.languages.extend('jsx', {
    'class-name': {
      pattern: /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/,
      lookbehind: true,
      inside: {
        punctuation: /[.\\]/
      }
    },
    'keyword': /\b(?:abstract|as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
    'builtin': /\b(?:string|number|boolean|symbol|any|never|unknown)\b/
  });

  // JSON
  Prism.languages.json = {
    'property': {
      pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
      greedy: true
    },
    'string': {
      pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
      greedy: true
    },
    'number': /-?\d+\.?\d*([Ee][+-]?\d+)?/,
    'punctuation': /[{}[\],]/,
    'operator': /:/,
    'boolean': /\b(?:true|false)\b/,
    'null': /\bnull\b/
  };
})();

interface CodeEditorProps {
  code: string;
  language: string;
  onCursorPositionChange?: (position: { line: number; column: number }) => void;
}

const CodeEditor = ({ code, language, onCursorPositionChange }: CodeEditorProps) => {
  const codeRef = useRef<HTMLElement>(null);
  const [activeLine, setActiveLine] = useState(1);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState(false);
  const lines = code.split('\n');

  const getNormalizedLanguage = (lang: string) => {
    const languageMap: { [key: string]: string } = {
      'typescript': 'typescript',
      'tsx': 'tsx',
      'jsx': 'jsx',
      'javascript': 'javascript',
      'json': 'json',
      'markdown': 'markdown',
      'python': 'python',
      'py': 'python'
    };
    return languageMap[lang.toLowerCase()] || lang;
  };

  useEffect(() => {
    if (codeRef.current) {
      const normalizedLanguage = getNormalizedLanguage(language);
      codeRef.current.textContent = code; // Important pour éviter les problèmes d'échappement
      codeRef.current.className = `language-${normalizedLanguage}`;
      Prism.highlightElement(codeRef.current);
    }
  }, [code, language]);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const relativeY = e.clientY - rect.top;
    const relativeX = e.clientX - rect.left;
    const lineHeight = 24; // hauteur de ligne en pixels
    const charWidth = 8.5; // Ajusté pour une meilleure précision
    
    const line = Math.floor(relativeY / lineHeight) + 1;
    const column = Math.floor(relativeX / charWidth) + 1;
    
    setCursorPosition({
      x: Math.floor(relativeX / charWidth) * charWidth + 4, // Ajout d'un offset
      y: Math.floor(relativeY / lineHeight) * lineHeight
    });
    
    setShowCursor(true);

    if (onCursorPositionChange) {
      onCursorPositionChange({ line, column });
    }
  };

  // Effet pour faire clignoter le curseur
  useEffect(() => {
    if (!showCursor) return;

    const interval = setInterval(() => {
      const cursor = document.getElementById('editor-cursor');
      if (cursor) {
        cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
      }
    }, 530); // Vitesse de clignotement

    return () => clearInterval(interval);
  }, [showCursor]);

  return (
    <div className="relative flex h-full">
      {/* Numéros de ligne */}
      <div className="select-none pr-4 text-right text-[#858585] min-w-[3rem]">
        {lines.map((_, index) => (
          <div 
            key={index + 1}
            className={`h-6 leading-6 ${
              activeLine === index + 1 ? 'text-white' : ''
            }`}
          >
            {index + 1}
          </div>
        ))}
      </div>

      {/* Code avec highlight */}
      <div className="relative flex-1 overflow-auto">
        {/* Ligne active highlight */}
        <div 
          className="absolute w-full h-6 bg-[#282828] -z-10"
          style={{ top: `${(activeLine - 1) * 24}px` }}
        />
        
        {/* Curseur */}
        {showCursor && (
          <div
            id="editor-cursor"
            className="absolute w-[1.5px] h-[18px] bg-white/80 transition-opacity duration-100"
            style={{
              left: `${cursorPosition.x}px`,
              top: `${cursorPosition.y + 3}px`
            }}
          />
        )}
        
        <pre className="h-full">
          <code
            ref={codeRef}
            className={`language-${getNormalizedLanguage(language)} block leading-6`}
            onClick={handleClick}
            style={{
              padding: '0px',
              fontFamily: 'Consolas, Monaco, monospace',
              fontSize: '14px',
              lineHeight: '24px',
              tabSize: 2
            }}
            onMouseMove={(e) => {
              const lineHeight = 24;
              const rect = e.currentTarget.getBoundingClientRect();
              const relativeY = e.clientY - rect.top;
              const newActiveLine = Math.floor(relativeY / lineHeight) + 1;
              if (newActiveLine <= lines.length && newActiveLine > 0) {
                setActiveLine(newActiveLine);
              }
            }}
          >
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeEditor; 