'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import VariableProximity from '../reactbits/VariableProximity';
import { allEvents } from './events/index';
import EventItem from './events/EventItem';

export default function EventsSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    return (
        <section
            id="events"
            className="relative py-32 px-6 strip-light overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #110600 0%, #0D0500 100%)' }}
            ref={containerRef}
        >
            {/* Grain */}
            <div className="grain-overlay" />
            {/* Fog */}
            <div className="fog-layer" />

            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Section heading */}
                <div className="mb-20 md:mb-28 border-b pb-8 md:pb-12 text-center" style={{ borderColor: '#3A1800' }}>
                    <motion.p
                        className="text-xs md:text-sm tracking-[0.5em] uppercase mb-4 md:mb-2"
                        style={{ color: '#C45200' }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        OUR
                    </motion.p>
                    <h2 className="text-6xl md:text-8xl font-display font-black leading-none" style={{ color: '#F5E6D3' }}>
                        <VariableProximity
                            label="Events"
                            fromFontVariationSettings="'wght' 900, 'wdth' 100"
                            toFontVariationSettings="'wght' 100, 'wdth' 150"
                            containerRef={containerRef}
                            radius={150}
                            falloff="gaussian"
                            style={{ fontFamily: "'Manrope', sans-serif", color: '#F5E6D3' }}
                        />
                    </h2>
                </div>

                {/* Events list using the new modular EventItem */}
                <div className="space-y-0">
                    {allEvents.map((eventModule, index) => (
                        <EventItem
                            key={eventModule.metadata.id}
                            event={eventModule.metadata}
                            index={index}
                            onClick={() => navigate(`/events/${eventModule.metadata.id}`)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
