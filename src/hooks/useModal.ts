"use client";

import { useState, useEffect, useCallback } from "react";

export function useModal() {
    const [isOpen, setIsOpen] = useState(false);

    const open = useCallback(() => {
        setIsOpen(true);
        document.body.style.overflow = "hidden";
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
        document.body.style.overflow = "";
    }, []);

    const toggle = useCallback(() => {
        if (isOpen) close();
        else open();
    }, [isOpen, open, close]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape" && isOpen) close();
        };
        window.addEventListener("keydown", handleEsc);
        return () => {
            window.removeEventListener("keydown", handleEsc);
            document.body.style.overflow = "";
        };
    }, [isOpen, close]);

    return { isOpen, open, close, toggle };
}
