import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useSiteContentContext } from '../../contexts/SiteContentContext';
import { LayoutDashboard, Edit, Eye, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminBar: React.FC = () => {
    const { isAdmin } = useAuth();
    const { isEditing, toggleEditMode } = useSiteContentContext();

    if (!isAdmin) return null;

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] bg-[#1a1d24] border border-white/20 px-6 py-3 rounded-full shadow-2xl flex items-center gap-6 animate-fade-in-up">
            <div className="flex items-center gap-2 pr-4 border-r border-white/10">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-white font-bold text-sm">Admin Area</span>
            </div>

            <button
                onClick={toggleEditMode}
                className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded-lg transition-all ${isEditing
                        ? 'bg-brand-green text-brand-dark shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
            >
                {isEditing ? (
                    <>
                        <Eye size={16} />
                        Viewing Mode
                    </>
                ) : (
                    <>
                        <Edit size={16} />
                        Edit Content
                    </>
                )}
            </button>

            <div className="flex items-center gap-4 pl-4 border-l border-white/10">
                <Link
                    to="/admin"
                    className="text-gray-400 hover:text-white transition-colors"
                    title="Dashboard"
                >
                    <LayoutDashboard size={20} />
                </Link>
            </div>
        </div>
    );
};

export default AdminBar;
