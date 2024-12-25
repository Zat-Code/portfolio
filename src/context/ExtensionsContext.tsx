import { createContext, useContext, useState, ReactNode } from 'react';

interface ExtensionsContextType {
  installedExtensions: string[];
  installExtension: (id: string) => void;
  uninstallExtension: (id: string) => void;
  isExtensionInstalled: (id: string) => boolean;
}

const ExtensionsContext = createContext<ExtensionsContextType | undefined>(undefined);

export const useExtensions = () => {
  const context = useContext(ExtensionsContext);
  if (!context) {
    throw new Error('useExtensions must be used within an ExtensionsProvider');
  }
  return context;
};

interface ExtensionsProviderProps {
  children: ReactNode;
}

export const ExtensionsProvider = ({ children }: ExtensionsProviderProps) => {
  const [installedExtensions, setInstalledExtensions] = useState<string[]>([
    'tailwindcss',
    'prettier'
  ]);

  const installExtension = (id: string) => {
    setInstalledExtensions(prev => [...prev, id]);
  };

  const uninstallExtension = (id: string) => {
    setInstalledExtensions(prev => prev.filter(extId => extId !== id));
  };

  const isExtensionInstalled = (id: string) => {
    return installedExtensions.includes(id);
  };

  return (
    <ExtensionsContext.Provider 
      value={{ 
        installedExtensions,
        installExtension,
        uninstallExtension,
        isExtensionInstalled
      }}
    >
      {children}
    </ExtensionsContext.Provider>
  );
}; 