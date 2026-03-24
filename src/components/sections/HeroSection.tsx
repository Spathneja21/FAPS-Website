

import { motion, useScroll, useTransform, useSpring, type MotionStyle } from 'framer-motion';
const Image = (props: any) => <img {...props} />;
import { useRef } from 'react';

/* ─── Animation variants ─── */

const clipReveal = {
    hidden: { y: '100%', opacity: 0 },
    visible: (delay: number) => ({
        y: '0%',
        opacity: 1,
        transition: {
            delay,
            duration: 1.2,
            ease: [0.76, 0, 0.24, 1] as const,
        },
    }),
};

const fadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: (delay: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay,
            duration: 1.0,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
        },
    }),
};

/* ─── Data ─── */

/* ─── Clip-path Line Reveal ─── */
function RevealLine({
    children,
    delay = 0,
    className = '',
    style = {},
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
    style?: MotionStyle;
}) {
    return (
        <motion.div className={`overflow-hidden will-change-transform ${className}`} style={style}>
            <motion.div
                custom={delay}
                variants={clipReveal}
                initial="hidden"
                animate="visible"
                className="will-change-transform"
            >
                {children}
            </motion.div>
        </motion.div>
    );
}

export default function HeroSection() {
    const heroRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });

    // Parallax offsets — useSpring for smooth physics
    const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };

    const rawY1 = useTransform(scrollYProgress, [0, 1], [0, 150]);
    const rawY2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
    const rawY3 = useTransform(scrollYProgress, [0, 1], [0, 250]);
    const rawOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    const yText1 = useSpring(rawY1, springConfig);
    const yText2 = useSpring(rawY2, springConfig);
    const yText3 = useSpring(rawY3, springConfig);
    const opacityHero = useSpring(rawOpacity, springConfig);

    return (
        <section
            ref={heroRef}
            id="home"
            className="relative flex min-h-screen flex-col justify-between overflow-hidden"
            style={{ background: '#131313' }}
        >
            {/* ─── Title (fades on scroll) ─── */}
            <motion.div
                className="relative z-10 flex items-center justify-center w-full px-6 md:px-12 py-24 md:py-32"
                style={{ opacity: opacityHero }}
            >
                <div className="max-w-screen-xl mx-auto text-center">
                    <h1 className="font-manrope font-semibold tracking-tight leading-[0.55] text-white"
                        style={{ fontSize: 'clamp(2rem, 10vw, 6rem)' }}>
                        {/* Line 1: FINE ARTS AND */}
                        <RevealLine delay={2.4} style={{ y: yText1 }} className="whitespace-nowrap">
                            <span className="block text-white animate-blurIn">
                                FINE <span
                                    className="inline-block drop-shadow-xl font-luxurious font-light align-baseline mr-1 md:mr-4"
                                    style={{ animationDelay: '120ms', lineHeight: 1, fontSize: 'clamp(3rem, 16vw, 10rem)' }}
                                >A</span>RTS AND
                            </span>
                        </RevealLine>

                        {/* Line 2: PHOTOGRAPHY */}
                        <RevealLine delay={2.6} style={{ y: yText2 }} className="whitespace-nowrap -mt-2 md:-mt-8">
                            <span className="block">
                                <span className="inline-block text-white drop-shadow-xl font-luxurious font-light align-baseline"
                                    style={{ lineHeight: 1, fontSize: 'clamp(3rem, 16vw, 10rem)' }}>P</span> HOTOGRAPHY
                            </span>
                        </RevealLine>

                        {/* Line 3: SOCIETY */}
                        <RevealLine delay={2.8} style={{ y: yText3 }} className="whitespace-nowrap -mt-2 md:-mt-6">
                            <span className="block">
                                SOCIET<span className="inline-block text-white drop-shadow-xl font-luxurious font-light align-middle"
                                    style={{ lineHeight: 1, fontSize: 'clamp(3rem, 16vw, 10rem)' }}>Y</span>
                            </span>
                        </RevealLine>
                    </h1>
                </div>
            </motion.div>

            {/* ─── Info Sections (never fades — outside the opacity wrapper) ─── */}
            <div className="relative z-10 w-full px-6 md:px-12 pb-32">
                <div className="max-w-6xl mx-auto flex flex-col gap-16 md:gap-24 text-left">

                    {/* ── Vision — full width ── */}
                    <motion.div
                        className="flex flex-col gap-5"
                        variants={fadeIn}
                        custom={1}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.1 }}
                    >
                        <div className="flex items-center gap-4">
                            <span className="w-12 h-px" style={{ background: '#C45200' }} />
                            <h3 className="text-2xl md:text-4xl font-display font-semibold tracking-tight" style={{ color: '#F5E6D3' }}>
                                Vision
                            </h3>
                        </div>
                        <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, rgba(196,82,0,0.7), transparent)' }} />
                        <p className="text-base md:text-lg font-light leading-relaxed italic" style={{ color: 'rgba(245,230,211,0.7)' }}>
                            To cultivate a sanctuary where the boundaries between traditional fine arts and contemporary digital photography dissolve into a singular, powerful medium of expression. We envision a future where every creator in our society transcends the role of a mere observer, becoming a profound visual storyteller who captures the unseen essence of the human experience. Our legacy is built upon the relentless pursuit of artistic truth, fostering an environment where innovation thrives alongside reverence for classical mastery. We aim to empower our members to redefine the visual landscape of our era, bridging cultures and perspectives through the universal language of art. By providing a platform for radical experimentation and disciplined technique, we seek to inspire a new generation of artists who view the world not just as it is, but through the lens of infinite possibility.
                        </p>
                    </motion.div>

                    {/* ── What We Do + How We Do — 50 / 50 ── */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">

                        {/* What We Do */}
                        <motion.div
                            className="flex flex-col gap-5"
                            variants={fadeIn}
                            custom={0.3}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            <div className="flex items-center gap-4">
                                <span className="w-12 h-px" style={{ background: '#C45200' }} />
                                <h3 className="text-2xl md:text-3xl font-display font-semibold tracking-tight" style={{ color: '#F5E6D3' }}>
                                    What We Do
                                </h3>
                            </div>
                            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, rgba(196,82,0,0.7), transparent)' }} />
                            <p className="text-sm md:text-base font-light leading-relaxed" style={{ color: 'rgba(245,230,211,0.7)' }}>
                                We curate immersive experiences that spark dialogue and challenge perceptions. From hosting large-scale annual exhibitions that showcase the raw talent of our collective to organizing intimate, high-impact workshops led by industry pioneers, our calendar is a tapestry of artistic growth. We facilitate weekly photowalks that peel back the layers of our urban environment and studio sessions where traditional brushwork meets cutting-edge digital post-production. Our society acts as a dynamic gallery for the bold, a laboratory for the curious, and a collaborative hub where students from diverse backgrounds unite to produce award-winning visual content that defines our institution&apos;s creative identity.
                            </p>
                        </motion.div>

                        {/* How We Do */}
                        <motion.div
                            className="flex flex-col gap-5"
                            variants={fadeIn}
                            custom={0.4}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.1 }}
                        >
                            <div className="flex items-center gap-4">
                                <span className="w-12 h-px" style={{ background: '#C45200' }} />
                                <h3 className="text-2xl md:text-3xl font-display font-semibold tracking-tight" style={{ color: '#F5E6D3' }}>
                                    How We Do
                                </h3>
                            </div>
                            <div className="h-px w-full" style={{ background: 'linear-gradient(90deg, rgba(196,82,0,0.7), transparent)' }} />
                            <p className="text-sm md:text-base font-light leading-relaxed" style={{ color: 'rgba(245,230,211,0.7)' }}>
                                Through a culture of peer-to-peer mentorship and access to premium resources, we dismantle the barriers to entry in high-end arts. We leverage a flat organizational structure that rewards initiative and passion, ensuring that every member has the space to lead, learn, and iterate on their unique creative process. Every voice shapes our direction, every lens contributes to our vision — because great art is never made alone.
                            </p>
                        </motion.div>

                    </div>
                </div>
            </div>
        </section>

    );
}
