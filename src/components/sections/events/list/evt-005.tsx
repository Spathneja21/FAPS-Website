
import EventDetailContent from '../EventDetailContent';

export const metadata = {
    id: "evt-005",
    title: "Brushstrokes: Live Painting Session",
    description: "An open-air live painting session where members and guests paint together on a shared theme. Canvases, paints, and brushes provided. The finished works were displayed in the campus art corridor for a month.",
    date: "2025-11-05",
    time: "11:00 AM - 4:00 PM",
    venue: "Central Lawn, Main Campus",
    image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&h=500&fit=crop",
    status: "past" as const,
    registrationLink: ""
};

export default function BrushstrokesSession({ onBack }: { onBack: () => void }) {
    return <EventDetailContent event={metadata} onBack={onBack} />;
}
