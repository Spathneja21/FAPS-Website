'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import './PillNav.css';

interface NavItem {
    label: string;
    href: string;
}

interface PillNavProps {
    items: NavItem[];
    baseColor?: string;
    pillColor?: string;
    pillTextColor?: string;
    hoverTextColor?: string;
    activeIndex?: number;
    onItemClick?: (index: number) => void;
}

export default function PillNav({
    items,
    baseColor = '#000',
    pillColor = '#fff',
    pillTextColor = '#000',
    hoverTextColor = '#fff',
    activeIndex = 0,
    onItemClick,
}: PillNavProps) {
    const listRef = useRef<HTMLUListElement>(null);
    const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleEnter = useCallback((i: number) => {
        const circle = circleRefs.current[i];
        if (!circle) return;
        gsap.killTweensOf(circle);
        gsap.set(circle, {
            width: 0,
            height: 0,
            x: '-50%',
            y: '100%',
            opacity: 1,
        });
        gsap.to(circle, {
            width: '300%',
            height: '300%',
            duration: 0.4,
            ease: 'power2.out',
        });
    }, []);

    const handleLeave = useCallback((i: number) => {
        const circle = circleRefs.current[i];
        if (!circle) return;
        gsap.killTweensOf(circle);
        gsap.to(circle, {
            width: 0,
            height: 0,
            opacity: 0,
            duration: 0.3,
            ease: 'power2.in',
        });
    }, []);

    const handleClick = (index: number, href: string) => {
        if (onItemClick) onItemClick(index);
        const el = document.querySelector(href);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMobileMenuOpen(false);
    };

    // Close mobile menu on escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setIsMobileMenuOpen(false);
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, []);

    return (
        <div
            className="pill-nav-container"
            style={{
                '--base': baseColor,
                '--pill-bg': pillColor,
                '--pill-text': pillTextColor,
                '--hover-text': hoverTextColor,
            } as React.CSSProperties}
        >
            <nav className="pill-nav">
                {/* Desktop Navigation */}
                <div className="pill-nav-items desktop-only">
                    <ul ref={listRef} className="pill-list">
                        {items.map((item, i) => (
                            <li key={i}>
                                <button
                                    className={`pill cursor-target ${i === activeIndex ? 'is-active' : ''}`}
                                    onMouseEnter={() => handleEnter(i)}
                                    onMouseLeave={() => handleLeave(i)}
                                    onClick={() => handleClick(i, item.href)}
                                >
                                    <div
                                        ref={el => { circleRefs.current[i] = el; }}
                                        className="hover-circle"
                                    />
                                    <span className="label-stack">
                                        <span className="pill-label">{item.label}</span>
                                        <span className="pill-label-hover">{item.label}</span>
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Mobile hamburger */}
                <button
                    className="mobile-menu-button"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span
                        className="hamburger-line"
                        style={{
                            transform: isMobileMenuOpen
                                ? 'translateY(3px) rotate(45deg)'
                                : 'none',
                        }}
                    />
                    <span
                        className="hamburger-line"
                        style={{
                            opacity: isMobileMenuOpen ? 0 : 1,
                        }}
                    />
                    <span
                        className="hamburger-line"
                        style={{
                            transform: isMobileMenuOpen
                                ? 'translateY(-3px) rotate(-45deg)'
                                : 'none',
                        }}
                    />
                </button>
            </nav>

            {/* Mobile menu popover */}
            <div
                className="mobile-menu-popover"
                style={{
                    opacity: isMobileMenuOpen ? 1 : 0,
                    visibility: isMobileMenuOpen ? 'visible' : 'hidden',
                    transform: isMobileMenuOpen ? 'scaleY(1)' : 'scaleY(0.9)',
                    transition: 'all 0.25s ease',
                }}
            >
                <ul className="mobile-menu-list">
                    {items.map((item, i) => (
                        <li key={i}>
                            <button
                                className="mobile-menu-link"
                                onClick={() => handleClick(i, item.href)}
                            >
                                {item.label}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
