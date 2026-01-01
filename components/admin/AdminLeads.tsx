import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Phone, Calendar, Car, Download, Search, ChevronLeft, ChevronRight, Trash2, X, AlertTriangle } from 'lucide-react';

interface Lead {
    id: number;
    created_at: string;
    year: string;
    make: string;
    model: string;
    condition: string;
    missing_parts: string;
    name: string;
    phone: string;
    email: string;
}

const AdminLeads: React.FC = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    const [total, setTotal] = useState(0);
    const [deleteConfirm, setDeleteConfirm] = useState<Lead | null>(null);
    const [deleting, setDeleting] = useState(false);
    const perPage = 10;

    useEffect(() => {
        fetchLeads();
    }, [page]);

    const fetchLeads = async () => {
        setLoading(true);

        const { data, count } = await supabase
            .from('leads')
            .select('*', { count: 'exact' })
            .order('created_at', { ascending: false })
            .range(page * perPage, (page + 1) * perPage - 1);

        setLeads(data || []);
        setTotal(count || 0);
        setLoading(false);
    };

    const handleDelete = async () => {
        if (!deleteConfirm) return;
        setDeleting(true);

        const { error } = await supabase
            .from('leads')
            .delete()
            .eq('id', deleteConfirm.id);

        if (error) {
            console.error('Delete error:', error);
            alert('Failed to delete lead: ' + error.message);
        } else {
            // Remove from local state immediately for responsive UI
            setLeads(prev => prev.filter(l => l.id !== deleteConfirm.id));
            setTotal(prev => prev - 1);
        }
        setDeleting(false);
        setDeleteConfirm(null);
    };

    const exportCSV = () => {
        const headers = ['Date', 'Name', 'Phone', 'Email', 'Year', 'Make', 'Model', 'Condition', 'Missing Parts'];
        const rows = leads.map(lead => [
            new Date(lead.created_at).toLocaleDateString(),
            lead.name,
            lead.phone,
            lead.email || '',
            lead.year,
            lead.make,
            lead.model,
            lead.condition,
            lead.missing_parts,
        ]);

        const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    const filteredLeads = leads.filter(lead =>
        lead.name?.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone?.includes(search) ||
        lead.make?.toLowerCase().includes(search.toLowerCase()) ||
        lead.model?.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(total / perPage);

    return (
        <div>
            {/* Delete Confirmation Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
                    <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                                <AlertTriangle size={24} className="text-red-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Delete Lead?</h3>
                                <p className="text-gray-400 text-sm">This action cannot be undone.</p>
                            </div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-4 mb-6">
                            <p className="text-white font-medium">{deleteConfirm.name}</p>
                            <p className="text-gray-400 text-sm">{deleteConfirm.year} {deleteConfirm.make} {deleteConfirm.model}</p>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setDeleteConfirm(null)}
                                className="flex-1 px-4 py-3 rounded-lg border border-white/20 text-gray-300 font-medium hover:bg-white/5 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                disabled={deleting}
                                className="flex-1 px-4 py-3 rounded-lg bg-red-500 text-white font-bold hover:bg-red-600 transition-colors disabled:opacity-50"
                            >
                                {deleting ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <h1 className="text-3xl font-bold text-white">Leads ({total})</h1>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search leads..."
                            className="bg-[#111] border border-white/10 text-white rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-brand-green outline-none w-64"
                        />
                    </div>
                    <button
                        onClick={exportCSV}
                        className="bg-white/10 text-white font-medium px-4 py-2 rounded-lg hover:bg-white/20 transition-all flex items-center gap-2"
                    >
                        <Download size={18} />
                        Export CSV
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="text-white">Loading...</div>
            ) : leads.length === 0 ? (
                <div className="bg-[#111] border border-white/10 rounded-xl p-12 text-center">
                    <Car size={48} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No leads yet. They will appear here when customers submit the quote form.</p>
                </div>
            ) : (
                <>
                    <div className="bg-[#111] border border-white/10 rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="text-left text-gray-400 font-medium px-6 py-4 text-sm">Date</th>
                                        <th className="text-left text-gray-400 font-medium px-6 py-4 text-sm">Customer</th>
                                        <th className="text-left text-gray-400 font-medium px-6 py-4 text-sm">Vehicle</th>
                                        <th className="text-left text-gray-400 font-medium px-6 py-4 text-sm">Condition</th>
                                        <th className="text-right text-gray-400 font-medium px-6 py-4 text-sm">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredLeads.map((lead) => (
                                        <tr key={lead.id} className="border-b border-white/5 hover:bg-white/5">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                    <Calendar size={14} />
                                                    {new Date(lead.created_at).toLocaleDateString()}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {new Date(lead.created_at).toLocaleTimeString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-white font-medium">{lead.name}</div>
                                                <a
                                                    href={`tel:${lead.phone}`}
                                                    className="text-sm text-brand-green hover:underline font-bold"
                                                >
                                                    {lead.phone}
                                                </a>
                                                {lead.email && <div className="text-xs text-gray-500 mt-0.5">{lead.email}</div>}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-white">{lead.year} {lead.make}</div>
                                                <div className="text-sm text-gray-400">{lead.model}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${lead.condition === 'Drives' ? 'bg-green-500/20 text-green-400' :
                                                    lead.condition === 'Needs Work' ? 'bg-yellow-500/20 text-yellow-400' :
                                                        lead.condition === 'No Start' ? 'bg-orange-500/20 text-orange-400' :
                                                            'bg-red-500/20 text-red-400'
                                                    }`}>
                                                    {lead.condition}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => setDeleteConfirm(lead)}
                                                    className="text-gray-500 hover:text-red-500 transition-colors p-2"
                                                    title="Delete Lead"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between mt-6">
                            <p className="text-gray-400 text-sm">
                                Showing {page * perPage + 1} - {Math.min((page + 1) * perPage, total)} of {total}
                            </p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setPage(p => Math.max(0, p - 1))}
                                    disabled={page === 0}
                                    className="p-2 rounded-lg border border-white/10 text-gray-400 hover:bg-white/5 disabled:opacity-50"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
                                    disabled={page >= totalPages - 1}
                                    className="p-2 rounded-lg border border-white/10 text-gray-400 hover:bg-white/5 disabled:opacity-50"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default AdminLeads;
