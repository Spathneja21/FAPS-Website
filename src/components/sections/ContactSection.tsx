'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Linkedin, Youtube, Mail } from 'lucide-react';
import VariableProximity from '../reactbits/VariableProximity';
import Dock from '../reactbits/Dock';

const dockItems = [
    {
        icon: <Instagram size={24} color="#fff" />,
        label: 'Instagram',
        href: 'https://www.instagram.com/faps_tiet/',
    },
    {
        icon: <Mail size={24} color="#fff" />,
        label: 'Email',
        href: 'mailto:faps@college.edu',
    },
];

export default function ContactSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
        setFormState({ name: '', email: '', message: '' });
    };

    return (
        <section id="contact" className="relative py-32 px-6 bg-[#131313]" ref={containerRef}>
            <div className="max-w-5xl mx-auto">
                {/* Section heading */}
                <div className="mb-12 md:mb-20 border-b border-white/10 pb-6 md:pb-8">
                    <motion.p
                        className="text-white/30 text-[10px] md:text-xs tracking-[0.4em] uppercase mb-3 md:mb-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Get In Touch
                    </motion.p>
                    <h2 className="text-4xl md:text-7xl font-display font-black text-white leading-none">
                        <VariableProximity
                            label="Let's Connect"
                            fromFontVariationSettings="'wght' 900, 'wdth' 100"
                            toFontVariationSettings="'wght' 100, 'wdth' 150"
                            containerRef={containerRef}
                            radius={150}
                            falloff="gaussian"
                            className="text-white"
                            style={{ fontFamily: "'Manrope', sans-serif" }}
                        />
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
                    {/* Left: info + dock */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                    >
                        <p className="text-white/40 text-base md:text-lg leading-relaxed mb-6 md:mb-8 font-light">
                            Reach out anytime — whether you want to collaborate, join the society,
                            or just say hello. We&apos;d love to hear from you.
                        </p>

                        {/* Dock for social links */}
                        <div className="flex justify-start -ml-2">
                            <Dock
                                items={dockItems}
                                baseItemSize={38}
                                magnification={55}
                                distance={120}
                                panelHeight={48}
                            />
                        </div>
                    </motion.div>

                    {/* Right: form */}
                    <motion.form
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                        className="space-y-6"
                    >
                        <div>
                            <label className="text-white/20 text-[10px] tracking-[0.3em] uppercase block mb-2">
                                Name *
                            </label>
                            <input
                                type="text"
                                value={formState.name}
                                onChange={e => setFormState({ ...formState, name: e.target.value })}
                                required
                                className="cursor-target w-full bg-transparent border-b border-white/10 py-3 text-white text-sm outline-none focus:border-white/40 transition-colors placeholder-white/10"
                                placeholder="Your name"
                            />
                        </div>

                        <div>
                            <label className="text-white/20 text-[10px] tracking-[0.3em] uppercase block mb-2">
                                E-mail *
                            </label>
                            <input
                                type="email"
                                value={formState.email}
                                onChange={e => setFormState({ ...formState, email: e.target.value })}
                                required
                                className="cursor-target w-full bg-transparent border-b border-white/10 py-3 text-white text-sm outline-none focus:border-white/40 transition-colors placeholder-white/10"
                                placeholder="your@email.com"
                            />
                        </div>

                        <div>
                            <label className="text-white/20 text-[10px] tracking-[0.3em] uppercase block mb-2">
                                Message
                            </label>
                            <textarea
                                value={formState.message}
                                onChange={e => setFormState({ ...formState, message: e.target.value })}
                                rows={4}
                                className="cursor-target w-full bg-transparent border-b border-white/10 py-3 text-white text-sm outline-none focus:border-white/40 transition-colors resize-none placeholder-white/10"
                                placeholder="Tell us about your interest..."
                            />
                        </div>

                        <button
                            type="submit"
                            className="cursor-target group flex items-center gap-3 bg-white text-black px-8 py-3 rounded-full text-sm font-semibold uppercase tracking-[0.1em] hover:bg-white/90 transition-colors"
                        >
                            <span>{submitted ? 'Sent!' : 'Get in touch'}</span>
                            <svg
                                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
