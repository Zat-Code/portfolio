import VSCodeLayout from './layouts/VSCodeLayout'
import { FileProvider } from './context/FileContext'
import { LanguageProvider } from './context/LanguageContext'
import { ThemeProvider } from './context/ThemeContext'
import './styles/editor.css'

function App() {
  return (
    <LanguageProvider>
      <FileProvider>
        <ThemeProvider>
          <div className="h-screen">
            <VSCodeLayout />
          </div>
        </ThemeProvider>
      </FileProvider>
    </LanguageProvider>
  )
}

export default App
