
import EventDetailContent from '../EventDetailContent';

export const metadata = {
    id: "evt-002",
    title: "Kaleidoscope '24",
    description: "Kaleidoscope ’24 wasn’t just an event, it was a whole experience.\n\nThink summer music festival chaos meets Met Gala-level drip. A full-blown art and photography takeover, decked out with insane decor, immersive photobooths, props, and energy that didn’t drop for a second. With 6,000+ people pulling up, the space was literally buzzing all evening, the music and ambience just sitting right in the pocket.\n\nThe main character moment?\nA red carpet packed with cosplayers serving iconic music industry looks from legendary fits to pop culture power moves. Cameras flashing, fits going hard, and everyone playing the part.\n\nArt, fashion, music and all colliding into one unforgettable night. Kaleidoscope ’24 really said:\n“Please don’t stop the music.”",
    date: "2024-11-14",
    time: "04:00 PM - 8:00 PM",
    venue: "FETE AREA",
    image: "/events/Kal_24/DSC_0175 (1).jpg",
    status: "past" as const,
    registrationLink: "",
    galleryImages: [
        "/events/Kal_24/4410c0c3-3b68-4aba-895f-2369d7c55795-1 (1).jpg",
        "/events/Kal_24/4410c0c3-3b68-4aba-895f-2369d7c55795.jpg",
        "/events/Kal_24/ANV_0010 1.jpg",
        "/events/Kal_24/ANV_0257.jpg",
        "/events/Kal_24/DSC_0067.jpg",
        "/events/Kal_24/DSC_0175 (1).jpg",
        "/events/Kal_24/IMG_1659.jpg",
        "/events/Kal_24/IMG_5451.JPG",
        "/events/Kal_24/IMG_7360.JPG",
        "/events/Kal_24/IMG_7702.JPG",
    ]
};

export default function Event002({ onBack }: { onBack: () => void }) {
    return <EventDetailContent event={metadata} onBack={onBack} />;
}
