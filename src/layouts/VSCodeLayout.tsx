import MenuBar from '../components/MenuBar'
import ActivityBar from '../components/ActivityBar'
import Sidebar from '../components/Sidebar'
import Editor from '../components/Editor'
import StatusBar from '../components/StatusBar'
import TabsBar from '../components/TabsBar'

const VSCodeLayout = () => {
  return (
    <div className="h-full flex flex-col">
      {/* Menu Bar */}
      <MenuBar />
      
      {/* Contenu principal */}
      <div className="flex-1 flex">
        <ActivityBar />
        <Sidebar />
        
        <div className="flex-1 flex flex-col">
          <TabsBar />
          <Editor />
        </div>
      </div>
      
      <StatusBar />
    </div>
  )
}

export default VSCodeLayout 