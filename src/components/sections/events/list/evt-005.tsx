
import EventDetailContent from '../EventDetailContent';

export const metadata = {
    id: "evt-005",
    title: "Painting and Sketching Workshop 2025",
    description: "FAPS organized a Painting and Sketching Workshop on 5th November 2025. The event witnessed enthusiastic participation from students across all departments, who gathered at the Central Lawn to showcase their artistic talents. Equipped with canvases, paints, and brushes, the artists created a vibrant display of creativity. The session fostered a collaborative atmosphere, encouraging artistic expression and camaraderie among the participants. The event concluded with the artworks being displayed in the campus art corridor, adding a splash of color and inspiration to the academic environment.",
    date: "7 February 2025",
    time: "5:00 PM - 8:00 PM",
    venue: "Tan 205",
    image: "/events/Painting and Sketching workshop 2025/_DSC0312.jpg",
    status: "past" as const,
    registrationLink: "",
    galleryImages: [
        "/events/Painting and Sketching workshop 2025/_DSC0312.jpg",
        "/events/Painting and Sketching workshop 2025/_DSC0373.jpg",
        "/events/Painting and Sketching workshop 2025/_DSC0385.jpg",
        "/events/Painting and Sketching workshop 2025/_DSC0426.jpg",
        "/events/Painting and Sketching workshop 2025/_DSC0439 (1).jpg",
        "/events/Painting and Sketching workshop 2025/_DSC0461.jpg",
        "/events/Painting and Sketching workshop 2025/_DSC0480.jpg",
    ]
};

export default function BrushstrokesSession({ onBack }: { onBack: () => void }) {
    return <EventDetailContent event={metadata} onBack={onBack} />;
}
