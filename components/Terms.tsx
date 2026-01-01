import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Terms: React.FC = () => {
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

                <h1 className="text-4xl font-bold text-white mb-8">Terms of Service</h1>
                <p className="text-gray-400 mb-8">Last updated: January 1, 2026</p>

                <div className="space-y-8 text-gray-300 leading-relaxed">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
                        <p>By accessing or using the Robs Cash 4 Cars website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">2. Our Services</h2>
                        <p>Robs Cash 4 Cars provides vehicle purchasing services in the Edmonton area. Our services include:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                            <li>Providing quotes for vehicles based on information you provide</li>
                            <li>Free towing and pickup of purchased vehicles</li>
                            <li>Immediate cash payment upon vehicle inspection and purchase</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">3. Vehicle Quotes</h2>
                        <p>Quotes provided through our website or by phone are estimates based on the information you provide. Final purchase prices are determined upon physical inspection of the vehicle and verification of its condition, title status, and ownership.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">4. Vehicle Ownership</h2>
                        <p>By selling your vehicle to us, you confirm that:</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                            <li>You are the legal owner of the vehicle or authorized to sell it</li>
                            <li>The vehicle is free of liens and encumbrances (unless disclosed)</li>
                            <li>All information provided about the vehicle is accurate</li>
                            <li>You have the right to transfer ownership of the vehicle</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">5. Payment</h2>
                        <p>Upon completing a vehicle purchase, payment is made immediately via cash or e-transfer. Once payment is made and the vehicle is collected, the sale is final.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
                        <p>Robs Cash 4 Cars is not liable for any indirect, incidental, or consequential damages arising from the use of our services. Our maximum liability shall not exceed the amount paid for your vehicle.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">7. Changes to Terms</h2>
                        <p>We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to this website.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">8. Governing Law</h2>
                        <p>These Terms are governed by the laws of the Province of Alberta, Canada. Any disputes shall be resolved in the courts of Alberta.</p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4">9. Contact Us</h2>
                        <p>For questions about these Terms of Service, please contact us:</p>
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

export default Terms;
