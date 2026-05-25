import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    } else if (formData.name.length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation (optional but must be valid if provided)
    if (formData.phone && !/^[\d\s\+\-\(\)]{10,}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) {
      toast.error("Please fix the errors in the form", {
        description: "All required fields must be properly filled.",
        duration: 4000,
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // API Endpoint - Using your actual backend endpoint
      const response = await fetch('https://larozanatureresort.com/server/contact.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          source: 'website_contact_form',
          submittedAt: new Date().toISOString(),
          url: window.location.href
        })
      });

      // Check if response is JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Server returned non-JSON response");
      }

      const result = await response.json();

      // Check API response success
      if (!result.success) {
        throw new Error(result.message || "Submission failed");
      }

      // Success toast with your API message and professional description
      toast.success("Message Sent Successfully", {
        description: result.message + " Our team will review your inquiry and respond within 24-48 hours.",
        duration: 6000,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
      });
      setErrors({});

    } catch (error) {
      console.error('Contact form submission error:', error);

      let errorMessage = "We apologize for the inconvenience. Please try again or contact us directly at booking@larozaresort.com";

      // Provide specific error messages based on error type
      if (error instanceof Error) {
        if (error.message.includes("network") || error.message.includes("Network")) {
          errorMessage = "Network connection issue. Please check your internet connection and try again.";
        } else if (error.message.includes("JSON")) {
          errorMessage = "Server configuration issue. Please contact us directly.";
        }
      }

      // Professional error message
      toast.error("Submission Failed", {
        description: errorMessage,
        duration: 6000,
      });

    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappNumber = "256779424477";
  const whatsappMessage = `Hello La Roza Nature Resort! I'd like to inquire about: `;

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-20 min-h-[50vh] flex items-center">
        <div className="absolute inset-0">
          <img
            src="/img_15.png"
            alt="La Roza Nature Resort Contact"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-wood-dark/60" />
        </div>
        <div className="container-luxury px-4 md:px-8 relative z-10">
          <div className="text-center text-wood-cream">
            <span className="text-xs md:text-sm text-label text-secondary bg-secondary/20 px-3 md:px-4 py-1 rounded-full inline-block">
              Get in Touch
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:heading-display font-display font-bold mt-4 md:mt-6 mb-4 md:mb-6 px-2">
              Contact Us
            </h1>
            <p className="text-sm sm:text-base md:text-body text-wood-cream/90 opacity-90 max-w-3xl mx-auto px-2 md:px-0">
              Have questions or special requests? Our dedicated team is here to assist you
              in planning your perfect nature escape.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="section-padding bg-background">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="heading-section text-foreground mb-6">
                  Contact Information
                </h2>
                <p className="text-body text-muted-foreground mb-6">
                  For inquiries regarding bookings, special requests, or general information,
                  please use the contact details below or complete the contact form.
                </p>

                <div className="p-4 bg-primary/5 border border-primary/10 rounded-lg mb-6">
                  <h3 className="font-medium text-foreground mb-2">Response Time</h3>
                  <p className="text-sm text-muted-foreground">
                    We strive to respond to all inquiries within 24-48 hours during business days.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-card rounded-lg shadow-soft">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Resort Address</h3>
                    <p className="text-muted-foreground">
                      Transformer Lane, Senyange Hill
                      <br />
                      Masaka City, Uganda
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card rounded-lg shadow-soft">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Telephone</h3>
                    <p className="text-muted-foreground">
                      <a href="tel:+256779424477" className="hover:text-secondary transition-colors">
                        +256 200 920779 / +256 783 937 542
                      </a>
                      <br />
                      <span className="text-xs text-gray-500">Primary contact number</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card rounded-lg shadow-soft">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Email Address</h3>
                    <p className="text-muted-foreground">
                      <a href="mailto:booking@larozaresort.com" className="hover:text-secondary transition-colors">
                        booking@larozaresort.com
                      </a>
                      <br />
                      <span className="text-xs text-gray-500">For reservations and inquiries</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card rounded-lg shadow-soft">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">Operating Hours</h3>
                    <p className="text-muted-foreground">
                      <span className="font-medium">Reception:</span> 24/7
                      <br />
                      <span className="font-medium">General Office:</span> 8:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card p-8 rounded-lg shadow-card">
              <h3 className="heading-card text-foreground mb-2">Send an Inquiry</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Complete the form below and our team will respond promptly.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-1">
                      Full Name
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`bg-background ${errors.name ? 'border-red-500' : ''}`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-1">
                      Email Address
                      <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`bg-background ${errors.email ? 'border-red-500' : ''}`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+256 200 920779 / +256 783 937 542"
                    className={`bg-background ${errors.phone ? 'border-red-500' : ''}`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500">{errors.phone}</p>
                  )}
                  <p className="text-xs text-gray-500">Optional - for faster response</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="subject" className="flex items-center gap-1">
                    Subject
                    <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g., Booking Inquiry, Special Request"
                    className={`bg-background ${errors.subject ? 'border-red-500' : ''}`}
                  />
                  {errors.subject && (
                    <p className="text-xs text-red-500">{errors.subject}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="flex items-center gap-1">
                    Your Message
                    <span className="text-red-500">*</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please provide details regarding your inquiry..."
                    rows={5}
                    className={`bg-background resize-none ${errors.message ? 'border-red-500' : ''}`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500">{errors.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-6 text-base font-medium"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Processing Inquiry...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Submit Inquiry
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  By submitting this form, you agree to our Privacy Policy.
                  Your information will only be used to respond to your inquiry.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>



      <Footer />
    </div>
  );
};

export default Contact;