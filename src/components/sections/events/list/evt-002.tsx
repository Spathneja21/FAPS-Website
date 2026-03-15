
import EventDetailContent from '../EventDetailContent';

export const metadata = {
    id: "evt-002",
    title: "Golden Hour Photo Walk",
    description: "An evening walk through the campus and nearby streets, capturing the magic of golden hour. Professional photographers will guide beginners on composition, lighting, and mobile photography tips. Bring any camera — phone photography welcome!",
    date: "2026-03-01",
    time: "4:30 PM - 7:00 PM",
    venue: "Meet at Campus Main Gate",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=500&fit=crop",
    status: "upcoming" as const,
    registrationLink: "https://forms.google.com"
};

export default function GoldenHourWalk({ onBack }: { onBack: () => void }) {
    return <EventDetailContent event={metadata} onBack={onBack} />;
}
