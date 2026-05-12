import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, ArrowLeft, Lightbulb } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { TravelStories } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [story, setStory] = useState<TravelStories | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadStory();
  }, [id]);

  const loadStory = async () => {
    if (!id) return;
    setIsLoading(true);
    try {
      const data = await BaseCrudService.getById<TravelStories>('travelstories', id);
      setStory(data);
    } catch (error) {
      console.error('Error loading travel story:', error);
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
        ) : !story ? (
          <div className="min-h-[600px] flex flex-col items-center justify-center">
            <h2 className="font-heading text-4xl text-foreground mb-4">Story Not Found</h2>
            <p className="font-paragraph text-lg text-foreground/70 mb-8">
              The travel story you're looking for doesn't exist.
            </p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-paragraph text-base px-6 py-3 hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </Link>
          </div>
        ) : (
          <>
            {/* Hero Image */}
            <section className="relative w-full h-[70vh] overflow-hidden">
              <Image
                src={story.mainImage || 'https://static.wixstatic.com/media/1d4ec0_9903f66ffb6b47ba9f7ac0d516e9be00~mv2.png?originWidth=1920&originHeight=704'}
                alt={story.title || 'Travel story'}
                className="w-full h-full object-cover"
                width={1920}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              
              <div className="absolute bottom-0 left-0 right-0 z-10">
                <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16 pb-12">
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-white/90 hover:text-white font-paragraph text-base mb-6 transition-colors"
                  >
                    <ArrowLeft className="w-5 h-5" />
                    Back to Blog
                  </Link>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {story.category && (
                      <div className="inline-block bg-primary text-primary-foreground px-4 py-2 font-paragraph text-sm mb-4">
                        {story.category}
                      </div>
                    )}
                    <h1 className="font-heading text-4xl md:text-6xl text-white mb-6 max-w-5xl">
                      {story.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-6 text-white/90">
                      {story.author && (
                        <div className="flex items-center gap-2 font-paragraph text-base">
                          <User className="w-5 h-5" />
                          {story.author}
                        </div>
                      )}
                      {story.publishDate && (
                        <div className="flex items-center gap-2 font-paragraph text-base">
                          <Calendar className="w-5 h-5" />
                          {new Date(story.publishDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
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
                      <div className="prose prose-lg max-w-none">
                        <p className="font-paragraph text-lg text-foreground/80 leading-relaxed whitespace-pre-line">
                          {story.content}
                        </p>
                      </div>

                      {story.travelTips && (
                        <div className="bg-beige p-8 mt-12">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-primary flex items-center justify-center flex-shrink-0">
                              <Lightbulb className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-heading text-2xl text-foreground mb-4">
                                Travel Tips
                              </h3>
                              <p className="font-paragraph text-base text-foreground/80 leading-relaxed whitespace-pre-line">
                                {story.travelTips}
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
                        Story Info
                      </h3>
                      <div className="space-y-6">
                        {story.author && (
                          <div>
                            <div className="flex items-center gap-2 text-foreground/60 font-paragraph text-sm mb-2">
                              <User className="w-4 h-4" />
                              Author
                            </div>
                            <p className="font-paragraph text-base text-foreground font-medium">
                              {story.author}
                            </p>
                          </div>
                        )}

                        {story.publishDate && (
                          <div>
                            <div className="flex items-center gap-2 text-foreground/60 font-paragraph text-sm mb-2">
                              <Calendar className="w-4 h-4" />
                              Published
                            </div>
                            <p className="font-paragraph text-base text-foreground font-medium">
                              {new Date(story.publishDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })}
                            </p>
                          </div>
                        )}

                        {story.category && (
                          <div>
                            <div className="flex items-center gap-2 text-foreground/60 font-paragraph text-sm mb-2">
                              <Tag className="w-4 h-4" />
                              Category
                            </div>
                            <p className="font-paragraph text-base text-foreground font-medium">
                              {story.category}
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="mt-8 pt-8 border-t border-foreground/10">
                        <Link
                          to="/blog"
                          className="block w-full text-center bg-primary text-primary-foreground font-paragraph text-base px-6 py-3 hover:bg-primary/90 transition-colors"
                        >
                          Read More Stories
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
