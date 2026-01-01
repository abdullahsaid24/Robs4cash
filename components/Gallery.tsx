import React, { useEffect, useState } from 'react';
import { useSiteContentContext } from '../contexts/SiteContentContext';
import { supabase } from '../lib/supabase';
import EditableText from './admin/EditableText';

interface GalleryImage {
  id: number;
  image_url: string;
  title: string;
  sort_order: number;
}

const Gallery: React.FC = () => {
  const { content } = useSiteContentContext();
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    const { data } = await supabase
      .from('gallery_images')
      .select('*')
      .order('sort_order', { ascending: true });

    if (data && data.length > 0) {
      setImages(data);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center mb-16 gap-4">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">
              <EditableText section="gallery" field="title" value={content.gallery.title} />
            </h2>
            <div className="text-gray-400">
              <EditableText section="gallery" field="subtitle" value={content.gallery.subtitle} />
            </div>
          </div>

          {images.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8">
              {images.map((image) => (
                <div key={image.id} className="rounded-2xl overflow-hidden hover:scale-[1.02] transition-transform duration-300">
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full mt-8 overflow-hidden rounded-2xl animate-pulse-subtle">
              <img
                src="/conditions-image.png"
                alt="Vehicles we buy"
                className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Gallery;