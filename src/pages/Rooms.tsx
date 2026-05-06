import { useState, useEffect } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import BookingTabs from "@/components/bookingtabs";
import {
  Check, ChevronLeft, ChevronRight, Maximize2, X,
  Bed, Users, Square, MapPin, Star, Grid, List,
  Phone, MessageCircle, Heart, Camera, Play
} from "lucide-react";

// Room name images mapping
const roomNameImages = {
  "Mutuba": "/mutuba.png",
  "Muwafu": "/muwafu.png",
  "Muvule": "/muvule.png",
  "Mugavu": "/mugavu.png",
  "Musambya": "/musambya.png",
  "Musizi": "/musizi.png",
  "Jambula (Family Room)": "/jambula.png"
};

const rooms = [
  {
    id: 1,
    name: "Mutuba",
    description: "Cozy wooden interiors with modern amenities, perfect for couples seeking tranquility. Named after the majestic Mutuba tree (Ficus natalensis), a culturally significant tree in Buganda kingdom.",
    detailedDescription: "Experience the perfect blend of rustic charm and modern luxury in our Mutuba rooms. Each room is crafted from sustainably sourced Ugandan wood, featuring hand-carved furniture and local artwork. Named after the sacred Mutuba tree, these rooms honor Buganda's cultural heritage. The en-suite bathroom includes a rain shower with organic toiletries. Enjoy stunning views of the garden or forest from your private sitting area.",
    price: 48,
    baseImage: "/img_64.png",
    images: [
      "img_63.png",
      "img_64.png", "img_65.png", "img_66.png", "img_67.png", "img_81.png", "img_82.png",
    ],
    video: "/vid_11.mp4",
    guests: 2,
    size: "35 m²",
    beds: "1 King Bed",
    view: "Garden or Forest View",
    amenities: [
      "Free High-Speed WiFi",
      "Mountain/Forest View",
      "Mini Bar with Local Drinks",
      "Coffee & Tea Maker",
      "Rain Shower",
      "Air Conditioning",
      "Smart TV",
      "In-Room Safe",
      "Private Sitting Area",
      "Organic Toiletries",
      "Daily Housekeeping",
      "24/7 Room Service"
    ],
    highlights: ["Romantic", "Eco-Friendly", "Quiet Location", "Cultural Heritage"]
  },
  {
    id: 2,
    name: "Muwafu",
    description: "Elegant room featuring traditional design elements and modern comfort. Inspired by the Muwafu tree, known for its resilience and beauty in Ugandan folklore.",
    detailedDescription: "Immerse yourself in elegance with our Muwafu rooms. The separate living area features comfortable seating and a dining table, perfect for in-room dining. The master bedroom opens to a private balcony where you can enjoy your morning breakfast while watching monkeys play in the trees. The marble bathroom features a rain shower and dual vanities.",
    price: 48,
    baseImage: "img_11.png",
    images: [
      "img_11.png",
      "img_66.png", "img_67.png", "img_68.png", "img_30.png", "img_36.png", "img_25.png",
    ],
    video: "/vid_11.mp4",
    guests: 2,
    size: "38 m²",
    beds: "1 King Bed",
    view: "Garden View",
    amenities: [
      "Private Balcony",
      "Rain Shower",
      "Personal Butler Service",
      "King Size Bed",
      "Separate Living Area",
      "Garden View",
      "Complimentary Minibar",
      "Nespresso Machine",
      "Bathrobes & Slippers",
      "Evening Turndown Service",
      "Welcome Fruits",
      "Premium Toiletries"
    ],
    highlights: ["Honeymoon Favorite", "Butler Service", "Garden Views"]
  },
  {
    id: 3,
    name: "Muvule",
    description: "Luxurious room with premium finishes and stunning forest views. Named after the mighty Muvule tree (Milicia excelsa), prized for its durable and beautiful timber.",
    detailedDescription: "Designed with luxury in mind, our Muvule rooms offer the finest accommodations at La Roza. Named after the legendary Muvule tree, these rooms feature premium hardwood finishes and panoramic forest views. The spacious layout includes a king-sized bed, separate sitting area, and a luxurious bathroom with both rain shower and soaking tub.",
    price: 68,
    baseImage: "img_16.png",
    images: [
      "img_16.png",
      "img_17.png", "img_32.png", "img_33.png", "img_35.png", "img_36.png", "img_37.png",
    ],
    video: "/vid_10.mp4",
    guests: 2,
    size: "42 m²",
    beds: "1 King Bed + Sitting Area",
    view: "Panoramic Forest View",
    amenities: [
      "Panoramic Forest View",
      "Luxury Bathroom with Tub",
      "Separate Sitting Area",
      "King Size Bed",
      "Premium Minibar",
      "Nespresso Machine",
      "Bathrobes & Slippers",
      "Evening Turndown Service",
      "Welcome Fruits & Wine",
      "Premium Toiletries",
      "Work Desk",
      "Blackout Curtains"
    ],
    highlights: ["Luxury Finish", "Forest Views", "Premium Amenities"]
  },
  {
    id: 4,
    name: "Mugavu",
    description: "Spacious premium room with elegant furnishings and private balcony. Inspired by the Mugavu tree, a symbol of strength and longevity in Ugandan culture.",
    detailedDescription: "Our Mugavu rooms represent strength and elegance, much like the tree they're named after. These spacious premium rooms feature elegant furnishings, a private balcony overlooking the tropical forest, and a luxurious bathroom with dual vanities and a rain shower. Perfect for guests seeking extra space and premium amenities.",
    price: 68,
    baseImage: "img_16.png",
    images: [
      "img_16.png",
      "img_15.png", "img_32.png",   "img_36.png", "img_37.png",
    ],
    video: "/vid_9.mp4",
    guests: 2,
    size: "45 m²",
    beds: "1 King Bed",
    view: "Forest Valley View",
    amenities: [
      "Private Balcony",
      "Forest Valley View",
      "Luxury Bathroom",
      "King Size Bed",
      "Premium Minibar",
      "Nespresso Machine",
      "Bathrobes & Slippers",
      "Rain Shower",
      "Separate Living Area",
      "Work Desk",
      "Welcome Amenities",
      "Premium Toiletries"
    ],
    highlights: ["Spacious", "Premium", "Balcony View"]
  },
  {
    id: 5,
    name: "Musambya",
    description: "Charming compact room with all essential amenities for a comfortable stay. Named after the Musambya tree, known for its medicinal properties in traditional healing.",
    detailedDescription: "Our Musambya rooms offer a cozy and affordable option without compromising on quality. Named after the healing Musambya tree, these rooms provide a peaceful retreat with all essential amenities. Perfect for solo travelers or couples looking for a comfortable base to explore the resort and surrounding nature.",
    price: 38,
    baseImage: "img_56.png",
    images: [
      "img_56.png",
        "img_57.png", "img_58.png", 
    ],
    video: "/vid_8.mp4",
    guests: 2,
    size: "28 m²",
    beds: "1 Queen Bed",
    view: "Garden View",
    amenities: [
      "Free WiFi",
      "Garden View",
      "Queen Bed",
      "En-suite Bathroom",
      "Rain Shower",
      "Coffee & Tea Maker",
      "Smart TV",
      "In-Room Safe",
      "Essential Toiletries",
      "Daily Housekeeping",
      "Ceiling Fan",
      "Work Desk"
    ],
    highlights: ["Affordable", "Cozy", "Essential Comfort"]
  },
  {
    id: 6,
    name: "Musizi",
    description: "Cozy room with traditional touches and modern convenience. Inspired by the Musisi tree, celebrated in local culture for its shade and community gathering spots.",
    detailedDescription: "The Musisi rooms celebrate community and comfort, much like the tree that provides shade for village gatherings. These cozy rooms feature traditional design elements with modern amenities, creating a warm and inviting atmosphere. The garden-facing windows bring natural light and fresh air, connecting you with nature.",
    price: 38,
    baseImage: "img_15.png",
    images: [
      "img_11.png",
      "img_30.png", "img_29.png", "img_7.png", 
    ],
    video: "/vid_7.mp4",
    guests: 2,
    size: "30 m²",
    beds: "1 Queen Bed",
    view: "Garden View",
    amenities: [
      "Free WiFi",
      "Garden View",
      "Queen Bed",
      "En-suite Bathroom",
      "Rain Shower",
      "Coffee & Tea Maker",
      "Smart TV",
      "In-Room Safe",
      "Essential Toiletries",
      "Daily Housekeeping",
      "Ceiling Fan",
      "Traditional Decor"
    ],
    highlights: ["Traditional", "Garden Access", "Value"]
  },
  {
    id: 7,
    name: "Jambula (Family Room)",
    description: "Spacious family suite with private balcony overlooking the tropical forest canopy. Perfect for families or groups. Named after the Jambula tree, known for its delicious fruits that bring families together during harvest.",
    detailedDescription: "Our Jambula Family Suite is designed for families and groups, named after the beloved Jambula tree whose fruits are a cherished family tradition. This spacious suite features two separate bedrooms (one with a king bed, one with twin beds), a large living area with games and books for children, and a kitchenette. The large balcony with outdoor dining table is perfect for family meals while enjoying forest views.",
    price: 98,
    baseImage: "img_87.png",
    images: [
      "img_86.png",
      "img_31.png", "img_32.png","img_84.png", "img_33.png", "img_35.png",  "img_37.png",
    ],
    video: "/vid_6.mp4",
    guests: 4,
    size: "55 m²",
    beds: "1 King Bed + 2 Twin Beds",
    view: "Forest Valley View",
    amenities: [
      "Two Separate Bedrooms",
      "Large Living Area",
      "Kitchenette",
      "Outdoor Dining on Balcony",
      "Children's Welcome Gift",
      "Family Board Games",
      "Baby Cot Available",
      "Extra Storage Space",
      "Two Bathrooms",
      "Child Safety Features",
      "Microwave & Fridge",
      "Dining Table",
      "Forest View",
      "Private Balcony",
      "Butler Service"
    ],
    highlights: ["Family-Friendly", "Spacious", "Child Amenities", "Group Stay"]
  },
];

