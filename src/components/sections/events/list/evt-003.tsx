
import EventDetailContent from '../EventDetailContent';

export const metadata = {
    id: "evt-003",
    title: "Wall 2023",
    description: "Diwaar - An immersive art installation and exhibition showcasing phenomenal works of art.",
    date: "march 2023",
    time: "February 2023 - March 2023",
    venue: "Library",
    image: "/events/wall _23/FINAL/IMG_9907.jpg",
    status: "past" as const,
    registrationLink: "",
    galleryImages: [
        "/events/wall _23/FINAL/IMG-20250624-WA0025.jpg",
        "/events/wall _23/FINAL/IMG_0511.jpg",
        "/events/wall _23/FINAL/IMG_9907.jpg",
        "/events/wall _23/FINAL/IMG_9908.jpg"
    ]
};

export default function Event003({ onBack }: { onBack: () => void }) {
    return <EventDetailContent event={metadata} onBack={onBack} />;
}
