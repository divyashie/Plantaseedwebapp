import { useState } from 'react';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion';
import { Badge } from './components/ui/badge';
import { Separator } from './components/ui/separator';
import { Button } from './components/ui/button';
import { ScrollArea } from './components/ui/scroll-area';
import { Sprout, Droplets, Sun, Shovel, Heart, Leaf, MapPin, Mail, MessageCircle, Facebook, BookOpen, ShoppingBag, ExternalLink } from 'lucide-react';

// Hero Images
const heroImage = '/images/hero/peach-pink-hibiscus-closeup.jpg';
const heroAlt = '/images/hero/pink-hibiscus-garden.jpg';
const heroLandscape = '/images/hero/garden-landscape-overview.jpg';

// Flowers - Hibiscus
const peachHibiscus = '/images/flowers/hibiscus/peach-pink-hibiscus-closeup.jpg';
const whiteHibiscus = '/images/flowers/hibiscus/white-hibiscus-flower.jpg';
const coralHibiscus = '/images/flowers/hibiscus/coral-hibiscus-flower.jpg';
const pinkHibiscusClose = '/images/flowers/hibiscus/pink-hibiscus-closeup.jpg';
const redHibiscus = '/images/flowers/hibiscus/red-hibiscus-flower.jpg';
const yellowHibiscus = '/images/flowers/hibiscus/yellow-hibiscus-flower.jpg';
const pinkHibiscusGarden = '/images/flowers/hibiscus/pink-hibiscus-garden.jpg';

// Flowers - Orchids
const pinkOrchid = '/images/flowers/orchids/pink-orchid-flowers.jpg';
const yellowOrchid = '/images/flowers/orchids/yellow-oncidium-orchid.jpg';
const yellowOrchidClose = '/images/flowers/orchids/yellow-dancing-lady-orchid-closeup.jpg';
const orchidPalm = '/images/flowers/orchids/orchid-growing-palm-tree.jpg';
const pinkBauhinia = '/images/flowers/orchids/pink-bauhinia-orchid-tree.jpg';

// Flowers - Other
const redAmaryllis = '/images/flowers/other/red-amaryllis-flowers.jpg';
const purpleMorningGlory = '/images/flowers/other/purple-morning-glory.jpg';
const orangeTrumpet = '/images/flowers/other/orange-trumpet-vine-flowers.jpg';

// Edible - Vegetables
const freshLettuce = '/images/edible/vegetables/fresh-green-lettuce.jpg';
const leafyGreens = '/images/edible/vegetables/leafy-green-vegetables.jpg';
const tomatoPlants = '/images/edible/vegetables/tomato-plants-growing.jpg';
const vegetableGarden = '/images/edible/vegetables/vegetable-garden-beds.jpg';
const floweringVeggies = '/images/edible/vegetables/flowering-vegetable-plants.jpg';

// Edible - Fruits
const mulberries = '/images/edible/fruits/fresh-mulberries-branch.jpg';

// Edible - Herbs
const herbGarden = '/images/edible/herbs/herb-garden-section.jpg';

// Indoor Plants
const snakePlant = '/images/indoor/snake-plant-sansevieria.jpg';
const succulents = '/images/indoor/succulent-garden-display.jpg';

