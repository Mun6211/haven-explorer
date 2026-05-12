import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Users, Lightbulb, GraduationCap } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { TeamMembers } from '@/entities';

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMembers[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTeamMembers();
  }, []);

  const loadTeamMembers = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<TeamMembers>('teammembers', {}, { limit: 50 });
      setTeamMembers(result.items);
    } catch (error) {
      console.error('Error loading team members:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[60vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/1d4ec0_e00144e062514f0191c0efc03ad81ade~mv2.png?originWidth=1920&originHeight=704"
            alt="About Haven Explorer"
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
              About Us
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Connecting students and travelers with the hidden treasures of Batu Pahat
            </p>
          </motion.div>
        </div>
      </section>

      {/* Project Introduction */}
      <section className="w-full py-20 bg-background">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto text-center mb-20"
          >
            <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-8">
              Project Introduction
            </h2>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 leading-relaxed mb-6">
              Haven Explorer is a university Web Design project (BIW20303) developed by students at Universiti Tun Hussein Onn Malaysia (UTHM). This tourism discovery website showcases the underrated and lesser-known attractions between Parit Raja and Batu Pahat, making it easier for students, young adults, and budget travelers to explore authentic local experiences.
            </p>
            <p className="font-paragraph text-lg md:text-xl text-foreground/80 leading-relaxed">
              The project demonstrates comprehensive requirements analysis, information architecture, responsive design principles, semantic HTML5, CSS3 styling, and professional web development practices suitable for academic presentation and real-world deployment.
            </p>
          </motion.div>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: 'Our Mission',
                description: 'To promote underrated local attractions and help travelers discover authentic experiences in Batu Pahat through visual storytelling and practical guidance.'
              },
              {
                icon: Users,
                title: 'Target Audience',
                description: 'Students, young professionals aged 18-35, budget travelers, and local tourists seeking hidden gems and authentic local experiences.'
              },
              {
                icon: Lightbulb,
                title: 'Problem Solved',
                description: 'Addressing the gap in accessible information about lesser-known attractions, making local tourism discovery easier and more engaging.'
              },
              {
                icon: GraduationCap,
                title: 'Academic Project',
                description: 'A comprehensive Web Design project demonstrating modern web development techniques, responsive design, and user-centered design principles.'
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-8 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary mb-6">
                  <item.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-heading text-2xl text-foreground mb-4">
                  {item.title}
                </h3>
                <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="w-full py-20 bg-forest-green text-white">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto text-center"
          >
            <h2 className="font-heading text-4xl md:text-6xl mb-8">
              Our Mission Statement
            </h2>
            <p className="font-paragraph text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
              "To create an accessible, visually engaging platform that connects students and travelers with the hidden gems of Batu Pahat, promoting local tourism through authentic storytelling, practical information, and community-driven content."
            </p>
            <p className="font-paragraph text-lg text-white/80 leading-relaxed">
              We believe that every corner of Batu Pahat has a story to tell. By combining modern web design with local knowledge, we aim to inspire exploration, support local businesses, and create memorable experiences for budget-conscious travelers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Team Members */}
      <section className="w-full py-20 bg-background">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-6">
              Meet Our Team
            </h2>
            <p className="font-paragraph text-lg md:text-xl text-foreground/70 max-w-3xl mx-auto">
              The passionate students behind Haven Explorer
            </p>
          </motion.div>

          <div className="min-h-[400px]">
            {isLoading ? null : teamMembers.length > 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {teamMembers.map((member, index) => (
                  <motion.div
                    key={member._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={member.image || 'https://static.wixstatic.com/media/1d4ec0_9665a55f085146389f4b3292530e6e11~mv2.png?originWidth=256&originHeight=384'}
                        alt={member.name || 'Team member'}
                        className="w-full h-full object-cover"
                        width={300}
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="font-heading text-2xl text-foreground mb-2">
                        {member.name}
                      </h3>
                      <p className="font-paragraph text-base text-primary mb-3 font-medium">
                        {member.role}
                      </p>
                      {member.major && (
                        <p className="font-paragraph text-sm text-foreground/60 mb-4">
                          {member.major}
                        </p>
                      )}
                      {member.bio && (
                        <p className="font-paragraph text-sm text-foreground/70 leading-relaxed">
                          {member.bio}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="text-center py-20">
                <p className="font-paragraph text-lg text-foreground/60">
                  Team information will be available soon.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Supervisor Section */}
      <section className="w-full py-20 bg-beige">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary mb-6">
              <GraduationCap className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-6">
              Project Supervisor
            </h2>
            <p className="font-paragraph text-2xl md:text-3xl text-primary mb-4 font-medium">
              Dr. Tay Xin Hui
            </p>
            <p className="font-paragraph text-lg text-foreground/70 leading-relaxed">
              This project is supervised by Dr. Tay Xin Hui as part of the BIW20303 Web Design course at Universiti Tun Hussein Onn Malaysia. We are grateful for the guidance and support throughout the development of Haven Explorer.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Competitive Advantage */}
      <section className="w-full py-20 bg-background">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="font-heading text-4xl md:text-6xl text-foreground mb-12 text-center">
              What Makes Us Different
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8">
                <h3 className="font-heading text-2xl text-foreground mb-4">
                  Local Focus
                </h3>
                <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                  Unlike TripAdvisor or Google Maps, we focus exclusively on hidden gems and lesser-known attractions in Batu Pahat, providing deeper local insights and authentic experiences.
                </p>
              </div>
              <div className="bg-white p-8">
                <h3 className="font-heading text-2xl text-foreground mb-4">
                  Visual Storytelling
                </h3>
                <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                  We emphasize rich visual content and narrative-driven travel stories that inspire exploration, going beyond simple listings and reviews.
                </p>
              </div>
              <div className="bg-white p-8">
                <h3 className="font-heading text-2xl text-foreground mb-4">
                  Student-Friendly
                </h3>
                <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                  Designed specifically for students and budget travelers, with practical information about costs, accessibility, and recommended activities.
                </p>
              </div>
              <div className="bg-white p-8">
                <h3 className="font-heading text-2xl text-foreground mb-4">
                  Community-Driven
                </h3>
                <p className="font-paragraph text-base text-foreground/70 leading-relaxed">
                  Built by local students for the community, ensuring authentic recommendations and up-to-date information about the area.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
