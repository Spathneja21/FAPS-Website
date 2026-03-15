
import React from 'react';
import { metadata as meta001, default as comp001 } from './list/evt-001';
import { metadata as meta002, default as comp002 } from './list/evt-002';
import { metadata as meta003, default as comp003 } from './list/evt-003';
import { metadata as meta004, default as comp004 } from './list/evt-004';
import { metadata as meta005, default as comp005 } from './list/evt-005';
import { metadata as meta006, default as comp006 } from './list/evt-006';
import { metadata as meta007, default as comp007 } from './list/evt-007';
import { metadata as meta008, default as comp008 } from './list/evt-008';

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
}

export interface EventModule {
    metadata: EventMetadata;
    default: React.ComponentType<{ onBack: () => void }>;
}

export const allEvents: EventModule[] = [
    { metadata: meta001, default: comp001 },
    { metadata: meta002, default: comp002 },
    { metadata: meta003, default: comp003 },
    { metadata: meta004, default: comp004 },
    { metadata: meta005, default: comp005 },
    { metadata: meta006, default: comp006 },
    { metadata: meta007, default: comp007 },
    { metadata: meta008, default: comp008 }
];
