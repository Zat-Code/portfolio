import { createContext, useContext, useState, ReactNode } from 'react';

interface MatrixContextType {
  isMatrixEnabled: boolean;
  toggleMatrix: () => void;
}

const MatrixContext = createContext<MatrixContextType | undefined>(undefined);

export const useMatrix = () => {
  const context = useContext(MatrixContext);
  if (!context) {
    throw new Error('useMatrix must be used within a MatrixProvider');
  }
  return context;
};

interface MatrixProviderProps {
  children: ReactNode;
}

export const MatrixProvider = ({ children }: MatrixProviderProps) => {
  const [isMatrixEnabled, setIsMatrixEnabled] = useState(false);

  const toggleMatrix = () => {
    setIsMatrixEnabled(prev => !prev);
  };

  return (
    <MatrixContext.Provider value={{ isMatrixEnabled, toggleMatrix }}>
      {children}
    </MatrixContext.Provider>
  );
}; 