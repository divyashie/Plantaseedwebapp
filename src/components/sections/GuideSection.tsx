import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Separator } from '../ui/separator';
import { Droplets, Heart, Leaf, Shovel, Sprout, Sun } from 'lucide-react';

const plantingSteps = [
  {
    id: 1,
    title: 'Prepare Your Soil',
    description: 'Start with nutrient-rich, well-draining soil. Mix in compost for best results.',
    image:
      'https://images.unsplash.com/photo-1759421278662-3c0b5adbbdab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudGluZyUyMHNlZWRzJTIwc29pbHxlbnwxfHx8fDE3NjEzNjg3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Shovel,
  },
  {
    id: 2,
    title: 'Choose Quality Seeds',
    description: 'Select seeds appropriate for your climate and season. Fresh seeds germinate better.',
    image:
      'https://images.unsplash.com/photo-1605287099480-f90f257027e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3R0aW5nJTIwc29pbCUyMGhhbmRzfGVufDF8fHx8MTc2MTM2ODgwMHww&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Sprout,
  },
  {
    id: 3,
    title: 'Plant at Right Depth',
    description: 'Follow seed packet instructions for proper planting depth and spacing.',
    image:
      'https://images.unsplash.com/photo-1621256257758-276a90549f80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwbGFudCUyMHJvb3RzfGVufDF8fHx8MTc2MTM2ODgwMnww&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Leaf,
  },
  {
    id: 4,
    title: 'Water Consistently',
    description: 'Keep soil moist but not waterlogged. Water gently to avoid disturbing seeds.',
    image:
      'https://images.unsplash.com/photo-1515150144380-bca9f1650ed9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlcmluZyUyMHBsYW50c3xlbnwxfHx8fDE3NjEzNjg3OTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Droplets,
  },
  {
    id: 5,
    title: 'Provide Adequate Light',
    description: 'Most seedlings need 6-8 hours of sunlight daily. Adjust based on plant type.',
    image:
      'https://images.unsplash.com/photo-1693571110024-7183f316913b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5saWdodCUyMHBsYW50c3xlbnwxfHx8fDE3NjEzNjg4MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Sun,
  },
  {
    id: 6,
    title: 'Watch It Grow',
    description: 'Be patient and watch your seedlings emerge. Celebrate every sprout!',
    image:
      'https://images.unsplash.com/photo-1694002070710-87e709ca4d38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZWVkbGluZyUyMGdyb3dpbmd8ZW58MXx8fHwxNzYxMzY4Nzk4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: Heart,
  },
];

const faqs = [
  {
    question: 'When is the best time to plant seeds?',
    answer:
      "The best time depends on your plant type and climate. Spring is ideal for most vegetables and flowers. Check seed packets for specific timing based on your last frost date.",
  },
  {
    question: 'How deep should I plant seeds?',
    answer:
      'A general rule is to plant seeds 2-3 times as deep as the seed is wide. Tiny seeds may only need surface contact, while larger seeds can go deeper. Always check the seed packet for specifics.',
  },
  {
    question: 'How often should I water newly planted seeds?',
    answer:
      "Keep soil consistently moist but not soggy. This usually means watering once or twice daily with a gentle mist. Once seedlings emerge, adjust to watering when the top inch of soil feels dry.",
  },
  {
    question: "Why aren't my seeds germinating?",
    answer:
      "Common reasons include old seeds, incorrect planting depth, improper temperature, too much or too little water, or insufficient light. Ensure you're meeting all the seed's requirements.",
  },
  {
    question: 'Can I start seeds indoors?',
    answer:
      "Yes! Starting seeds indoors gives them a head start. Use seed starting mix, provide adequate light (grow lights work well), and keep them warm. Transplant outdoors after the last frost.",
  },
];

export function GuideSection() {
  return (
    <div className="space-y-8 sm:space-y-12">
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
                <ImageWithFallback src={step.image} alt={step.title} className="w-full h-full object-cover" />
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

      <div className="max-w-3xl mx-auto">
        <h3 className="text-2xl sm:text-3xl mb-6 sm:mb-8 text-center px-4">Frequently Asked Questions</h3>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

