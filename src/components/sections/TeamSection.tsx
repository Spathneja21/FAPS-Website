'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import VariableProximity from '../reactbits/VariableProximity';
import teamMembers from '../../data/teamMembers.json';

const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
};

export default function TeamSection() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section id="team" className="relative py-32 px-6 bg-[#131313]" ref={containerRef}>
            <div className="max-w-7xl mx-auto text-center">
                {/* Section heading */}
                <div className="mb-12 md:mb-20 border-b border-white/10 pb-6 md:pb-8 text-center">
                    <motion.p
                        className="text-white/30 text-[10px] md:text-xs tracking-[0.4em] uppercase mb-3 md:mb-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Our People
                    </motion.p>
                    <h2 className="text-4xl md:text-7xl font-display font-black text-white leading-none">
                        <VariableProximity
                            label="The Team"
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

                {/* Team grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-1"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                >
                    {teamMembers.map((member, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className="cursor-target group relative aspect-[3/4] bg-surface overflow-hidden"
                        >
                            {/* Member image */}
                            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-white/[0.02]" />

                            {/* Number */}
                            <div className="absolute top-4 left-4 z-10">
                                <span className="text-white/20 text-xs font-mono">
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                            </div>

                            {/* Content overlay */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 z-10 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-1">
                                    {member.category}
                                </p>
                                <h3 className="text-white text-lg font-display font-bold leading-tight">
                                    {member.name}
                                </h3>
                                <p className="text-white/50 text-xs mt-1">{member.role}</p>
                            </div>

                            {/* Hover reveal */}
                            <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center p-6 z-20">
                                <p className="text-white/40 text-[10px] tracking-[0.3em] uppercase mb-3">
                                    {member.category}
                                </p>
                                <h3 className="text-white text-xl font-display font-bold mb-2">
                                    {member.name}
                                </h3>
                                <p className="text-white/50 text-xs mb-4">{member.role}</p>
                                <p className="text-white/30 text-xs leading-relaxed">
                                    {member.bio}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
