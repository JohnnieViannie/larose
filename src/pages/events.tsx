// pages/events.tsx or app/events/page.tsx
import { useState } from 'react';
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Play, Camera, X, Check, Heart, Music, Users, Briefcase, Cake, Calendar } from "lucide-react";

// General videos - not attached to specific events
const generalVideos = [
    "/vid_12.mp4",
    "/vid_13.mp4"
];

// General images - just examples
const generalImages = [
    "/img_38.png",
    "/img_14.png",
    "/img_40.png"
];

// Event types we offer
const eventTypes = [
    {
        id: 1,
        title: "Weddings",
        description: "Celebrate your special day in our beautiful natural setting",
        icon: Heart
    },
    {
        id: 2,
        title: "Parties",
        description: "Birthday parties, anniversaries, and celebrations of all kinds",
        icon: Cake
    },
    {
        id: 3,
        title: "Corporate Events",
        description: "Team building, conferences, and corporate retreats",
        icon: Briefcase
    },
    {
        id: 4,
        title: "Cultural Events",
        description: "Traditional celebrations and cultural gatherings",
        icon: Music
    },
    {
        id: 5,
        title: "Private Gatherings",
        description: "Intimate gatherings with family and friends",
        icon: Users
    },
    {
        id: 6,
        title: "Special Occasions",
        description: "Any occasion worth celebrating with loved ones",
        icon: Calendar
    }
];

const Events = () => {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentMedia, setCurrentMedia] = useState(null);
    const [isVideo, setIsVideo] = useState(false);
    const [hoverVideo, setHoverVideo] = useState(null);

    const openLightbox = (media, isVideoMedia = false) => {
        setCurrentMedia(media);
        setIsVideo(isVideoMedia);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
        setCurrentMedia(null);
        setIsVideo(false);
    };

    return (
        <div className="min-h-screen bg-white">
            <Navbar />

            {/* Hero Section - No Gradients */}
            <section className="pt-24 md:pt-32 pb-12 md:pb-20 bg-gray-900">
                <div className="absolute inset-0">
                    <img
                        src="/img_68.png"
                        alt="Events at La Roza"
                        className="w-full h-full object-cover opacity-30"
                    />
                </div>
                <div className="container-luxury px-4 relative z-10 text-center text-white">
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4">
                        Events at La Roza
                    </h1>
                    <p className="text-lg md:text-xl max-w-2xl mx-auto">
                        From weddings to parties, celebrate your special moments surrounded by nature
                    </p>
                </div>
            </section>

            {/* Video Showcase - General Videos */}
            <section className="py-16 bg-white">
                <div className="container-luxury px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                            Experience the Atmosphere
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Get a glimpse of what makes La Roza the perfect venue for your special moments
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {generalVideos.map((video, index) => (
                            <div
                                key={index}
                                className="bg-gray-100 rounded-lg overflow-hidden"
                                onMouseEnter={() => setHoverVideo(index)}
                                onMouseLeave={() => setHoverVideo(null)}
                            >
                                <div className="relative aspect-video">
                                    <video
                                        className="w-full h-full object-cover"
                                        muted
                                        loop
                                        playsInline
                                        autoPlay={hoverVideo === index}
                                    >
                                        <source src={video} type="video/mp4" />
                                    </video>
                                    <button
                                        onClick={() => openLightbox(video, true)}
                                        className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/60 transition-colors"
                                    >
                                        <Play className="w-12 h-12 text-white fill-white" />
                                    </button>
                                </div>
                                
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Event Types Grid */}
            <section className="py-16 bg-gray-50">
                <div className="container-luxury px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                            Events We Host
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Whatever the occasion, we have the perfect setting for your celebration
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {eventTypes.map((event) => {
                            const Icon = event.icon;
                            return (
                                <div
                                    key={event.id}
                                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                                >
                                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                                        <Icon className="w-6 h-6 text-gray-700" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                                    <p className="text-gray-600">{event.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Image Gallery - General Images */}
            <section className="py-16 bg-white">
                <div className="container-luxury px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                            Our Venue
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Beautiful spaces for your special moments
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {generalImages.map((image, index) => (
                            <div
                                key={index}
                                className="group relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer"
                                onClick={() => openLightbox(image, false)}
                            >
                                <img
                                    src={image}
                                    alt={`La Roza venue ${index + 1}`}
                                    className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <Camera className="w-8 h-8 text-white" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-16 bg-gray-50">
                <div className="container-luxury px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                            Why Choose La Roza?
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Everything you need for a memorable event
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-gray-700">1</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Beautiful Setting</h3>
                            <p className="text-gray-600">Surrounded by nature with stunning views</p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-gray-700">2</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Expert Planning</h3>
                            <p className="text-gray-600">Our team handles every detail</p>
                        </div>

                        <div className="text-center p-6">
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl font-bold text-gray-700">3</span>
                            </div>
                            <h3 className="text-xl font-bold mb-2">Custom Packages</h3>
                            <p className="text-gray-600">Tailored to your needs and budget</p>
                        </div>
                    </div>
                </div>
            </section>

           

            {/* Lightbox Modal */}
            {lightboxOpen && currentMedia && (
                <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 text-white p-2 hover:bg-white/10 rounded-full"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    {isVideo ? (
                        <video
                            controls
                            autoPlay
                            className="max-w-full max-h-[90vh]"
                            src={currentMedia}
                        />
                    ) : (
                        <img
                            src={currentMedia}
                            alt="Event gallery"
                            className="max-w-full max-h-[90vh] object-contain"
                        />
                    )}
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Events;