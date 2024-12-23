import { useEffect, useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { FileProvider } from './context/FileContext';
import { ThemeProvider } from './context/ThemeContext';
import VSCodeLayout from './layouts/VSCodeLayout';
import './styles/editor.css'

const App = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const enterFullScreen = async () => {
      try {
        if (!document.fullscreenElement) {
          await document.documentElement.requestFullscreen();
          setIsFullScreen(true);
        }
      } catch (e) {
        console.log("Erreur lors du passage en plein écran:", e);
      }
    };

    enterFullScreen();

    // Écouter les changements de mode plein écran
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullScreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange);
  }, []);

  const handleFullScreenToggle = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (e) {
      console.log("Erreur lors du changement de mode plein écran:", e);
    }
  };

  const handleClose = async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (e) {
      console.log("Erreur lors de la sortie du mode plein écran:", e);
    }
  };

  return (
    <LanguageProvider>
      <FileProvider>
        <ThemeProvider>
          <VSCodeLayout 
            onFullScreenToggle={handleFullScreenToggle}
            onClose={handleClose}
            isFullScreen={isFullScreen}
          />
        </ThemeProvider>
      </FileProvider>
    </LanguageProvider>
  );
};

export default App;