const allAmenities = [
  "Luxury Organic Toiletries",
  "Plush Bathrobes & Slippers",
  "Premium Egyptian Cotton Linens",
  "Daily Housekeeping",
  "24/7 Room Service",
  "Complimentary Breakfast",
  "Welcome Fruit Basket",
  "In-Room Safe",
  "Satellite TV",
  "High-Speed WiFi",
  "Climate Control",
  "Nightly Turndown Service",
  "Yoga Mats",
  "Umbrellas",
  "Hair Dryer",
  "Iron & Ironing Board"
];

const Rooms = () => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedRoomDetails, setSelectedRoomDetails] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredRoom, setHoveredRoom] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openLightbox = (room, index = 0) => {
    setSelectedRoom(room);
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setSelectedRoom(null);
  };

  const nextImage = () => {
    if (selectedRoom) {
      setCurrentImageIndex((prev) =>
        prev === selectedRoom.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedRoom) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedRoom.images.length - 1 : prev - 1
      );
    }
  };

  const openRoomDetails = (room) => {
    setSelectedRoomDetails(room);
    if (isMobile) {
      document.body.style.overflow = 'hidden';
    }
  };

  const closeRoomDetails = () => {
    setSelectedRoomDetails(null);
    document.body.style.overflow = 'auto';
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxOpen) {
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeLightbox();
      }
      if (selectedRoomDetails && e.key === 'Escape') closeRoomDetails();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, selectedRoomDetails]);

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="img_11.png"
            alt="La Roza Nature Resort"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-wood-dark/60" />
        </div>
        <div className="container-luxury px-4 md:px-8 relative z-10">
          <div className="text-center text-wood-cream">
            <span className="text-xs md:text-sm text-label text-secondary bg-secondary/20 px-3 md:px-4 py-1 rounded-full inline-block">
              Luxury Accommodations
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:heading-display font-display font-bold mt-4 md:mt-6 mb-4 md:mb-6 px-2">
              Rooms Named After Native Trees
            </h1>
            <p className="text-sm sm:text-base md:text-body text-wood-cream/90 opacity-90 max-w-3xl mx-auto px-2 md:px-0">
              Each room is named after a significant Ugandan tree, celebrating our cultural heritage
              and connection to nature. Explore our rooms through extensive photo galleries and videos.
            </p>
          </div>
        </div>
      </section>

      {/* View Toggle - Mobile Only */}
      {isMobile && (
        <div className="sticky top-16 z-30 bg-white border-b py-3 px-4 flex justify-between items-center">
          <div className="text-sm font-medium text-gray-700">
            {rooms.length} Rooms • {rooms.reduce((acc, room) => acc + room.images.length, 0)} Photos
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary text-white' : 'bg-gray-100'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary text-white' : 'bg-gray-100'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Rooms Grid */}
      <section className="section-padding bg-background pt-6 md:pt-12">
        <div className="container-luxury px-3 sm:px-4">
          <div className={`${isMobile && viewMode === 'list' ? 'hidden' : 'block'}`}>
            <div className="space-y-8 md:space-y-12">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white rounded-xl md:rounded-2xl overflow-hidden shadow-lg md:shadow-2xl border border-gray-100 hover:shadow-xl transition-shadow duration-300"
                  onMouseEnter={() => setHoveredRoom(room.id)}
                  onMouseLeave={() => setHoveredRoom(null)}
                >
                  <div className="flex flex-col lg:flex-row">
                    {/* Image Section - Now with video on hover */}
                    <div className="relative lg:w-1/2">
                      <div className="aspect-[4/3] lg:aspect-auto lg:h-full">
                        {hoveredRoom === room.id && room.video ? (
                          <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-[500px] object-cover"
                          >
                            <source src={room.video} type="video/mp4" />
                          </video>
                        ) : (
                          <img
                            src={room.baseImage}
                            alt={room.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        )}
                        {/* Video indicator */}
                        {room.video && (
                          <div className="absolute top-3 left-20 bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
                            <Play className="w-3 h-3 fill-white" />
                            <span>Hover for video</span>
                          </div>
                        )}

                        <div className="absolute top-3 left-3 flex gap-2">
                          <div className="bg-secondary text-white px-3 py-1 rounded-full text-xs font-medium">
                            {room.images.length} PHOTOS
                          </div>
                          <div className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                            ${room.price}/NIGHT
                          </div>
                        </div>
                        <button
                          onClick={() => openLightbox(room, 0)}
                          className="absolute top-3 right-3 bg-black/70 text-white p-2.5 rounded-lg hover:bg-black/90 transition-colors flex items-center gap-1"
                        >
                          <Camera className="w-4 h-4" />
                          <span className="text-xs font-medium">VIEW ALL</span>
                        </button>

                        {/* Enhanced Thumbnail Gallery */}
                        <div className="absolute bottom-3 left-3 right-3 hidden sm:flex gap-2 overflow-x-auto">
                          {room.images.slice(0, 4).map((img, idx) => (
                            <button
                              key={idx}
                              onClick={() => openLightbox(room, idx)}
                              className={`flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg overflow-hidden border-2 transition-all ${idx === 0 ? 'border-secondary' : 'border-white/80 hover:border-secondary'
                                }`}
                            >
                              <img
                                src={img}
                                alt={`${room.name} ${idx + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                          {room.images.length > 4 && (
                            <button
                              onClick={() => openLightbox(room, 4)}
                              className="flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-lg bg-black/70 text-white flex flex-col items-center justify-center hover:bg-black/90 transition-colors border-2 border-white/80"
                            >
                              <div className="text-xl font-bold">+{room.images.length - 4}</div>
                              <div className="text-xs">MORE</div>
                            </button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 sm:p-6 md:p-8 lg:w-1/2">
                      <div className="flex flex-col h-full">
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <span className="text-base sm:text-lg md:text-xl font-bold text-label text-red-600 bg-red-50 px-3 py-1.5 rounded-lg inline-block">
                                ${room.price}/night
                              </span>
                              {/* Room name image */}
                              <img
                                src={roomNameImages[room.name]}
                                alt={room.name}
                                className="h-[80px]   w-[180px] mt-1"
                                onError={(e) => {
                                  const img = e.target as HTMLImageElement;
                                  img.onerror = null;
                                  img.style.display = 'none';
                                  // Fallback to text if image fails to load
                                  const fallback = document.createElement('h2');
                                  fallback.className = 'text-xl sm:text-2xl md:text-3xl font-display font-bold text-gray-900 mt-1';
                                  fallback.textContent = room.name;
                                  (e.target as HTMLElement).parentNode?.appendChild(fallback);
                                }}
                              />
                            </div>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-3 h-3 sm:w-4 sm:h-4 text-amber-400 fill-amber-400" />
                              ))}
                            </div>
                          </div>

                          <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-3">
                            {room.description}
                          </p>

                          {/* Room Facts */}
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-secondary" />
                              <span className="text-xs sm:text-sm text-gray-600">{room.guests} Guests</span>
                            </div>

                            <div className="flex items-center gap-2">
                              <Bed className="w-4 h-4 text-secondary" />
                              <span className="text-xs sm:text-sm text-gray-600">{room.beds}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-secondary" />
                              <span className="text-xs sm:text-sm text-gray-600">{room.view}</span>
                            </div>
                          </div>

                          {/* Highlights */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {room.highlights.map((highlight, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>

                          {/* Top Amenities */}
                          <div className="mb-6">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="text-sm font-semibold text-gray-900">Key Features:</h4>
                              <span className="text-xs text-gray-500">({room.amenities.length} total)</span>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {room.amenities.slice(0, 6).map((amenity, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <Check className="w-3 h-3 text-green-500 flex-shrink-0" />
                                  <span className="text-xs sm:text-sm text-gray-600 truncate">{amenity}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                          <button
                            onClick={() => openRoomDetails(room)}
                            className="btn-outline flex-1 flex items-center justify-center gap-2 py-2 sm:py-3 text-sm"
                          >
                            <Camera className="w-4 h-4" />
                            View Details & Photos ({room.images.length})
                          </button>
                          <button
                            onClick={() => window.location.href = "/booking"}
                            className="btn-primary flex-1 py-2 sm:py-3 text-sm"
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile List View */}
          {isMobile && viewMode === 'list' && (
            <div className="space-y-4">
              {rooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100"
                  onClick={() => openRoomDetails(room)}
                >
                  <div className="flex">
                    <div className="w-1/3 relative">
                      <img
                        src={room.baseImage}
                        alt={room.name}
                        className="w-full h-full object-cover aspect-square"
                      />
                      {room.video && (
                        <div className="absolute top-1 left-1 bg-black/70 text-white p-1 rounded-full">
                          <Play className="w-3 h-3 fill-white" />
                        </div>
                      )}
                      <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {room.images.length} photos
                      </div>
                    </div>
                    <div className="w-2/3 p-3">
                      <div className="flex justify-between items-start">
                        {/* Room name image for mobile list */}
                        <img
                          src={roomNameImages[room.name]}
                          alt={room.name}
                          className="h-6 w-auto object-contain"
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            img.onerror = null;
                            img.style.display = 'none';
                            const fallback = document.createElement('h3');
                            fallback.className = 'font-bold text-gray-900 text-sm';
                            fallback.textContent = room.name;
                            (e.target as HTMLElement).parentNode?.appendChild(fallback);
                          }}
                        />
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-xs">5.0</span>
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mt-1 line-clamp-2">{room.description}</p>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-600">{room.guests}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Square className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-600">{room.size}</span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <div>
                          <span className="text-xs text-gray-500">From</span>
                          <div className="font-bold text-gray-900">${room.price}<span className="text-xs font-normal">/night</span></div>
                        </div>
                        <button className="text-xs bg-primary text-white px-3 py-1 rounded-full">
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Lightbox Modal */}
      {lightboxOpen && selectedRoom && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 text-white">
            <div>
              {/* Room name image in lightbox */}
              <img
                src={roomNameImages[selectedRoom.name]}
                alt={selectedRoom.name}
                className="h-8 w-auto object-contain brightness-0 invert"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.onerror = null;
                  img.style.display = 'none';
                  const fallback = document.createElement('h2');
                  fallback.className = 'text-lg font-semibold text-white';
                  fallback.textContent = selectedRoom.name;
                  (e.target as HTMLElement).parentNode?.appendChild(fallback);
                }}
              />
              <p className="text-sm opacity-75 mt-1">
                Photo {currentImageIndex + 1} of {selectedRoom.images.length}
              </p>
            </div>
            <button
              onClick={closeLightbox}
              className="p-2 hover:bg-white/10 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Main Image */}
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="relative w-full max-w-6xl">
              <button
                onClick={prevImage}
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>

              <img
                src={selectedRoom.images[currentImageIndex]}
                alt={`${selectedRoom.name} - Image ${currentImageIndex + 1}`}
                className="w-full h-auto max-h-[60vh] sm:max-h-[70vh] object-contain rounded-lg"
              />

              <button
                onClick={nextImage}
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8" />
              </button>
            </div>
          </div>

          {/* Thumbnail Strip */}
          <div className="p-4 border-t border-white/10">
            <div className="flex gap-2 overflow-x-auto pb-2">
              {selectedRoom.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded overflow-hidden border-2 transition-all ${idx === currentImageIndex
                    ? 'border-secondary scale-105'
                    : 'border-transparent hover:border-white/50'
                    }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Room Details Modal */}
      {selectedRoomDetails && (
        <div className="fixed inset-0 bg-black/90 z-50 overflow-y-auto">
          <div className="min-h-screen">
            <div className="bg-white min-h-screen md:my-8 md:mx-4 lg:mx-auto lg:max-w-6xl lg:rounded-2xl lg:shadow-2xl overflow-hidden">
              {/* Header with video/image */}
              <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh]">
                {selectedRoomDetails.video ? (
                  <div className="flex items-center justify-center h-full w-full">
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-[500px] h-full object-cover"
                    >
                      <source src={selectedRoomDetails.video} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  <img
                    src={selectedRoomDetails.baseImage}
                    alt={selectedRoomDetails.name}
                    className="w-full h-full object-cover"
                  />
                )}
                <button
                  onClick={closeRoomDetails}
                  className="absolute top-4 right-4 bg-white p-2 rounded-full hover:bg-gray-100 shadow-lg"
                >
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 sm:p-6">
                  {/* Room name image in details modal */}
                  <img
                    src={roomNameImages[selectedRoomDetails.name]}
                    alt={selectedRoomDetails.name}
                    className="h-8 sm:h-10 md:h-12 w-auto object-contain brightness-0 invert"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.onerror = null;
                      img.style.display = 'none';
                      const fallback = document.createElement('h1');
                      fallback.className = 'text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white';
                      fallback.textContent = selectedRoomDetails.name;
                      (e.target as HTMLElement).parentNode?.appendChild(fallback);
                    }}
                  />
                  <div className="flex items-center gap-4 mt-2">
                    <p className="text-lg sm:text-xl text-white">
                      ${selectedRoomDetails.price}/night • {selectedRoomDetails.images.length} Photos
                    </p>
                    {selectedRoomDetails.video && (
                      <span className="bg-secondary text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        <Play className="w-3 h-3 fill-white" />
                        Video Tour Available
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8">
                {/* Quick Facts */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedRoomDetails.guests}</div>
                    <div className="text-xs text-gray-600">Guests</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedRoomDetails.size}</div>
                    <div className="text-xs text-gray-600">Size</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900"> 4</div>
                    <div className="text-xs text-gray-600">Beds</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{selectedRoomDetails.view.split(' ')[0]}</div>
                    <div className="text-xs text-gray-600">View</div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4">Room Overview</h2>
                  <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                    {selectedRoomDetails.detailedDescription}
                  </p>
                </div>

                {/* Photo Gallery Preview */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg sm:text-xl font-semibold">Photo Gallery ({selectedRoomDetails.images.length} photos)</h3>
                    <button
                      onClick={() => {
                        closeRoomDetails();
                        openLightbox(selectedRoomDetails, 0);
                      }}
                      className="text-sm text-primary hover:underline flex items-center gap-1"
                    >
                      View Full Gallery
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {selectedRoomDetails.images.slice(0, 8).map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          closeRoomDetails();
                          openLightbox(selectedRoomDetails, idx);
                        }}
                        className="aspect-square rounded-lg overflow-hidden group relative"
                      >
                        <img
                          src={img}
                          alt={`${selectedRoomDetails.name} ${idx + 1}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                      </button>
                    ))}
                    {selectedRoomDetails.images.length > 8 && (
                      <button
                        onClick={() => {
                          closeRoomDetails();
                          openLightbox(selectedRoomDetails, 8);
                        }}
                        className="aspect-square rounded-lg bg-gray-100 flex flex-col items-center justify-center hover:bg-gray-200 transition-colors"
                      >
                        <div className="text-3xl font-bold text-gray-700">+{selectedRoomDetails.images.length - 8}</div>
                        <div className="text-sm text-gray-600 mt-1">More Photos</div>
                      </button>
                    )}
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-8">
                  <h3 className="text-lg sm:text-xl font-semibold mb-4">All Amenities ({selectedRoomDetails.amenities.length})</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedRoomDetails.amenities.map((amenity, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm sm:text-base text-gray-700">{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Booking Button */}
                <div className={`${isMobile ? 'fixed bottom-0 left-0 right-0 p-4 bg-white border-t shadow-lg' : ''}`}>
                  <div className={`${isMobile ? 'container-luxury' : ''}`}>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button
                        onClick={() => {
                          closeRoomDetails();
                          openLightbox(selectedRoomDetails, 0);
                        }}
                        className="btn-outline flex-1 flex items-center justify-center gap-2 py-3"
                      >
                        <Camera className="w-5 h-5" />
                        View All {selectedRoomDetails.images.length} Photos
                      </button>
                      <button
                        onClick={() => window.location.href = "/booking"}
                        className="btn-primary flex-1 py-2 sm:py-3 text-sm"
                      >
                        Book Now - ${selectedRoomDetails.price}/night
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Amenities Section */}
      <section className="section-padding bg-muted/30 pt-8 md:pt-12">
        <div className="container-luxury px-4">
          <div className="text-center mb-8 md:mb-12">
            <span className="text-xs md:text-sm text-label text-secondary">All Included</span>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:heading-section font-display font-bold text-foreground mt-2 mb-3 md:mb-4">
              Premium Amenities
            </h2>
            <p className="text-sm sm:text-base md:text-body text-muted-foreground max-w-2xl mx-auto">
              Every stay includes these complimentary amenities for your comfort
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {allAmenities.map((amenity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 sm:p-4 bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-100"
              >
                <div className="bg-secondary/10 p-1.5 sm:p-2 rounded-lg">
                  <Check className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-800 leading-tight">{amenity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Form */}
      {/* 
      <section id="booking-form" className="section-padding bg-gradient-to-b from-gray-50 to-white pt-8 md:pt-12">
        <div className="container-luxury px-4">
          <div className="text-center mb-12">
            <span className="text-xs md:text-sm text-label text-secondary bg-secondary/10 px-4 py-1.5 rounded-full">
              Book Your Stay
            </span>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Complete your booking below or browse through our extensive photo galleries first
            </p>
          </div>

          {/* Using BookingTabs Component }
          <BookingTabs
            rooms={rooms}
            showHero={false}
            title="Complete Your Reservation"
            subtitle="Select your room, dates, and provide guest information"
            compact={true}
            showExternalBooking={false}
          />
        </div>
      </section>
      */}

      <Footer />
    </div>
  );
};

export default Rooms;