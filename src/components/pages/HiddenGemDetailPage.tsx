import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Compass, ArrowLeft, Tag } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { HiddenGems } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function HiddenGemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [gem, setGem] = useState<HiddenGems | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadGem();
  }, [id]);

  const loadGem = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const data = await BaseCrudService.getById<HiddenGems>('hiddengems', id);
      setGem(data);
    } catch (error) {
      console.error('Error loading hidden gem:', error);
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
        ) : !gem ? (
          <div className="min-h-[600px] flex flex-col items-center justify-center">
            <h2 className="font-heading text-4xl text-foreground mb-4">Hidden Gem Not Found</h2>
            <p className="font-paragraph text-lg text-foreground/70 mb-8">
              The hidden gem you're looking for doesn't exist.
            </p>
            <Link
              to="/hidden-gems"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-paragraph text-base px-6 py-3 hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Hidden Gems
            </Link>
          </div>
        ) : (
          <>
            {/* Hero Image */}
            <section className="relative w-full h-[70vh] overflow-hidden">
              <Image
                src={gem.image || 'https://static.wixstatic.com/media/1d4ec0_7f249a706aaf42a283f9c50a3346c148~mv2.png?originWidth=1920&originHeight=704'}
                alt={gem.placeName || 'Hidden gem'}
                className="w-full h-full object-cover"
                width={1920}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 z-10">
                <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16 pb-12">
                  <Link
                    to="/hidden-gems"
                    className="inline-flex items-center gap-2 text-white/90 hover:text-white font-paragraph text-base mb-6 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Hidden Gems
                  </Link>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {gem.category && (
                      <div className="inline-block bg-primary text-primary-foreground px-4 py-2 font-paragraph text-sm mb-4">
                        {gem.category}
                      </div>
                    )}
                    <h1 className="font-heading text-5xl md:text-7xl text-white mb-4">
                      {gem.placeName}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-white/90">
                      <div className="flex items-center gap-2 font-paragraph text-lg">
                        <MapPin className="w-5 h-5" />
                        {gem.location}
                      </div>
                      {gem.estimatedBudget && (
                        <div className="flex items-center gap-2 font-paragraph text-lg">
                          <DollarSign className="w-5 h-5" />
                          {gem.estimatedBudget}
                        </div>
                      )}
                    </div>
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
                        {gem.shortDescription}
                      </p>

                      {gem.recommendedActivity && (
                        <div className="bg-beige p-8 mb-8">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary flex items-center justify-center flex-shrink-0">
                              <Compass className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-heading text-2xl text-foreground mb-3">
                                Recommended Activity
                              </h3>
                              <p className="font-paragraph text-base text-foreground/80">
                                {gem.recommendedActivity}
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
                        {gem.category && (
                          <div>
                            <div className="flex items-center gap-2 text-foreground/60 font-paragraph text-sm mb-2">
                              <Tag className="w-4 h-4" />
                              Category
                            </div>
                            <p className="font-paragraph text-base text-foreground font-medium">
                              {gem.category}
                            </p>
                          </div>
                        )}

                        {gem.location && (
                          <div>
                            <div className="flex items-center gap-2 text-foreground/60 font-paragraph text-sm mb-2">
                              <MapPin className="w-4 h-4" />
                              Location
                            </div>
                            <p className="font-paragraph text-base text-foreground font-medium">
                              {gem.location}
                            </p>
                          </div>
                        )}

                        {gem.estimatedBudget && (
                          <div>
                            <div className="flex items-center gap-2 text-foreground/60 font-paragraph text-sm mb-2">
                              <DollarSign className="w-4 h-4" />
                              Estimated Budget
                            </div>
                            <p className="font-paragraph text-base text-foreground font-medium">
                              {gem.estimatedBudget}
                            </p>
                          </div>
                        )}

                        {gem.recommendedActivity && (
                          <div>
                            <div className="flex items-center gap-2 text-foreground/60 font-paragraph text-sm mb-2">
                              <Compass className="w-4 h-4" />
                              Recommended Activity
                            </div>
                            <p className="font-paragraph text-base text-foreground font-medium">
                              {gem.recommendedActivity}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="mt-8 pt-8 border-t border-foreground/10">
                        <Link
                          to="/hidden-gems"
                          className="block w-full text-center bg-primary text-primary-foreground font-paragraph text-base px-6 py-3 hover:bg-primary/90 transition-colors"
                        >
                          Explore More Gems
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
