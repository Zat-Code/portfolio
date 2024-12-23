import React, { createContext, useContext, useState } from 'react';
import { IFile } from '../types/file';

interface FileContextType {
  files: IFile[];
  activeFile: IFile | null;
  openedFiles: IFile[];
  setActiveFile: (file: IFile | null) => void;
  closeFile: (fileName: string) => void;
  isInterfaceOpen: boolean;
  closeInterface: () => void;
  openInterface: () => void;
}

const FileContext = createContext<FileContextType | undefined>(undefined);

export const FileProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeFile, setActiveFile] = useState<IFile | null>(null);
  const [openedFiles, setOpenedFiles] = useState<IFile[]>([]);
  const [isInterfaceOpen, setIsInterfaceOpen] = useState(true);

  const initialFiles: IFile[] = [
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

  const [files] = useState<IFile[]>(initialFiles);

  const handleSetActiveFile = (file: IFile | null) => {
    if (file) {
      if (!openedFiles.find(f => f.id === file.id)) {
        setOpenedFiles([...openedFiles, file]);
      }
      setActiveFile(file);
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

    if (newOpenedFiles.length === 0) {
      closeInterface();
    }
  };

  const closeInterface = () => {
    setIsInterfaceOpen(false);
    setActiveFile(null);
    setOpenedFiles([]);
  };

  const openInterface = () => {
    setIsInterfaceOpen(true);
  };

  return (
    <FileContext.Provider value={{ 
      files, 
      activeFile, 
      openedFiles,
      setActiveFile: handleSetActiveFile,
      closeFile,
      isInterfaceOpen,
      closeInterface,
      openInterface
    }}>
      {children}
    </FileContext.Provider>
  );
};

export const useFiles = () => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error('useFiles must be used within a FileProvider');
  }
  return context;
}; 