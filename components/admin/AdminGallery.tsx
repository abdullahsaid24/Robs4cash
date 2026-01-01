import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Image, Trash2, Upload, Loader2, GripVertical } from 'lucide-react';

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

    const handleDelete = async (id: number, imageUrl: string) => {
        if (!confirm('Are you sure you want to delete this image?')) return;

        // Extract filename from URL
        const fileName = imageUrl.split('/').pop();

        // Delete from storage
        if (fileName) {
            await supabase.storage.from('gallery').remove([fileName]);
        }

        // Delete from database
        await supabase.from('gallery_images').delete().eq('id', id);

        await fetchImages();
    };

    return (
        <div>
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
                                        onClick={() => handleDelete(image.id, image.image_url)}
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
