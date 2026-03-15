'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/* ─── Footer statement with mixed fonts ─── */
const statementLine1 = [
    { text: 'WHERE ', type: 'serif' as const },
    { text: 'A', type: 'script' as const },
    { text: 'RT', type: 'serif' as const },
];

const statementLine2 = [
    { text: 'MEETS THE ', type: 'serif' as const },
    { text: 'L', type: 'script' as const },
    { text: 'ENS', type: 'serif' as const },
];

const statementLine3 = [
    { text: 'SIN', type: 'serif' as const },
    { text: 'C', type: 'script' as const },
    { text: 'E  2024', type: 'serif' as const },
];

const socialLinks = [
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'YouTube', href: 'https://youtube.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
];

export default function Footer() {
    const footerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ['start end', 'end end'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
    const y = useTransform(scrollYProgress, [0, 0.5], [60, 0]);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderStatement = (
        segments: Array<{ text: string; type: 'serif' | 'script' }>
    ) => {
        return segments.map((segment, i) => {
            if (segment.type === 'script') {
                return (
                    <span
                        key={i}
                        className="font-script inline-block"
                        style={{
                            fontSize: '1.15em',
                            lineHeight: 0.85,
                            verticalAlign: 'baseline',
                            position: 'relative',
                            top: '0.04em',
                        }}
                    >
                        {segment.text}
                    </span>
                );
            }
            return (
                <span key={i} className="inline-block">
                    {segment.text}
                </span>
            );
        });
    };

    return (
        <footer
            ref={footerRef}
            className="relative min-h-screen flex flex-col justify-between overflow-hidden"
            style={{ background: '#131313' }}
        >
            {/* Subtle grain overlay */}
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.5'/%3E%3C/svg%3E")`,
                }}
            />

            {/* ─── Top nav ─── */}
            <div className="relative z-10 flex items-center justify-between px-8 pt-8 md:px-12 md:pt-10">
                <a
                    href="#home"
                    className="cursor-target letter-spaced text-[#F5F5F5]/40 hover:text-[#F5F5F5] transition-colors"
                >
                    FAPS
                </a>
                <button
                    onClick={scrollToTop}
                    className="cursor-target letter-spaced text-[#F5F5F5]/40 hover:text-[#F5F5F5] transition-colors"
                >
                    Back to Top ↑
                </button>
            </div>

            {/* ─── Large statement ─── */}
            <motion.div
                className="relative z-10 flex-1 flex items-center justify-center px-6"
                style={{ opacity, y }}
            >
                <div className="text-center">
                    <div
                        className="font-display text-[#F5F5F5]"
                        style={{
                            fontSize: 'clamp(2rem, 8vw, 7rem)',
                            lineHeight: 0.9,
                            fontStyle: 'italic',
                        }}
                    >
                        {renderStatement(statementLine1)}
                    </div>
                    <div
                        className="font-display text-[#F5F5F5]"
                        style={{
                            fontSize: 'clamp(2rem, 8vw, 7rem)',
                            lineHeight: 0.9,
                            fontStyle: 'italic',
                            marginTop: '0.08em',
                        }}
                    >
                        {renderStatement(statementLine2)}
                    </div>
                    <div
                        className="font-display text-[#F5F5F5]"
                        style={{
                            fontSize: 'clamp(2rem, 8vw, 7rem)',
                            lineHeight: 0.9,
                            fontStyle: 'italic',
                            marginTop: '0.08em',
                        }}
                    >
                        {renderStatement(statementLine3)}
                    </div>
                </div>
            </motion.div>

            {/* ─── Bottom bar ─── */}
            <div className="relative z-10 px-8 pb-8 md:px-12 md:pb-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Social links */}
                    <div className="flex items-center gap-8">
                        {socialLinks.map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="cursor-target letter-spaced text-[#F5F5F5]/30 hover:text-[#F5F5F5]/60 transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    {/* Credits */}
                    <div className="flex items-center gap-6 text-[#F5F5F5]/20 text-xs">
                        <span>© {new Date().getFullYear()} FAPS</span>
                        <span>·</span>
                        <span>Fine Arts And Photography Society</span>
                    </div>

                    {/* Email */}
                    <a
                        href="mailto:faps@example.com"
                        className="cursor-target letter-spaced text-[#F5F5F5]/30 hover:text-[#F5F5F5]/60 transition-colors"
                    >
                        Email
                    </a>
                </div>
            </div>
        </footer>
    );
}
