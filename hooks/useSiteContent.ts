import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface ContentData {
    hero: {
        badge: string;
        title: string;
        titleHighlight: string;
        subtitle: string;
    };
    process: {
        title: string;
        subtitle: string;
        step1Title: string;
        step1Text: string;
        step2Title: string;
        step2Text: string;
        step3Title: string;
        step3Text: string;
    };
    gallery: {
        title: string;
        subtitle: string;
    };
    footer: {
        phone: string;
        tagline: string;
    };
}

const defaultContent: ContentData = {
    hero: {
        badge: 'Top Rated in Edmonton',
        title: 'Get Instant Cash',
        titleHighlight: 'For Your Vehicle',
        subtitle: 'We pay top dollar for any car, truck, or SUV. Free towing, same-day pickup, and cash on the spot. No hidden fees.',
    },
    process: {
        title: 'How It Works',
        subtitle: 'Three simple steps to turn your unwanted vehicle into cash today.',
        step1Title: '1. Get Instant Offer',
        step1Text: 'Call us or use our online quote tool. Get a competitive market offer in minutes based on your vehicle details.',
        step2Title: '2. Free Towing',
        step2Text: 'We schedule a pickup at your convenience. Home, work, or roadside—our professional fleet handles everything.',
        step3Title: '3. Instant Payment',
        step3Text: 'Get paid on the spot. No waiting for checks or transfers—driver hands you cash immediately upon verification.',
    },
    gallery: {
        title: 'SUCCESS STORIES',
        subtitle: 'Turn Your Unwanted Car Into Cash Today!',
    },
    footer: {
        phone: '780-222-4106',
        tagline: 'Edmonton\'s trusted vehicle buying service. Fair pricing, professional service, and instant cash payments.',
    },
};

export function useSiteContent() {
    const [content, setContent] = useState<ContentData>(defaultContent);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const { data } = await supabase
                    .from('site_content')
                    .select('*')
                    .eq('id', 'main')
                    .single();

                if (data?.content) {
                    setContent(data.content);
                }
            } catch (error) {
                // Use default content if fetch fails
                console.log('Using default content');
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, []);

    return { content, loading };
}

export type { ContentData };
