import MenuBar from '../components/MenuBar'
import ActivityBar from '../components/ActivityBar'
import Sidebar from '../components/Sidebar'
import Editor from '../components/Editor'
import StatusBar from '../components/StatusBar'
import TabsBar from '../components/TabsBar'
import { FileProvider } from '../context/FileContext'
import { LanguageProvider } from '../context/LanguageContext'

const VSCodeLayout = () => {
  return (
    <LanguageProvider>
      <FileProvider>
        <div className="h-full flex flex-col">
          <MenuBar />
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
      </FileProvider>
    </LanguageProvider>
  );
};

export default VSCodeLayout; 