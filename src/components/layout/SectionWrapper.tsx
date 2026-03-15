"use client";

import { ReactNode } from "react";

interface SectionWrapperProps {
    id: string;
    children: ReactNode;
    className?: string;
}

export default function SectionWrapper({ id, children, className = "" }: SectionWrapperProps) {
    return (
        <section
            id={id}
            className={`relative py-24 px-6 md:px-12 lg:px-20 ${className}`}
        >
            <div className="mx-auto max-w-7xl">{children}</div>
        </section>
    );
}
