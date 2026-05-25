import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import {
  Calendar, Coffee, Printer, TreePine, Bird, Users, Heart, Leaf,
  Tent, Flame, Utensils, Wifi, Music, Camera, PawPrint, Star,
  Award, Shield, Clock, MapPin, Phone, Mail
} from "lucide-react";

// Import ONLY the images we actually need

// Import hero video and fire camp video
import heroVideo from "/vid_1.mp4";


const About = () => {
  // Services data - using appropriate images for each service
  const services = [
    {
      icon: <Flame className="w-8 h-8 text-secondary" />,
      title: "Fire Camp Experience",
      description: "Evening gatherings around the campfire with storytelling, traditional music, and stargazing. Perfect for team building and creating unforgettable memories under the African sky.",
      image: "./vid_5.mp4", // Using video instead of image
      isVideo: true, // Flag to indicate this is a video
      features: ["Bonfire nights", "Traditional storytelling", "Stargazing sessions", "Group activities"]
    },
    {
      icon: <Users className="w-8 h-8 text-secondary" />,
      title: "Dedicated Staff & Concierge",
      description: "Our professional team is available 24/7 to ensure your stay is perfect. From personalized welcome drinks to arranging special celebrations, we go above and beyond.",
    
      features: ["24/7 concierge", "Personal butler service", "Multi-lingual staff", "Expert local guides"]
    },
    {
      icon: <Tent className="w-8 h-8 text-secondary" />,
      title: "Luxury Glamping & Camping",
      description: "Experience nature without compromising comfort. Our glamping tents feature real beds, private bathrooms, and stunning views of the surrounding landscape.",
  
      features: ["Furnished tents", "Private bathrooms", "Eco-friendly setup", "Wildlife viewing"]
    },
    {
      icon: <Utensils className="w-8 h-8 text-secondary" />,
      title: "Farm-to-Table Dining",
      description: "Our chefs prepare meals using fresh ingredients from our organic garden and local farms. Enjoy authentic Ugandan cuisine with modern twists.",

      features: ["Organic garden", "Cooking classes", "Private dining", "Dietary accommodations"]
    },
    {
      icon: <Leaf className="w-8 h-8 text-secondary" />,
      title: "Nature Walks & Bird Watching",
      description: "Guided tours through our grounds and nearby Ramsar sites. Spot over 120 bird species, learn about local plants, and discover hidden waterfalls.",
     
      features: ["Expert guides", "Bird watching kits", "Photography spots", "Educational tours"]
    },
    {
      icon: <Coffee className="w-8 h-8 text-secondary" />,
      title: "Coffee Heritage Tour",
      description: "Explore our historic coffee processing facility and learn about Uganda's coffee culture. Sample locally grown and roasted coffee.",
      features: ["Coffee tasting", "Processing demos", "Farm tours", "Take-home beans"]
    }
  ];

  // Staff/Team members - using appropriate images
  const teamMembers = [
    {
      name: "Grace Nakato",
      role: "General Manager",
      experience: "12+ years",
     
      expertise: ["Hospitality", "Event Planning"]
    },
    {
      name: "James Okello",
      role: "Head Chef",
      experience: "15+ years",
     
      expertise: ["Ugandan Cuisine", "International Fusion"]
    },
    {
      name: "Sarah Akello",
      role: "Guest Relations",
      experience: "8+ years",
    
      expertise: ["Concierge", "Multi-lingual"]
    },
    {
      name: "David Ssemwanga",
      role: "Nature Guide",
      experience: "10+ years",
    
      expertise: ["Bird Watching", "Botany"]
    }
  ];

  // Amenities
  const amenities = [
    { icon: <Wifi />, name: "Free High-Speed WiFi" },
    { icon: <Coffee />, name: "Complimentary Breakfast" },
    { icon: <Shield />, name: "24/7 Security" },
    { icon: <Clock />, name: "24-Hour Reception" },
    { icon: <Music />, name: "Live Entertainment" },
    { icon: <Camera />, name: "Photography Tours" },
    { icon: <PawPrint />, name: "Pet Friendly" }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section with Autoplay Muted Video */}
      <section className="relative pt-32 pb-20 min-h-[70vh] flex items-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-wood-dark/20" />
        </div>

        <div className="container-luxury px-4 md:px-8 relative z-10">
          <div className="text-center text-wood-cream max-w-3xl mx-auto">
            <span className="text-label text-secondary">Our Story</span>
            <h1 className="heading-display mt-2 mb-6">La Roza Nature Resort</h1>
            <p className="text-body text-wood-cream/90 text-lg leading-relaxed">
              Ssenyange, Masaka City – Where history, nature, and exceptional cuisine come together
            </p>
          </div>
        </div>
      </section>

      {/* Paragraph 1: Origins as Green Park */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <div className="flex items-center gap-3">
                <TreePine className="w-8 h-8 text-secondary" />
                <span className="text-label text-secondary">The Beginning</span>
              </div>
              <h2 className="heading-section text-foreground">
                From Open Green Park to Nature Sanctuary
              </h2>
              <p className="text-body text-foreground font-medium leading-relaxed">
                La Roza Nature Resort Ssenyange, Masaka City started as an open green park
                mainly used by locals to relax out of the town bustle. Progressively, the desire
                and necessity for natural shade led to fruit and other tree planting around the
                property, transforming the landscape into the lush sanctuary you see today.
              </p>
              <p className="text-body text-foreground font-medium leading-relaxed">
                What began as a simple gathering place for the community has evolved into a
                destination that honors its roots while offering world-class hospitality.
              </p>
            </div>
            <div className="relative order-1 lg:order-2">
              <img
                src="./img_45.png"
                alt="Original green park with fruit trees"
                className="rounded-lg shadow-elevated w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-secondary text-white px-4 py-2 rounded-lg shadow-lg">
                <span className="font-semibold">Est. 2009</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Paragraph 2: Vintage Printery & Historical Significance */}
      <section className="section-padding bg-muted/30">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <img
                src="./img_80.png"
                alt="Vintage printing press from colonial era"
                className="rounded-lg shadow-elevated w-full h-[400px] object-cover"
              />
              <div className="absolute -top-4 -right-4 bg-amber-600 text-white p-3 rounded-full">
                <Printer className="w-6 h-6" />
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Printer className="w-8 h-8 text-secondary" />
                <span className="text-label text-secondary">Historical Heritage</span>
              </div>
              <h2 className="heading-section text-foreground">
                The Vintage Printery & Buganda Kingdom Legacy
              </h2>
              <p className="text-body text-foreground font-medium leading-relaxed">
                Originally, the premises housed one of the oldest post-colonial Printing and
                Cyclostyling machines owned and preserved by Owek. Frederick Walukejje Mulindwa,
                who served as the first territorial chief of Buddu County under the sitting King
                of Buganda Kingdom, His Majesty Ronald Muwenda Mutebi II.
              </p>
              <p className="text-body text-foreground font-medium leading-relaxed">
                This was a printing press for books, local newspapers, and extensive literature
                for the Roman Catholic Church during the times of Archbishop Joseph Nakabaale
                Kiwanuka. Missionaries and Buganda cultural materials remain archived at the
                resort to this day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Paragraph 3: Archive Display */}
      <section className="py-16 bg-background">
        <div className="container-luxury">
          <div className="relative rounded-xl overflow-hidden">
            <img
              src="./img_48.png"
              alt="Archived historical documents and materials"
              className="w-full h-[500px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex items-end">
              <div className="p-8 md:p-12 text-white max-w-3xl">
                <h3 className="text-2xl md:text-3xl font-display mb-3">Preserved History</h3>
                <p className="text-white/90 text-lg">
                  Visitors can explore archived materials documenting Buganda Kingdom history,
                  early Catholic missionary work, and the region's cultural evolution – all
                  preserved within our walls.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Paragraph 4: Coffee Processing Factory */}
      <section className="section-padding bg-muted/30">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <div className="flex items-center gap-3">
                <Coffee className="w-8 h-8 text-secondary" />
                <span className="text-label text-secondary">Coffee Legacy</span>
              </div>
              <h2 className="heading-section text-foreground">
                The Unfinished Coffee Dream
              </h2>
              <p className="text-body text-foreground font-medium leading-relaxed">
                The Printery and Cyclostyling premises were later replaced with a coffee
                processing factory to promote the local cash crop. The vision was to complete
                the coffee chain – from the gardens of locals, traceable to the cup and export,
                clearly identifying the farm source.
              </p>
              <p className="text-body text-foreground font-medium leading-relaxed">
                However, the coffee processing plan was hit by the effects of the 2009 global
                recession and closed shop before it could fully take shape. The infrastructure
                remained, waiting for its next transformation.
              </p>
            </div>
            <div className="relative order-1 lg:order-2">
              <img
                src="./img_82.png"
                alt="Former coffee processing factory"
                className="rounded-lg shadow-elevated w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-amber-800 text-white px-4 py-2 rounded-lg">
                <span className="font-semibold">2009 Global Recession</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Paragraph 5: Redesign into Resort */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <img
                src="./img_51.png"
                alt="Redesigned resort with wooden collections"
                className="rounded-lg shadow-elevated w-full h-[400px] object-cover"
              />
              <div className="absolute -top-4 -left-4 bg-green-600 text-white p-3 rounded-full">
                <Leaf className="w-6 h-6" />
              </div>
            </div>
            <div className="space-y-6">
              <h2 className="heading-section text-foreground">
                A Serene Transformation
              </h2>
              <p className="text-body text-foreground font-medium leading-relaxed">
                Currently, the beautiful green park and vintage printery structure have been
                redesigned into a quiet, serene environment sprawling with green nature and
                wooden collections meticulously assembled. The architecture pays homage to
                the site's industrial past while embracing organic, sustainable design.
              </p>
              <p className="text-body text-foreground font-medium leading-relaxed">
                Every wooden beam tells a story, every corner invites contemplation, and
                every space celebrates the harmonious blend of history and nature.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Paragraph 6: Bird Sanctuary & Ramsar Sites */}
      <section className="py-16 bg-emerald-900 text-white">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Bird className="w-8 h-8 text-emerald-300" />
                <span className="text-label text-emerald-300">Bird Sanctuary</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display mb-6">
                A Haven for Birdlife
              </h2>
              <p className="text-emerald-50/90 text-lg leading-relaxed mb-8">
                Its proximity to the Ramsar sites which stretch towards Lake Victoria explains
                the various species of birds that frequent the fruit trees in abundance. Over
                120 bird species have been documented on the property, making it a paradise
                for birdwatchers and nature enthusiasts.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-emerald-300">120+</div>
                  <div className="text-emerald-100">Bird Species</div>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <div className="text-3xl font-bold text-emerald-300">15+</div>
                  <div className="text-emerald-100">Fruit Tree Varieties</div>
                </div>
              </div>
            </div>
            <div>
              <img
                src="./img_55.png"
                alt="Birds in fruit trees near Ramsar site"
                className="rounded-lg shadow-2xl w-full h-[450px] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: Fire Camp Feature with Autoplay Video */}
      <section className="py-20 bg-muted/30">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden shadow-elevated">
              <video
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              >
                <source src="./vid_4.mp4" type="video/mp4" />
                {/* Fallback text if video doesn't load */}
                Your browser does not support the video tag.
              </video>
              <div className="absolute -bottom-4 -right-4 bg-orange-500 text-white p-4 sm:p-5 md:p-6 rounded-lg shadow-lg">
                <Flame className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
              </div>
            </div>
            <div className="space-y-4 sm:space-y-5 md:space-y-6 px-4 sm:px-0">
              <span className="text-label text-secondary">Featured Experience</span>
              <h2 className="heading-section text-foreground text-2xl sm:text-3xl md:text-4xl">
                Fire Camp Nights
              </h2>
              <p className="text-body text-foreground font-medium text-base sm:text-lg leading-relaxed">
                As the sun sets over Masaka, gather around our signature fire camp. The crackling flames
                create the perfect ambiance for storytelling, traditional music, and connecting with
                fellow travelers under the star-filled African sky.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bg-card p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">Every Evening</h4>
                  <p className="text-xs sm:text-sm text-foreground">7:00 PM - 10:00 PM</p>
                </div>
                <div className="bg-card p-3 sm:p-4 rounded-lg">
                  <h4 className="font-semibold text-foreground mb-1 sm:mb-2 text-sm sm:text-base">Includes</h4>
                  <p className="text-xs sm:text-sm text-foreground">Traditional snacks, drinks</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-2 sm:pt-4">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs sm:text-sm">Local storytelling</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs sm:text-sm">Live music</span>
                </div>
                <div className="flex items-center gap-1 sm:gap-2">
                  <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500 fill-yellow-500" />
                  <span className="text-xs sm:text-sm">Stargazing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Paragraph 7: Location & Recognition */}
      <section className="section-padding bg-background">
        <div className="container-luxury text-center max-w-3xl mx-auto px-4 sm:px-6">
          <span className="text-label text-secondary">Prime Location</span>
          <h2 className="heading-section text-foreground mt-2 mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl">
            Just a Kilometer from Masaka Town Center
          </h2>
          <p className="text-body text-foreground font-medium text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
            This hidden nature resort, rich in history, is celebrated as one of the best
            makeovers the region has seen – from Printing and Cyclostyling to Coffee processing
            plant to the present-day descent accommodation, exquisite restaurant and bar.
          </p>
          <div className="bg-amber-50 p-6 sm:p-8 rounded-xl border border-amber-200">
            <p className="text-amber-900 text-lg sm:text-xl italic">
              "A remarkable transformation that honors the past while embracing the future"
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;