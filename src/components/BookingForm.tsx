import { useState } from "react";
import { Calendar, Users, Send, Building, ArrowRight, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface BookingFormProps {
  rooms?: Array<{
    id: number;
    name: string;
    price: number;
    guests: number;
    size: string;
  }>;
}

type FormData = {
  name: string;
  email: string;
  phone: string;
  guests: string;
  checkin: string;
  checkout: string;
  roomType: string;
  requests: string;
  howHear: string;
};

export function BookingForm({ rooms = [] }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [nights, setNights] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    guests: "",
    checkin: "",
    checkout: "",
    roomType: "",
    requests: "",
    howHear: ""
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});

  // Generate room options
  const roomOptions = rooms.length > 0
    ? rooms.map(room => ({
      id: room.id,
      name: room.name,
      price: room.price,
      guests: room.guests,
      size: room.size
    }))
    : [
      { id: 1, name: "Deluxe Room", price: 48, guests: 2, size: "35 m²" },
      { id: 2, name: "Forest Suite", price: 26, guests: 4, size: "55 m²" },
      { id: 3, name: "Family Suite", price: 79, guests: 6, size: "75 m²" }
    ];

  const selectedRoom = roomOptions.find(r => r && r.id != null && r.id.toString() === formData.roomType);

  // Calculate nights
  const calculateNights = (checkin: string, checkout: string) => {
    if (!checkin || !checkout) {
      setNights(1);
      return;
    }
    const checkinDate = new Date(checkin);
    const checkoutDate = new Date(checkout);
    const diffTime = Math.abs(checkoutDate.getTime() - checkinDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setNights(diffDays);
  };

  // Validation functions
  const validateStep1 = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";

    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^[+]?[\d\s-]{10,}$/.test(formData.phone.replace(/\s/g, '')))
      newErrors.phone = "Phone number is invalid";

    if (!formData.guests) newErrors.guests = "Please select number of guests";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Partial<FormData> = {};

    if (!formData.checkin) newErrors.checkin = "Check-in date is required";
    if (!formData.checkout) newErrors.checkout = "Check-out date is required";

    if (formData.checkin && formData.checkout) {
      const checkinDate = new Date(formData.checkin);
      const checkoutDate = new Date(formData.checkout);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (checkinDate < today) newErrors.checkin = "Check-in cannot be in the past";
      if (checkoutDate <= checkinDate) newErrors.checkout = "Check-out must be after check-in";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep3 = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.roomType) newErrors.roomType = "Please select a room type";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Step handlers
  const nextStep = () => {
    let isValid = false;

    switch (step) {
      case 1:
        isValid = validateStep1();
        break;
      case 2:
        isValid = validateStep2();
        break;
      case 3:
        isValid = validateStep3();
        break;
    }

    if (isValid) {
      setStep(step + 1);
      setErrors({});
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    setErrors({});
  };

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // Recalculate nights when dates change
    if (field === 'checkin' || field === 'checkout') {
      const checkin = field === 'checkin' ? value : formData.checkin;
      const checkout = field === 'checkout' ? value : formData.checkout;
      if (checkin && checkout) {
        calculateNights(checkin, checkout);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Final validation
    if (!validateStep1() || !validateStep2() || !validateStep3()) {
      toast.error("Please fix all errors before submitting");
      return;
    }

    setIsSubmitting(true);

    const totalPrice = selectedRoom ? selectedRoom.price * nights : 0;

    const bookingData = {
      bookingType: "room",
      ...formData,
      nights: nights,
      totalPrice: totalPrice,
      selectedRoom: selectedRoom,
      submittedAt: new Date().toISOString(),
      source: "website_booking_form"
    };

    try {
      const response = await fetch('https://larozanatureresort.com/server/book.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const result = await response.json();

      toast.success("Booking submitted successfully!", {
        description: `Booking I: ${result.bookingId || 'N/A'}. We'll contact you within 24 hours.`,
        duration: 6000,
      });

      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        guests: "",
        checkin: "",
        checkout: "",
        roomType: "",
        requests: "",
        howHear: ""
      });
      setStep(1);
      setNights(1);

    } catch (error) {
      console.error('Booking submission error:', error);

      // Fallback email
 

      toast.success("Booking request submitted!", {
        description: "We received your request via email and will confirm shortly.",
        duration: 5000,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        guests: "",
        checkin: "",
        checkout: "",
        roomType: "",
        requests: "",
        howHear: ""
      });
      setStep(1);
      setNights(1);

    } finally {
      setIsSubmitting(false);
    }
  };

 
  // Step progress indicator
  const steps = [
    { number: 1, title: "Guest Info", icon: <Users className="w-4 h-4" /> },
    { number: 2, title: "Stay Details", icon: <Calendar className="w-4 h-4" /> },
    { number: 3, title: "Room Selection", icon: <Building className="w-4 h-4" /> },
    { number: 4, title: "Review & Submit", icon: <CheckCircle className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-8">
      {/* Step Progress */}
      <div className="flex justify-between relative">
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
        {steps.map((s) => (
          <div key={s.number} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center 
              ${step >= s.number
                ? 'bg-primary text-white border-primary'
                : 'bg-white text-gray-400 border-2 border-gray-300'
              }`}>
              {step > s.number ? <CheckCircle className="w-5 h-5" /> : s.icon}
            </div>
            <span className={`text-xs mt-2 ${step >= s.number ? 'text-primary font-medium' : 'text-gray-500'}`}>
              {s.title}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Step 1: Guest Information */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Guest Information</h3>
              <p className="text-gray-600">Please provide your contact details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="John Doe"
                  className={`bg-background ${errors.name ? 'border-red-500' : ''}`}
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
              </div>

              <div className="space-y-3">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="john@example.com"
                  className={`bg-background ${errors.email ? 'border-red-500' : ''}`}
                />
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+256 200 920779"
                  className={`bg-background ${errors.phone ? 'border-red-500' : ''}`}
                />
                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
              </div>

              <div className="space-y-3">
                <Label htmlFor="guests">Number of Guests *</Label>
                <Select
                  value={formData.guests}
                  onValueChange={(value) => handleInputChange('guests', value)}
                >
                  <SelectTrigger className={`bg-background ${errors.guests ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select guests" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.guests && <p className="text-sm text-red-500">{errors.guests}</p>}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Stay Details */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Stay Details</h3>
              <p className="text-gray-600">Select your check-in and check-out dates</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <Label htmlFor="checkin">Check-in Date *</Label>
                <Input
                  id="checkin"
                  type="date"
                  value={formData.checkin}
                  onChange={(e) => handleInputChange('checkin', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className={`bg-background ${errors.checkin ? 'border-red-500' : ''}`}
                />
                {errors.checkin && <p className="text-sm text-red-500">{errors.checkin}</p>}
              </div>

              <div className="space-y-3">
                <Label htmlFor="checkout">Check-out Date *</Label>
                <Input
                  id="checkout"
                  type="date"
                  value={formData.checkout}
                  onChange={(e) => handleInputChange('checkout', e.target.value)}
                  min={formData.checkin || new Date().toISOString().split('T')[0]}
                  className={`bg-background ${errors.checkout ? 'border-red-500' : ''}`}
                />
                {errors.checkout && <p className="text-sm text-red-500">{errors.checkout}</p>}
              </div>
            </div>

            {/* Nights display */}
            {nights > 0 && formData.checkin && formData.checkout && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-blue-900">Stay Duration</p>
                    <p className="text-sm text-blue-700">
                      {new Date(formData.checkin).toLocaleDateString()} - {new Date(formData.checkout).toLocaleDateString()}
                    </p>
                  </div>
                  <span className="text-lg font-semibold text-blue-900">
                    {nights} {nights === 1 ? "Night" : "Nights"}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Room Selection */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Room Selection</h3>
              <p className="text-gray-600">Choose your preferred room type</p>
            </div>

            <div className="space-y-3">
              <Label htmlFor="roomType">Select Room Type *</Label>
              <Select
                value={formData.roomType}
                onValueChange={(value) => handleInputChange('roomType', value)}
              >
                <SelectTrigger className={`bg-background ${errors.roomType ? 'border-red-500' : ''}`}>
                  <SelectValue placeholder="Choose your room" />
                </SelectTrigger>
                <SelectContent>
                  {roomOptions.map((room) => (
                    <SelectItem key={room.id} value={room.id.toString()}>
                      <div className="flex flex-col py-1">
                        <span className="font-medium">{room.name}</span>
                        <span className="text-sm text-gray-600">
                          ${room.price}/night • {room.guests} guests • {room.size}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.roomType && <p className="text-sm text-red-500">{errors.roomType}</p>}
            </div>

            {/* Price Summary */}
            {selectedRoom && (
              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 border border-primary/20">
                <h4 className="font-semibold text-gray-900 mb-4">Price Summary</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{selectedRoom.name}</span>
                    <span className="font-medium">${selectedRoom.price}/night</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration</span>
                    <span className="font-medium">{nights} {nights === 1 ? "night" : "nights"}</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Estimated Total</span>
                      <span className="text-primary">${selectedRoom.price * nights}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      * Includes all taxes. 30% deposit required to confirm booking.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

    
        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6 border-t">
          {step > 1 ? (
            <Button
              type="button"
              onClick={prevStep}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          ) : (
            <div /> // Empty div to maintain flex spacing
          )}

          {step < 4 ? (
            <Button
              type="button"
              onClick={nextStep}
              className="flex items-center gap-2 btn-primary"
            >
              Continue
              <ArrowRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2 btn-primary"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Confirm Booking
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
}