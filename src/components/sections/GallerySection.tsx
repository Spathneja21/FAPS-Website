

// HMR test
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const Image = ({ src, alt, fill, className, sizes, ...props }: any) => {
    if (fill) {
        return <img src={src} alt={alt} className={`absolute inset-0 w-full h-full ${className}`} loading="lazy" {...props} />;
    }
    return <img src={src} alt={alt} className={className} loading="lazy" {...props} />;
};
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import VariableProximity from '../reactbits/VariableProximity';
import galleryItems from '../../data/galleryItems.json';

const categories = ['All', ...Array.from(new Set(galleryItems.map(item => item.category)))];

const containerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
    },
};



export default function GallerySection() {
    const [activeCategory, setActiveCategory] = useState('All');
    const [visibleCount, setVisibleCount] = useState(12);
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredItems =
        activeCategory === 'All'
            ? galleryItems
            : galleryItems.filter(item => item.category === activeCategory);

    const displayedItems = filteredItems.slice(0, visibleCount);

    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
        setVisibleCount(12);
    };

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + 12);
    };

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);

    const navigate = (dir: 'prev' | 'next') => {
        if (lightboxIndex === null) return;
        if (dir === 'prev') {
            setLightboxIndex(lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1);
        } else {
            setLightboxIndex(lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1);
        }
    };

    return (
        <section id="gallery" className="relative py-32 px-6 bg-[#131313]" ref={containerRef}>
            <div className="max-w-7xl mx-auto">
                {/* Section heading */}
                <div className="mb-10 md:mb-12 border-b border-white/10 pb-6 md:pb-8 flex flex-col items-center text-center">
                    <motion.p
                        className="text-white/30 text-[10px] md:text-xs tracking-[0.4em] uppercase mb-3 md:mb-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Selected Work
                    </motion.p>
                    <div className="flex items-center justify-center gap-3">
                        <h2 className="text-4xl md:text-7xl font-display font-black text-white leading-none">
                            <VariableProximity
                                label="Gallery"
                                fromFontVariationSettings="'wght' 900, 'wdth' 100"
                                toFontVariationSettings="'wght' 100, 'wdth' 150"
                                containerRef={containerRef}
                                radius={150}
                                falloff="gaussian"
                                className="text-white"
                                style={{ fontFamily: "'Manrope', sans-serif" }}
                            />
                        </h2>
                    </div>
                </div>

                {/* Category filters — horizontal scroll on mobile */}
                <motion.div
                    className="flex flex-nowrap md:flex-wrap gap-2 mb-10 md:mb-12 overflow-x-auto pb-4 md:pb-0 scrollbar-hide -mx-6 px-6"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            className={`cursor-target px-4 py-2 text-[10px] md:text-xs tracking-[0.15em] uppercase transition-all rounded-full border whitespace-nowrap shrink-0 ${activeCategory === cat
                                ? 'bg-white text-black border-white'
                                : 'bg-transparent text-white/40 border-white/10 hover:border-white/30 hover:text-white/60'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </motion.div>

                {/* Gallery grid */}
                <motion.div
                    className="columns-2 md:columns-3 lg:columns-4 gap-1 sm:gap-4 w-full"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    key={activeCategory + visibleCount}
                >
                    {displayedItems.map((item, index) => (
                        <motion.div
                            key={`${item.title}-${index}`}
                            variants={cardVariants}
                            className="cursor-target group relative overflow-hidden bg-surface mb-1 sm:mb-4 break-inside-avoid w-full"
                            onClick={() => openLightbox(index)}
                        >
                            <Image
                                src={item.imageUrl}
                                alt={item.title}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay on hover — different behavior on mobile might be needed, but for now just scaling text */}
                            <div className="absolute inset-0 bg-black/20 md:bg-black/0 group-hover:bg-black/60 transition-all duration-500 flex flex-col justify-end p-4 md:p-6">
                                <div className="translate-y-2 md:translate-y-4 opacity-100 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                                    <p className="text-white/40 text-[8px] md:text-[10px] tracking-[0.3em] uppercase mb-0.5 md:mb-1">
                                        {item.category}
                                    </p>
                                    <p className="text-white/40 text-[10px] md:text-xs mt-0.5 md:mt-1">{item.photographer}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Load More Button */}
                {visibleCount < filteredItems.length && (
                    <div className="mt-12 flex justify-center">
                        <button
                            onClick={handleLoadMore}
                            className="cursor-target px-8 py-3 bg-white/10 hover:bg-white/20 text-white text-xs tracking-widest uppercase transition-all rounded-full border border-white/20 hover:border-white/40 backdrop-blur-sm"
                        >
                            Load More
                        </button>
                    </div>
                )}
                {/* Lightbox refined below */}
                <AnimatePresence>
                    {lightboxIndex !== null && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12"
                            onClick={closeLightbox}
                        >
                            {/* Close button */}
                            <button
                                className="cursor-target absolute top-6 right-6 text-white/40 hover:text-white transition-colors z-20"
                                onClick={closeLightbox}
                                aria-label="Close lightbox"
                            >
                                <X size={24} />
                            </button>

                            {/* Prev */}
                            <button
                                className="cursor-target absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white z-20"
                                onClick={(e) => { e.stopPropagation(); navigate('prev'); }}
                                aria-label="Previous"
                            >
                                <ChevronLeft size={32} />
                            </button>

                            {/* Next */}
                            <button
                                className="cursor-target absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white z-20"
                                onClick={(e) => { e.stopPropagation(); navigate('next'); }}
                                aria-label="Next"
                            >
                                <ChevronRight size={32} />
                            </button>

                            {/* Image Container */}
                            <motion.div
                                key={lightboxIndex}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="relative w-full h-full flex flex-col items-center justify-center pointer-events-none"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="relative w-full max-w-5xl max-h-[70vh] aspect-[4/3] md:aspect-auto md:h-full pointer-events-auto">
                                    <Image
                                        src={filteredItems[lightboxIndex].imageUrl}
                                        alt={filteredItems[lightboxIndex].title}
                                        fill
                                        className="object-contain"
                                        sizes="90vw"
                                    />
                                </div>
                                <div className="mt-6 text-center max-w-xl pointer-events-auto">
                                    <p className="text-white/40 text-[10px] md:text-sm uppercase tracking-widest">
                                        {filteredItems[lightboxIndex].photographer} · {filteredItems[lightboxIndex].category}
                                    </p>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
