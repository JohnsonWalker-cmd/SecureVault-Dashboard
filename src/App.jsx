import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainPanel from "./components/MainPanel";
import PropertiesPanel from "./components/PropertiesPanel";

function App() {
  const [activeFolder, setActiveFolder] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [ recents , setRecents] = useState([]);

  const handleFolderSelect = (node, path) => {
    setActiveFolder({ node, path });
    setSelectedFile(null);
  };

  const handleFileSelect = (node, path) => {
    setSelectedFile({ node, path });
    setRecents(prev => {
        const deduped = prev.filter(r => r.node.id !== node.id);
        return [{ node , path , openedAt : new Date()}, ...deduped].slice(0,8);
    });
  };

  return (
    <div className="flex flex-col h-screen bg-bg-primary">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          onFolderSelect={handleFolderSelect}
          activeFolderId={activeFolder?.node.id}
          onFileSelect={handleFileSelect}
          activeFileId={selectedFile?.node.id}
          recents={recents}
        />
        <MainPanel
          folder={activeFolder?.node}
          breadcrumb={activeFolder?.path ?? []}
          onFileSelect={handleFileSelect}
          activeFileId={selectedFile?.node.id}
        />
        {selectedFile && (
          <PropertiesPanel
            file={selectedFile.node}
            filePath={selectedFile.path}
            onClose={() => setSelectedFile(null)}
          />
        )}
      </div>
    </div>
  )
}

export default App