// Garden Scenes
const gardenerFlowers = '/images/garden-scenes/gardener-with-flowers.jpg';
const mixedFlowering = '/images/garden-scenes/mixed-flowering-plants-garden.jpg';
const gardenLandscape = '/images/garden-scenes/garden-landscape-overview.jpg';
const mixedGarden = '/images/garden-scenes/mixed-garden-plants.jpg';
const gardenPathway = '/images/garden-scenes/garden-pathway-plants.jpg';
const pottedCollection = '/images/garden-scenes/potted-plants-collection.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState('about');

  const plantingSteps = [
    {
      id: 1,
      title: 'Prepare Your Soil',
      description: 'Start with nutrient-rich, well-draining soil. Mix in compost for best results.',
      image: 'https://images.unsplash.com/photo-1759421278662-3c0b5adbbdab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudGluZyUyMHNlZWRzJTIwc29pbHxlbnwxfHx8fDE3NjEzNjg3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      icon: Shovel,
    },
    {
      id: 2,
      title: 'Choose Quality Seeds',
      description: 'Select seeds appropriate for your climate and season. Fresh seeds germinate better.',
      image: 'https://images.unsplash.com/photo-1605287099480-f90f257027e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0aW5nJTIwc29pbCUyMGhhbmRzfGVufDF8fHx8MTc2MTM2ODgwMHww&ixlib=rb-4.1.0&q=80&w=1080',
      icon: Sprout,
    },
    {
      id: 3,
      title: 'Plant at Right Depth',
      description: 'Follow seed packet instructions for proper planting depth and spacing.',
      image: 'https://images.unsplash.com/photo-1621256257758-276a90549f80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMHJvb3RzfGVufDF8fHx8MTc2MTM2ODgwMnww&ixlib=rb-4.1.0&q=80&w=1080',
      icon: Leaf,
    },
    {
      id: 4,
      title: 'Water Consistently',
      description: 'Keep soil moist but not waterlogged. Water gently to avoid disturbing seeds.',
      image: 'https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmluZyUyMHBsYW50c3xlbnwxfHx8fDE3NjEzNjg3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
      icon: Droplets,
    },
    {
      id: 5,
      title: 'Provide Adequate Light',
      description: 'Most seedlings need 6-8 hours of sunlight daily. Adjust based on plant type.',
      image: 'https://images.unsplash.com/photo-1693571110024-7183f316913b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5saWdodCUyMHBsYW50c3xlbnwxfHx8fDE3NjEzNjg4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      icon: Sun,
    },
    {
      id: 6,
      title: 'Watch It Grow',
      description: 'Be patient and watch your seedlings emerge. Celebrate every sprout!',
      image: 'https://images.unsplash.com/photo-1694002070710-87e709ca4d38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWVkbGluZyUyMGdyb3dpbmd8ZW58MXx8fHwxNzYxMzY4Nzk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
      icon: Heart,
    },
  ];

  const galleryImages = [
    {
      url: yellowOrchid,
      title: 'Exotic Orchids',
      category: 'Flowers',
    },
    {
      url: peachHibiscus,
      title: 'Beautiful Hibiscus',
      category: 'Flowers',
    },
    {
      url: freshLettuce,
      title: 'Fresh Lettuce',
      category: 'Harvest',
    },
    {
      url: tomatoPlants,
      title: 'Garden Vegetables',
      category: 'Harvest',
    },
    {
      url: leafyGreens,
      title: 'Leafy Greens',
      category: 'Harvest',
    },
    {
      url: mulberries,
      title: 'Garden Mulberries',
      category: 'Harvest',
    },
    {
      url: pottedCollection,
      title: 'Recycled Can Planters',
      category: 'Products',
    },
    {
      url: gardenerFlowers,
      title: 'Plant Sale Day',
      category: 'Products',
    },
    {
      url: gardenLandscape,
      title: 'Recycled Bottle Planters',
      category: 'Garden',
    },
    {
      url: herbGarden,
      title: 'Garlic Chive',
      category: 'Products',
    },
    {
      url: vegetableGarden,
      title: 'Eggplant Seedling',
      category: 'Products',
    },
    {
      url: orangeTrumpet,
      title: 'Flaming Katy',
      category: 'Products',
    },
    {
      url: succulents,
      title: 'Jade Plant',
      category: 'Products',
    },
    {
      url: succulents,
      title: 'Stonecrop',
      category: 'Products',
    },
    {
      url: purpleMorningGlory,
      title: 'Turtle Vine',
      category: 'Products',
    },
    {
      url: pinkHibiscusGarden,
      title: 'Hibiscus Collection',
      category: 'Flowers',
    },
    {
      url: pinkOrchid,
      title: 'Pink Orchids',
      category: 'Flowers',
    },
    {
      url: yellowOrchid,
      title: 'Yellow Orchids',
      category: 'Flowers',
    },
    {
      url: orchidPalm,
      title: 'Purple Orchids',
      category: 'Flowers',
    },
    {
      url: freshLettuce,
      title: 'Fresh Lettuce',
      category: 'Harvest',
    },
    {
      url: redAmaryllis,
      title: 'Red Amaryllis',
      category: 'Flowers',
    },
    {
      url: mulberries,
      title: 'Garden Mulberries',
      category: 'Harvest',
    },
    {
      url: pinkHibiscusGarden,
      title: 'Hibiscus Garden',
      category: 'Garden',
    },
    {
      url: snakePlant,
      title: 'Snake Plant',
      category: 'Products',
    },
    {
      url: herbGarden,
      title: 'Doliprane Plant',
      category: 'Products',
    },
  ];

  const faqs = [
    {
      question: 'When is the best time to plant seeds?',
      answer: 'The best time depends on your plant type and climate. Spring is ideal for most vegetables and flowers. Check seed packets for specific timing based on your last frost date.',
    },
    {
      question: 'How deep should I plant seeds?',
      answer: 'A general rule is to plant seeds 2-3 times as deep as the seed is wide. Tiny seeds may only need surface contact, while larger seeds can go deeper. Always check the seed packet for specifics.',
    },
    {
      question: 'How often should I water newly planted seeds?',
      answer: 'Keep soil consistently moist but not soggy. This usually means watering once or twice daily with a gentle mist. Once seedlings emerge, adjust to watering when the top inch of soil feels dry.',
    },
    {
      question: 'Why aren\'t my seeds germinating?',
      answer: 'Common reasons include old seeds, incorrect planting depth, improper temperature, too much or too little water, or insufficient light. Ensure you\'re meeting all the seed\'s requirements.',
    },
    {
      question: 'Can I start seeds indoors?',
      answer: 'Yes! Starting seeds indoors gives them a head start. Use seed starting mix, provide adequate light (grow lights work well), and keep them warm. Transplant outdoors after the last frost.',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src={heroImage}
            alt="Beautiful peach pink hibiscus flower"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-white px-4">
          <Badge className="mb-3 sm:mb-4 bg-green-500 hover:bg-green-600 text-sm sm:text-base">Growing Together</Badge>
          <h1 className="text-3xl sm:text-5xl md:text-7xl text-center mb-4 sm:mb-6 text-white">Plant a Seed</h1>
          <p className="text-base sm:text-xl md:text-2xl text-center max-w-2xl text-white/90 px-4">
            Discover the joy of growing your own plants from seed. A journey from soil to harvest.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-8 sm:py-12 md:py-16">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="mb-8 sm:mb-12 -mx-3 sm:mx-0">
            <div className="sm:hidden overflow-x-auto scrollbar-hide px-3">
              <TabsList className="inline-flex w-auto h-auto p-1 bg-muted">
                <TabsTrigger value="about" className="px-4 py-2 text-sm whitespace-nowrap">About</TabsTrigger>
                <TabsTrigger value="ebook" className="px-4 py-2 text-sm whitespace-nowrap">eBook</TabsTrigger>
                <TabsTrigger value="products" className="px-4 py-2 text-sm whitespace-nowrap">Products</TabsTrigger>
                <TabsTrigger value="shop" className="px-4 py-2 text-sm whitespace-nowrap">Shop</TabsTrigger>
                <TabsTrigger value="music" className="px-4 py-2 text-sm whitespace-nowrap">Music</TabsTrigger>
                <TabsTrigger value="guide" className="px-4 py-2 text-sm whitespace-nowrap">Guide</TabsTrigger>
                <TabsTrigger value="gallery" className="px-4 py-2 text-sm whitespace-nowrap">Gallery</TabsTrigger>
              </TabsList>
            </div>
            <div className="hidden sm:block">
              <TabsList className="grid w-full max-w-6xl mx-auto grid-cols-4 lg:grid-cols-7">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="ebook">eBook</TabsTrigger>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="shop">Shop</TabsTrigger>
                <TabsTrigger value="music">Music</TabsTrigger>
                <TabsTrigger value="guide">Guide</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>
            </div>
          </div>

          {/* About Danielle */}
          <TabsContent value="about" className="space-y-8 sm:space-y-12 pt-4 sm:pt-0">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl mb-3 sm:mb-4">Meet Danielle</h2>
                <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 px-4">
                  Passionate gardener and plant enthusiast
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center mb-8 sm:mb-16">
                <div className="relative rounded-lg overflow-hidden shadow-2xl">
                  <ImageWithFallback
                    src={gardenerFlowers}
                    alt="Danielle with her urban garden"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="space-y-4 sm:space-y-6">
                  <h3 className="text-2xl sm:text-3xl">Growing Dreams, One Seed at a Time</h3>
                  <p className="text-base sm:text-lg text-gray-700">
                    Hi! I'm Danielle, and I believe that anyone can create their own green paradise, no matter how small the space. My journey started with a few recycled containers and a handful of seeds, and it blossomed into a thriving urban garden.
                  </p>
                  <p className="text-base sm:text-lg text-gray-700">
                    Through Plant a Seed, I want to share the joy and fulfillment that comes from nurturing plants from their very beginning. Whether you're growing flowers that brighten your day or vegetables that nourish your family, every seed planted is a step toward a greener future.
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2 sm:pt-4">
                    <Badge className="bg-green-500">Urban Gardening</Badge>
                    <Badge className="bg-pink-500">Flower Enthusiast</Badge>
                    <Badge className="bg-yellow-600">Sustainable Living</Badge>
                    <Badge className="bg-blue-500">Community Builder</Badge>
                  </div>
                </div>
              </div>

              {/* Featured Garden Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="overflow-hidden">
                  <div className="relative h-64">
                    <ImageWithFallback
                      src={yellowOrchid}
                      alt="Beautiful yellow oncidium orchids from the garden"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>Orchid Collection</CardTitle>
                    <CardDescription>
                      These delicate beauties are a testament to patience and care. Orchids may seem challenging, but with the right approach, they reward you with stunning blooms.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="overflow-hidden">
                  <div className="relative h-64">
                    <ImageWithFallback
                      src={peachHibiscus}
                      alt="Vibrant peach pink hibiscus flower"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>Tropical Treasures</CardTitle>
                    <CardDescription>
                      Hibiscus flowers bring a touch of the tropics to any garden. Their vibrant colors and unique petals make every bloom a celebration.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <Separator className="my-12" />

              {/* Contact Information */}
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl sm:text-3xl mb-6 sm:mb-8 text-center">Get in Touch</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-green-500" />
                        Visit Us
                      </CardTitle>
                      <CardDescription className="text-base mb-4">
                        Cascavelle
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="w-full h-64 sm:h-80 rounded-lg overflow-hidden">
                        <iframe
                          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3743.9841392847595!2d57.40736!3d-20.24932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x217c5b5e5e5e5e5e%3A0x5e5e5e5e5e5e5e5e!2sAvenue%20Camelia%2C%20Cascavelle%2C%20Mauritius!5e0!3m2!1sen!2s!4v1234567890"
                          width="100%"
                          height="100%"
                          style={{ border: 0 }}
                          allowFullScreen
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          title="Plant A Seed Location"
                        />
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Mail className="w-5 h-5 text-green-500" />
                        Email
                      </CardTitle>
                      <CardDescription className="text-base">
                        <a href="mailto:daniellediemahave@gmail.com" className="hover:text-green-600 transition-colors">
                          daniellediemahave@gmail.com
                        </a>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageCircle className="w-5 h-5 text-green-500" />
                        WhatsApp
                      </CardTitle>
                      <CardDescription className="text-base">
                        <a href="https://wa.me/23059878033" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors">
                          +230 5987 8033
                        </a>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Facebook className="w-5 h-5 text-green-500" />
                        Facebook
                      </CardTitle>
                      <CardDescription className="text-base">
                        <a href="https://www.facebook.com/BAuthenticc" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 transition-colors">
                          @Plant A Seed
                        </a>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* eBook Section */}
          <TabsContent value="ebook" className="space-y-8 sm:space-y-12 pt-4 sm:pt-0">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-green-500" />
                <h2 className="text-2xl sm:text-4xl mb-3 sm:mb-4 px-4">Plant a Seed, Grow Happiness</h2>
                <p className="text-lg sm:text-xl text-gray-600 px-4">A Tropical Guide to Love in the Soil</p>
              </div>

              <Card className="overflow-hidden border-2 border-green-500">
                <CardContent className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
                  <div className="prose prose-sm sm:prose-lg max-w-none">
                    <p className="text-base sm:text-lg">Dear Plant a Seed Family,</p>
                    <h3 className="text-xl sm:text-2xl">Let's Grow Happiness Together!</h3>
                    <p>
                      From the sun-kissed soils of my garden, I'm reaching out with a heart full of love to share. My eBook, <strong>Plant a Seed, Grow Happiness: A Tropical Guide to Love in the Soil</strong>, is more than just a few pages—it's a piece of my soul, woven with memories of my Floreal childhood, where my grandma's hands taught me to nurture life in a blooming courtyard.
                    </p>
                    <p>
                      Today, I'm asking for your support to keep Plant a Seed thriving by grabbing your copy!
                    </p>

                    <div className="my-6 sm:my-8 bg-green-50 p-4 sm:p-6 rounded-lg">
                      <h4 className="text-lg sm:text-xl mb-3 sm:mb-4">Why support Plant a Seed?</h4>
                      <p>Because together, we're planting a magical, eco-friendly future:</p>
                      <ul className="space-y-2">
                        <li><strong>🌱 A Greener Tomorrow</strong> - Creating sustainable gardens and eco-conscious communities</li>
                        <li><strong>✨ Nature's Magic</strong> - Discovering the wonder in every seed and sprout</li>
                        <li><strong>💚 Happiness in Every Seed</strong> - Growing joy and wellness through gardening</li>
                        <li><strong>🌍 A Community of Dreamers</strong> - Your purchase fuels Plant a Seed's mission to unite eco-warriors, gardeners, and nature lovers</li>
                      </ul>
                    </div>

                    <div className="text-center my-6 sm:my-8">
                      <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto">
                        <a href="https://diemahave.gumroad.com/l/hbecgv" target="_blank" rel="noopener noreferrer">
                          <BookOpen className="w-5 h-5 mr-2" />
                          Get Your eBook Now
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>
                    </div>

                    <p className="text-center text-lg">
                      Will you join me? Grab <strong>Plant a Seed, Grow Happiness</strong> now and let's sow joy together.
                    </p>
                    <p className="text-center">
                      Share this post, tag a friend, or show off your garden in the comments—I can't wait to see our Plant a Seed family grow!
                    </p>
                    <p className="text-right italic mt-8">
                      With all my love,<br />
                      <strong>Danielle Feliciane-Diemahave</strong>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 justify-center pt-4">
                    <Badge className="bg-green-500 text-base px-4 py-2">#PlantASeed</Badge>
                    <Badge className="bg-pink-500 text-base px-4 py-2">#GrowHappiness</Badge>
                    <Badge className="bg-purple-500 text-base px-4 py-2">#EcoMagic</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Additional CTA */}
              <div className="text-center mt-8 sm:mt-12 p-4 sm:p-8 bg-gradient-to-r from-green-50 to-yellow-50 rounded-lg">
                <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4">Ready to Transform Your Garden?</h3>
                <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 px-4">
                  Join thousands of gardeners who have discovered the joy of growing happiness
                </p>
                <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">
                  <a href="https://diemahave.gumroad.com/l/hbecgv" target="_blank" rel="noopener noreferrer">
                    Purchase the eBook
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </a>
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Products Section */}
          <TabsContent value="products" className="space-y-8 sm:space-y-12 pt-4 sm:pt-0">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 text-green-500" />
                <h2 className="text-3xl sm:text-4xl mb-3 sm:mb-4">Our Products</h2>
                <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 px-4">
                  Beautiful, eco-friendly planters and gardening essentials
                </p>
              </div>

              {/* Featured Product */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
                <div className="relative rounded-lg overflow-hidden shadow-xl">
                  <ImageWithFallback
                    src={pottedCollection}
                    alt="Recycled can planters with plants"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="space-y-4 sm:space-y-6 flex flex-col justify-center">
                  <h3 className="text-2xl sm:text-3xl">Recycled Can Planters</h3>
                  <p className="text-base sm:text-lg text-gray-700">
                    Transform everyday items into beautiful homes for your plants! Our eco-friendly recycled can planters are perfect for starting your urban garden journey. Each planter is carefully prepared and decorated to add color and life to your space.
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <Leaf className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <p><strong>Eco-Friendly:</strong> Made from upcycled materials</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Sprout className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <p><strong>Perfect Size:</strong> Ideal for herbs, flowers, and small vegetables</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <p><strong>Handcrafted:</strong> Each piece is unique and made with love</p>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button size="lg" className="bg-green-600 hover:bg-green-700" asChild>
                      <a href="https://wa.me/23059878033?text=Hi%20Danielle!%20I'm%20interested%20in%20your%20recycled%20can%20planters" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Order via WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Harvest Showcase */}
              <Separator className="my-12" />
              <div className="text-center mb-8">
                <h3 className="text-3xl mb-4">From Our Garden to Your Table</h3>
                <p className="text-xl text-gray-600">Fresh produce grown with love</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="overflow-hidden">
                  <div className="relative h-80">
                    <ImageWithFallback
                      src={freshLettuce}
                      alt="Fresh green lettuce"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>Fresh Lettuce</CardTitle>
                    <CardDescription>
                      Homegrown, organic lettuce bursting with flavor. Perfect for adding freshness to your salads!
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card className="overflow-hidden">
                  <div className="relative h-80">
                    <ImageWithFallback
                      src={tomatoPlants}
                      alt="Garden fresh vegetables and tomatoes"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>Garden Vegetables</CardTitle>
                    <CardDescription>
                      Beautiful tomatoes and vegetables, grown naturally in rich soil. Experience the true taste of homegrown produce!
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>

              <div className="mt-8 text-center p-6 bg-green-50 rounded-lg">
                <p className="text-lg mb-4">Interested in our products or fresh produce?</p>
                <Button variant="outline" size="lg" asChild>
                  <a href="https://wa.me/23059878033?text=Hi%20Danielle!%20I'm%20interested%20in%20your%20products" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Contact Us
                  </a>
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Shop Section */}
          <TabsContent value="shop" className="space-y-8 sm:space-y-12 pt-4 sm:pt-0">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl mb-3 sm:mb-4 px-4">Shop Our Products</h2>
              <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 px-4">
                Pre-order your favorite plants, planters, and fresh produce
              </p>
            </div>

            {/* Payment Info Banner */}
            <div className="max-w-4xl mx-auto mb-8 sm:mb-12 p-4 sm:p-6 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border-2 border-green-300">
              <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4 text-center">How to Order</h3>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5 sm:mt-1" />
                  <div>
                    <p className="text-sm sm:text-base md:text-lg"><strong>Step 1:</strong> Click "Pre-Order on WhatsApp" on any product</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5 sm:mt-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                  <div>
                    <p className="text-sm sm:text-base md:text-lg"><strong>Step 2:</strong> We accept payments via <strong>Juice by MCB Mauritius</strong></p>
                    <p className="text-xs sm:text-sm text-gray-600">Secure and easy mobile payment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0 mt-0.5 sm:mt-1" />
                  <div>
                    <p className="text-sm sm:text-base md:text-lg"><strong>Step 3:</strong> Pick up at <strong>Cascavelle Mall</strong></p>
                    <a 
                      href="https://www.google.com/maps/dir//Cascavelle+Mall,+Cascavelle" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-green-600 hover:text-green-700 underline inline-flex items-center gap-1"
                    >
                      Get directions
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {/* Garlic Chive */}
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 sm:h-56 md:h-64">
                  <ImageWithFallback
                    src={herbGarden}
                    alt="Garlic Chive in eco-friendly planter"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <CardTitle className="text-lg sm:text-xl">Garlic Chive</CardTitle>
                    <Badge className="bg-green-500 text-xs sm:text-sm whitespace-nowrap">Rs 25</Badge>
                  </div>
                  <CardDescription className="text-sm sm:text-base">
                    Aromatic and versatile! These delicate grass-like herbs bring a gentle garlic flavor to your kitchen. Perfect for garnishing soups, salads, and stir-fries. Low maintenance, thrives in tropical climates, and regrows beautifully after each harvest. Planted in our signature eco-friendly recycled fabric planter.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base" asChild>
                    <a href="https://wa.me/23059878033?text=Hi%20Danielle!%20I'd%20like%20to%20pre-order%20a%20Garlic%20Chive%20for%20Rs%2025" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Pre-Order on WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Eggplant */}
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 sm:h-56 md:h-64">
                  <ImageWithFallback
                    src={vegetableGarden}
                    alt="Eggplant seedling with companion plants"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <CardTitle className="text-lg sm:text-xl">Eggplant</CardTitle>
                    <Badge className="bg-green-500 text-xs sm:text-sm whitespace-nowrap">Rs 25</Badge>
                  </div>
                  <CardDescription className="text-sm sm:text-base">
                    Grow your own glossy purple treasures! This healthy eggplant seedling thrives in warm tropical weather and produces abundant harvests. Perfect for rougaille, curry, or grilled delights. Comes beautifully arranged with companion succulents in our sustainable eco-friendly recycled planters.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base" asChild>
                    <a href="https://wa.me/23059878033?text=Hi%20Danielle!%20I'd%20like%20to%20pre-order%20an%20Eggplant%20for%20Rs%2025" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Pre-Order on WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Flaming Katy */}
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 sm:h-56 md:h-64">
                  <ImageWithFallback
                    src={orangeTrumpet}
                    alt="Flaming Katy cascading flowers"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <CardTitle className="text-lg sm:text-xl">Flaming Katy</CardTitle>
                    <Badge className="bg-green-500 text-xs sm:text-sm whitespace-nowrap">Rs 25</Badge>
                  </div>
                  <CardDescription className="text-sm sm:text-base">
                    A living waterfall of vibrant blooms! This stunning cascading plant creates a mesmerizing display of colorful flowers. Drought-tolerant, easy to care for, and absolutely Instagram-worthy! Perfect for hanging baskets, shelves, or adding vertical interest to your space.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base" asChild>
                    <a href="https://wa.me/23059878033?text=Hi%20Danielle!%20I'd%20like%20to%20pre-order%20a%20Flaming%20Katy%20for%20Rs%2025" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Pre-Order on WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Jade Plant */}
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 sm:h-56 md:h-64">
                  <ImageWithFallback
                    src={succulents}
                    alt="Jade Plant succulent with thick rounded leaves"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <CardTitle className="text-lg sm:text-xl">Jade Plant</CardTitle>
                    <Badge className="bg-green-500 text-xs sm:text-sm whitespace-nowrap">Rs 50</Badge>
                  </div>
                  <CardDescription className="text-sm sm:text-base">
                    The lucky money tree! This charming Jade Plant features plump, glossy leaves that bring prosperity and good fortune. Incredibly resilient and long-lived, perfect for beginners and seasoned plant lovers. Its thick stems create a miniature tree appearance that matures beautifully. Water sparingly and watch it thrive!
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base" asChild>
                    <a href="https://wa.me/23059878033?text=Hi%20Danielle!%20I'd%20like%20to%20pre-order%20a%20Jade%20Plant%20for%20Rs%2050" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Pre-Order on WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Stonecrop */}
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 sm:h-56 md:h-64">
                  <ImageWithFallback
                    src={succulents}
                    alt="Stonecrop succulent collection"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <CardTitle className="text-lg sm:text-xl">Stonecrop</CardTitle>
                    <Badge className="bg-green-500 text-xs sm:text-sm whitespace-nowrap">Rs 50</Badge>
                  </div>
                  <CardDescription className="text-sm sm:text-base">
                    Nature's living art! This stunning Stonecrop showcases star-shaped rosettes in gorgeous hues from jade green to peachy coral. Incredibly drought-tolerant and multiplies readily. Perfect for rock gardens, containers, or as ground cover. Low maintenance beauty that rewards minimal care!
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base" asChild>
                    <a href="https://wa.me/23059878033?text=Hi%20Danielle!%20I'd%20like%20to%20pre-order%20a%20Stonecrop%20for%20Rs%2050" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Pre-Order on WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Turtle Vine */}
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 sm:h-56 md:h-64">
                  <ImageWithFallback
                    src={purpleMorningGlory}
                    alt="Turtle Vine with trailing leaves"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <CardTitle className="text-lg sm:text-xl">Turtle Vine</CardTitle>
                    <Badge className="bg-green-500 text-xs sm:text-sm whitespace-nowrap">Rs 25</Badge>
                  </div>
                  <CardDescription className="text-sm sm:text-base">
                    Adorable trailing charmer! Named for its unique leaf shape with colorful stems. Perfect for hanging planters where it cascades gracefully, or as whimsical ground cover. Fast-growing and easy to propagate—just pinch and plant! Loves bright indirect light and brings fairy-tale charm to any space.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base" asChild>
                    <a href="https://wa.me/23059878033?text=Hi%20Danielle!%20I'd%20like%20to%20pre-order%20a%20Turtle%20Vine%20for%20Rs%2025" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Pre-Order on WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>

              {/* Doliprane (Efferalgan) */}
              <Card className="overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-48 sm:h-56 md:h-64">
                  <ImageWithFallback
                    src={herbGarden}
                    alt="Doliprane medicinal plant in recycled planter"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <CardTitle className="text-lg sm:text-xl">Doliprane (Efferalgan)</CardTitle>
                    <Badge className="bg-green-500 text-xs sm:text-sm whitespace-nowrap">Rs 40</Badge>
                  </div>
                  <CardDescription className="text-sm sm:text-base">
                    A unique medicinal plant known locally as Doliprane or Efferalgan! This fascinating plant is valued for its traditional healing properties. Easy to grow in tropical climates and thrives with minimal care. Comes in our eco-friendly recycled planter, perfect for your home garden or balcony.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-sm sm:text-base" asChild>
                    <a href="https://wa.me/23059878033?text=Hi%20Danielle!%20I'd%20like%20to%20pre-order%20a%20Doliprane%20for%20Rs%2040" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Pre-Order on WhatsApp
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Additional Info */}
            <div className="max-w-4xl mx-auto mt-8 sm:mt-12 p-4 sm:p-6 bg-green-50 rounded-lg border border-green-200">
              <h3 className="text-xl sm:text-2xl mb-3 sm:mb-4 text-center">Questions About Your Order?</h3>
              <p className="text-center text-base sm:text-lg mb-4 px-4">
                Feel free to reach out to us on WhatsApp for any questions about availability, delivery, or custom orders.
              </p>
              <div className="text-center">
                <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
                  <a href="https://wa.me/23059878033?text=Hi%20Danielle!%20I%20have%20a%20question%20about%20ordering" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Chat with Us
                  </a>
                </Button>
              </div>
            </div>
          </TabsContent>

          {/* Music Video */}
          <TabsContent value="music" className="space-y-8 sm:space-y-12 pt-4 sm:pt-0">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="text-3xl sm:text-4xl mb-3 sm:mb-4 px-4">Music by Danielle</h2>
                <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 px-4">
                  Heartfelt songs celebrating nature, life, and our connection to Mother Earth
                </p>
              </div>

              {/* Plant a Seed Music Video */}
              <div className="mb-8 sm:mb-12">
                <h3 className="text-2xl sm:text-3xl mb-4 text-center">A Song for Our Planet</h3>
                <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-xl">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/yXGU9pGNfSg"
                    title="A Song for Planet Earth by Danielle"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>

              {/* Song Description - A Message of Gratitude and Healing */}
              <Card className="mb-8 sm:mb-12">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                    A Message of Gratitude and Healing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6">
                  <p className="text-base sm:text-lg">
                    This song is a heartfelt tribute to our beautiful planet Earth. It's a thankful way to honor everything our Earth has given us—the soil beneath our feet, the air we breathe, the water that sustains us, and the seeds that grow into life.
                  </p>
                  <p className="text-base sm:text-lg">
                    It's also a gentle plea for forgiveness for all the harm we've caused. Through music, I hope to sensitize people about the importance of caring for our planet and inspire everyone to plant seeds of change.
                  </p>
                  <div className="pt-3 sm:pt-4 border-t">
                    <p className="italic text-sm sm:text-base text-gray-600">
                      "Every seed we plant is a promise to the Earth. Let's make that promise with love, gratitude, and hope for a greener tomorrow." - Danielle
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Latest Music Video - Melt Like an Ice */}
              <div className="mb-8 sm:mb-12">
                <h3 className="text-2xl sm:text-3xl mb-4 text-center">Melt Like an Ice</h3>
                <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-xl">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/XkB2vPgTvwk"
                    title="Melt Like an Ice by Danielle"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <Card className="mt-4 sm:mt-6">
                  <CardContent className="p-4 sm:p-6">
                    <p className="text-base sm:text-lg text-gray-700">
                      A tender ballad about vulnerability and transformation. Like ice melting under warmth, this song explores how love and compassion can soften even the hardest hearts, revealing the beauty that lies beneath our protective layers.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Distance Love */}
              <div className="mb-8 sm:mb-12">
                <h3 className="text-2xl sm:text-3xl mb-4 text-center">Distance Love</h3>
                <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-xl">
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/videoseries?list=OLAK5uy_lWdnqQAdv_E3_C-SoGTbUqm4vF6bK84oA"
                    title="Distance Love - Danielle's Full Album"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <Card className="mt-4 sm:mt-6">
                  <CardContent className="p-4 sm:p-6">
                    <p className="text-base sm:text-lg text-gray-700">
                      A soulful reflection on love that transcends physical boundaries. This heartfelt track explores the emotional journey of maintaining connection across miles, celebrating the strength of bonds that remain unbroken despite the distance.
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Call to Action */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                <Card className="bg-green-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sprout className="w-5 h-5 text-green-500" />
                      Take Action
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>• Plant a tree or start a garden</p>
                    <p>• Reduce, reuse, and recycle</p>
                    <p>• Share this message with others</p>
                    <p>• Support sustainable practices</p>
                  </CardContent>
                </Card>
                <Card className="bg-blue-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500" />
                      Spread the Love
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p>• Like and share the video</p>
                    <p>• Comment your thoughts</p>
                    <p>• Tag friends who care about Earth</p>
                    <p>• Join our eco-community</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Planting Guide */}
          <TabsContent value="guide" className="space-y-8 sm:space-y-12 pt-4 sm:pt-0">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl mb-3 sm:mb-4 px-4">Step-by-Step Planting Guide</h2>
              <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 px-4">
                Follow these essential steps to successfully grow plants from seeds
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {plantingSteps.map((step) => {
                const Icon = step.icon;
                return (
                  <Card key={step.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48 overflow-hidden">
                      <ImageWithFallback
                        src={step.image}
                        alt={step.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 left-4 bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                    </div>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <span className="text-green-500">Step {step.id}:</span>
                        {step.title}
                      </CardTitle>
                      <CardDescription>{step.description}</CardDescription>
                    </CardHeader>
                  </Card>
                );
              })}
            </div>

            <Separator className="my-12" />

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto">
              <h3 className="text-2xl sm:text-3xl mb-6 sm:mb-8 text-center px-4">Frequently Asked Questions</h3>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </TabsContent>

          {/* Photo Gallery */}
          <TabsContent value="gallery" className="space-y-8 sm:space-y-12 pt-4 sm:pt-0">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-3xl sm:text-4xl mb-3 sm:mb-4 px-4">Inspiration Gallery</h2>
              <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 px-4">
                Explore beautiful examples of successful seed planting and gardens
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all cursor-pointer aspect-square"
                >
                  <ImageWithFallback
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h4 className="text-white mb-1">{image.title}</h4>
                      <Badge variant="secondary" className="text-xs">
                        {image.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Featured Large Images */}
            <Separator className="my-12" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                <ImageWithFallback
                  src={gardenLandscape}
                  alt="Lush vegetable garden landscape"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-white text-2xl mb-2">Thriving Garden</h3>
                  <p className="text-white/80">The result of patience and care</p>
                </div>
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
                <ImageWithFallback
                  src={pinkHibiscusGarden}
                  alt="Beautiful blooming hibiscus flowers"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <h3 className="text-white text-2xl mb-2">Beautiful Blooms</h3>
                  <p className="text-white/80">From tiny seeds to stunning flowers</p>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Sprout className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-2xl mb-2">Plant a Seed</h3>
          <p className="text-green-200 max-w-2xl mx-auto">
            Growing plants from seeds is a rewarding journey. Start small, be patient, and enjoy watching life grow.
          </p>
          <p className="text-green-300 mt-6 text-sm">
            © 2025 Plant a Seed. Cultivating green thumbs everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
}