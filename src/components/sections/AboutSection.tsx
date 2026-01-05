import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { MapPin, Mail, MessageCircle, Facebook } from 'lucide-react';

const daniellePhoto = '/images/garden-scenes/gardener-with-flowers.jpg';
const orchidsPhoto = '/images/flowers/orchids/orchidsPhoto';
const hibiscusPhoto = '/images/flowers/hibiscus/peach-pink-hibiscus-closeup.jpg';

function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // EmailJS configuration - Replace these with your actual EmailJS credentials
  // Get these from: https://www.emailjs.com/
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID';
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID';
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Initialize EmailJS with your public key
      emailjs.init(EMAILJS_PUBLIC_KEY);

      // Send email using EmailJS
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'daniellediemahave@gmail.com',
        }
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Reset status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error('EmailJS error:', error);
      setSubmitStatus('error');
      
      // Reset error message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 sm:space-y-10">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="your@email.com"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your journey..."
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
        />
      </div>
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm">
          Thank you for your message! We'll get back to you soon.
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
          Sorry, there was an error sending your message. Please try again or contact us directly at daniellediemahave@gmail.com
        </div>
      )}
      <Button 
        type="submit" 
        className="w-full bg-green-600 hover:bg-green-700 mt-2"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
}

export function AboutSection() {
  return (
    <div className="max-w-5xl mx-auto space-y-8 sm:space-y-12">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl mb-3 sm:mb-4">Meet Danielle</h2>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 px-4">
          Passionate gardener and plant enthusiast
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center mb-8 sm:mb-16">
        <div className="relative rounded-lg overflow-hidden shadow-2xl">
          <ImageWithFallback
            src={daniellePhoto}
            alt="Danielle with her urban garden"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="space-y-4 sm:space-y-6">
          <h3 className="text-2xl sm:text-3xl">Growing Dreams, One Seed at a Time</h3>
          <p className="text-base sm:text-lg text-gray-700">
            Hi! I'm Danielle, and I believe that anyone can create their own green paradise, no matter how small the
            space. My journey started with a few recycled containers and a handful of seeds, and it blossomed into a
            thriving urban garden.
          </p>
          <p className="text-base sm:text-lg text-gray-700">
            Through Plant a Seed, I want to share the joy and fulfillment that comes from nurturing plants from their
            very beginning. Whether you're growing flowers that brighten your day or vegetables that nourish your
            family, every seed planted is a step toward a greener future.
          </p>
          <div className="flex flex-wrap gap-2 pt-2 sm:pt-4">
            <Badge className="bg-green-500">Urban Gardening</Badge>
            <Badge className="bg-pink-500">Flower Enthusiast</Badge>
            <Badge className="bg-yellow-600">Sustainable Living</Badge>
            <Badge className="bg-blue-500">Community Builder</Badge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="overflow-hidden">
          <div className="relative h-64">
            <ImageWithFallback
              src={orchidsPhoto}
              alt="Beautiful orchids from the garden"
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader>
            <CardTitle>Orchid Collection</CardTitle>
            <CardDescription>
              These delicate beauties are a testament to patience and care. Orchids may seem challenging, but with the
              right approach, they reward you with stunning blooms.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card className="overflow-hidden">
          <div className="relative h-64">
            <ImageWithFallback
              src={hibiscusPhoto}
              alt="Vibrant hibiscus flower"
              className="w-full h-full object-cover"
            />
          </div>
          <CardHeader>
            <CardTitle>Tropical Treasures</CardTitle>
            <CardDescription>
              Hibiscus flowers bring a touch of the tropics to any garden. Their vibrant colors and unique petals make
              every bloom a celebration.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      <Separator className="my-12" />

      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h3 className="text-3xl sm:text-4xl mb-3 sm:mb-4 font-serif">Get in Touch</h3>
          <p className="text-base sm:text-lg text-gray-600">
            Have questions or want to share your gardening journey? We'd love to hear from you!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Panel - Contact Form */}
          <Card className="flex-1 lg:flex-[2] rounded-xl shadow-sm border border-gray-100">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-semibold">Get In Touch</CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>

          {/* Right Panel - Stacked Contact Cards */}
          <div className="flex-1 lg:flex-[1] space-y-4 flex flex-col">
            {/* Email Card */}
            <Card className="rounded-xl shadow-sm border border-gray-100">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-base font-semibold">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  Email Us
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <a
                  href="mailto:daniellediemahave@gmail.com"
                  className="text-sm text-gray-700 hover:text-blue-600 transition-colors"
                >
                  daniellediemahave@gmail.com
                </a>
              </CardContent>
            </Card>

            {/* WhatsApp Card */}
            <Card className="rounded-xl shadow-sm border border-gray-100">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-base font-semibold">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-green-600" />
                  </div>
                  WhatsApp
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <a
                  href="https://wa.me/23059878033"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-700 hover:text-green-600 transition-colors"
                >
                  +230 5987 8033
                </a>
              </CardContent>
            </Card>

            {/* Facebook Card */}
            <Card className="rounded-xl shadow-sm border border-gray-100">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-3 text-base font-semibold">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
                    <Facebook className="w-5 h-5 text-purple-600" />
                  </div>
                  Facebook
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <a
                  href="https://www.facebook.com/BAuthenticc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-gray-700 hover:text-purple-600 transition-colors"
                >
                  @Plant A Seed
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

