import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter, Heart } from "lucide-react";
import NewsletterSubscribe from "./subcribe";

export function Footer() {
  return (
    <footer className="bg-wood-dark text-wood-cream">
      {/* Main Footer */}
      <NewsletterSubscribe />
      <div className="container-luxury section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <img
              src="/logo.png"
              alt="La Roza Nature Resort"
              className=" transition-all duration-300"
            />
            <p className="text-wood-cream/70 text-body">
              Experience luxury in harmony with nature.
            </p>
            <div className="flex gap-4 pt-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-wood-cream/30 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-wood-cream/30 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full border border-wood-cream/30 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-label text-secondary">Quick Links</h4>
            <nav className="flex flex-col gap-3">
              <Link to="/" className="text-wood-cream/70 hover:text-secondary transition-colors">
                Home
              </Link>
              <Link to="/rooms" className="text-wood-cream/70 hover:text-secondary transition-colors">
                Rooms & Suites
              </Link>
              <Link to="/restaurant" className="text-wood-cream/70 hover:text-secondary transition-colors">
                Restaurant
              </Link>
              <Link to="/about" className="text-wood-cream/70 hover:text-secondary transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-wood-cream/70 hover:text-secondary transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-label text-secondary">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary mt-0.5" />
                <span className="text-wood-cream/70">
                  Transformer Lane, Senyange Hill,<br /> Masaka City
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary" />
                <a href="tel:+1234567890" className="text-wood-cream/70 hover:text-secondary">
                  +256 200 920779 / +256 783 937 542
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary" />
                <a href="mailto:info@laRozanature.com" className="text-wood-cream/70 hover:text-secondary">
                  booking@larozaresort.com
                </a>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="text-label text-secondary">Hours</h4>
            <div className="space-y-3">
              <div className="pt-2 text-wood-cream/70">
                <p className="font-medium text-wood-cream">Restaurant Hours</p>
                <p>Breakfast: 7:00 AM - 10:30 AM</p>
                <p>Lunch: 12:00 PM - 3:00 PM</p>
                <p>Dinner: 6:00 PM - 10:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-wood-cream/10">
        <div className="container-luxury px-4 md:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-wood-cream/50 text-sm">
            © {new Date().getFullYear()} La Roza Nature Resort. All rights reserved.
          </p>

          {/* Made with love by Lane Technologies */}
          {/* <div className="flex items-center gap-2 text-wood-cream/50 text-sm">
            <span>Made with</span>
            <Heart className="w-3 h-3 text-red-400 fill-red-400" />
            <span>by</span>
            <a
              href="https://wa.me/256727136918"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-secondary transition-colors font-medium"
            >
              Lane Technologies
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
}