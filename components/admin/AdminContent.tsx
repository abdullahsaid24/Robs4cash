import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, Loader2, Check, Upload, Image as ImageIcon } from 'lucide-react';

interface ContentData {
    hero: {
        badge: string;
        title: string;
        titleHighlight: string;
        subtitle: string;
        image_url: string;
    };
    process: {
        title: string;
        subtitle: string;
        image_url: string;
        step1Title: string;
        step1Text: string;
        step2Title: string;
        step2Text: string;
        step3Title: string;
        step3Text: string;
    };
    quote: {
        title: string;
        subtitle: string;
        successTitle: string;
        successSubtitle: string;
        successNote: string;
    };
    gallery: {
        title: string;
        subtitle: string;
    };
    header: {
        brandName: string;
        brandHighlight: string;
        brandSubtitle: string;
    };
    footer: {
        phone: string;
        tagline: string;
        service_areas: string;
    };
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

const AdminContent: React.FC = () => {
    const [content, setContent] = useState<ContentData>(defaultContent);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
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
        setLoading(false);
    };

    const handleSave = async () => {
        setSaving(true);
        setSaved(false);

        const { error } = await supabase
            .from('site_content')
            .upsert({
                id: 'main',
                content: content,
                updated_at: new Date().toISOString(),
            });

        if (error) {
            alert('Error saving: ' + error.message);
        } else {
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        }
        setSaving(false);
    };

