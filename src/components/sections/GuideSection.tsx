import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ImageWithFallback } from '../figma/ImageWithFallback';
import { Separator } from '../ui/separator';
import { Droplets, Heart, Leaf, Shovel, Sprout, Sun, Flower2, TreeDeciduous, type LucideIcon } from 'lucide-react';
import { sections, plantingSteps, faqs } from '../../lib/content';

// Icon mapping for dynamic icon rendering
const iconMap: Record<string, LucideIcon> = {
  Shovel,
  Sprout,
  Leaf,
  Droplets,
  Sun,
  Heart,
  Flower2,
  TreeDeciduous,
};

export function GuideSection() {
  const guide = sections.guide;

  return (
    <div className="space-y-8 sm:space-y-12">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-3xl sm:text-4xl mb-3 sm:mb-4 px-4">{guide.sectionTitle}</h2>
        <p className="text-lg sm:text-xl max-w-3xl mx-auto text-gray-600 px-4">
          {guide.sectionSubtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {plantingSteps.map((step) => {
          const Icon = iconMap[step.icon] || Sprout;
          return (
            <Card key={step.step} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback src={step.image} alt={step.title} className="w-full h-full object-cover" />
                <div className="absolute top-4 left-4 bg-green-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-green-500">Step {step.step}:</span>
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
        <h3 className="text-2xl sm:text-3xl mb-6 sm:mb-8 text-center px-4">{guide.faqTitle}</h3>
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
