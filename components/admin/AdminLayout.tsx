import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { LayoutDashboard, FileText, Image, Users, LogOut, Menu, X } from 'lucide-react';

const AdminLayout: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            navigate('/admin/login');
        }
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/admin/login');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    const navItems = [
        { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/content', icon: FileText, label: 'Edit Content' },
        { path: '/admin/gallery', icon: Image, label: 'Gallery' },
        { path: '/admin/leads', icon: Users, label: 'Leads' },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex">
            {/* Mobile menu button */}
            <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden fixed top-4 left-4 z-50 p-2 bg-[#111] border border-white/10 rounded-lg text-white"
            >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Sidebar */}
            <aside className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-[#111] border-r border-white/10 transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform`}>
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-xl font-bold text-white">Admin Panel</h1>
                    <p className="text-sm text-gray-400">Robs Cash 4 Cars</p>
                </div>

                <nav className="p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={() => setSidebarOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? 'bg-brand-green text-brand-dark font-bold'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <item.icon size={20} />
                                {item.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                    <Link
                        to="/"
                        className="flex items-center gap-3 px-4 py-2 mt-2 text-sm text-gray-500 hover:text-brand-green transition-colors"
                    >
                        ← Back to Website
                    </Link>
                </div>
            </aside>

            {/* Main content */}
            <main className="flex-1 p-6 md:p-10 overflow-auto">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout;
