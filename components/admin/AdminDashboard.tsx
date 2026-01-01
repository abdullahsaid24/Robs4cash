import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { FileText, Users, Image, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
    const [stats, setStats] = useState({
        leads: 0,
        todayLeads: 0,
    });

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        // Get total leads
        const { count: totalLeads } = await supabase
            .from('leads')
            .select('*', { count: 'exact', head: true });

        // Get today's leads
        const today = new Date().toISOString().split('T')[0];
        const { count: todayLeads } = await supabase
            .from('leads')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', today);

        setStats({
            leads: totalLeads || 0,
            todayLeads: todayLeads || 0,
        });
    };

    const cards = [
        { label: 'Total Leads', value: stats.leads, icon: Users, color: 'text-blue-400', link: '/admin/leads' },
        { label: 'Today\'s Leads', value: stats.todayLeads, icon: TrendingUp, color: 'text-brand-green', link: '/admin/leads' },
        { label: 'Edit Content', value: 'Manage', icon: FileText, color: 'text-purple-400', link: '/admin/content' },
        { label: 'Gallery', value: 'Manage', icon: Image, color: 'text-orange-400', link: '/admin/gallery' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Dashboard</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card) => (
                    <Link
                        key={card.label}
                        to={card.link}
                        className="bg-[#111] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors group"
                    >
                        <div className={`w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center ${card.color} mb-4 group-hover:scale-110 transition-transform`}>
                            <card.icon size={24} />
                        </div>
                        <p className="text-gray-400 text-sm mb-1">{card.label}</p>
                        <p className="text-2xl font-bold text-white">{card.value}</p>
                    </Link>
                ))}
            </div>

            <div className="mt-12">
                <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
                <div className="flex flex-wrap gap-4">
                    <Link
                        to="/admin/content"
                        className="bg-brand-green text-brand-dark font-bold px-6 py-3 rounded-lg hover:brightness-110 transition-all"
                    >
                        Edit Website Content
                    </Link>
                    <Link
                        to="/admin/leads"
                        className="bg-white/10 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/20 transition-all"
                    >
                        View All Leads
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
