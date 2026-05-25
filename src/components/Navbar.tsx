import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About us", path: "/about" },
  { name: "Rooms", path: "/rooms" },
  { name: "Restaurant", path: "/restaurant" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
  { name: "Events", path: "/events" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
        ? "bg-white shadow-md lg:bg-background/95 lg:backdrop-blur-md lg:shadow-soft py-2 lg:py-3"
        : "bg-transparent py-3 lg:py-5"
        }`}
    >
      <nav className="container-luxury px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src={scrolled ? "./logo.png" : "./logo.png"}
            alt="La Roza Nature Resort"
            className="h-16 lg:h-20 w-auto w-auto transition-all duration-300 lg:hidden"
          />
          <img
            src={scrolled ? "/logo.png" : "/logo.png"}
            alt="La Roza Nature Resort"
            className="h-36 lg:h-20 w-auto transition-all duration-300 hidden lg:block"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-sm font-medium tracking-wide transition-colors duration-300 hover:text-secondary ${location.pathname === link.path
                ? "text-secondary"
                : scrolled
                  ? "text-foreground"
                  : "text-wood-cream"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+256200920779"
            className={`flex items-center gap-2 text-sm transition-colors duration-300 ${scrolled ? "text-muted-foreground" : "text-wood-cream/80"
              }`}
          >
            <Phone className="w-4 h-4" />
            <span>+256 200 920779 / +256 783 937 542</span>
          </a>
          <Button asChild variant="default" className="btn-secondary">
            <Link to="/booking">Book Now</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden p-2 transition-colors ${scrolled ? "text-foreground" : "text-white drop-shadow-lg"
            }`}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-md shadow-elevated transition-all duration-300 ${isOpen
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
      >
        <div className="container-luxury px-4 py-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`text-lg font-semibold py-3 px-4 rounded-lg transition-all duration-200 ${location.pathname === link.path
                ? "text-white bg-secondary shadow-lg font-bold"
                : "text-secondary bg-secondary/10 hover:bg-secondary/20"
                }`}
            >
              {link.name}
            </Link>
          ))}
          <Button asChild className="btn-secondary mt-4">
            <Link to="/booking" onClick={() => setIsOpen(false)}>
              Book Now
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
