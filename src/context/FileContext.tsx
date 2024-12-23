import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useLanguage } from './LanguageContext';

interface File {
  id: string;
  name: string;
  language: string;
  content: string;
  translations?: {
    fr: string;
    en: string;
  };
  isSettings?: boolean;
}

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
  
  const getFileContent = (file: File) => {
    if (file.translations) {
      return file.translations[language];
    }
    return file.content;
  };

  const initialFiles: File[] = [
    {
      id: 'home',
      name: 'home.tsx',
      language: 'tsx',
      content: '',
      translations: {
        fr: `// Composant d'accueil
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
    </div>
  );
};

export default Home;`,
        en: `// Home component
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();
  
  return (
    <div>
      <h1>{t('welcome')}</h1>
      <p>{t('description')}</p>
    </div>
  );
};

export default Home;`
      }
    },
    {
      id: 'contact',
      name: 'contact.json',
      language: 'json',
      content: '',
      translations: {
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
    }
  ];

  const [files] = useState<File[]>(initialFiles);
  const [openedFiles, setOpenedFiles] = useState<File[]>([initialFiles[0]]);
  const [activeFile, setActiveFile] = useState<File | null>(initialFiles[0]);

  const handleSetActiveFile = (file: File | null) => {
    if (file) {
      const updatedFile = {
        ...file,
        content: getFileContent(file)
      };
      
      if (!openedFiles.find(f => f.id === file.id)) {
        setOpenedFiles([...openedFiles, updatedFile]);
      }
      setActiveFile(updatedFile);
    } else {
      setActiveFile(null);
    }
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