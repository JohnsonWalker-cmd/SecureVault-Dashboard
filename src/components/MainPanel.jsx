import { Folder, ChevronRight, FileText, FileImage, FileCode, FileSpreadsheet, File } from "lucide-react";

function CardIcon({ name }) {
    if (name.startsWith('.')) return <FileCode size={32} style={{ color: 'var(--color-danger-red)' }} />;

    const ext = name.split('.').pop().toLowerCase();
    const map = {
        pdf:  <FileText        size={32} style={{ color: 'var(--color-file-pdf)'  }} />,
        docx: <FileText        size={32} style={{ color: 'var(--color-file-docx)' }} />,
        xlsx: <FileSpreadsheet size={32} style={{ color: 'var(--color-file-xlsx)' }} />,
        png:  <FileImage       size={32} style={{ color: 'var(--color-file-png)'  }} />,
        svg:  <FileImage       size={32} style={{ color: 'var(--color-file-png)'  }} />,
        yaml: <FileCode        size={32} style={{ color: 'var(--color-file-yaml)' }} />,
        yml:  <FileCode        size={32} style={{ color: 'var(--color-file-yaml)' }} />,
        txt:  <FileText        size={32} style={{ color: 'var(--color-file-txt)'  }} />,
        ttf:  <File            size={32} style={{ color: 'var(--color-file-font)' }} />,
    };
    return map[ext] ?? <File size={32} style={{ color: 'var(--color-file-txt)' }} />;
}

function FileCard({ node, isActive, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-bg-elevated border transition-colors w-36 h-32
                ${isActive ? 'border-border-selected' : 'border-border-default hover:border-border-active'}`}
        >
            <CardIcon name={node.name} />
            <span className="text-xs text-text-primary truncate w-full text-center font-inter">{node.name}</span>
            {node.size && (
                <span className="text-[10px] text-text-muted font-mono">{node.size} · JAN 15, 2024</span>
            )}
        </button>
    );
}

function FolderCard({ node }) {
    return (
        <button className="flex flex-col items-center justify-center gap-2 p-4 rounded-lg bg-bg-elevated border border-border-default hover:border-border-active transition-colors w-36 h-32">
            <Folder size={32} style={{ color: 'var(--color-folder-gold)' }} />
            <span className="text-xs text-text-primary truncate w-full text-center font-inter">{node.name}</span>
        </button>
    );
}

export default function MainPanel({ folder, breadcrumb = [], onFileSelect, activeFileId }) {
    const isEmpty = folder?.children?.length === 0 ;
    return (
        <div className="flex flex-col flex-1 h-full overflow-hidden">

            {/* Breadcrumb header */}
            <div className="flex items-center gap-2 px-6 py-3 border-b border-border-default">
                {breadcrumb.length === 0 ? (
                    <span className="text-sm text-text-secondary font-inter">Root</span>
                ) : (
                    breadcrumb.map((segment, i) => (
                        <span key={i} className="flex items-center gap-2">
                            {i > 0 && <ChevronRight size={13} className="text-text-muted" />}
                            <span className={`text-sm font-inter ${i === breadcrumb.length - 1 ? 'text-text-primary' : 'text-text-secondary'}`}>
                                {segment}
                            </span>
                        </span>
                    ))
                )}
            </div>

            {/* Content */}
            {!folder ? (
                <div className="flex flex-col items-center justify-center flex-1 gap-4">
                    <Folder size={52} className="text-text-muted" strokeWidth={1} />
                    <p className="text-sm text-text-muted font-mono tracking-wide">
                        Click any folder in the tree to view its contents here
                    </p>
                </div>
            ) : isEmpty ? (
                <div className="flex flex-col items-center justify-center flex-1 gap-4">
                    <Folder size={52} className="text-text-muted" strokeWidth={1} />
                    <p className="text-sm text-text-muted font-mono tracking-wide">
                        This folder is empty
                    </p>
                </div>

            ) : (
                <div className="flex-1 overflow-auto p-6">
                    <div className="flex flex-wrap gap-3">
                        {folder.children?.map(node => (
                            node.type === 'folder'
                                ? <FolderCard key={node.id} node={node} />
                                : <FileCard
                                    key={node.id}
                                    node={node}
                                    isActive={activeFileId === node.id}
                                    onClick={() => onFileSelect(node, [...breadcrumb, node.name])}
                                  />
                        ))}
                    </div>
                </div>
            )}

        </div>
    );
}
