"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkle, Star, TrendUp, Tag } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";

type BadgeType = "new" | "discount" | "trending" | "bestseller";

interface HeroProduct {
  image: string;
  name: string;
  category: string;
  price: string;
  originalPrice?: string;
  badge: {
    type: BadgeType;
    label: string;
  };
}

export function HeroBanner() {
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Hero products that rotate
  const heroProducts: HeroProduct[] = [
    {
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop&q=80",
      name: "Premium Wireless Headphones",
      category: "Electronics",
      price: "Rs. 23,807",
      originalPrice: "Rs. 47,614",
      badge: { type: "discount", label: "50% OFF" },
    },
    {
      image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&h=800&fit=crop&q=80",
      name: "Smart Watch Series 9",
      category: "Electronics",
      price: "Rs. 53,200",
      badge: { type: "new", label: "NEW" },
    },
    {
      image: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800&h=800&fit=crop&q=80",
      name: "Designer Running Shoes",
      category: "Fashion",
      price: "Rs. 15,960",
      badge: { type: "trending", label: "TRENDING" },
    },
    {
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&h=800&fit=crop&q=80",
      name: "Professional DSLR Camera",
      category: "Electronics",
      price: "Rs. 1,72,767",
      originalPrice: "Rs. 2,15,959",
      badge: { type: "discount", label: "25% OFF" },
    },
  ];

  // Supporting callout badges
  const supportingBadges = [
    { icon: Tag, label: "Up to 50% OFF", description: "On selected items", type: "discount" as BadgeType },
    { icon: Sparkle, label: "New Arrivals", description: "Fresh picks daily", type: "new" as BadgeType },
    { icon: TrendUp, label: "Trending Now", description: "What's popular", type: "trending" as BadgeType },
  ];

  // Auto-rotate hero product every 5 seconds with smooth transitions
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProductIndex((prev) => (prev + 1) % heroProducts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroProducts.length]);

  // Track mouse position for parallax effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const currentProduct = heroProducts[currentProductIndex];

  // Get badge styling based on type - matching product card colors
  const getBadgeStyles = (type: BadgeType) => {
    switch (type) {
      case "discount":
        return "bg-error/10 text-error border-error/20"; // Red - matches product card discount
      case "new":
        return "bg-primary text-primary-foreground border-primary/20"; // Navy - matches product card "New"
      case "trending":
        return "bg-accent text-accent-foreground border-accent/20"; // Accent color for trending
      case "bestseller":
        return "bg-success/10 text-success border-success/20"; // Green for bestseller
    }
  };

  return (
    <section className="relative border-b border-border bg-gradient-to-br from-background via-background-secondary to-background overflow-hidden">
      {/* Animated background gradient orbs */}
      <motion.div
        className="absolute -top-32 -right-32 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-32 -left-32 w-96 h-96 bg-gradient-to-tr from-accent/20 to-primary/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Floating particles - using fixed positions to avoid hydration mismatch */}
      {[
        { size: 4, left: 10, top: 20, duration: 15, delay: 0 },
        { size: 3, left: 25, top: 60, duration: 18, delay: 0.5 },
        { size: 5, left: 45, top: 15, duration: 20, delay: 1 },
        { size: 2.5, left: 60, top: 75, duration: 16, delay: 1.5 },
        { size: 4.5, left: 75, top: 30, duration: 19, delay: 2 },
        { size: 3.5, left: 15, top: 80, duration: 17, delay: 0.3 },
        { size: 4, left: 85, top: 50, duration: 21, delay: 0.8 },
        { size: 3, left: 35, top: 40, duration: 18, delay: 1.2 },
        { size: 5, left: 90, top: 10, duration: 16, delay: 2.5 },
        { size: 2.5, left: 50, top: 90, duration: 20, delay: 0.6 },
        { size: 4, left: 5, top: 45, duration: 19, delay: 1.8 },
        { size: 3.5, left: 70, top: 85, duration: 17, delay: 1.1 },
        { size: 4.5, left: 40, top: 25, duration: 22, delay: 0.4 },
        { size: 3, left: 80, top: 65, duration: 18, delay: 2.2 },
        { size: 5, left: 20, top: 55, duration: 16, delay: 0.9 },
      ].map((particle, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-primary/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container-page grid items-center gap-10 py-16 md:grid-cols-2 md:py-24 lg:py-28 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col gap-6"
        >
          <motion.span
            className="w-fit rounded-full bg-primary-light px-3 py-1 text-xs font-semibold text-primary flex items-center gap-1.5"
            animate={{
              boxShadow: [
                "0 0 0 0 rgba(147, 51, 234, 0)",
                "0 0 0 8px rgba(147, 51, 234, 0)",
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <Sparkle weight="fill" className="w-3 h-3" />
            New Season Arrivals
          </motion.span>
          <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Everyday essentials,
            <br />
            thoughtfully curated.
          </h1>
          <p className="max-w-md text-base leading-relaxed text-foreground-secondary md:text-lg">
            Discover electronics, fashion, home and beauty picks chosen for quality — not
            just quantity. Free shipping on orders over Rs. 6,650.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" asChild>
              <Link href="/products">
                Shop Now
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/categories">Browse Categories</Link>
            </Button>
          </div>

          {/* Stats cards */}
          <div className="flex gap-4 pt-4">
            <motion.div
              className="flex items-center gap-2 rounded-xl bg-card/50 backdrop-blur-sm px-4 py-3 border border-border"
              whileHover={{ scale: 1.05 }}
            >
              <Star weight="fill" className="w-5 h-5 text-yellow-500" />
              <div>
                <div className="text-sm font-semibold">4.8/5</div>
                <div className="text-xs text-foreground-secondary">Rating</div>
              </div>
            </motion.div>
            <motion.div
              className="flex items-center gap-2 rounded-xl bg-card/50 backdrop-blur-sm px-4 py-3 border border-border"
              whileHover={{ scale: 1.05 }}
            >
              <TrendUp weight="fill" className="w-5 h-5 text-success" />
              <div>
                <div className="text-sm font-semibold">50K+</div>
                <div className="text-xs text-foreground-secondary">Products</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Hero product showcase - clean, single product focus */}
        <div
          className="relative aspect-square flex items-center justify-center"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setMousePosition({ x: 0, y: 0 })}
        >
          {/* Central glow effect with parallax */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{
              x: mousePosition.x * 20,
              y: mousePosition.y * 20,
            }}
          >
            <motion.div
              className="w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                scale: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
            />
          </motion.div>

          {/* Main hero product with 3D tilt effect */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentProductIndex}
              className="relative z-10"
              initial={{ opacity: 0, scale: 0.8, rotateX: -15 }}
              animate={{
                opacity: 1,
                scale: 1,
                rotateX: 0,
                rotateY: mousePosition.x * 10,
                rotateZ: mousePosition.x * -5,
              }}
              exit={{ opacity: 0, scale: 0.8, rotateX: 15 }}
              transition={{
                duration: 0.8,
                type: "spring",
                bounce: 0.3,
                rotateY: { type: "spring", stiffness: 100, damping: 20 },
                rotateZ: { type: "spring", stiffness: 100, damping: 20 },
              }}
              style={{
                transformStyle: "preserve-3d",
                perspective: 1000,
              }}
            >
              <div className="relative w-[280px] h-[280px] md:w-[360px] md:h-[360px] lg:w-[420px] lg:h-[420px]">
                {/* Product card with smooth animations */}
                <motion.div
                  className="relative w-full h-full rounded-3xl overflow-hidden bg-card shadow-2xl border-2 border-border group cursor-pointer"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 30px 60px rgba(0,0,0,0.3)",
                  }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    scale: { type: "spring", stiffness: 300 },
                    y: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  {/* Animated shine effect overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      repeatDelay: 2,
                      ease: "easeInOut",
                    }}
                  />

                  <Image
                    src={currentProduct.image}
                    alt={currentProduct.name}
                    fill
                    sizes="(max-width: 768px) 280px, (max-width: 1024px) 360px, 420px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority
                  />

                  {/* Gradient overlay at bottom */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                  {/* Product info */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="flex flex-col gap-2"
                    >
                      <span className="text-xs font-semibold text-white/70 uppercase tracking-wide">
                        {currentProduct.category}
                      </span>
                      <h3 className="text-xl md:text-2xl font-bold leading-tight">
                        {currentProduct.name}
                      </h3>
                      <div className="flex items-baseline gap-3 mt-1">
                        <span className="text-2xl md:text-3xl font-bold">{currentProduct.price}</span>
                        {currentProduct.originalPrice && (
                          <span className="text-sm text-white/60 line-through">
                            {currentProduct.originalPrice}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  </div>

                  {/* Main badge - top left with consistent colors */}
                  <motion.div
                    className={`absolute top-4 left-4 rounded-lg px-3 py-1.5 text-xs font-bold shadow-lg border backdrop-blur-sm ${getBadgeStyles(currentProduct.badge.type)}`}
                    initial={{ scale: 0, x: -20 }}
                    animate={{ scale: 1, x: 0 }}
                    transition={{ delay: 0.3, type: "spring" }}
                  >
                    {currentProduct.badge.label}
                  </motion.div>

                  {/* Shine effect on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-10 pointer-events-none"
                    initial={{ x: "-100%", y: "-100%" }}
                    whileHover={{ x: "100%", y: "100%" }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.div>

                {/* Floating ring decoration with particles */}
                <motion.div
                  className="absolute -inset-6 rounded-full border-2 border-primary/30 pointer-events-none"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    rotate: {
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    },
                    scale: {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  style={{
                    x: mousePosition.x * -30,
                    y: mousePosition.y * -30,
                  }}
                >
                  {/* Orbital particles */}
                  {[0, 90, 180, 270].map((angle, i) => (
                    <motion.div
                      key={angle}
                      className="absolute w-3 h-3 rounded-full bg-primary shadow-lg"
                      style={{
                        top: "50%",
                        left: "50%",
                        marginTop: -6,
                        marginLeft: -6,
                      }}
                      animate={{
                        x: Math.cos((angle * Math.PI) / 180) * 200,
                        y: Math.sin((angle * Math.PI) / 180) * 200,
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        x: {
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                          delay: i * 0.1,
                        },
                        y: {
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                          delay: i * 0.1,
                        },
                        scale: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.2,
                        },
                        opacity: {
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: i * 0.2,
                        },
                      }}
                    />
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Supporting callout badges - positioned around hero */}
          {supportingBadges.map((badge, index) => {
            const positions = [
              { top: "10%", left: "-5%", rotate: -8 },
              { top: "15%", right: "-8%", rotate: 8 },
              { bottom: "15%", left: "-8%", rotate: -5 },
            ];
            const pos = positions[index];

            return (
              <motion.div
                key={badge.label}
                className={`absolute hidden lg:block ${getBadgeStyles(badge.type)} rounded-xl px-4 py-3 shadow-lg border backdrop-blur-sm`}
                style={{ ...pos }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.1, rotate: 0 }}
              >
                <div className="flex items-center gap-2">
                  <badge.icon className="w-4 h-4" weight="fill" />
                  <div>
                    <div className="text-sm font-bold">{badge.label}</div>
                    <div className="text-xs opacity-80">{badge.description}</div>
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Progress dots indicator */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2">
            {heroProducts.map((_, index) => (
              <motion.button
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentProductIndex
                    ? "bg-primary w-8"
                    : "bg-border hover:bg-primary/50 w-2"
                }`}
                onClick={() => setCurrentProductIndex(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`View product ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
