import { X, Download, Share2, FileText, FileImage, FileCode, FileSpreadsheet, File } from "lucide-react";

function getFileType(name) {
    if (name.startsWith('.')) return 'Config File';
    const ext = name.split('.').pop().toLowerCase();
    const map = {
        pdf:  'PDF Document',
        docx: 'Word Document',
        xlsx: 'Spreadsheet',
        png:  'PNG Image',
        svg:  'SVG Image',
        yaml: 'YAML Config',
        yml:  'YAML Config',
        txt:  'Text File',
        ttf:  'Font File',
    };
    return map[ext] || 'Unknown File';
}

function PanelIcon({ name }) {
    if (name.startsWith('.')) return <FileCode size={40} style={{ color: 'var(--color-danger-red)' }} />;
    const ext = name.split('.').pop().toLowerCase();
    const map = {
        pdf:  <FileText        size={40} style={{ color: 'var(--color-file-pdf)'  }} />,
        docx: <FileText        size={40} style={{ color: 'var(--color-file-docx)' }} />,
        xlsx: <FileSpreadsheet size={40} style={{ color: 'var(--color-file-xlsx)' }} />,
        png:  <FileImage       size={40} style={{ color: 'var(--color-file-png)'  }} />,
        svg:  <FileImage       size={40} style={{ color: 'var(--color-file-png)'  }} />,
        yaml: <FileCode        size={40} style={{ color: 'var(--color-file-yaml)' }} />,
        yml:  <FileCode        size={40} style={{ color: 'var(--color-file-yaml)' }} />,
        txt:  <FileText        size={40} style={{ color: 'var(--color-file-txt)'  }} />,
        ttf:  <File            size={40} style={{ color: 'var(--color-file-font)' }} />,
    };
    return map[ext] ?? <File size={40} style={{ color: 'var(--color-file-txt)' }} />;
}

function Row({ label, value, accent = false }) {
    return (
        <div className="py-3 border-b border-border-default">
            <p className="text-[10px] text-text-muted uppercase tracking-widest font-inter mb-1">{label}</p>
            <p className={`text-sm font-inter truncate ${accent ? 'text-accent-cyan' : 'text-text-primary'}`}>{value}</p>
        </div>
    );
}

export default function PropertiesPanel({ file, filePath = [], onClose }) {
    if (!file) return null;

    const path = '/' + filePath.join('/');

    return (
        <div className="flex flex-col w-64 h-full bg-bg-secondary border-l border-border-default shrink-0">

            {/* Header */}
            <div className="flex items-start justify-between px-5 pt-5 pb-4">
                <div>
                    <h2 className="text-sm font-semibold text-text-primary font-inter">Properties</h2>
                    <p className="text-[11px] text-text-muted font-inter mt-0.5">Selected file details</p>
                </div>
                <button
                    onClick={onClose}
                    className="p-1 rounded bg-accent-cyan text-bg-primary hover:bg-accent-hover transition-colors"
                >
                    <X size={13} strokeWidth={2.5} />
                </button>
            </div>

            {/* Icon preview */}
            <div className="flex items-center justify-center py-7 border-y border-border-default">
                <PanelIcon name={file.name} />
            </div>

            {/* Details */}
            <div className="flex-1 overflow-y-auto px-5 min-h-0">
                <Row label="Name"        value={file.name} />
                <Row label="Type"        value={getFileType(file.name)} />
                <Row label="Size"        value={file.size || '—'} />
                <Row label="Path"        value={path} />
                <Row label="Modified"    value="Jan 14, 2024" />
                <Row label="Permissions" value="Read only" accent />
            </div>

            {/* Actions */}
            <div className="px-5 py-4 space-y-2">
                <button className="flex items-center justify-center gap-2 w-full py-2 rounded border border-border-active text-text-primary hover:bg-cyan-tint text-sm font-inter transition-colors">
                    <Download size={14} />
                    Download
                </button>
                <button className="flex items-center justify-center gap-2 w-full py-2 rounded border border-border-active text-text-primary hover:bg-cyan-tint text-sm font-inter transition-colors">
                    <Share2 size={14} />
                    Share
                </button>
            </div>

        </div>
    );
}
