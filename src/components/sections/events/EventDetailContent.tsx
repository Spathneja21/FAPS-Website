'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, ExternalLink, ArrowLeft } from 'lucide-react';

interface EventDetailContentProps {
    event: {
        id: string;
        title: string;
        description: string;
        date: string;
        time: string;
        venue: string;
        image?: string;
        status: string;
        registrationLink?: string;
    };
    onBack: () => void;
}

export default function EventDetailContent({ event, onBack }: EventDetailContentProps) {
    return (
        <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 pt-36 pb-24">
            {/* Back button */}
            <motion.button
                onClick={onBack}
                className="cursor-target flex items-center gap-2 mb-12 group transition-colors"
                style={{ color: '#C45200' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                <span className="letter-spaced text-[10px]">Back to Events</span>
            </motion.button>

            {/* Status badge */}
            <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
            >
                <span
                    className="text-[10px] tracking-[0.25em] uppercase px-4 py-1.5 rounded-full border"
                    style={event.status === 'upcoming'
                        ? { background: 'rgba(196,82,0,0.15)', color: '#D4824A', borderColor: 'rgba(196,82,0,0.3)' }
                        : { background: 'rgba(160,120,90,0.1)', color: '#A0785A', borderColor: 'rgba(160,120,90,0.2)' }
                    }
                >
                    {event.status}
                </span>
            </motion.div>

            {/* Title */}
            <motion.h1
                className="font-display font-bold mb-8 leading-tight"
                style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)', color: '#F5E6D3' }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.7 }}
            >
                {event.title}
            </motion.h1>

            {/* Ember divider */}
            <motion.div
                className="h-px w-full mb-12"
                style={{ background: 'linear-gradient(90deg, #C45200, transparent)' }}
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.25, duration: 0.8 }}
            />

            {/* Hero image */}
            {event.image && (
                <motion.div
                    className="w-full aspect-[16/7] overflow-hidden mb-12 relative rounded-sm border border-[#3A1800]"
                    style={{ background: '#2E1200' }}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                    />
                    <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(to top, rgba(13,5,0,0.8) 0%, transparent 70%)' }}
                    />
                </motion.div>
            )}

            {/* Content grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-20">
                {/* Description */}
                <motion.div
                    className="md:col-span-2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.7 }}
                >
                    <div className="flex items-center gap-3 mb-6">
                        <span className="w-10 h-px" style={{ background: '#C45200' }} />
                        <h2 className="text-xl md:text-3xl font-display font-black" style={{ color: '#F5E6D3' }}>
                            Experience
                        </h2>
                    </div>
                    <p className="text-base md:text-xl font-light leading-relaxed mb-10" style={{ color: 'rgba(245,230,211,0.7)' }}>
                        {event.description}
                    </p>

                    {event.status === 'upcoming' && event.registrationLink && (
                        <motion.a
                            href={event.registrationLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-4 px-10 py-4 rounded-full text-xs font-black tracking-[0.2em] uppercase transition-all orange-glow shadow-2xl"
                            style={{ background: '#C45200', color: '#F5E6D3' }}
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span>Secure Spot</span>
                            <ExternalLink size={16} />
                        </motion.a>
                    )}
                </motion.div>

                {/* Sidebar Details */}
                <motion.div
                    className="flex flex-col gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                >
                    <div className="flex items-center gap-3 mb-2">
                        <span className="w-8 h-px" style={{ background: '#C45200' }} />
                        <h2 className="text-xl md:text-2xl font-display font-black" style={{ color: '#F5E6D3' }}>
                            Vital Info
                        </h2>
                    </div>

                    <div className="space-y-4">
                        <DetailCard
                            icon={<Calendar size={20} />}
                            label="When"
                            value={new Date(event.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        />
                        <DetailCard icon={<Clock size={20} />} label="Timeline" value={event.time} />
                        <DetailCard icon={<MapPin size={20} />} label="Location" value={event.venue} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

function DetailCard({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="p-6 border border-[#3A1800] bg-[#2E1200]/30 backdrop-blur-sm group hover:border-[#C45200]/40 transition-colors">
            <div className="flex items-center gap-4 mb-2">
                <div style={{ color: '#C45200' }}>{icon}</div>
                <span className="text-[9px] tracking-[0.3em] uppercase text-[#A0785A]">{label}</span>
            </div>
            <p className="text-sm font-display font-bold leading-tight" style={{ color: '#F5E6D3' }}>{value}</p>
        </div>
    );
}
