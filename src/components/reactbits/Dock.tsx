'use client';

import { motion, useMotionValue, AnimatePresence } from 'framer-motion';
import { Children, cloneElement, useEffect, useState, ReactElement } from 'react';
import './Dock.css';

interface DockItemProps {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    baseItemSize: number;
}

function DockItem({ children, className = '', onClick, baseItemSize }: DockItemProps) {
    const isHovered = useMotionValue(0);

    return (
        <motion.div
            style={{ width: baseItemSize, height: baseItemSize }}
            whileHover={{ y: -4, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onHoverStart={() => isHovered.set(1)}
            onHoverEnd={() => isHovered.set(0)}
            onFocus={() => isHovered.set(1)}
            onBlur={() => isHovered.set(0)}
            onClick={onClick}
            className={`dock-item ${className}`}
            tabIndex={0}
            role="button"
            aria-haspopup="true"
        >
            {Children.map(children, child => cloneElement(child as ReactElement<{ isHovered?: ReturnType<typeof useMotionValue<number>> }>, { isHovered }))}
        </motion.div>
    );
}

function DockLabel({ children, className = '', ...rest }: { children: React.ReactNode; className?: string; isHovered?: ReturnType<typeof useMotionValue<number>> }) {
    const { isHovered } = rest;
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (!isHovered) return;
        const unsubscribe = isHovered.on('change', (latest: number) => {
            setIsVisible(latest === 1);
        });
        return () => unsubscribe();
    }, [isHovered]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: -10 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`dock-label ${className}`}
                    role="tooltip"
                    style={{ x: '-50%' }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

function DockIcon({ children }: { children: React.ReactNode; className?: string; isHovered?: ReturnType<typeof useMotionValue<number>> }) {
    return <div className="dock-icon">{children}</div>;
}

interface DockItemConfig {
    icon: React.ReactNode;
    label: string;
    onClick?: () => void;
    className?: string;
    href?: string;
}

interface DockProps {
    items: DockItemConfig[];
    className?: string;
    spring?: { mass: number; stiffness: number; damping: number };
    magnification?: number;
    distance?: number;
    panelHeight?: number;
    dockHeight?: number;
    baseItemSize?: number;
}

export default function Dock({
    items,
    className = '',
    panelHeight = 68,
    baseItemSize = 50
}: DockProps) {
    return (
        <motion.div style={{ scrollbarWidth: 'none' }} className="dock-outer">
            <motion.div
                className={`dock-panel ${className}`}
                style={{ height: panelHeight }}
                role="toolbar"
                aria-label="Social links dock"
            >
                {items.map((item, index) => (
                    <DockItem
                        key={index}
                        onClick={item.onClick || (item.href ? () => window.open(item.href, '_blank') : undefined)}
                        className={item.className}
                        baseItemSize={baseItemSize}
                    >
                        <DockIcon>{item.icon}</DockIcon>
                        <DockLabel>{item.label}</DockLabel>
                    </DockItem>
                ))}
            </motion.div>
        </motion.div>
    );
}
