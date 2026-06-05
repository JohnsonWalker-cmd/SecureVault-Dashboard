import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainPanel from "./components/MainPanel";

function App() {
  const [activeFolder, setActiveFolder] = useState(null);

  const handleFolderSelect = (node, path) => {
    setActiveFolder({ node, path });
  };

  return (
    <div className="flex flex-col h-screen bg-bg-primary">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          onFolderSelect={handleFolderSelect}
          activeFolderId={activeFolder?.node.id}
        />
        <MainPanel
          folder={activeFolder?.node}
          breadcrumb={activeFolder?.path ?? []}
        />
      </div>
    </div>
  )
}

export default App
