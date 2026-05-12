import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Facebook, Instagram, Twitter, Send } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { ContactSubmissions } from '@/entities';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all fields before submitting.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);
    try {
      await BaseCrudService.create<ContactSubmissions>('contactsubmissions', {
        _id: crypto.randomUUID(),
        submitterName: formData.name,
        submitterEmail: formData.email,
        submissionSubject: formData.subject,
        submissionMessage: formData.message,
        submissionDate: new Date().toISOString()
      });

      toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting us. We will get back to you soon.'
      });

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: 'Submission Failed',
        description: 'There was an error sending your message. Please try again.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Hero Section */}
      <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden mt-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://static.wixstatic.com/media/1d4ec0_d6113cbc0b394123a34aec190eccdbcc~mv2.png?originWidth=960&originHeight=512"
            alt="Contact Haven Explorer"
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
              Get In Touch
            </h1>
            <p className="font-paragraph text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
              Have questions or suggestions? We'd love to hear from you
            </p>
          </motion.div>
        </div>
      </section>
      {/* Contact Form & Info Section */}
      <section className="w-full py-20 bg-background">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white p-8 md:p-12">
                <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
                  Send Us a Message
                </h2>
                <p className="font-paragraph text-base text-foreground/70 mb-8">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block font-paragraph text-sm text-foreground mb-2">
                      Your Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="w-full h-12 font-paragraph text-base"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block font-paragraph text-sm text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full h-12 font-paragraph text-base"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="block font-paragraph text-sm text-foreground mb-2">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this about?"
                      className="w-full h-12 font-paragraph text-base"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block font-paragraph text-sm text-foreground mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us more about your inquiry..."
                      className="w-full min-h-[160px] font-paragraph text-base resize-none"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground font-paragraph text-base h-12 hover:bg-primary/90 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Contact Details */}
              <div className="bg-beige p-8">
                <h3 className="font-heading text-2xl text-foreground mb-6">
                  Contact Information
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-paragraph text-base text-foreground font-medium mb-1">
                        Location
                      </h4>
                      <p className="font-paragraph text-sm text-foreground/70">
                        Universiti Tun Hussein Onn Malaysia<br />
                        Parit Raja, Batu Pahat, Johor<br />
                        Malaysia
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-paragraph text-base text-foreground font-medium mb-1">
                        Email
                      </h4>
                      <a
                        href="mailto:info@havenexplorer.com"
                        className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors"
                      >pro@uthm.edu.my</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="font-paragraph text-base text-foreground font-medium mb-1">
                        Phone
                      </h4>
                      <a
                        href="tel:+60123456789"
                        className="font-paragraph text-sm text-foreground/70 hover:text-primary transition-colors"
                      >+607 9507000</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="bg-white p-8">
                <h3 className="font-heading text-2xl text-foreground mb-6">
                  Follow Us
                </h3>
                <p className="font-paragraph text-base text-foreground/70 mb-6">
                  Stay connected and get the latest updates on hidden gems and travel stories.
                </p>
                <div className="flex items-center gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-forest-green hover:bg-primary text-white flex items-center justify-center transition-colors"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-forest-green hover:bg-primary text-white flex items-center justify-center transition-colors"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-forest-green hover:bg-primary text-white flex items-center justify-center transition-colors"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                </div>
              </div>

              {/* Office Hours */}
              <div className="bg-beige p-8">
                <h3 className="font-heading text-2xl text-foreground mb-6">
                  Response Time
                </h3>
                <p className="font-paragraph text-base text-foreground/70">
                  We typically respond to inquiries within 24-48 hours during weekdays. For urgent matters, please contact us directly via phone.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Map Section */}
      <section className="w-full py-20 bg-beige">
        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-6">
              Visit Us
            </h2>
            <p className="font-paragraph text-lg text-foreground/70 mb-12 max-w-3xl mx-auto">
              Located at Universiti Tun Hussein Onn Malaysia, Parit Raja, Batu Pahat. We're here to help you discover the best of Batu Pahat.
            </p>
            <div className="bg-white p-4 aspect-video max-w-5xl mx-auto flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
                <p className="font-paragraph text-base text-foreground/60">
                  Interactive map location
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
