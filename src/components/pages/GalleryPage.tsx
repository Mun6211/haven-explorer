import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, User } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { PhotoGallery } from '@/entities';
import { Button } from '@/components/ui/button';

export default function GalleryPage() {
  const [photos, setPhotos] = useState<PhotoGallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    loadPhotos();
  }, [skip]);

  const loadPhotos = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<PhotoGallery>('photogallery', {}, { limit: 50, skip });
      setPhotos(result.items);
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading gallery photos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = () => {
    setSkip(skip + 50);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/1d4ec0_3262e45808cb42c1bfb95687273f33f9~mv2.png?originWidth=1920&originHeight=704"
            alt="Photo gallery of Batu Pahat"
            className="w-full h-full object-cover"
            width={1920}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/70"></div>
        </div>

        <div className="relative z-10 max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-5xl md:text-7xl text-white mb-6">
              Photo Gallery
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Captured moments and stunning views from around Batu Pahat
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="w-full py-20 bg-background">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="min-h-[600px]">
            {isLoading ? null : photos.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {photos.map((photo, index) => (
                  <motion.div
                    key={photo._id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.03 }}
                    className="group relative overflow-hidden bg-white"
                    style={{
                      gridRow: index % 7 === 0 || index % 7 === 3 ? 'span 2' : 'span 1'
                    }}
                  >
                    <div className="relative w-full h-full min-h-[300px]">
                      <Image
                        src={photo.image || 'https://static.wixstatic.com/media/1d4ec0_ab8d2ca845b2439485e20f53caae70c2~mv2.png?originWidth=384&originHeight=256'}
                        alt={photo.caption || 'Gallery photo'}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        width={400}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          {photo.caption && (
                            <h3 className="font-heading text-xl text-white mb-3">
                              {photo.caption}
                            </h3>
                          )}
                          <div className="space-y-2">
                            {photo.location && (
                              <div className="flex items-center gap-2 text-white/90 font-paragraph text-sm">
                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                <span>{photo.location}</span>
                              </div>
                            )}
                            {photo.photographer && (
                              <div className="flex items-center gap-2 text-white/90 font-paragraph text-sm">
                                <User className="w-4 h-4 flex-shrink-0" />
                                <span>{photo.photographer}</span>
                              </div>
                            )}
                            {photo.dateTaken && (
                              <div className="flex items-center gap-2 text-white/90 font-paragraph text-sm">
                                <Calendar className="w-4 h-4 flex-shrink-0" />
                                <span>
                                  {new Date(photo.dateTaken).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-lg text-foreground/60">
                  No photos available yet.
                </p>
              </div>
            )}
          </div>

          {hasNext && !isLoading && (
            <div className="mt-12 text-center">
              <Button
                onClick={loadMore}
                className="bg-primary text-primary-foreground font-paragraph text-base px-8 py-6 hover:bg-primary/90"
              >
                Load More Photos
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
