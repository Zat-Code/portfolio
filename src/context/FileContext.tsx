import React, { createContext, useState, useContext, ReactNode } from 'react';
import { IFile, FileContextType } from '../types/file';
import { useLanguage } from './LanguageContext';

const initialFiles: IFile[] = [
  {
    id: '1',
    name: 'README.md',
    content: {
      fr: '# Portfolio\n\nBienvenue sur mon portfolio !',
      en: '# Portfolio\n\nWelcome to my portfolio!'
    },
    language: 'markdown'
  },
  {
    id: '2',
    name: 'about.tsx',
    content: {
      fr: `export default function About() {
  return (
    <div className="about">
      <h1>À propos de moi</h1>
      <p>Développeur Full Stack avec une passion pour React et TypeScript</p>
    </div>
  )
}`,
      en: `export default function About() {
  return (
    <div className="about">
      <h1>About me</h1>
      <p>Full Stack Developer with a passion for React and TypeScript</p>
    </div>
  )
}`
    },
    language: 'tsx'
  },
  {
    id: '3',
    name: 'projects.json',
    content: {
      fr: `{
  "projets": [
    {
      "nom": "Portfolio VS Code",
      "description": "Un portfolio inspiré de Visual Studio Code",
      "technologies": ["React", "TypeScript", "Tailwind"]
    },
    {
      "nom": "Autres Projets",
      "description": "Bientôt disponible..."
    }
  ]
}`,
      en: `{
  "projects": [
    {
      "name": "VS Code Portfolio",
      "description": "A portfolio inspired by Visual Studio Code",
      "technologies": ["React", "TypeScript", "Tailwind"]
    },
    {
      "name": "Other Projects",
      "description": "Coming soon..."
    }
  ]
}`
    },
    language: 'json'
  },
  {
    id: '4',
    name: 'hello.py',
    content: {
      fr: `def dire_bonjour(nom):
    """Cette fonction dit bonjour à quelqu'un"""
    return f"Bonjour {nom} !"

# Test de la fonction
if __name__ == "__main__":
    resultat = dire_bonjour("Monde")
    print(resultat)`,
      en: `def say_hello(name):
    """This function says hello to someone"""
    return f"Hello {name}!"

# Test the function
if __name__ == "__main__":
    result = say_hello("World")
    print(result)`
    },
    language: 'python'
  },
  {
    id: '5',
    name: 'Counter.tsx',
    content: {
      fr: `// Exemple de compteur interactif
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h2>Compteur: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Incrémenter
      </button>
    </div>
  );
}`,
      en: `// Interactive counter example
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`
    },
    language: 'tsx'
  }
];

const FileContext = createContext<FileContextType | undefined>(undefined);

export function FileProvider({ children }: { children: ReactNode }) {
  const [files] = useState<IFile[]>(initialFiles);
  const [activeFile, setActiveFile] = useState<IFile | null>(null);
  const { language } = useLanguage();

  return (
    <FileContext.Provider 
      value={{ 
        files, 
        activeFile, 
        setActiveFile,
        currentLanguage: language 
      }}
    >
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