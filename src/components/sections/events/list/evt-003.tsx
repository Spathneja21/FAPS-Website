
import EventDetailContent from '../EventDetailContent';

export const metadata = {
    id: "evt-003",
    title: "Digital Art Masterclass",
    description: "A hands-on workshop on digital illustration and design using Procreate and Adobe Illustrator. Learn techniques for character design, poster creation, and digital painting. Tablets provided — or bring your own!",
    date: "2026-02-28",
    time: "2:00 PM - 5:00 PM",
    venue: "Design Lab, Block C",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop",
    status: "upcoming" as const,
    registrationLink: "https://forms.google.com"
};

export default function DigitalArtMasterclass({ onBack }: { onBack: () => void }) {
    return <EventDetailContent event={metadata} onBack={onBack} />;
}
