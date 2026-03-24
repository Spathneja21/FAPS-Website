'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Events', href: '#events' },
    { label: 'Team', href: '#team' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Contact', href: '#contact' },
];


export default function Navbar() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

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

    const scrollToSection = (e: React.MouseEvent, href: string, index: number) => {
        e.preventDefault();
        const targetId = href.replace('#', '');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
            setActiveIndex(index);
            setMenuOpen(false);
        } else {
            // Navigate back to home section if on a different page
            window.location.href = `/${href}`;
        }
    };

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <motion.nav
            className="fixed top-0 left-0 right-0 z-[100] px-4 md:px-8 pt-4 md:pt-6 pointer-events-none"
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div
                className={`max-w-none w-full mx-auto px-6 py-3 md:px-10 flex items-center justify-between transition-all duration-500 pointer-events-auto rounded-full ${scrolled && !menuOpen ? 'bg-[#131313]/80 backdrop-blur-xl border border-white/5 shadow-2xl' : ''}`}
            >
                {/* Left side - Label (Hidden on mobile) */}
                <div className="flex-1 hidden md:flex items-center">
                    <span className="letter-spaced text-[9px]" style={{ color: '#F5E6D3', opacity: 1 }}>
                        Nexus of Creators
                    </span>
                </div>
                {/* Mobile spacer to balance the right menu button */}
                <div className="flex md:hidden flex-1" />

                {/* Brand Logo - Centered in flow */}
                <div className="flex-[2] flex justify-center">
                    <a
                        href="/#home"
                        onClick={(e) => scrollToSection(e, '#home', 0)}
                        className="cursor-target block transition-transform hover:scale-105 active:scale-95"
                    >
                        <motion.img
                            src="/faps-logo.png"
                            alt="FAPS"
                            className="w-10 h-10 md:w-14 md:h-14 object-contain "
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                            style={{ filter: 'brightness(1.5) sepia(1)' }}
                        />
                    </a>
                </div>

                {/* Right side Menu Button */}
                <div className="flex-1 flex justify-end">
                    <button
                        onClick={toggleMenu}
                        className="cursor-target relative z-[110] group flex items-center gap-4"
                    >
                        <span className="hidden md:block letter-spaced text-[10px] group-hover:text-white transition-colors" style={{ color: '#F5E6D3', opacity: 1 }}>
                            {menuOpen ? 'CLOSE' : 'MENU'}
                        </span>
                        <div className="flex flex-col gap-1 items-end">
                            <motion.span
                                className="block h-[1px]"
                                style={{ background: '#F5E6D3' }}
                                animate={{ width: menuOpen ? 20 : 16, rotate: menuOpen ? 45 : 0, y: menuOpen ? 4 : 0 }}
                            />
                            <motion.span
                                className="block h-[1px]"
                                style={{ background: '#F5E6D3' }}
                                animate={{ width: menuOpen ? 20 : 24, rotate: menuOpen ? -45 : 0, y: menuOpen ? -4 : 0 }}
                            />
                        </div>
                    </button>
                </div>
            </div>

            {/* Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <motion.div
                        className="fixed inset-0 z-[55] flex flex-col justify-center items-center h-screen w-full backdrop-blur-3xl pointer-events-auto"
                        style={{ background: 'rgba(13, 5, 0, 0.98)' }}
                        initial={{ opacity: 0, clipPath: 'circle(0% at 90% 10%)' }}
                        animate={{ opacity: 1, clipPath: 'circle(150% at 90% 10%)' }}
                        exit={{ opacity: 0, clipPath: 'circle(0% at 90% 10%)' }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    >
                        {/* Background Haze Overlay in Menu */}
                        <div className="absolute inset-0 fog-layer opacity-40" />

                        <div className="flex flex-col gap-8 text-center relative z-10">
                            {navItems.map((item, i) => (
                                <motion.a
                                    key={item.label}
                                    href={`/${item.href}`}
                                    onClick={(e) => scrollToSection(e, item.href, i)}
                                    className="cursor-target"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                                >
                                    <span className={`font-display text-4xl md:text-8xl font-black transition-all tracking-tighter ${i === activeIndex ? 'text-[#F5E6D3]' : 'text-[#A0785A]/30 hover:text-[#C45200]'}`}>
                                        {item.label}
                                    </span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
