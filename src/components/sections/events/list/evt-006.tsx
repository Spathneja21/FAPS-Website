
import EventDetailContent from '../EventDetailContent';

export const metadata = {
    id: "evt-006",
    title: "Frames of Expression: Street Photography Meetup",
    description: "A curated street photography excursion to the old town district. Explored themes of culture, heritage, and daily life through the lens. The best shots were compiled into a photo zine published by FAPS.",
    date: "2025-10-18",
    time: "8:00 AM - 1:00 PM",
    venue: "Old Town District",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=500&fit=crop",
    status: "past" as const,
    registrationLink: ""
};

export default function FramesOfExpression({ onBack }: { onBack: () => void }) {
    return <EventDetailContent event={metadata} onBack={onBack} />;
}
