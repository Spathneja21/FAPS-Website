
import React from 'react';
import { metadata as meta001, default as comp001 } from './list/evt-001';
import { metadata as meta002, default as comp002 } from './list/evt-002';
import { metadata as meta003, default as comp003 } from './list/evt-003';

export interface EventMetadata {
    id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    venue: string;
    image: string;
    status: 'upcoming' | 'past';
    registrationLink: string;
    galleryImages?: string[];
}

export interface EventModule {
    metadata: EventMetadata;
    default: React.ComponentType<{ onBack: () => void }>;
}

export const allEvents: EventModule[] = [
    { metadata: meta001, default: comp001 },
    { metadata: meta002, default: comp002 },
    { metadata: meta003, default: comp003 }
];
