import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Image, Trash2, Upload, Loader2, GripVertical, AlertTriangle } from 'lucide-react';

interface GalleryImage {
    id: number;
    image_url: string;
    title: string;
    sort_order: number;
}

const AdminGallery: React.FC = () => {
    const [images, setImages] = useState<GalleryImage[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState<GalleryImage | null>(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        const { data } = await supabase
            .from('gallery_images')
            .select('*')
            .order('sort_order', { ascending: true });

        setImages(data || []);
        setLoading(false);
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);

        try {
            // Upload to Supabase Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from('gallery')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('gallery')
                .getPublicUrl(fileName);

            // Add to database
            const { error: dbError } = await supabase
                .from('gallery_images')
                .insert({
                    image_url: publicUrl,
                    title: file.name,
                    sort_order: images.length,
                });

            if (dbError) throw dbError;

            await fetchImages();
        } catch (error: any) {
            alert('Upload failed: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async () => {
        if (!deleteConfirm) return;
        setDeleting(true);

        try {
            // Extract filename from URL
            const fileName = deleteConfirm.image_url.split('/').pop();

            // Delete from storage
            if (fileName) {
                await supabase.storage.from('gallery').remove([fileName]);
            }

            // Delete from database
            const { error } = await supabase.from('gallery_images').delete().eq('id', deleteConfirm.id);

            if (error) throw error;

            // Optimistic UI update
            setImages(prev => prev.filter(img => img.id !== deleteConfirm.id));
        } catch (error: any) {
            console.error('Delete error:', error);
            alert('Failed to delete image: ' + error.message);
        } finally {
            setDeleting(false);
            setDeleteConfirm(null);
        }
    };

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
                                <h3 className="text-xl font-bold text-white">Delete Image?</h3>
                                <p className="text-gray-400 text-sm">This action cannot be undone.</p>
                            </div>
                        </div>
                        <div className="mb-6">
                            <img
                                src={deleteConfirm.image_url}
                                alt={deleteConfirm.title}
                                className="w-full h-32 object-cover rounded-lg"
                            />
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

            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">Gallery</h1>
                <label className="bg-brand-green text-brand-dark font-bold px-6 py-3 rounded-lg hover:brightness-110 transition-all cursor-pointer flex items-center gap-2">
                    {uploading ? (
                        <>
                            <Loader2 size={20} className="animate-spin" />
                            Uploading...
                        </>
                    ) : (
                        <>
                            <Upload size={20} />
                            Upload Image
                        </>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        className="hidden"
                        disabled={uploading}
                    />
                </label>
            </div>


            {loading ? (
                <div className="text-white">Loading...</div>
            ) : images.length === 0 ? (
                <div className="bg-[#111] border border-white/10 rounded-xl p-12 text-center">
                    <Image size={48} className="text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">No gallery images yet. Upload some to get started.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {images.map((image) => (
                        <div key={image.id} className="bg-[#111] border border-white/10 rounded-xl overflow-hidden group">
                            <div className="aspect-video relative">
                                <img
                                    src={image.image_url}
                                    alt={image.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                    <button
                                        onClick={() => setDeleteConfirm(image)}
                                        className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-400 text-sm truncate">{image.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminGallery;
