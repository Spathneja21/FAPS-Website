
import EventDetailContent from '../EventDetailContent';

export const metadata = {
    id: "evt-001",
    title: "Kaleidoscope '25",
    description: "Kaleidoscope ’25 said one thing: we’re going back.\n\nStraight into the 2000s, the era we grew up on. Cartoons we rushed home for, games we couldn’t put down, music that still hits, and the kind of tech that defined a generation. This wasn’t just nostalgia, it was a full-blown throwback brought to life.\n\nThe space was drenched in it. Retro tattoos, face paint, and interactive photo booths reimagining the 2000s, complete with props that pulled you right back into your childhood. Every corner felt familiar, like a memory you didn’t know you still had.\n\nWith 8000+ people stepping in, the energy was unreal with a shared timeline of memories playing out in real time. And then came the Walk of Memory where cosplayers took the stage, bringing the golden era back to life, one iconic character at a time.\n\nBut the real show-stealer?\nA massive tree, crafted entirely out of waste.Its branches carrying symbols of the 2000s, turning nostalgia into something you could actually stand under and cherish. Kaleidoscope ’25 wasn’t just about looking back, it was about reliving it, together.",
    date: "11 NOVEMBER 2025",
    time: "02:00 PM - 8:00 PM",
    venue: "FETE AREA",
    image: "/events/Kal _25/FINAL/IMG_1434.jpg",
    status: "past" as const,
    registrationLink: "",
    galleryImages: [
        "/events/Kal _25/FINAL/DKG_0342.jpg",
        "/events/Kal _25/FINAL/DSCN9199.jpg",
        "/events/Kal _25/FINAL/DSCN9292.jpg",
        "/events/Kal _25/FINAL/IMG_1434.jpg",
        "/events/Kal _25/FINAL/IMG_1504.jpg",
        "/events/Kal _25/FINAL/IMG_3634.jpg",
        "/events/Kal _25/FINAL/IMG_3640.jpg",
        "/events/Kal _25/FINAL/IMG_7182.jpg"
    ]
};

export default function Event001({ onBack }: { onBack: () => void }) {
    return <EventDetailContent event={metadata} onBack={onBack} />;
}
