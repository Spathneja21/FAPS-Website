'use client';

import { motion } from 'framer-motion';

interface EventItemProps {
    event: {
        id: string;
        title: string;
        date: string;
        venue: string;
        status: string;
    };
    index: number;
    onClick: () => void;
}

export default function EventItem({ event, index, onClick }: EventItemProps) {
    return (
        <motion.div
            className="cursor-target border-b group"
            style={{ borderColor: '#3A1800' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05, duration: 0.5 }}
        >
            <div
                className="w-full py-8 md:py-12 flex flex-col md:flex-row md:items-center justify-between gap-6 cursor-pointer"
                onClick={onClick}
            >
                <div className="flex items-center gap-6 md:gap-12 min-w-0">
                    {/* Number */}
                    <span className="text-[10px] md:text-sm font-mono w-6 md:w-8 shrink-0" style={{ color: '#C45200', opacity: 0.5 }}>
                        {String(index + 1).padStart(2, '0')}
                    </span>
                    {/* Title & Info */}
                    <div className="min-w-0 translate-x-0 group-hover:translate-x-3 transition-transform duration-500">
                        <h3
                            className="text-2xl md:text-4xl font-display font-black leading-tight"
                            style={{ color: '#F5E6D3' }}
                        >
                            {event.title}
                        </h3>
                        <p className="text-xs md:text-sm mt-3 tracking-wider uppercase font-light" style={{ color: '#A0785A' }}>
                            {event.date} · <span style={{ color: '#D4824A' }}>{event.venue}</span>
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-6 md:gap-10 justify-between md:justify-end">
                    {/* Status badge */}
                    <span
                        className="text-[9px] md:text-[11px] tracking-[0.25em] uppercase px-4 py-1.5 rounded-full"
                        style={event.status === 'upcoming'
                            ? { background: 'rgba(196,82,0,0.15)', color: '#D4824A', border: '1px solid rgba(196,82,0,0.25)' }
                            : { background: 'rgba(160,120,90,0.06)', color: '#A0785A', border: '1px solid rgba(160,120,90,0.1)' }
                        }
                    >
                        {event.status}
                    </span>

                    {/* Industrial Arrow Button */}
                    <div
                        className="w-12 h-12 rounded-full border border-[#3A1800] flex items-center justify-center transition-all duration-500 group-hover:bg-[#C45200] group-hover:border-[#C45200] group-hover:shadow-[0_0_20px_rgba(196,82,0,0.4)]"
                    >
                        <svg
                            width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                            className="transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                            style={{ color: '#F5E6D3' }}
                        >
                            <path d="M7 17L17 7M17 7H7M17 7V17" />
                        </svg>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
