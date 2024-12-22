interface EditorToolbarProps {
  onSave?: () => void;
  onFormat?: () => void;
  // ... autres props
}

export const EditorToolbar = ({ onSave, onFormat }: EditorToolbarProps) => {
  return (
    <div className="flex items-center p-2 gap-2">
      {onSave && (
        <button 
          onClick={onSave}
          className="px-3 py-1 bg-blue-500 rounded"
        >
          Sauvegarder
        </button>
      )}
      {onFormat && (
        <button 
          onClick={onFormat}
          className="px-3 py-1 bg-gray-500 rounded"
        >
          Formater
        </button>
      )}
    </div>
  );
}; 