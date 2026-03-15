"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    align?: "center" | "left";
}

export default function SectionHeading({
    title,
    subtitle,
    align = "center",
}: SectionHeadingProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}
        >
            <h2 className="font-[family-name:var(--font-heading)] text-4xl font-semibold tracking-tight text-text-primary md:text-5xl">
                {title}
            </h2>
            {subtitle && (
                <p className="mt-4 max-w-2xl font-[family-name:var(--font-body)] text-lg text-text-secondary mx-auto">
                    {subtitle}
                </p>
            )}
            <div className="mt-6 flex items-center gap-3 justify-center">
                <span className="h-[2px] w-12 bg-accent" />
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="h-[2px] w-12 bg-accent" />
            </div>
        </motion.div>
    );
}
