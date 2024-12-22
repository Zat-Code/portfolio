import VSCodeLayout from './layouts/VSCodeLayout'
import './styles/editor.css'

function App() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-[#1e1e1e] text-white">
      <VSCodeLayout />
    </div>
  )
}

export default App
