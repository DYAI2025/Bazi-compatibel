import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What is the Chinese Zodiac compatibility?",
    answer: "Chinese Zodiac compatibility is based on the relationships between the 12 animal signs. Each sign has unique characteristics, and certain signs are considered more compatible than others based on their elemental nature and historical associations."
  },
  {
    question: "What is Bazi?",
    answer: "Bazi, or 'Four Pillars of Destiny', is a Chinese astrological concept that maps a person's destiny based on their birth year, month, day, and hour. Each pillar consists of a Heavenly Stem and a Earthly Branch, which are associated with the Five Elements."
  },
  {
    question: "What are the Wu Xing elements?",
    answer: "Wu Xing, or the Five Elements, are Wood, Fire, Earth, Metal, and Water. These elements are fundamental to Chinese philosophy and medicine, describing the interactions and relationships between all things in the universe, including the Chinese Zodiac signs."
  }
];

const AccordionItem: React.FC<{ item: FAQItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-zinc-800">
      <button
        className="w-full py-4 flex justify-between items-center text-left text-zinc-300 hover:text-amber-400 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{item.question}</span>
        <ChevronDown className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-zinc-500 text-sm">{item.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export const FAQ: React.FC = () => {
  return (
    <section className="mt-16 p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
      <h2 className="text-2xl font-serif italic text-amber-400 mb-6">Frequently Asked Questions</h2>
      <div className="space-y-2">
        {faqItems.map((item, index) => (
          <AccordionItem key={index} item={item} />
        ))}
      </div>
    </section>
  );
};
