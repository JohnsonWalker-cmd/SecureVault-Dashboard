import { useState } from "react";
import {ChevronRight, ChevronDown, Folder, FolderOpen, FileText, FileImage, FileCode, FileSpreadsheet, File,Clock, Settings, KeyRound} from "lucide-react";
import vaultData from "../../data.json";

function FileIcon({ name }) {
    if (name.startsWith('.')){
        return <FileCode size={14} className="shrink-0" style={{ color: 'var(--color-danger-red)' }} />;
    } 

    const ext = name.split('.').pop().toLowerCase();
    const map = {
        pdf:  <FileText       size={14} className="shrink-0" style={{ color: 'var(--color-file-pdf)'  }} />,
        docx: <FileText       size={14} className="shrink-0" style={{ color: 'var(--color-file-docx)' }} />,
        xlsx: <FileSpreadsheet size={14} className="shrink-0" style={{ color: 'var(--color-file-xlsx)' }} />,
        png:  <FileImage      size={14} className="shrink-0" style={{ color: 'var(--color-file-png)'  }} />,
        svg:  <FileImage      size={14} className="shrink-0" style={{ color: 'var(--color-file-png)'  }} />,
        yaml: <FileCode       size={14} className="shrink-0" style={{ color: 'var(--color-file-yaml)' }} />,
        yml:  <FileCode       size={14} className="shrink-0" style={{ color: 'var(--color-file-yaml)' }} />,
        txt:  <FileText       size={14} className="shrink-0" style={{ color: 'var(--color-file-txt)'  }} />,
        ttf:  <File           size={14} className="shrink-0" style={{ color: 'var(--color-file-font)' }} />,
    };
    return map[ext] ?? <File size={14} className="shrink-0" style={{ color: 'var(--color-file-txt)' }} />;
}

function TreeNode({ node, depth = 0, path = [], onFolderSelect, activeFolderId, onFileSelect, activeFileId }) {
    const [open, setOpen] = useState(false);
    const pl = 8 + depth * 14;
    const currentPath = [...path, node.name];
    const isActive = activeFolderId === node.id;
    const isFileActive = activeFileId === node.id;

    if (node.type === 'folder') {
        return (
            <div>
                <button
                    onClick={() => {
                        setOpen(o => !o);
                        onFolderSelect(node, currentPath);
                    }}
                    style={{ paddingLeft: `${pl}px` }}
                    className={`flex items-center gap-1.5 w-full pr-2 py-1.25 rounded text-left transition-colors group
                        ${isActive ? 'bg-bg-elevated text-text-primary' : 'hover:bg-bg-elevated'}`}
                >
                    {open
                        ? <ChevronDown  size={11} className="text-text-muted shrink-0" />
                        : <ChevronRight size={11} className="text-text-muted shrink-0" />
                    }
                    {open
                        ? <FolderOpen size={14} className="shrink-0" style={{ color: 'var(--color-folder-gold)' }} />
                        : <Folder     size={14} className="shrink-0" style={{ color: 'var(--color-folder-gold)' }} />
                    }
                    <span className={`text-xs truncate transition-colors font-inter
                        ${isActive ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                        {node.name}
                    </span>
                </button>
                {open && node.children?.map(child => (
                    <TreeNode
                        key={child.id}
                        node={child}
                        depth={depth + 1}
                        path={currentPath}
                        onFolderSelect={onFolderSelect}
                        activeFolderId={activeFolderId}
                        onFileSelect={onFileSelect}
                        activeFileId={activeFileId}
                    />
                ))}
            </div>
        );
    }

    return (
        <button
            onClick={() => onFileSelect(node, currentPath)}
            style={{ paddingLeft: `${pl + 16}px` }}
            className={`flex items-center gap-1.5 w-full pr-2 py-1.25 rounded text-left transition-colors group
                ${isFileActive ? 'bg-cyan-tint border-l-2 border-border-selected' : 'hover:bg-bg-elevated'}`}
        >
            <FileIcon name={node.name} />
            <span className={`text-xs truncate transition-colors font-inter
                ${isFileActive ? 'text-text-primary' : 'text-text-secondary group-hover:text-text-primary'}`}>
                {node.name}
            </span>
        </button>
    );
}

export default function Sidebar({ onFolderSelect, activeFolderId, onFileSelect, activeFileId }) {
    return (
        <aside className="flex flex-col w-56 h-full bg-bg-secondary border-r border-border-default shrink-0">

            {/* Recents */}
            <div className="px-4 pt-5 pb-4">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <Clock size={13} className="text-text-muted" />
                        <span className="text-[10px] font-semibold tracking-widest text-text-muted font-mono uppercase">
                            Recents
                        </span>
                    </div>
                    <span className="text-[10px] text-text-muted bg-bg-elevated px-1.5 py-0.5 rounded">0</span>
                </div>
                <p className="text-[11px] text-text-muted text-center py-3 font-inter">No file opened yet</p>
            </div>

            <div className="border-t border-border-default mx-4" />

            {/* Vault Explorer */}
            <div className="flex-1 overflow-y-auto px-2 pt-4 pb-2 min-h-0">
                <span className="text-[10px] font-semibold tracking-widest text-text-muted font-inter uppercase px-2 mb-2 block">
                    Vault Explorer
                </span>
                <div className="mt-2 space-y-0.5">
                    {vaultData.map(node => (
                        <TreeNode
                            key={node.id}
                            node={node}
                            depth={0}
                            path={[]}
                            onFolderSelect={onFolderSelect}
                            activeFolderId={activeFolderId}
                            onFileSelect={onFileSelect}
                            activeFileId={activeFileId}
                        />
                    ))}
                </div>
            </div>

            <div className="border-t border-border-default mx-4" />

            {/* Bottom nav */}
            <div className="px-2 py-3 space-y-0.5">
                <button className="flex items-center gap-2 w-full px-3 py-2 rounded text-text-secondary hover:text-text-primary hover:bg-bg-elevated text-xs transition-colors font-inter">
                    <Settings size={14} strokeWidth={1.75} />
                    Settings
                </button>
                <button className="flex items-center gap-2 w-full px-3 py-2 rounded text-text-secondary hover:text-text-primary hover:bg-bg-elevated text-xs transition-colors font-inter">
                    <KeyRound size={14} strokeWidth={1.75} />
                    Support
                </button>
            </div>

        </aside>
    );
}
