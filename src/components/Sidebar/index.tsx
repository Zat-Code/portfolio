import { useState, useRef, useEffect } from 'react';
import { useFiles } from '../../context/FileContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  VscChevronRight, 
  VscChevronDown, 
  VscFolder, 
  VscJson, 
  VscSettingsGear,
  VscSymbolNamespace
} from 'react-icons/vsc';
import { 
  SiReact, 
  SiTypescript,
  SiJavascript,
  SiCss3,
  SiHtml5,
  SiPython
} from 'react-icons/si';

interface SidebarProps {
  width?: number;
  onWidthChange?: (width: number) => void;
}

const getFileIcon = (fileName: string) => {
  if (fileName.endsWith('.tsx') || fileName.endsWith('.jsx')) return <SiReact className="text-[#61dafb]" />;
  if (fileName.endsWith('.ts')) return <SiTypescript className="text-[#3178c6]" />;
  if (fileName.endsWith('.js')) return <SiJavascript className="text-[#f7df1e]" />;
  if (fileName.endsWith('.css')) return <SiCss3 className="text-[#264de4]" />;
  if (fileName.endsWith('.html')) return <SiHtml5 className="text-[#e34f26]" />;
  if (fileName.endsWith('.json')) return <VscJson className="text-[#faa43a]" />;
  if (fileName.endsWith('.py')) return <SiPython className="text-yellow-300" />;
  if (fileName === 'settings.json') return <VscSettingsGear className="text-white/80" />;
  return <VscSymbolNamespace className="text-white/80" />;
};

const Sidebar = ({ width = 300, onWidthChange }: SidebarProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const startDragX = useRef<number>(0);
  const startWidth = useRef<number>(0);
  const [isFolderOpen, setIsFolderOpen] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - startDragX.current;
      const newWidth = Math.min(Math.max(startWidth.current + deltaX, 200), 800);
      onWidthChange?.(newWidth);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = 'default';
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'default';
    };
  }, [isDragging, onWidthChange]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    startDragX.current = e.clientX;
    startWidth.current = width;
  };

  const { files, setActiveFile } = useFiles();
  const { t } = useLanguage();
  
  return (
    <div className="h-full relative" style={{ width: `${width}px` }}>
      <div className="px-4 py-2 uppercase tracking-wider text-xs text-white/60">
        {t('explorer')}
      </div>
      
      <div className="text-white/80">
        <div 
          className="flex items-center px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer"
          onClick={() => setIsFolderOpen(!isFolderOpen)}
        >
          {isFolderOpen ? <VscChevronDown className="mr-1" /> : <VscChevronRight className="mr-1" />}
          <VscFolder className="mr-2 text-[#dcb67a]" />
          <span>Portfolio</span>
        </div>
        
        {isFolderOpen && (
          <div className="pl-6">
            {files.map((file) => (
              <div
                key={file.id}
                className="flex items-center px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer"
                onClick={() => setActiveFile(file)}
              >
                <div className="mr-2">
                  {getFileIcon(file.name)}
                </div>
                <span>{file.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div 
        className="absolute top-0 right-0 w-1 h-full cursor-col-resize group"
        onMouseDown={handleMouseDown}
      >
        <div className="w-[1px] h-full bg-[#333] group-hover:bg-[#007acc] transition-colors" />
      </div>
    </div>
  );
};

export default Sidebar; 