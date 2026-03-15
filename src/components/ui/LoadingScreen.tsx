'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';

/* ─── Easing curves ─── */
const easeOutExpo = [0.16, 1, 0.3, 1] as const;
const easeInOutQuart = [0.76, 0, 0.24, 1] as const;

export default function LoadingScreen() {
    const [phase, setPhase] = useState<'loading' | 'reveal' | 'done'>(() => {
        if (typeof window !== 'undefined' && sessionStorage.getItem('faps-loader-shown')) {
            return 'done';
        }
        return 'loading';
    });
    const progress = useMotionValue(0);
    const progressPercent = useTransform(progress, [0, 1], [0, 100]);
    const [displayCount, setDisplayCount] = useState(0);

    // Animate progress 0 → 1
    useEffect(() => {
        if (phase === 'done') return;

        const controls = animate(progress, 1, {
            duration: 2.0,
            ease: [0.25, 0.1, 0.25, 1],
        });

        const unsubscribe = progressPercent.on('change', (v) => {
            setDisplayCount(Math.round(v));
        });

        return () => {
            controls.stop();
            unsubscribe();
        };
    }, [progress, progressPercent, phase]);

    // Phase transitions
    useEffect(() => {
        if (phase === 'done') return;

        const revealTimer = setTimeout(() => setPhase('reveal'), 2400);
        const doneTimer = setTimeout(() => {
            setPhase('done');
            sessionStorage.setItem('faps-loader-shown', 'true');
        }, 3400);
        return () => {
            clearTimeout(revealTimer);
            clearTimeout(doneTimer);
        };
    }, [phase]);

    const progressWidth = useTransform(progress, [0, 1], ['0%', '100%']);

    if (phase === 'done') return null;

    return (
        <AnimatePresence mode="wait">
            <>
                {/* ─── Top curtain ─── */}
                <motion.div
                    className="fixed inset-0 z-[9999]"
                    style={{ background: '#0a0a0a' }}
                    initial={false}
                    animate={phase === 'reveal' ? { y: '-100%' } : { y: '0%' }}
                    transition={
                        phase === 'reveal'
                            ? { duration: 0.9, ease: easeInOutQuart, delay: 0.1 }
                            : undefined
                    }
                >
                    <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden">

                        {/* Ambient glow behind logo */}
                        <motion.div
                            className="absolute w-[200px] h-[200px] rounded-full"
                            style={{
                                background: 'radial-gradient(circle, rgba(245,245,245,0.06) 0%, transparent 70%)',
                            }}
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: [0, 2.5, 2], opacity: [0, 0.8, 0.4] }}
                            transition={{ duration: 2, ease: 'easeOut', delay: 0.2 }}
                        />

                        {/* Logo */}
                        <motion.div
                            className="relative z-10"
                            initial={{ scale: 0.5, opacity: 0, filter: 'blur(20px)' }}
                            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                            transition={{ duration: 1, ease: easeOutExpo, delay: 0.1 }}
                        >
                            <motion.img
                                src="/faps-logo.png"
                                alt="FAPS"
                                className="w-16 h-16 md:w-20 md:h-20 object-contain"
                                style={{ filter: 'invert(1) brightness(2)' }}
                                animate={{
                                    scale: [1, 1.05, 1],
                                }}
                                transition={{
                                    duration: 2,
                                    ease: 'easeInOut',
                                    repeat: Infinity,
                                    repeatType: 'reverse',
                                }}
                            />
                        </motion.div>

                        {/* Society name — staggered letter reveal */}
                        <motion.div
                            className="mt-8 flex items-baseline gap-[2px] overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.3 }}
                        >
                            {'FINE ARTS & PHOTOGRAPHY SOCIETY'.split('').map((char, i) => (
                                <motion.span
                                    key={i}
                                    className="text-[#F5F5F5]/70 text-[0.55rem] md:text-[0.65rem] tracking-[0.4em] font-light"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{
                                        delay: 0.7 + i * 0.02,
                                        duration: 0.4,
                                        ease: easeOutExpo,
                                    }}
                                >
                                    {char === ' ' ? '\u00A0' : char}
                                </motion.span>
                            ))}
                        </motion.div>

                        {/* ─── Bottom section: progress ─── */}
                        <div className="absolute bottom-12 left-0 right-0 px-12 md:px-24">
                            {/* Progress line — full width */}
                            <div className="w-full h-px bg-[#F5F5F5]/[0.06] relative overflow-hidden">
                                <motion.div
                                    className="absolute inset-y-0 left-0 bg-[#F5F5F5]/30"
                                    style={{ width: progressWidth }}
                                />
                                {/* Glowing head of progress line */}
                                <motion.div
                                    className="absolute inset-y-0 w-8"
                                    style={{
                                        left: progressWidth,
                                        background: 'linear-gradient(90deg, rgba(245,245,245,0.4), transparent)',
                                        filter: 'blur(4px)',
                                    }}
                                />
                            </div>

                            {/* Counter row */}
                            <div className="flex items-center justify-between mt-4">
                                <motion.span
                                    className="text-[#F5F5F5]/20 text-[0.6rem] tracking-[0.3em] font-light"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.4 }}
                                >
                                    LOADING
                                </motion.span>
                                <motion.span
                                    className="text-[#F5F5F5]/40 text-xs tracking-[0.5em] font-light tabular-nums"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5, duration: 0.4 }}
                                >
                                    {String(displayCount).padStart(3, '0')}
                                </motion.span>
                            </div>
                        </div>

                        {/* Corner accents */}
                        <motion.div
                            className="absolute top-8 left-8 w-6 h-6 border-l border-t border-[#F5F5F5]/[0.08]"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4, duration: 0.6, ease: easeOutExpo }}
                        />
                        <motion.div
                            className="absolute top-8 right-8 w-6 h-6 border-r border-t border-[#F5F5F5]/[0.08]"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.6, ease: easeOutExpo }}
                        />
                        <motion.div
                            className="absolute bottom-8 left-8 w-6 h-6 border-l border-b border-[#F5F5F5]/[0.08]"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6, duration: 0.6, ease: easeOutExpo }}
                        />
                        <motion.div
                            className="absolute bottom-8 right-8 w-6 h-6 border-r border-b border-[#F5F5F5]/[0.08]"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.7, duration: 0.6, ease: easeOutExpo }}
                        />
                    </div>
                </motion.div>

                {/* ─── Bottom curtain (splits apart) ─── */}
                <motion.div
                    className="fixed bottom-0 left-0 right-0 z-[9998] h-[6px]"
                    style={{ background: '#F5F5F5' }}
                    initial={{ scaleX: 0 }}
                    animate={
                        phase === 'reveal'
                            ? { scaleX: [1, 1], opacity: [1, 0], y: 10 }
                            : { scaleX: 1 }
                    }
                    transition={
                        phase === 'reveal'
                            ? { duration: 0.6, ease: easeInOutQuart, delay: 0.05 }
                            : { duration: 1.8, ease: easeOutExpo, delay: 0.8 }
                    }
                />
            </>
        </AnimatePresence>
    );
}
