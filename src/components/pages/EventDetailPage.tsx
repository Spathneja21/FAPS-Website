'use client';

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { allEvents } from '../sections/events/index';
import Navbar from '../layout/Navbar';
import TargetCursor from '../reactbits/TargetCursor';

export default function EventDetailPage() {
    const { eventId } = useParams();
    const navigate = useNavigate();

    // Scroll to top on mount or when eventId changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [eventId]);

    // Find the event module by metadata ID
    const eventModule = allEvents.find(e => e.metadata.id === eventId);

    if (!eventModule) {
        return (
            <div
                className="min-h-screen flex flex-col items-center justify-center p-6 text-center"
                style={{ background: '#0D0500', color: '#F5E6D3' }}
            >
                <div className="absolute inset-0 grain-overlay opacity-[0.03]" />
                <h1 className="text-4xl md:text-6xl font-display font-black mb-6">Lost in the Fog</h1>
                <p className="text-[#A0785A] mb-8 max-w-md">The event you&apos;re looking for has drifted away. Let&apos;s get you back to safety.</p>
                <button
                    onClick={() => navigate('/#events')}
                    className="cursor-target letter-spaced text-xs transition-colors px-10 py-4 rounded-full border border-[#C45200]/40 hover:bg-[#C45200] group"
                    style={{ color: '#F5E6D3' }}
                >
                    <span className="group-hover:translate-x-[-4px] transition-transform inline-block mr-2">←</span>
                    Return Home
                </button>
            </div>
        );
    }

    const EventComponent = eventModule.default;

    return (
        <div
            className="min-h-screen relative overflow-hidden"
            style={{ background: 'linear-gradient(180deg, #0D0500 0%, #110600 100%)' }}
        >
            <TargetCursor />
            <Navbar />

            {/* Background elements */}
            <div className="grain-overlay" />
            <div className="fog-layer" />

            <div
                className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
                style={{
                    background: 'linear-gradient(90deg, transparent, rgba(196,82,0,0.6), rgba(255,107,26,0.8), rgba(196,82,0,0.6), transparent)',
                    boxShadow: '0 0 20px 4px rgba(196,82,0,0.3)',
                }}
            />

            {/* Render the specific event component */}
            <EventComponent onBack={() => navigate('/#events')} />
        </div>
    );
}
