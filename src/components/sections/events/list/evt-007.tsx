
import EventDetailContent from '../EventDetailContent';

export const metadata = {
    id: "evt-007",
    title: "Art & Chai: Creative Networking Evening",
    description: "An informal evening for artists, photographers, and creatives to mingle over chai and conversations. Featured portfolio reviews, speed critiques, and open mic for creative stories.",
    date: "2025-09-22",
    time: "5:00 PM - 8:00 PM",
    venue: "College Café, Ground Floor",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=500&fit=crop",
    status: "past" as const,
    registrationLink: ""
};

export default function ArtAndChai({ onBack }: { onBack: () => void }) {
    return <EventDetailContent event={metadata} onBack={onBack} />;
}
