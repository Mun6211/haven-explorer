// HPI 1.7-G
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowRight, MapPin, Camera, Utensils, Compass, ArrowUpRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { HiddenGems, FoodRecommendations, PhotoGallery } from '@/entities';

export default function HomePage() {
  // --- DATA FIDELITY PROTOCOL: CANONICAL DATA SOURCES ---
  const [featuredGems, setFeaturedGems] = useState<HiddenGems[]>([]);
  const [featuredFood, setFeaturedFood] = useState<FoodRecommendations[]>([]);
  const [galleryPhotos, setGalleryPhotos] = useState<PhotoGallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [gemsResult, foodResult, galleryResult] = await Promise.all([
        BaseCrudService.getAll<HiddenGems>('hiddengems', {}, { limit: 4 }), // Fetch 4 for a better grid
        BaseCrudService.getAll<FoodRecommendations>('foodrecommendations', {}, { limit: 4 }),
        BaseCrudService.getAll<PhotoGallery>('photogallery', {}, { limit: 5 }) // Fetch 5 for masonry
      ]);
      
      setFeaturedGems(gemsResult.items);
      setFeaturedFood(foodResult.items);
      setGalleryPhotos(galleryResult.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };
  // --- END DATA FIDELITY PROTOCOL ---

  // --- MOTION & PARALLAX SETUP ---
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(heroScroll, [0, 1], ["0%", "40%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);

  const missionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: missionScroll } = useScroll({
    target: missionRef,
    offset: ["start end", "end start"]
  });
  const missionY = useTransform(missionScroll, [0, 1], ["10%", "-10%"]);

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground overflow-clip">
      <style>{`
        .noise-overlay {
          position: fixed;
          top: 0; left: 0; width: 100vw; height: 100vh;
          pointer-events: none;
          z-index: 50;
          opacity: 0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }
        .text-stroke {
          -webkit-text-stroke: 1px rgba(255,255,255,0.3);
          color: transparent;
        }
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
        }
      `}</style>
      
      <div className="noise-overlay" />
      <Header />
      
      {/* 1. HERO SECTION: Immersive Parallax */}
      <section ref={heroRef} className="relative w-full h-[100vh] flex items-center justify-center overflow-hidden bg-black">
        <motion.div 
          className="absolute inset-0 z-0 w-full h-[120%]"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <Image
            src="https://static.wixstatic.com/media/1d4ec0_1330a212a7a14da6aae4423b047051fb~mv2.png?originWidth=1920&originHeight=1024"
            alt="Batu Pahat scenic view"
            className="w-full h-full object-cover opacity-70"
            width={1920}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-background"></div>
        </motion.div>
        
        <div className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-16 flex flex-col items-center text-center mt-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <h1 className="font-heading text-[12vw] leading-[0.85] tracking-tighter text-white uppercase mix-blend-overlay absolute inset-0 text-stroke z-0">
              Haven Explorer
            </h1>
            <h1 className="font-heading text-[12vw] leading-[0.85] tracking-tighter text-white uppercase relative z-10">
              Haven Explorer
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 flex flex-col items-center"
          >
            <p className="font-paragraph text-xl md:text-2xl lg:text-3xl text-beige/90 mb-10 max-w-2xl text-balance font-light tracking-wide">
              Discover the untold stories and hidden gems around Batu Pahat.
            </p>
            
            <Link
              to="/hidden-gems"
              className="group relative inline-flex items-center justify-center gap-4 bg-primary text-primary-foreground font-heading text-lg px-10 py-5 overflow-hidden rounded-full hover:scale-105 transition-transform duration-500 ease-out"
            >
              <span className="relative z-10 flex items-center gap-2">
                Start Exploring <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20"
        >
          <span className="font-paragraph text-xs uppercase tracking-widest text-white/50">Scroll to discover</span>
          <div className="w-[1px] h-12 bg-white/20 overflow-hidden">
            <motion.div 
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-full h-full bg-white"
            />
          </div>
        </motion.div>
      </section>

      {/* 2. MISSION STATEMENT: Sticky Narrative */}
      <section ref={missionRef} className="relative w-full bg-beige py-32 md:py-48 clip-diagonal z-20 -mt-10">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            <div className="lg:col-span-5 relative">
              <div className="sticky top-32">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-[1px] bg-primary" />
                    <span className="font-paragraph text-primary uppercase tracking-widest text-sm font-bold">Our Purpose</span>
                  </div>
                  <h2 className="font-heading text-5xl md:text-7xl text-foreground leading-tight text-balance">
                    Beyond the <br/><span className="text-forest-green italic">Guidebooks.</span>
                  </h2>
                </motion.div>
              </div>
            </div>
            
            <div className="lg:col-span-7 flex flex-col justify-center">
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-paragraph text-2xl md:text-4xl text-foreground/80 leading-relaxed text-balance"
              >
                Haven Explorer is dedicated to uncovering the underrated and lesser-known attractions between Parit Raja and Batu Pahat. 
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="font-paragraph text-lg md:text-xl text-foreground/60 leading-relaxed mt-8 max-w-2xl"
              >
                We help students, young adults, and budget travelers discover authentic local experiences through visual storytelling, detailed descriptions, and practical travel guidance. This is your compass to the unseen.
              </motion.p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED GEMS: The Adventurous Grid */}
      <section className="w-full py-32 bg-background relative z-10">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-5xl md:text-7xl text-foreground mb-4">
                Hidden Gems
              </h2>
              <p className="font-paragraph text-xl text-foreground/60 max-w-xl">
                Curated spots that define the true essence of Batu Pahat.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                to="/hidden-gems"
                className="group inline-flex items-center gap-3 font-heading text-lg text-foreground hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1"
              >
                Explore All Locations
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          {/* Grid Container - Always rendered to prevent ref crashes */}
          <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            {featuredGems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                {featuredGems.map((gem, index) => {
                  // Create an asymmetrical grid layout
                  const isLarge = index === 0 || index === 3;
                  const colSpan = isLarge ? "md:col-span-8" : "md:col-span-4";
                  const heightClass = isLarge ? "h-[60vh]" : "h-[40vh] md:h-[60vh]";

                  return (
                    <motion.div
                      key={gem._id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.7, delay: index * 0.1 }}
                      className={`${colSpan} group relative overflow-hidden bg-beige rounded-2xl`}
                    >
                      <Link to={`/hidden-gems/${gem._id}`} className="block w-full h-full">
                        <div className={`relative w-full ${heightClass} overflow-hidden`}>
                          <Image
                            src={gem.image || 'https://static.wixstatic.com/media/1d4ec0_d51c1a2985be4d14abc3767dd356ce93~mv2.png?originWidth=768&originHeight=576'}
                            alt={gem.placeName || 'Hidden gem'}
                            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                            width={800}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                          
                          {/* Content Overlay */}
                          <div className="absolute inset-0 p-8 flex flex-col justify-end">
                            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                              {gem.category && (
                                <span className="inline-block px-3 py-1 bg-primary/90 text-white font-paragraph text-xs uppercase tracking-wider rounded-full mb-4 backdrop-blur-sm">
                                  {gem.category}
                                </span>
                              )}
                              <h3 className="font-heading text-3xl md:text-4xl text-white mb-2">
                                {gem.placeName}
                              </h3>
                              <div className="flex items-center gap-4 text-white/80 font-paragraph text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {gem.location}</span>
                                {gem.estimatedBudget && <span>• {gem.estimatedBudget}</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="h-[40vh] flex items-center justify-center border-2 border-dashed border-foreground/10 rounded-2xl">
                <p className="font-paragraph text-foreground/50">Awaiting discoveries...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 4. FOOD HIGHLIGHTS: Vertical Sticky Flow */}
      <section className="w-full bg-forest-green text-white py-32 relative z-20">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            
            {/* Sticky Left Column */}
            <div className="lg:col-span-5 relative">
              <div className="sticky top-32">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-[1px] bg-accent-orange" />
                    <span className="font-paragraph text-accent-orange uppercase tracking-widest text-sm font-bold">Local Taste</span>
                  </div>
                  <h2 className="font-heading text-5xl md:text-7xl mb-6">
                    Culinary <br/>Expedition.
                  </h2>
                  <p className="font-paragraph text-lg text-white/70 mb-10 max-w-md">
                    From hidden warungs to legendary street food, savor the authentic flavors that define Batu Pahat's rich culinary landscape.
                  </p>
                  <Link
                    to="/food-recommendations"
                    className="inline-flex items-center gap-3 bg-white text-forest-green font-heading text-base px-8 py-4 rounded-full hover:bg-accent-orange hover:text-white transition-colors duration-300"
                  >
                    View All Eateries
                    <Utensils className="w-4 h-4" />
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Scrolling Right Column */}
            <div className="lg:col-span-7">
              <div className={`flex flex-col gap-8 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                {featuredFood.length > 0 ? (
                  featuredFood.map((food, index) => (
                    <motion.div
                      key={food._id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <Link to={`/food-recommendations/${food._id}`} className="group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 md:p-6 transition-colors duration-300">
                        <div className="flex flex-col md:flex-row gap-6 items-center">
                          <div className="w-full md:w-48 h-48 shrink-0 overflow-hidden rounded-xl">
                            <Image
                              src={food.foodImage || 'https://static.wixstatic.com/media/1d4ec0_999a0d63ceef4eaeb9e53f44cdf09b90~mv2.png?originWidth=256&originHeight=448'}
                              alt={food.shopName || 'Food spot'}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                              width={300}
                            />
                          </div>
                          <div className="flex-1 w-full">
                            <div className="flex justify-between items-start mb-2">
                              <h3 className="font-heading text-2xl md:text-3xl text-white group-hover:text-accent-orange transition-colors">
                                {food.shopName}
                              </h3>
                              <span className="bg-white/10 text-white px-3 py-1 rounded-full font-paragraph text-xs whitespace-nowrap">
                                {food.priceRange}
                              </span>
                            </div>
                            <p className="font-paragraph text-accent-orange text-lg mb-3 font-medium">
                              Must try: {food.popularDish}
                            </p>
                            <p className="font-paragraph text-white/60 text-sm mb-4 line-clamp-2">
                              {food.description}
                            </p>
                            <div className="flex items-center gap-2 text-white/40 font-paragraph text-xs uppercase tracking-wider">
                              <MapPin className="w-3 h-3" />
                              {food.location}
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                ) : (
                  <div className="h-[40vh] flex items-center justify-center border-2 border-dashed border-white/10 rounded-2xl">
                    <p className="font-paragraph text-white/50">Curating the menu...</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. GALLERY: Masonry Showcase */}
      <section className="w-full py-32 bg-beige relative z-10">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="text-center mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-5xl md:text-7xl text-foreground mb-6">
                Visual Journey
              </h2>
              <Link
                to="/gallery"
                className="inline-flex items-center gap-2 font-paragraph text-lg text-primary hover:text-primary/80 transition-colors"
              >
                Open Full Gallery <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
          </div>

          <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            {galleryPhotos.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 auto-rows-[200px] md:auto-rows-[300px]">
                {galleryPhotos.map((photo, index) => {
                  // Create a masonry feel with varying spans
                  let spanClass = "col-span-1 row-span-1";
                  if (index === 0) spanClass = "col-span-2 row-span-2";
                  else if (index === 3) spanClass = "col-span-2 row-span-1";

                  return (
                    <motion.div
                      key={photo._id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className={`${spanClass} relative group overflow-hidden rounded-2xl bg-background`}
                    >
                      <Image
                        src={photo.image || 'https://static.wixstatic.com/media/1d4ec0_cfca815bfeaa4c60bd791eeac032eda1~mv2.png?originWidth=768&originHeight=256'}
                        alt={photo.caption || 'Gallery photo'}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                        width={800}
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                        <p className="font-heading text-white text-xl md:text-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          {photo.caption}
                        </p>
                        {photo.location && (
                          <p className="font-paragraph text-white/70 text-sm mt-2 flex items-center gap-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                            <MapPin className="w-3 h-3" /> {photo.location}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="h-[40vh] flex items-center justify-center border-2 border-dashed border-foreground/10 rounded-2xl">
                <p className="font-paragraph text-foreground/50">Developing photos...</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. WHY EXPLORE: The Value Proposition */}
      <section className="w-full py-32 bg-background relative z-10 border-t border-foreground/5">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-6">
              The Haven Experience
            </h2>
            <p className="font-paragraph text-lg md:text-xl text-foreground/60 max-w-3xl mx-auto">
              Why Batu Pahat should be your next destination.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              {
                icon: MapPin,
                title: 'Uncharted Territory',
                description: 'Step off the beaten path and discover locations absent from mainstream guides.'
              },
              {
                icon: Utensils,
                title: 'Culinary Heritage',
                description: 'Experience generations of flavor in unassuming local eateries and street stalls.'
              },
              {
                icon: Camera,
                title: 'Visual Poetry',
                description: 'From historic streets to serene landscapes, every corner offers a unique frame.'
              },
              {
                icon: Compass,
                title: 'Accessible Adventure',
                description: 'Rich experiences that respect your budget, perfect for students and young explorers.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group flex flex-col items-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-beige flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-300">
                  <item.icon className="w-8 h-8 text-forest-green group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-heading text-2xl text-foreground mb-4">
                  {item.title}
                </h3>
                <p className="font-paragraph text-base text-foreground/60 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}