    const updateField = (section: keyof ContentData, field: string, value: string) => {
        setContent(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [field]: value,
            },
        }));
    };

    const handleImageUpload = async (section: keyof ContentData, field: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSaving(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Date.now()}-${field}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from('gallery')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('gallery')
                .getPublicUrl(fileName);

            updateField(section, field, publicUrl);
        } catch (error: any) {
            alert('Upload failed: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="max-w-4xl">
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white">Edit Content</h1>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-brand-green text-brand-dark font-bold px-6 py-3 rounded-lg hover:brightness-110 transition-all disabled:opacity-70 flex items-center gap-2"
                >
                    {saving ? (
                        <>
                            <Loader2 size={20} className="animate-spin" />
                            Saving...
                        </>
                    ) : saved ? (
                        <>
                            <Check size={20} />
                            Saved!
                        </>
                    ) : (
                        <>
                            <Save size={20} />
                            Save Changes
                        </>
                    )}
                </button>
            </div>

            {/* Hero Section */}
            <section className="bg-[#111] border border-white/10 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">Hero Section</h2>
                    <ImageIcon size={20} className="text-gray-500" />
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Badge Text</label>
                            <input
                                type="text"
                                value={content.hero.badge}
                                onChange={(e) => updateField('hero', 'badge', e.target.value)}
                                className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-green outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Background Image</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={content.hero.image_url}
                                    onChange={(e) => updateField('hero', 'image_url', e.target.value)}
                                    className="flex-1 bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-green outline-none"
                                />
                                <label className="bg-white/10 text-white px-4 py-3 rounded-lg hover:bg-white/20 transition-all cursor-pointer flex items-center justify-center">
                                    <Upload size={18} />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload('hero', 'image_url', e)}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Title (Line 1)</label>
                            <input
                                type="text"
                                value={content.hero.title}
                                onChange={(e) => updateField('hero', 'title', e.target.value)}
                                className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-green outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Title (Line 2 - Green)</label>
                            <input
                                type="text"
                                value={content.hero.titleHighlight}
                                onChange={(e) => updateField('hero', 'titleHighlight', e.target.value)}
                                className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-green outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Subtitle</label>
                        <textarea
                            value={content.hero.subtitle}
                            onChange={(e) => updateField('hero', 'subtitle', e.target.value)}
                            rows={3}
                            className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-green outline-none resize-none"
                        />
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="bg-[#111] border border-white/10 rounded-xl p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-white">How It Works Section</h2>
                    <ImageIcon size={20} className="text-gray-500" />
                </div>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Section Title</label>
                            <input
                                type="text"
                                value={content.process.title}
                                onChange={(e) => updateField('process', 'title', e.target.value)}
                                className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-green outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Background Image</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={content.process.image_url}
                                    onChange={(e) => updateField('process', 'image_url', e.target.value)}
                                    className="flex-1 bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-brand-green outline-none"
                                />
                                <label className="bg-white/10 text-white px-4 py-3 rounded-lg hover:bg-white/20 transition-all cursor-pointer flex items-center justify-center">
                                    <Upload size={18} />
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageUpload('process', 'image_url', e)}
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Section Subtitle</label>
                        <input
                            type="text"
                            value={content.process.subtitle}
                            onChange={(e) => updateField('process', 'subtitle', e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-green outline-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                        {/* Step 1 */}
                        <div className="space-y-2">
                            <label className="block text-sm text-gray-400">Step 1</label>
                            <input
                                type="text"
                                value={content.process.step1Title}
                                onChange={(e) => updateField('process', 'step1Title', e.target.value)}
                                className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-brand-green outline-none font-bold"
                            />
                            <textarea
                                value={content.process.step1Text}
                                onChange={(e) => updateField('process', 'step1Text', e.target.value)}
                                rows={3}
                                className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-brand-green outline-none resize-none"
                            />
                        </div>
                        {/* Step 2 */}
                        <div className="space-y-2">
                            <label className="block text-sm text-gray-400">Step 2</label>
                            <input
                                type="text"
                                value={content.process.step2Title}
                                onChange={(e) => updateField('process', 'step2Title', e.target.value)}
                                className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-brand-green outline-none font-bold"
                            />
                            <textarea
                                value={content.process.step2Text}
                                onChange={(e) => updateField('process', 'step2Text', e.target.value)}
                                rows={3}
                                className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-brand-green outline-none resize-none"
                            />
                        </div>
                        {/* Step 3 */}
                        <div className="space-y-2">
                            <label className="block text-sm text-gray-400">Step 3</label>
                            <input
                                type="text"
                                value={content.process.step3Title}
                                onChange={(e) => updateField('process', 'step3Title', e.target.value)}
                                className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-brand-green outline-none font-bold"
                            />
                            <textarea
                                value={content.process.step3Text}
                                onChange={(e) => updateField('process', 'step3Text', e.target.value)}
                                rows={3}
                                className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-brand-green outline-none resize-none"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Quote Form Section */}
            <section className="bg-[#111] border border-white/10 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-bold text-white mb-4">Quote Form</h2>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Form Header</label>
                            <input
                                type="text"
                                value={content.quote.title}
                                onChange={(e) => updateField('quote', 'title', e.target.value)}
                                className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-green outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Form Subtitle</label>
                            <input
                                type="text"
                                value={content.quote.subtitle}
                                onChange={(e) => updateField('quote', 'subtitle', e.target.value)}
                                className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-green outline-none"
                            />
                        </div>
                    </div>
                    <div className="pt-4 border-t border-white/5">
                        <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Success Screen</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Success Title</label>
                                <input
                                    type="text"
                                    value={content.quote.successTitle}
                                    onChange={(e) => updateField('quote', 'successTitle', e.target.value)}
                                    className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-green outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Success Subtitle</label>
                                <input
                                    type="text"
                                    value={content.quote.successSubtitle}
                                    onChange={(e) => updateField('quote', 'successSubtitle', e.target.value)}
                                    className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-green outline-none"
                                />
                            </div>
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm text-gray-400 mb-2">Success Note (Green)</label>
                            <input
                                type="text"
                                value={content.quote.successNote}
                                onChange={(e) => updateField('quote', 'successNote', e.target.value)}
                                className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-green outline-none"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            <section className="bg-[#111] border border-white/10 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-bold text-white mb-4">Gallery Section</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Section Title</label>
                        <input
                            type="text"
                            value={content.gallery.title}
                            onChange={(e) => updateField('gallery', 'title', e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-green outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Section Subtitle</label>
                        <input
                            type="text"
                            value={content.gallery.subtitle}
                            onChange={(e) => updateField('gallery', 'subtitle', e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-green outline-none"
                        />
                    </div>
                </div>
            </section>

            {/* Header & Brand Section */}
            <section className="bg-[#111] border border-white/10 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-bold text-white mb-4">Header & Branding</h2>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Brand Name (ROBS)</label>
                            <input
                                type="text"
                                value={content.header.brandName}
                                onChange={(e) => updateField('header', 'brandName', e.target.value)}
                                className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-green outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Brand Highlight (CASH4CARS)</label>
                            <input
                                type="text"
                                value={content.header.brandHighlight}
                                onChange={(e) => updateField('header', 'brandHighlight', e.target.value)}
                                className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-green outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Brand Tagline</label>
                        <input
                            type="text"
                            value={content.header.brandSubtitle}
                            onChange={(e) => updateField('header', 'brandSubtitle', e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-green outline-none"
                        />
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <section className="bg-[#111] border border-white/10 rounded-xl p-6 mb-6">
                <h2 className="text-xl font-bold text-white mb-4">Footer</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Support Phone Number</label>
                        <input
                            type="text"
                            value={content.footer.phone}
                            onChange={(e) => updateField('footer', 'phone', e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-green outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Footer Description</label>
                        <textarea
                            value={content.footer.tagline}
                            onChange={(e) => updateField('footer', 'tagline', e.target.value)}
                            rows={3}
                            className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-green outline-none resize-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-400 mb-2">Service Areas (Comma separated)</label>
                        <textarea
                            value={content.footer.service_areas}
                            onChange={(e) => updateField('footer', 'service_areas', e.target.value)}
                            rows={2}
                            className="w-full bg-[#0a0a0a] border border-white/10 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-brand-green outline-none resize-none"
                        />
                    </div>
                </div>
            </section>

            {/* Save Button (bottom) */}
            <div className="flex justify-end">
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-brand-green text-brand-dark font-bold px-8 py-3 rounded-lg hover:brightness-110 transition-all disabled:opacity-70 flex items-center gap-2"
                >
                    {saving ? (
                        <>
                            <Loader2 size={20} className="animate-spin" />
                            Saving...
                        </>
                    ) : (
                        <>
                            <Save size={20} />
                            Save All Changes
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default AdminContent;
