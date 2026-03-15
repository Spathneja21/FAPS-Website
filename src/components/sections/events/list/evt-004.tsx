
import EventDetailContent from '../EventDetailContent';

export const metadata = {
    id: "evt-004",
    title: "Aperture: Inter-College Photography Contest",
    description: "The first edition of our inter-college photography competition. Theme: 'Unseen Perspectives'. Cash prizes, certificates, and feature on FAPS social media for winners. Submissions open to all college students.",
    date: "2025-12-10",
    time: "All Day",
    venue: "Online Submission + Gallery at Seminar Hall",
    image: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=500&fit=crop",
    status: "past" as const,
    registrationLink: ""
};

export default function ApertureContest({ onBack }: { onBack: () => void }) {
    return <EventDetailContent event={metadata} onBack={onBack} />;
}
