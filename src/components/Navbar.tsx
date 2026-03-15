'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Team', href: '#team' },
    { label: 'Events', href: '#events' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 100);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const sections = navItems.map(item =>
            document.querySelector(item.href)
        );

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = sections.findIndex(s => s === entry.target);
                        if (idx !== -1) setActiveIndex(idx);
                    }
                });
            },
            { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
        );

        sections.forEach(section => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <AnimatePresence>
            {scrolled && (
                <motion.nav
                    className="fixed top-0 left-0 right-0 z-50"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                >
                    <div
                        className="px-8 py-3 md:px-12 flex items-center justify-between relative"
                        style={{
                            background: 'rgba(19, 19, 19, 0.9)',
                            backdropFilter: 'blur(20px)',
                            borderBottom: '1px solid rgba(245, 245, 245, 0.05)',
                        }}
                    >
                        {/* Brand Logo */}
                        <a
                            href="#home"
                            className="cursor-target relative z-10"
                        >
                            <img
                                src="/faps-logo.png"
                                alt="FAPS"
                                className="w-7 h-7 object-contain"
                                style={{ filter: 'invert(1) brightness(2)' }}
                            />
                        </a>

                        {/* Desktop nav links — absolutely centered */}
                        <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                            {navItems.map((item, i) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={() => setActiveIndex(i)}
                                    className={`cursor-target letter-spaced transition-colors duration-300 ${i === activeIndex
                                        ? 'text-[#F5F5F5]'
                                        : 'text-[#F5F5F5]/40 hover:text-[#F5F5F5]/70'
                                        }`}
                                    style={{ fontSize: '0.65rem' }}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </div>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="cursor-target md:hidden flex flex-col gap-1.5 items-end"
                            aria-label="Menu"
                        >
                            <motion.span
                                className="block h-px bg-[#F5F5F5]/70"
                                animate={{ width: mobileOpen ? 20 : 24 }}
                            />
                            <motion.span
                                className="block h-px bg-[#F5F5F5]/70"
                                animate={{ width: mobileOpen ? 24 : 16 }}
                            />
                        </button>

                        {/* Empty spacer for desktop to keep logo left-aligned */}
                        <div className="hidden md:block w-7" />
                    </div>

                    {/* Mobile menu */}
                    <AnimatePresence>
                        {mobileOpen && (
                            <motion.div
                                className="md:hidden px-8 pb-6"
                                style={{
                                    background: 'rgba(19, 19, 19, 0.95)',
                                    backdropFilter: 'blur(20px)',
                                }}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="flex flex-col gap-4 pt-4">
                                    {navItems.map((item, i) => (
                                        <a
                                            key={item.label}
                                            href={item.href}
                                            onClick={() => {
                                                setActiveIndex(i);
                                                setMobileOpen(false);
                                            }}
                                            className={`cursor-target letter-spaced transition-colors ${i === activeIndex
                                                ? 'text-[#F5F5F5]'
                                                : 'text-[#F5F5F5]/40'
                                                }`}
                                        >
                                            {item.label}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}
