import { useState } from 'react';

const CounterDemo = () => {
  const [testCount, setTestCount] = useState(0);

  return (
    <div className="bg-[#1e1e1e] rounded-lg p-4 border border-[#333]">
      <h3 className="text-lg font-semibold mb-3 text-white/90">
        Démo du Compteur
      </h3>
      
      {/* Composant de test */}
      <div className="bg-[#2d2d2d] p-3 rounded-md mb-3">
        <h2 className="text-white/90 text-base mb-2">
          Compteur: {testCount}
        </h2>
        <button
          onClick={() => setTestCount(prev => prev + 1)}
          className="px-3 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Incrémenter
        </button>
      </div>

      {/* Panneau de contrôle */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-white/80 text-sm">
          <span>État:</span>
          <span className="font-mono bg-[#333] px-2 py-0.5 rounded">
            {testCount}
          </span>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setTestCount(0)}
            className="px-2 py-1 text-sm bg-gray-600 text-white/90 rounded hover:bg-gray-500 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => setTestCount(prev => prev + 10)}
            className="px-2 py-1 text-sm bg-green-600 text-white/90 rounded hover:bg-green-500 transition-colors"
          >
            +10
          </button>
        </div>
      </div>

      {/* Documentation */}
      <div className="mt-4 text-white/60 text-xs">
        <h4 className="font-semibold mb-1">Notes:</h4>
        <ul className="list-disc list-inside space-y-0.5">
          <li>Utilise useState</li>
          <li>État préservé</li>
          <li>Mises à jour synchrones</li>
        </ul>
      </div>
    </div>
  );
};

export default CounterDemo; 