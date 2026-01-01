import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { ContentData } from '../hooks/useSiteContent';

interface SiteContentContextType {
    content: ContentData;
    loading: boolean;
    isEditing: boolean;
    toggleEditMode: () => void;
    updateContent: (section: keyof ContentData, field: string, value: string) => Promise<void>;
}

const defaultContent: ContentData = {
    hero: {
        badge: 'Top Rated in Edmonton',
        title: 'Get Instant Cash',
        titleHighlight: 'For Your Vehicle',
        subtitle: 'We pay top dollar for any car, truck, or SUV. Free towing, same-day pickup, and cash on the spot. No hidden fees.',
        image_url: '/hero-image.png',
    },
    process: {
        title: 'How It Works',
        subtitle: 'Three simple steps to turn your unwanted vehicle into cash today.',
        image_url: '/process-bg.jpg',
        step1Title: '1. Get Instant Offer',
        step1Text: 'Call us or use our online quote tool. Get a competitive market offer in minutes based on your vehicle details.',
        step2Title: '2. Free Towing',
        step2Text: 'We schedule a pickup at your convenience. Home, work, or roadside—our professional fleet handles everything.',
        step3Title: '3. Instant Payment',
        step3Text: 'Get paid on the spot. No waiting for checks or transfers—driver hands you cash immediately upon verification.',
    },
    quote: {
        title: 'GET INSTANT OFFER',
        subtitle: 'Guaranteed highest payout in Edmonton.',
        successTitle: 'Request Received!',
        successSubtitle: 'We\'ll call you shortly with your quote.',
        successNote: 'Expect a call within 30 minutes!',
    },
    gallery: {
        title: 'SUCCESS STORIES',
        subtitle: 'Turn Your Unwanted Car Into Cash Today!',
    },
    header: {
        brandName: 'ROBS',
        brandHighlight: 'CASH4CARS',
        brandSubtitle: 'Edmonton\'s Trusted Buyer',
    },
    footer: {
        phone: '780-222-4106',
        tagline: 'Edmonton\'s trusted vehicle buying service. Fair pricing, professional service, and instant cash payments.',
        service_areas: 'Edmonton, St. Albert, Sherwood Park, Leduc, Spruce Grove, Stony Plain, Fort Saskatchewan, Beaumont, Nisku, Devon',
    },
};

const SiteContentContext = createContext<SiteContentContextType>({
    content: defaultContent,
    loading: true,
    isEditing: false,
    toggleEditMode: () => { },
    updateContent: async () => { },
});

export const SiteContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [content, setContent] = useState<ContentData>(defaultContent);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const { data } = await supabase
                .from('site_content')
                .select('*')
                .eq('id', 'main')
                .single();

            if (data?.content) {
                // Deep merge: ensure all new fields have defaults even if DB is outdated
                const mergedContent: ContentData = {
                    hero: { ...defaultContent.hero, ...data.content.hero },
                    process: { ...defaultContent.process, ...data.content.process },
                    quote: { ...defaultContent.quote, ...data.content.quote },
                    gallery: { ...defaultContent.gallery, ...data.content.gallery },
                    header: { ...defaultContent.header, ...data.content.header },
                    footer: { ...defaultContent.footer, ...data.content.footer },
                };
                setContent(mergedContent);
            }
        } catch (error) {
            console.log('Using default content');
        } finally {
            setLoading(false);
        }
    };

    const toggleEditMode = () => setIsEditing(prev => !prev);

    const updateContent = async (section: keyof ContentData, field: string, value: string) => {
        // 1. Optimistic Update
        const newContent = {
            ...content,
            [section]: {
                ...content[section],
                [field]: value,
            },
        };
        setContent(newContent);

        // 2. Persist to DB
        const { error } = await supabase
            .from('site_content')
            .upsert({
                id: 'main',
                content: newContent,
                updated_at: new Date().toISOString(),
            });

        if (error) {
            console.error('Failed to save content:', error);
            alert('Failed to save changes!');
            fetchContent(); // Revert on error
        }
    };

    const value = {
        content,
        loading,
        isEditing,
        toggleEditMode,
        updateContent,
    };

    return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
};

export const useSiteContentContext = () => useContext(SiteContentContext);
