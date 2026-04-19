import EventDetailContent from '../EventDetailContent';

export const metadata = {
    id: "evt-004",
    title: "Kaleidoscope '23",
    description: "Kaleidoscope '23 was an unforgettable celebration of creativity and expression. Featuring mesmerizing art installations, vibrant photography exhibits, and breathtaking immersive decor, the event left everyone spellbound. It brought together artists, creators, and enthusiasts under one roof to celebrate the true essence of art, setting the stage for the massive cultural phenomenon that Kaleidoscope was destined to become.",
    date: "30 october 2023",
    time: "04:00 PM - 8:00 PM",
    venue: "FETE AREA",
    image: "/events/Kal _23/1 (1).jpeg",
    status: "past" as const,
    registrationLink: "",
    galleryImages: [
        "/events/Kal _23/1 (1).jpeg",
        "/events/Kal _23/1 (2).jpeg",
        "/events/Kal _23/1 (3).jpeg",
        "/events/Kal _23/1 (4).jpeg"
    ]
};

export default function Event004({ onBack }: { onBack: () => void }) {
    return <EventDetailContent event={metadata} onBack={onBack} />;
}
