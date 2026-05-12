import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full bg-forest-green text-white">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About Section */}
          <div>
            <h3 className="font-heading text-2xl mb-6">Haven Explorer</h3>
            <p className="font-paragraph text-base text-white/80 mb-6">
              Discover hidden gems and authentic experiences around Batu Pahat. Your guide to local adventures.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-primary flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-2xl mb-6">Quick Links</h3>
            <nav className="space-y-3">
              <Link
                to="/"
                className="block font-paragraph text-base text-white/80 hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                to="/hidden-gems"
                className="block font-paragraph text-base text-white/80 hover:text-white transition-colors"
              >
                Hidden Gems
              </Link>
              <Link
                to="/food-recommendations"
                className="block font-paragraph text-base text-white/80 hover:text-white transition-colors"
              >
                Food Recommendations
              </Link>
              <Link
                to="/gallery"
                className="block font-paragraph text-base text-white/80 hover:text-white transition-colors"
              >
                Gallery
              </Link>
              <Link
                to="/blog"
                className="block font-paragraph text-base text-white/80 hover:text-white transition-colors"
              >
                Blog
              </Link>
            </nav>
          </div>

          {/* More Links */}
          <div>
            <h3 className="font-heading text-2xl mb-6">More</h3>
            <nav className="space-y-3">
              <Link
                to="/about"
                className="block font-paragraph text-base text-white/80 hover:text-white transition-colors"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="block font-paragraph text-base text-white/80 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-2xl mb-6">Contact</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <p className="font-paragraph text-base text-white/80">
                  Universiti Tun Hussein Onn Malaysia<br />
                  Parit Raja, Batu Pahat, Johor
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 flex-shrink-0" />
                <a
                  href="mailto:info@havenexplorer.com"
                  className="font-paragraph text-base text-white/80 hover:text-white transition-colors"
                >pro@uthm.edu.my</a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 flex-shrink-0" />
                <a
                  href="tel:+60123456789"
                  className="font-paragraph text-base text-white/80 hover:text-white transition-colors"
                >+607 9507000</a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-paragraph text-sm text-white/70 text-center md:text-left">
              © {new Date().getFullYear()} Haven Explorer. A BIW20303 Web Design Project by UTHM Students.
            </p>
            <p className="font-paragraph text-sm text-white/70 text-center md:text-right">By Section 9 Group 1</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
