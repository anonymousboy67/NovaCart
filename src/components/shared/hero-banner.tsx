"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ShoppingBag, Sparkle, Star, Tag, TrendUp } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";

export function HeroBanner() {
  const [currentProductSet, setCurrentProductSet] = useState(0);
  const [centerProductIndex, setCenterProductIndex] = useState(0);

  // Featured center products that rotate
  const centerProducts = [
    { image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop", name: "Premium Headphones", color: "from-purple-500 to-pink-500" },
    { image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop", name: "Smart Watch", color: "from-blue-500 to-cyan-500" },
    { image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&h=500&fit=crop", name: "Designer Sneakers", color: "from-orange-500 to-red-500" },
    { image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=500&fit=crop", name: "Pro Camera", color: "from-green-500 to-emerald-500" },
  ];

  // Multiple sets of products that will rotate
  const productSets = [
    [
      { image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop", name: "Wireless Headphones", badge: "50% OFF", color: "from-purple-500 to-pink-500" },
      { image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&h=400&fit=crop", name: "Smartwatch", badge: "NEW", color: "from-blue-500 to-cyan-500" },
      { image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop", name: "Sneakers", badge: "TRENDING", color: "from-orange-500 to-red-500" },
      { image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop", name: "Camera", badge: "HOT", color: "from-green-500 to-emerald-500" },
    ],
    [
      { image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop", name: "Laptop", badge: "SALE", color: "from-indigo-500 to-purple-500" },
      { image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop", name: "Perfume", badge: "NEW", color: "from-pink-500 to-rose-500" },
      { image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop", name: "Armchair", badge: "20% OFF", color: "from-amber-500 to-orange-500" },
      { image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=400&fit=crop", name: "Coffee Set", badge: "BESTSELLER", color: "from-teal-500 to-cyan-500" },
    ],
    [
      { image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop", name: "Sunglasses", badge: "TRENDING", color: "from-yellow-500 to-amber-500" },
      { image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&h=400&fit=crop", name: "Dumbbells", badge: "NEW", color: "from-red-500 to-pink-500" },
      { image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop", name: "Travel Bag", badge: "HOT", color: "from-violet-500 to-purple-500" },
      { image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop", name: "Serum", badge: "SALE", color: "from-sky-500 to-blue-500" },
    ],
  ];

  // Auto-rotate products every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentProductSet((prev) => (prev + 1) % productSets.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Auto-rotate center product every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCenterProductIndex((prev) => (prev + 1) % centerProducts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const floatingProducts = productSets[currentProductSet];

  // Geometric shapes for background
  const geometricShapes = [
    { type: "circle", size: 40, x: 10, y: 15, delay: 0 },
    { type: "square", size: 30, x: 85, y: 20, delay: 0.5 },
    { type: "triangle", size: 35, x: 15, y: 80, delay: 1 },
    { type: "circle", size: 25, x: 90, y: 75, delay: 1.5 },
  ];

  // Floating particles
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    size: Math.random() * 4 + 2,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 3,
    duration: Math.random() * 10 + 10,
  }));

  // Sparkles
  const sparkles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    size: Math.random() * 8 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 3 + 2,
  }));

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

      {/* Geometric shapes background */}
      {geometricShapes.map((shape, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute opacity-10"
          style={{
            left: `${shape.x}%`,
            top: `${shape.y}%`,
          }}
          initial={{ opacity: 0, scale: 0, rotate: 0 }}
          animate={{
            opacity: [0.1, 0.2, 0.1],
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        >
          {shape.type === "circle" && (
            <div
              className="rounded-full border-2 border-primary"
              style={{ width: shape.size, height: shape.size }}
            />
          )}
          {shape.type === "square" && (
            <div
              className="border-2 border-accent rotate-45"
              style={{ width: shape.size, height: shape.size }}
            />
          )}
          {shape.type === "triangle" && (
            <div
              className="border-l-2 border-r-2 border-b-2 border-primary"
              style={{
                width: 0,
                height: 0,
                borderLeft: `${shape.size / 2}px solid transparent`,
                borderRight: `${shape.size / 2}px solid transparent`,
                borderBottom: `${shape.size}px solid currentColor`,
              }}
            />
          )}
        </motion.div>
      ))}

      {/* Floating particles */}
      {particles.map((particle) => (
        <motion.div
          key={`particle-${particle.id}`}
          className="absolute rounded-full bg-primary/20"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
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
          <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground md:text-5xl">
            Everyday essentials,
            <br />
            thoughtfully curated.
          </h1>
          <p className="max-w-md text-base leading-relaxed text-foreground-secondary">
            Discover electronics, fashion, home and beauty picks chosen for quality — not
            just quantity. Free shipping on orders over $50.
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
              <TrendUp weight="fill" className="w-5 h-5 text-green-500" />
              <div>
                <div className="text-sm font-semibold">50K+</div>
                <div className="text-xs text-foreground-secondary">Products</div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Animated product showcase */}
        <div className="relative aspect-square md:aspect-[4/3] overflow-visible">
          {/* Central glow effect */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <motion.div
              className="w-96 h-96 md:w-[500px] md:h-[500px] bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 rounded-full blur-3xl"
              animate={{
                scale: [1, 1.15, 1],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.div>

          {/* Floating product images with AnimatePresence for smooth transitions */}
          <AnimatePresence mode="wait">
            {floatingProducts.map((product, index) => {
              const angle = (index / floatingProducts.length) * Math.PI * 2;
              const radius = 170; // Increased from 130
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;

              return (
                <motion.div
                  key={`${currentProductSet}-${index}`}
                  className="absolute left-1/2 top-1/2"
                  initial={{ opacity: 0, scale: 0, rotate: -180 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    rotate: 0,
                    x: [x, x + 10, x],
                    y: [y, y - 10, y],
                  }}
                  exit={{ opacity: 0, scale: 0, rotate: 180 }}
                  transition={{
                    opacity: { duration: 0.5 },
                    scale: { duration: 0.5, type: "spring" },
                    rotate: { duration: 0.5 },
                    x: {
                      delay: 0.5,
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    y: {
                      delay: 0.5,
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                  style={{
                    marginLeft: -75,
                    marginTop: -75,
                  }}
                >
                  <motion.div
                    className="relative group cursor-pointer"
                    whileHover={{ scale: 1.15, rotate: 5, zIndex: 50 }}
                    animate={{
                      rotate: [0, 3, 0, -3, 0],
                    }}
                    transition={{
                      rotate: {
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    {/* Product card */}
                    <div className="relative w-36 h-36 md:w-40 md:h-40 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/30 backdrop-blur-sm">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="160px"
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                    </div>

                    {/* Badge */}
                    <motion.div
                      className={`absolute -top-3 -right-3 rounded-full bg-gradient-to-br ${product.color} px-3 py-1.5 text-xs font-bold text-white shadow-lg flex items-center gap-1`}
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.3, type: "spring" }}
                    >
                      <Tag weight="fill" className="w-3 h-3" />
                      {product.badge}
                    </motion.div>

                    {/* Product name tooltip */}
                    <motion.div
                      className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ y: -10 }}
                      whileHover={{ y: 0 }}
                    >
                      <div className="bg-card/90 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-medium shadow-lg border border-border">
                        {product.name}
                      </div>
                    </motion.div>
                  </motion.div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Orbiting rings */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={`orbit-${i}`}
              className="absolute left-1/2 top-1/2 w-2 h-2"
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
              style={{
                marginLeft: -2,
                marginTop: -2,
              }}
            >
              <motion.div
                className="w-4 h-4 rounded-full bg-gradient-to-r from-primary to-accent"
                style={{
                  x: 120 + i * 35,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          ))}

          {/* Sparkle effects */}
          {sparkles.map((sparkle) => (
            <motion.div
              key={`sparkle-${sparkle.id}`}
              className="absolute"
              style={{
                left: `${sparkle.x}%`,
                top: `${sparkle.y}%`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: sparkle.duration,
                repeat: Infinity,
                delay: sparkle.delay,
                ease: "easeInOut",
              }}
            >
              <Sparkle
                className="text-primary"
                size={sparkle.size}
                weight="fill"
              />
            </motion.div>
          ))}

          {/* Center featured product with rotation */}
          <motion.div
            className="absolute left-1/2 top-1/2 -ml-24 -mt-24"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5, type: "spring" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={centerProductIndex}
                className="relative w-48 h-48 md:w-52 md:h-52"
                initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 180 }}
                transition={{ duration: 0.6, type: "spring" }}
              >
                {/* Outer rotating ring */}
                <motion.div
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${centerProducts[centerProductIndex].color} opacity-20 blur-xl`}
                  animate={{
                    scale: [1, 1.1, 1],
                    rotate: 360,
                  }}
                  transition={{
                    scale: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                    rotate: {
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  }}
                />

                {/* Product card with gradient border */}
                <motion.div
                  className="relative w-full h-full rounded-3xl p-1 cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                  style={{
                    background: `linear-gradient(135deg, ${centerProducts[centerProductIndex].color})`,
                  }}
                >
                  {/* Inner product image */}
                  <div className="relative w-full h-full rounded-3xl overflow-hidden bg-card shadow-2xl">
                    <Image
                      src={centerProducts[centerProductIndex].image}
                      alt={centerProducts[centerProductIndex].name}
                      fill
                      sizes="200px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />

                    {/* Shine effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
                      initial={{ x: "-100%", y: "-100%" }}
                      whileHover={{ x: "100%", y: "100%" }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* Gradient overlay at bottom */}
                    <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent" />

                    {/* Product name */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <motion.p
                        className="text-white font-bold text-sm md:text-base text-center"
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        {centerProducts[centerProductIndex].name}
                      </motion.p>
                    </div>

                    {/* Featured badge */}
                    <motion.div
                      className="absolute top-3 left-3 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1"
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.4, type: "spring" }}
                    >
                      <Star weight="fill" className="w-3 h-3" />
                      FEATURED
                    </motion.div>
                  </div>
                </motion.div>

                {/* Pulse rings */}
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={`center-pulse-${i}`}
                    className={`absolute inset-0 rounded-full border-2 ${centerProducts[centerProductIndex].color.includes('purple') ? 'border-purple-500' : centerProducts[centerProductIndex].color.includes('blue') ? 'border-blue-500' : centerProducts[centerProductIndex].color.includes('orange') ? 'border-orange-500' : 'border-green-500'}`}
                    initial={{ opacity: 0.6, scale: 1 }}
                    animate={{
                      opacity: [0.6, 0],
                      scale: [1, 1.4],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeOut",
                    }}
                  />
                ))}

                {/* Floating particles around center product */}
                {[0, 1, 2, 3, 4, 5].map((i) => {
                  const angle = (i / 6) * Math.PI * 2;
                  const distance = 110;
                  return (
                    <motion.div
                      key={`center-particle-${i}`}
                      className={`absolute w-3 h-3 rounded-full bg-gradient-to-r ${centerProducts[centerProductIndex].color}`}
                      style={{
                        left: "50%",
                        top: "50%",
                        marginLeft: -6,
                        marginTop: -6,
                      }}
                      animate={{
                        x: [
                          Math.cos(angle) * distance,
                          Math.cos(angle + 0.5) * (distance + 10),
                          Math.cos(angle) * distance,
                        ],
                        y: [
                          Math.sin(angle) * distance,
                          Math.sin(angle + 0.5) * (distance + 10),
                          Math.sin(angle) * distance,
                        ],
                        scale: [1, 1.5, 1],
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Progress dots indicator */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {productSets.map((_, index) => (
              <motion.button
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentProductSet
                    ? "bg-primary w-6"
                    : "bg-border hover:bg-primary/50"
                }`}
                onClick={() => setCurrentProductSet(index)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
