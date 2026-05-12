import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, DollarSign, Search } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { FoodRecommendations } from '@/entities';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const FOOD_CATEGORIES = [
  'Malay Cuisine',
  'Chinese Cuisine',
  'Indian Cuisine',
  'Peranakan/Nyonya Cuisine',
  'Street Food',
  'Regional Johor Specialties',
  'Festive Foods'
];

export default function FoodRecommendationsPage() {
  const [foodSpots, setFoodSpots] = useState<FoodRecommendations[]>([]);
  const [filteredSpots, setFilteredSpots] = useState<FoodRecommendations[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    loadFoodSpots();
  }, [skip]);

  useEffect(() => {
    filterSpots();
  }, [foodSpots, searchTerm, selectedCategory]);

  const loadFoodSpots = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<FoodRecommendations>('foodrecommendations', {}, { limit: 50, skip });
      setFoodSpots(result.items);
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading food recommendations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const filterSpots = () => {
    let filtered = [...foodSpots];

    if (selectedCategory) {
      filtered = filtered.filter(
        (spot) => spot.category === selectedCategory
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (spot) =>
          spot.shopName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          spot.popularDish?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          spot.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          spot.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSpots(filtered);
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
            src="https://static.wixstatic.com/media/1d4ec0_ea326a8c4ed843c68284d16b65a49d94~mv2.png?originWidth=1920&originHeight=704"
            alt="Food recommendations in Batu Pahat"
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
              Food Recommendations
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Discover authentic local flavors and must-try dishes in Batu Pahat
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category & Search Section */}
      <section className="w-full py-12 bg-beige">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          {/* Categories */}
          <div className="mb-8">
            <h2 className="font-heading text-2xl text-foreground mb-4">Explore by Cuisine</h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setSelectedCategory('')}
                className={`px-4 py-2 font-paragraph text-sm font-medium transition-all duration-300 ${
                  selectedCategory === ''
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-white text-foreground hover:bg-primary/10'
                }`}
              >
                All Categories
              </button>
              {FOOD_CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 font-paragraph text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-white text-foreground hover:bg-primary/10'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="max-w-2xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
              <Input
                type="text"
                placeholder="Search by shop name, dish, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 font-paragraph text-base bg-white border-0"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Food Spots Grid */}
      <section className="w-full py-20 bg-background">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="min-h-[600px]">
            {isLoading ? null : filteredSpots.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {filteredSpots.map((spot, index) => (
                  <motion.div
                    key={spot._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                  >
                    <Link to={`/food-recommendations/${spot._id}`} className="group block">
                      <div className="bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
                        <div className="relative h-72 overflow-hidden">
                          <Image
                            src={spot.foodImage || 'https://static.wixstatic.com/media/1d4ec0_eb8f82ec6e16414ea03fac5d176550a3~mv2.png?originWidth=384&originHeight=256'}
                            alt={spot.shopName || 'Food spot'}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            width={400}
                          />
                          {spot.priceRange && (
                            <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 font-paragraph text-sm font-medium">
                              {spot.priceRange}
                            </div>
                          )}
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="font-heading text-2xl text-foreground mb-2">
                            {spot.shopName}
                          </h3>
                          <p className="font-paragraph text-lg text-primary mb-3 font-medium">
                            {spot.popularDish}
                          </p>
                          <p className="font-paragraph text-base text-foreground/70 mb-4 line-clamp-3 flex-1">
                            {spot.description}
                          </p>
                          <div className="space-y-2">
                            {spot.location && (
                              <div className="flex items-center gap-2 text-forest-green font-paragraph text-sm">
                                <MapPin className="w-4 h-4 flex-shrink-0" />
                                <span className="line-clamp-1">{spot.location}</span>
                              </div>
                            )}
                            {spot.priceRange && (
                              <div className="flex items-center gap-2 text-primary font-paragraph text-sm font-medium">
                                <DollarSign className="w-4 h-4 flex-shrink-0" />
                                <span>{spot.priceRange}</span>
                              </div>
                            )}
                          </div>
                          <div className="mt-4 pt-4 border-t border-foreground/10">
                            <span className="font-paragraph text-sm text-primary group-hover:underline">
                              View Details →
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
                  {searchTerm
                    ? 'No food spots match your search. Try different keywords.'
                    : 'No food recommendations available yet.'}
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
                Load More
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
