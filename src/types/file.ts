export interface IFile {
  id: string;
  name: string;
  content: {
    fr: string;
    en: string;
  };
  language: string;
  icon?: string;
  isSettings?: boolean;
}

export interface FileContextType {
  files: IFile[];
  activeFile: IFile | null;
  setActiveFile: (file: IFile | null) => void;
  openedFiles: IFile[];
  closeFile: (fileId: string) => void;
  currentLanguage: string;
} 