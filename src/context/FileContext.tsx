import React, { createContext, useContext, useState, ReactNode } from 'react';
import { File } from '../types/file';
import { useLanguage } from './LanguageContext';
import emailjs from '@emailjs/browser';

interface FileContextType {
  files: File[];
  activeFile: File | null;
  openedFiles: File[];
  setActiveFile: (file: File | null) => void;
  closeFile: (fileName: string) => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export function FileProvider({ children }: { children: ReactNode }) {
  const { language } = useLanguage();
  
  const initialFiles: File[] = [
    {
      name: 'home.tsx',
      language: 'tsx',
    
    },
    {
      name: 'contact.json',
      language: 'json',
      content: {
        fr: `{
  "contact": {
    "nom": "Benjamin THEYTAZ",
    "titre": "Full Stack Engineer",
    "email": "benjamin.theytaz@hotmail.fr",
    "telephone": "+33652242463",
    "social": {
      "linkedin": "https://www.linkedin.com/in/benjamin-theytaz",
      "github": "https://github.com/Zat-Code"
    }
  }
}`,
        en: `{
  "contact": {
    "name": "Benjamin THEYTAZ",
    "title": "Full Stack Engineer",
    "email": "benjamin.theytaz@hotmail.fr",
    "phone": "+33652242463",
    "social": {
      "linkedin": "https://www.linkedin.com/in/benjamin-theytaz",
      "github": "https://github.com/Zat-Code"
    }
  }
}`
      }
    },
    // Ajoutez ici vos autres fichiers initiaux
  ];

  const [files] = useState<File[]>(initialFiles);
  const [openedFiles, setOpenedFiles] = useState<File[]>([initialFiles[0]]);
  const [activeFile, setActiveFile] = useState<File | null>(initialFiles[0]);

  const handleSetActiveFile = (file: File | null) => {
    if (file && !openedFiles.find(f => f.name === file.name)) {
      setOpenedFiles([...openedFiles, file]);
    }
    setActiveFile(file);
  };

  const closeFile = (fileName: string) => {
    const newOpenedFiles = openedFiles.filter(f => f.name !== fileName);
    setOpenedFiles(newOpenedFiles);
    
    if (activeFile?.name === fileName) {
      setActiveFile(newOpenedFiles[newOpenedFiles.length - 1] || null);
    }
  };

  return (
    <FileContext.Provider value={{ 
      files, 
      activeFile, 
      openedFiles,
      setActiveFile: handleSetActiveFile, 
      closeFile 
    }}>
      {children}
    </FileContext.Provider>
  );
}

export function useFiles() {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error('useFiles must be used within a FileProvider');
  }
  return context;
} 