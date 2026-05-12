import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, User, Tag, Search } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { TravelStories } from '@/entities';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function BlogPage() {
  const [stories, setStories] = useState<TravelStories[]>([]);
  const [filteredStories, setFilteredStories] = useState<TravelStories[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    loadStories();
  }, [skip]);

  useEffect(() => {
    filterStories();
  }, [stories, searchTerm, selectedCategory]);

  const loadStories = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<TravelStories>('travelstories', {}, { limit: 50, skip });
      setStories(result.items);
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading travel stories:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterStories = () => {
    let filtered = [...stories];

    if (searchTerm) {
      filtered = filtered.filter(
        (story) =>
          story.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          story.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          story.author?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((story) => story.category === selectedCategory);
    }

    setFilteredStories(filtered);
  };

  const categories = ['all', ...Array.from(new Set(stories.map((story) => story.category).filter(Boolean)))];

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
            src="https://static.wixstatic.com/media/1d4ec0_4afa04bdc3b04d8a805101f89d4b3f7e~mv2.png?originWidth=1920&originHeight=704"
            alt="Travel stories from Batu Pahat"
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
              Travel Stories
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Read authentic experiences and travel guides from Batu Pahat explorers
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="w-full py-12 bg-beige">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
                <Input
                  type="text"
                  placeholder="Search stories by title, content, or author..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 font-paragraph text-base bg-white border-0"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className={`font-paragraph text-sm px-6 h-12 ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-white text-foreground border-foreground/20 hover:bg-foreground/5'
                  }`}
                >
                  {category === 'all' ? 'All Stories' : category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="w-full py-20 bg-background">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="min-h-[600px]">
            {isLoading ? null : filteredStories.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredStories.map((story, index) => (
                  <motion.div
                    key={story._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Link to={`/blog/${story._id}`} className="group block">
                      <div className="bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={story.mainImage || 'https://static.wixstatic.com/media/1d4ec0_0ba85efe357d4c33aa5cddae66d6aaa9~mv2.png?originWidth=384&originHeight=384'}
                            alt={story.title || 'Travel story'}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            width={400}
                          />
                          {story.category && (
                            <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-4 py-2 font-paragraph text-sm">
                              {story.category}
                            </div>
                          )}
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="font-heading text-2xl text-foreground mb-3 line-clamp-2">
                            {story.title}
                          </h3>
                          <p className="font-paragraph text-base text-foreground/70 mb-4 line-clamp-3 flex-1">
                            {story.content}
                          </p>
                          <div className="space-y-2">
                            {story.author && (
                              <div className="flex items-center gap-2 text-foreground/60 font-paragraph text-sm">
                                <User className="w-4 h-4 flex-shrink-0" />
                                <span>{story.author}</span>
                              </div>
                            )}
                            {story.publishDate && (
                              <div className="flex items-center gap-2 text-foreground/60 font-paragraph text-sm">
                                <Calendar className="w-4 h-4 flex-shrink-0" />
                                <span>
                                  {new Date(story.publishDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                            )}
                            {story.category && (
                              <div className="flex items-center gap-2 text-forest-green font-paragraph text-sm">
                                <Tag className="w-4 h-4 flex-shrink-0" />
                                <span>{story.category}</span>
                              </div>
                            )}
                          </div>
                          <div className="mt-4 pt-4 border-t border-foreground/10">
                            <span className="font-paragraph text-sm text-primary group-hover:underline">
                              Read More →
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-lg text-foreground/60">
                  {searchTerm || selectedCategory !== 'all'
                    ? 'No stories match your filters. Try adjusting your search.'
                    : 'No travel stories available yet.'}
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
                Load More Stories
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
