import { Shield, Bell } from "lucide-react";
import SearchBar from "./SearchBar";

export default function Navbar(){
    return (
        <div className="flex items-center justify-between px-6 py-3 bg-bg-secondary border-b border-border-default">

            {/* Brand Name */}
            <div className="flex items-center gap-2">
                <Shield size={24} className="text-accent-cyan" strokeWidth={1.75} />
                <h1 className="text-accent-cyan font-semibold text-base tracking-wide font-inter">SecureVault</h1>
            </div>

            {/* Search */}
            <SearchBar />

            
            <div className="flex items-center gap-3">
                <button className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-bg-elevated transition-colors">
                    <Bell size={18} strokeWidth={1.75} />
                </button>
                <div className="w-8 h-8 rounded-full bg-bg-elevated border border-border-default overflow-hidden cursor-pointer hover:border-border-active transition-colors">
                    <img
                        src="https://api.dicebear.com/9.x/adventurer/svg?seed=SecureVault"
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

        </div>
    )
}