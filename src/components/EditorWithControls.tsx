import Editor from './Editor';

const EditorWithControls = () => {
  return (
    <Editor
      // Barre d'outils supérieure
      topBar={
        <div className="flex items-center p-2 gap-2">
          <button className="px-3 py-1 bg-blue-500 rounded">
            Sauvegarder
          </button>
          <button className="px-3 py-1 bg-gray-500 rounded">
            Formater
          </button>
        </div>
      }
      
      // Panneau latéral
      sideBar={
        <div className="p-4">
          <h3>Structure</h3>
          <ul>
            <li>Fonction 1</li>
            <li>Fonction 2</li>
          </ul>
        </div>
      }
      
      // Contrôles flottants
      controls={
        <div className="bg-[#1e1e1e] p-2 rounded shadow-lg">
          <button className="text-white">
            <span>⚙️</span>
          </button>
        </div>
      }
      
      // Barre d'état inférieure
      bottomBar={
        <div className="flex justify-between px-4 py-2">
          <span>Ligne: 1, Colonne: 1</span>
          <span>UTF-8</span>
        </div>
      }
    />
  );
};

export default EditorWithControls; 