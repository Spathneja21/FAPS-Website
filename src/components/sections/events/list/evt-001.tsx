
import EventDetailContent from '../EventDetailContent';

export const metadata = {
    id: "evt-001",
    title: "Lens & Canvas: Annual Exhibition 2026",
    description: "Our flagship annual exhibition showcasing the best photography, paintings, and digital artwork from FAPS members. Featuring live art demonstrations, interactive installations, and a curated gallery walk. Open to all students and faculty.",
    date: "2026-03-15",
    time: "10:00 AM - 6:00 PM",
    venue: "College Auditorium, Main Campus",
    image: "https://images.unsplash.com/photo-1531058020387-3be344556be6?w=800&h=500&fit=crop",
    status: "upcoming" as const,
    registrationLink: "https://forms.google.com"
};

export default function LensAndCanvas({ onBack }: { onBack: () => void }) {
    return <EventDetailContent event={metadata} onBack={onBack} />;
}
