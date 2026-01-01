import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Privacy: React.FC = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen bg-brand-dark text-gray-300">
            <div className="max-w-4xl mx-auto px-4 py-16">
                <Link to="/" className="inline-flex items-center gap-2 text-brand-green hover:underline mb-8">
                    <ArrowLeft size={18} />
                    Back to Home
                </Link>

                <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
                <p className="text-gray-400 mb-8">Last updated: January 1, 2026</p>

                <div className="space-y-8 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Information We Collect</h2>
                        <p>When you use our services or fill out our quote form, we may collect the following information:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                            <li>Your name and contact information (phone number, email address)</li>
                            <li>Vehicle information (year, make, model, condition)</li>
                            <li>Location information for pickup purposes</li>
                            <li>Payment information when completing a transaction</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. How We Use Your Information</h2>
                        <p>We use your personal information to:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                            <li>Provide you with a quote for your vehicle</li>
                            <li>Schedule pickup and complete the transaction</li>
                            <li>Communicate with you about our services</li>
                            <li>Improve our services and customer experience</li>
                            <li>Comply with legal obligations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Information Sharing</h2>
                        <p>We do not sell or rent your personal information to third parties. We may share your information with:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                            <li>Our towing and logistics partners to complete services</li>
                            <li>Legal authorities when required by law</li>
                            <li>Service providers who assist our business operations</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
                        <p>We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Your Rights</h2>
                        <p>You have the right to:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                            <li>Access the personal information we hold about you</li>
                            <li>Request correction of inaccurate information</li>
                            <li>Request deletion of your information</li>
                            <li>Opt out of marketing communications</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Contact Us</h2>
                        <p>If you have questions about this Privacy Policy, please contact us at:</p>
                        <p className="mt-2">
                            <strong className="text-white">Robs Cash 4 Cars</strong><br />
                            Edmonton, Alberta<br />
                            Phone: <a href="tel:780-222-4106" className="text-brand-green hover:underline">780-222-4106</a>
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Privacy;
