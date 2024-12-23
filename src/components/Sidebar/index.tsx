import { useState, useRef, useEffect } from 'react';
import { useFiles } from '../../context/FileContext';
import { useLanguage } from '../../context/LanguageContext';
import { VscChevronRight, VscChevronDown } from 'react-icons/vsc';

interface SidebarProps {
  width?: number;
  onWidthChange?: (width: number) => void;
}

const Sidebar = ({ width = 300, onWidthChange }: SidebarProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const startDragX = useRef<number>(0);
  const startWidth = useRef<number>(0);

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
        <div className="flex items-center px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer">
          <VscChevronDown className="mr-1" />
          <span>Portfolio</span>
        </div>
        
        <div className="pl-6">
          {files.map((file) => (
            <div
              key={file.id}
              className="flex items-center px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer"
              onClick={() => setActiveFile(file)}
            >
              <span>{file.name}</span>
            </div>
          ))}
        </div>
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