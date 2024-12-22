export interface IFile {
  id: string;
  name: string;
  content: {
    fr: string;
    en: string;
  };
  language: string;
  icon?: string;
}

export interface FileContextType {
  files: IFile[];
  activeFile: IFile | null;
  setActiveFile: (file: IFile) => void;
  currentLanguage: string;
} 