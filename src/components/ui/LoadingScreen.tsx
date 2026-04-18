'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';

/* ─── Design System Tokens ─── */
const CREAM_BG = '#F3ECE7';
const DARK_BROWN = '#38312E';
const TAGLINE_COLOR = '#39322F';

/* ─── Easing curves from design-system.json ─── */
const CINEMATIC: [number, number, number, number] = [0.76, 0, 0.24, 1];
const REVEAL: [number, number, number, number] = [0.33, 1, 0.68, 1];

/* ─── Timing (ms) — absolute from mount ─── */
const SPLIT_DELAY = 300;
const IMAGE_DELAY = 400;
const COUNTER_START = 500;
const COUNTER_DURATION = 1000;
const BRACKET_TIME = 1500;
const EXIT_TIME = 2500;
const DONE_TIME = 3500;

export default function LoadingScreen() {
    /* Skip entirely if already shown this session */
    const [shouldRender] = useState(() => {
        if (typeof window !== 'undefined' && sessionStorage.getItem('faps-loader-shown')) {
            return false;
        }
        return true;
    });

    const [showBrackets, setShowBrackets] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [isDone, setIsDone] = useState(false);
    const [displayCount, setDisplayCount] = useState(0);

    const progress = useMotionValue(0);
    const progressDisplay = useTransform(progress, [0, 1], [0, 100]);

    /* ─── All timers fire once on mount at absolute offsets ─── */
    useEffect(() => {
        if (!shouldRender) return;

        // Start counter at COUNTER_START ms
        const counterTimer = setTimeout(() => {
            const controls = animate(progress, 1, {
                duration: COUNTER_DURATION / 1000,
                ease: 'linear',
            });
            return () => controls.stop();
        }, COUNTER_START);

        // Show brackets
        const bracketTimer = setTimeout(() => setShowBrackets(true), BRACKET_TIME);

        // Begin exit fade
        const exitTimer = setTimeout(() => setIsExiting(true), EXIT_TIME);

        // Remove from DOM
        const doneTimer = setTimeout(() => {
            setIsDone(true);
            sessionStorage.setItem('faps-loader-shown', 'true');
        }, DONE_TIME);

        return () => {
            clearTimeout(counterTimer);
            clearTimeout(bracketTimer);
            clearTimeout(exitTimer);
            clearTimeout(doneTimer);
        };
    }, [shouldRender, progress]);

    /* Subscribe to counter display updates */
    useEffect(() => {
        if (!shouldRender) return;
        const unsub = progressDisplay.on('change', (v) => {
            setDisplayCount(Math.round(v));
        });
        return unsub;
    }, [shouldRender, progressDisplay]);

    if (!shouldRender || isDone) return null;

    const counterStr = String(displayCount).padStart(3, '0');
    const bracketLen = 'clamp(60px, 6vw, 100px)';

    return (
        <AnimatePresence>
            <motion.div
                key="preloader"
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    background: CREAM_BG,
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 0,
                    userSelect: 'none',
                    cursor: 'default',
                }}
                animate={
                    isExiting
                        ? { opacity: 0, scale: 1.02 }
                        : { opacity: 1, scale: 1 }
                }
                transition={
                    isExiting
                        ? { duration: 0.8, ease: CINEMATIC }
                        : undefined
                }
            >
                {/* ─── Logo — top center, static ─── */}
                <div
                    style={{
                        position: 'absolute',
                        top: 'clamp(24px, 3vh, 40px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                    }}
                >
                    <img
                        src="/faps-logo.png"
                        alt="FAPS"
                        style={{
                            width: 'clamp(32px, 4vw, 56px)',
                            height: 'auto',
                            objectFit: 'contain',
                            display: 'block',
                        }}
                    />
                </div>

                {/* ─── Center content: brand split + image + counters ─── */}
                <div
                    style={{
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100vw',
                        height: '100vh',
                    }}
                >
                    {/* Left half of brand name: "FA" */}
                    <motion.span
                        style={{
                            position: 'absolute',
                            color: DARK_BROWN,
                            fontSize: '15vw',
                            fontWeight: 800,
                            fontFamily: "'Inter', 'Aktiv Grotesk', system-ui, sans-serif",
                            textTransform: 'uppercase' as const,
                            letterSpacing: '-0.01em',
                            lineHeight: 1,
                            zIndex: 2,
                            right: '50%',
                            whiteSpace: 'nowrap',
                        }}
                        initial={{ x: 0 }}
                        animate={{ x: '-42vw' }}
                        transition={{
                            duration: 1.2,
                            ease: CINEMATIC,
                            delay: SPLIT_DELAY / 1000,
                        }}
                    >
                        FA
                    </motion.span>

                    {/* Right half of brand name: "PS" */}
                    <motion.span
                        style={{
                            position: 'absolute',
                            color: DARK_BROWN,
                            fontSize: '15vw',
                            fontWeight: 800,
                            fontFamily: "'Inter', 'Aktiv Grotesk', system-ui, sans-serif",
                            textTransform: 'uppercase' as const,
                            letterSpacing: '-0.01em',
                            lineHeight: 1,
                            zIndex: 2,
                            left: '50%',
                            whiteSpace: 'nowrap',
                        }}
                        initial={{ x: 0 }}
                        animate={{ x: '42vw' }}
                        transition={{
                            duration: 1.2,
                            ease: CINEMATIC,
                            delay: SPLIT_DELAY / 1000,
                        }}
                    >
                        PS
                    </motion.span>

                    {/* Product image — center, scales up */}
                    <motion.img
                        src="/preloader-hero.jpg"
                        alt="FAPS"
                        style={{
                            position: 'absolute',
                            width: 'clamp(240px, 30vw, 420px)',
                            aspectRatio: '4/3',
                            objectFit: 'cover',
                            zIndex: 1,
                            borderRadius: 0,
                        }}
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                            duration: 1.4,
                            ease: REVEAL,
                            delay: IMAGE_DELAY / 1000,
                        }}
                    />

                    {/* Left counter */}
                    <motion.span
                        style={{
                            position: 'absolute',
                            left: 'calc(50% - clamp(240px, 30vw, 420px) / 2 - clamp(40px, 4vw, 64px))',
                            color: DARK_BROWN,
                            fontSize: 'clamp(10px, 0.65vw, 12px)',
                            fontWeight: 300,
                            fontFamily: "'Inter', system-ui, sans-serif",
                            letterSpacing: '0.02em',
                            zIndex: 3,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: COUNTER_START / 1000, duration: 0.3 }}
                    >
                        {counterStr}
                    </motion.span>

                    {/* Right counter */}
                    <motion.span
                        style={{
                            position: 'absolute',
                            right: 'calc(50% - clamp(240px, 30vw, 420px) / 2 - clamp(40px, 4vw, 64px))',
                            color: DARK_BROWN,
                            fontSize: 'clamp(10px, 0.65vw, 12px)',
                            fontWeight: 300,
                            fontFamily: "'Inter', system-ui, sans-serif",
                            letterSpacing: '0.02em',
                            zIndex: 3,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: COUNTER_START / 1000, duration: 0.3 }}
                    >
                        {counterStr}
                    </motion.span>

                    {/* ─── Corner brackets ─── */}
                    {/* Top-left */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: 'calc(50% - clamp(240px, 30vw, 420px) * 3 / 8 - 24px)',
                            left: 'calc(50% - clamp(240px, 30vw, 420px) / 2 - 24px)',
                            width: bracketLen,
                            height: bracketLen,
                            borderTop: `1px solid ${DARK_BROWN}`,
                            borderLeft: `1px solid ${DARK_BROWN}`,
                            zIndex: 4,
                        }}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={showBrackets ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                    {/* Top-right */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            top: 'calc(50% - clamp(240px, 30vw, 420px) * 3 / 8 - 24px)',
                            right: 'calc(50% - clamp(240px, 30vw, 420px) / 2 - 24px)',
                            width: bracketLen,
                            height: bracketLen,
                            borderTop: `1px solid ${DARK_BROWN}`,
                            borderRight: `1px solid ${DARK_BROWN}`,
                            zIndex: 4,
                        }}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={showBrackets ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                    {/* Bottom-left */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            bottom: 'calc(50% - clamp(240px, 30vw, 420px) * 3 / 8 - 24px)',
                            left: 'calc(50% - clamp(240px, 30vw, 420px) / 2 - 24px)',
                            width: bracketLen,
                            height: bracketLen,
                            borderBottom: `1px solid ${DARK_BROWN}`,
                            borderLeft: `1px solid ${DARK_BROWN}`,
                            zIndex: 4,
                        }}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={showBrackets ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                    {/* Bottom-right */}
                    <motion.div
                        style={{
                            position: 'absolute',
                            bottom: 'calc(50% - clamp(240px, 30vw, 420px) * 3 / 8 - 24px)',
                            right: 'calc(50% - clamp(240px, 30vw, 420px) / 2 - 24px)',
                            width: bracketLen,
                            height: bracketLen,
                            borderBottom: `1px solid ${DARK_BROWN}`,
                            borderRight: `1px solid ${DARK_BROWN}`,
                            zIndex: 4,
                        }}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={showBrackets ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.05 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                </div>

                {/* ─── Tagline — bottom center, static ─── */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: 'clamp(20px, 2.5vh, 32px)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: TAGLINE_COLOR,
                        fontSize: 'clamp(9px, 0.6vw, 11px)',
                        fontWeight: 300,
                        fontFamily: "'Inter', system-ui, sans-serif",
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                    }}
                >
                    Fine Arts And Photography Society
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
