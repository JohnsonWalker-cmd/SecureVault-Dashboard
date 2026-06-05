import { Search } from "lucide-react";

export default function SearchBar() {
    return (
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-bg-elevated border border-border-default w-72 group focus-within:border-cyan-focus-rim transition-colors">
            <Search size={15} className="text-text-muted shrink-0 group-focus-within:text-accent-cyan transition-colors" strokeWidth={2} />
            <input
                type="text"
                placeholder="Search files , folders..."
                className="bg-transparent text-text-primary placeholder:text-text-muted text-sm w-full outline-none font-inter"
            />
            <kbd className="flex items-center px-1.5 py-0.5 rounded text-[10px] text-text-muted border border-border-default font-mono shrink-0">
                ⌘K
            </kbd>
        </div>
    )
}