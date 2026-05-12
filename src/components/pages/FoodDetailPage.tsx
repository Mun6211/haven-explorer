import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, ArrowLeft, Utensils } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { FoodRecommendations } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function FoodDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [foodSpot, setFoodSpot] = useState<FoodRecommendations | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFoodSpot();
  }, [id]);

  const loadFoodSpot = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const data = await BaseCrudService.getById<FoodRecommendations>('foodrecommendations', id);
      setFoodSpot(data);
    } catch (error) {
      console.error('Error loading food recommendation:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="pt-20">
        {isLoading ? (
          <div className="min-h-[600px] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : !foodSpot ? (
          <div className="min-h-[600px] flex flex-col items-center justify-center">
            <h2 className="font-heading text-4xl text-foreground mb-4">Food Spot Not Found</h2>
            <p className="font-paragraph text-lg text-foreground/70 mb-8">
              The food recommendation you're looking for doesn't exist.
            </p>
            <Link
              to="/food-recommendations"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-paragraph text-base px-6 py-3 hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Food Recommendations
            </Link>
          </div>
        ) : (
          <>
            {/* Hero Image */}
            <section className="relative w-full h-[70vh] overflow-hidden">
              <Image
                src={foodSpot.foodImage || 'https://static.wixstatic.com/media/1d4ec0_bba59ae51f7445bfbac71f64bb51031c~mv2.png?originWidth=1344&originHeight=704'}
                alt={foodSpot.shopName || 'Food spot'}
                className="w-full h-full object-cover"
                width={1920}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 z-10">
                <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16 pb-12">
                  <Link
                    to="/food-recommendations"
                    className="inline-flex items-center gap-2 text-white/90 hover:text-white font-paragraph text-base mb-6 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Food Recommendations
                  </Link>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {foodSpot.priceRange && (
                      <div className="inline-block bg-primary text-primary-foreground px-4 py-2 font-paragraph text-sm mb-4">
                        {foodSpot.priceRange}
                      </div>
                    )}
                    <h1 className="font-heading text-5xl md:text-7xl text-white mb-4">
                      {foodSpot.shopName}
                    </h1>
                    {foodSpot.popularDish && (
                      <p className="font-paragraph text-2xl md:text-3xl text-primary mb-4">
                        {foodSpot.popularDish}
                      </p>
                    )}
                    {foodSpot.location && (
                      <div className="flex items-center gap-2 text-white/90 font-paragraph text-lg">
                        <MapPin className="w-5 h-5" />
                        {foodSpot.location}
                      </div>
                    )}
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Content Section */}
            <section className="w-full py-20 bg-background">
              <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  {/* Main Content */}
                  <div className="lg:col-span-2">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                    >
                      <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
                        About This Place
                      </h2>
                      <p className="font-paragraph text-lg text-foreground/80 leading-relaxed mb-8">
                        {foodSpot.description}
                      </p>

                      {foodSpot.popularDish && (
                        <div className="bg-beige p-8">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary flex items-center justify-center flex-shrink-0">
                              <Utensils className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-heading text-2xl text-foreground mb-3">
                                Must-Try Dish
                              </h3>
                              <p className="font-paragraph text-lg text-foreground/80 font-medium">
                                {foodSpot.popularDish}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>

                  {/* Sidebar */}
                  <div className="lg:col-span-1">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="bg-white p-8 sticky top-32"
                    >
                      <h3 className="font-heading text-2xl text-foreground mb-6">
                        Quick Info
                      </h3>
                      <div className="space-y-6">
                        {foodSpot.shopName && (
                          <div>
                            <div className="flex items-center gap-2 text-foreground/60 font-paragraph text-sm mb-2">
                              <Utensils className="w-4 h-4" />
                              Shop Name
                            </div>
                            <p className="font-paragraph text-base text-foreground font-medium">
                              {foodSpot.shopName}
                            </p>
                          </div>
                        )}

                        {foodSpot.popularDish && (
                          <div>
                            <div className="flex items-center gap-2 text-foreground/60 font-paragraph text-sm mb-2">
                              <Utensils className="w-4 h-4" />
                              Popular Dish
                            </div>
                            <p className="font-paragraph text-base text-foreground font-medium">
                              {foodSpot.popularDish}
                            </p>
                          </div>
                        )}

                        {foodSpot.priceRange && (
                          <div>
                            <div className="flex items-center gap-2 text-foreground/60 font-paragraph text-sm mb-2">
                              <DollarSign className="w-4 h-4" />
                              Price Range
                            </div>
                            <p className="font-paragraph text-base text-foreground font-medium">
                              {foodSpot.priceRange}
                            </p>
                          </div>
                        )}

                        {foodSpot.location && (
                          <div>
                            <div className="flex items-center gap-2 text-foreground/60 font-paragraph text-sm mb-2">
                              <MapPin className="w-4 h-4" />
                              Location
                            </div>
                            <p className="font-paragraph text-base text-foreground font-medium">
                              {foodSpot.location}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="mt-8 pt-8 border-t border-foreground/10">
                        <Link
                          to="/food-recommendations"
                          className="block w-full text-center bg-primary text-primary-foreground font-paragraph text-base px-6 py-3 hover:bg-primary/90 transition-colors"
                        >
                          Explore More Food Spots
                        </Link>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
