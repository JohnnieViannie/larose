import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingForm } from "@/components/BookingForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BedDouble, ExternalLink } from "lucide-react";
import poolView from "@/assets/pool-view.jpg";

// Import logo images
import bookingLogo from "/img_44.png";
import tripadvisorLogo from "/img_43.png";
import airbnbLogo from "/img_42.png";

// Room data with correct prices and names
const rooms = [
  {
    name: "Mutuba",
    price: 48,
    description: "Cozy wooden interiors with modern amenities, perfect for couples seeking tranquility.",
    image: "img_10.png",
    guests: 2,
    size: "35 m²"
  },
  {
    name: "Muwafu",
    price: 48,
    description: "Elegant room featuring traditional design elements and modern comfort.",
    image: "img_11.png",
    guests: 2,
    size: "38 m²"
  },
  {
    name: "Muvule",
    price: 68,
    description: "Luxurious room with premium finishes and stunning forest views.",
    image: "img_12.png",
    guests: 2,
    size: "42 m²"
  },
  {
    name: "Mugavu",
    price: 68,
    description: "Spacious premium room with elegant furnishings and private balcony.",
    image: "img_13.png",
    guests: 2,
    size: "45 m²"
  },
  {
    name: "Musambya",
    price:38,
    description: "Charming compact room with all essential amenities for a comfortable stay.",
    image: "img_14.png",
    guests: 2,
    size: "28 m²"
  },
  {
    name: "Musisi",
    price: 38,
    description: "Cozy room with traditional touches and modern convenience.",
    image: "img_15.png",
    guests: 2,
    size: "30 m²"
  },
  {
    name: "Jambula (Family Room)",
    price: 98,
    description: "Spacious family suite with private balcony overlooking the tropical forest canopy.",
    image: "img_12.png",
    guests: 4,
    size: "55 m²"
  }
];

const Booking = () => {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 min-h-[40vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src={poolView}
            alt="Resort booking"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-wood-dark/70" />
        </div>
        <div className="container-luxury px-4 md:px-8 relative z-10">
          <div className="text-center text-wood-cream">
            <span className="text-label text-secondary">Reservations</span>
            <h1 className="heading-display mt-2 mb-4">Book Your Experience</h1>
            <p className="text-body text-wood-cream/90 max-w-2xl mx-auto">
              Reserve your room and begin your journey to tranquility.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-padding bg-background">
        <div className="container-luxury max-w-4xl">
          {/* Room Price Summary - Optional display */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-amber-800 mb-2 flex items-center gap-2">
              <BedDouble className="w-4 h-4" />
              Our Room Rates (per night)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm">
              {rooms.map((room) => (
                <div key={room.name} className="flex justify-between items-center bg-white p-2 rounded border border-amber-100">
                  <span className="text-gray-700">{room.name}</span>
                  <span className="font-bold text-amber-700">${room.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Direct Booking Form */}
          <div className="bg-card p-8 rounded-lg shadow-card">
            <h2 className="heading-card text-foreground mb-2">Room Reservation</h2>
            <p className="text-body text-muted-foreground mb-6">
              Fill out the form below and our team will confirm your booking within 24 hours.
            </p>
            <BookingForm rooms={rooms} />
          </div>

          {/* External Booking Platforms */}
          <div className="mt-12">
            <h3 className="heading-card text-foreground text-center mb-8">Book Through These Platforms</h3>

            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {/* Booking.com */}
              <a
                href="https://www.booking.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src={bookingLogo}
                  alt="Booking.com"
                  className="h-10 md:h-12 w-auto"
                />
              </a>

              {/* TripAdvisor */}
              <a
                href="https://www.tripadvisor.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src={tripadvisorLogo}
                  alt="TripAdvisor"
                  className="h-10 md:h-12 w-auto"
                />
              </a>

              {/* Airbnb */}
              <a
                href="https://www.airbnb.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-80 transition-opacity"
              >
                <img
                  src={airbnbLogo}
                  alt="Airbnb"
                  className="h-10 md:h-12 w-auto"
                />
              </a>
            </div>

            <p className="text-xs text-center text-gray-400 mt-6">
              Click on any logo to book through our partner links
            </p>
          </div>

          {/* Contact Options */}
          <div className="mt-12 text-center">
            <div className="inline-flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/256727136918"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.76.982.998-3.675-.236-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.826 9.826 0 012.9 6.994c-.004 5.45-4.438 9.88-9.888 9.88m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.333.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.652a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.333 11.893-11.893 0-3.18-1.24-6.162-3.495-8.411" />
                </svg>
                Book via WhatsApp
              </a>
              <a
                href="tel:+256779424477"
                className="px-8 py-4 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call to Book
              </a>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              Prefer to speak with someone? Our reservation team is available 7 days a week.
            </p>
          </div>
        </div>
      </section>
      a
      <Footer />
    </div>
  );
};

export default Booking;