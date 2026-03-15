
import EventDetailContent from '../EventDetailContent';

export const metadata = {
    id: "evt-008",
    title: "Introduction to Film Photography",
    description: "A beginner-friendly workshop covering the basics of 35mm film photography — loading film, understanding exposure, and developing negatives in the darkroom. Each participant received a roll of film to shoot and develop.",
    date: "2025-08-30",
    time: "10:00 AM - 3:00 PM",
    venue: "Photography Lab, Block D",
    image: "https://images.unsplash.com/photo-1495745966610-2a67f2297e5e?w=800&h=500&fit=crop",
    status: "past" as const,
    registrationLink: ""
};

export default function IntroductionToFilm({ onBack }: { onBack: () => void }) {
    return <EventDetailContent event={metadata} onBack={onBack} />;
}
