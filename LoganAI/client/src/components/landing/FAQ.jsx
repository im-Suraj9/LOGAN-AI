import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';

const faqs = [
  {
    q: 'Is LOGAN AI free to use?',
    a: 'Yes! Our Free plan gives you 50 messages per day with no credit card required. You can upgrade to Pro anytime for unlimited access.',
  },
  {
    q: 'Which AI models power LOGAN AI?',
    a: 'LOGAN AI connects to OpenAI-compatible language models. Administrators can configure the exact model and provider through environment variables.',
  },
  {
    q: 'Can I use voice commands?',
    a: 'Absolutely. LOGAN AI supports speech-to-text for dictating messages and text-to-speech for having responses read aloud.',
  },
  {
    q: 'Is my data secure?',
    a: 'We use industry-standard JWT authentication and bcrypt password hashing. Your conversations are private to your account.',
  },
  {
    q: 'Can I delete my chat history?',
    a: 'Yes, you have full control to rename or permanently delete any conversation from your chat history at any time.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="relative py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Frequently asked <span className="gradient-text">questions</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Can&apos;t find the answer you&apos;re looking for? Reach out below.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, idx) => (
            <div key={faq.q} className="glass-card overflow-hidden rounded-2xl">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
              >
                <span className="font-semibold text-gray-900 dark:text-white">{faq.q}</span>
                <HiChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-primary-500 transition-transform duration-300 ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="px-6 pb-5 text-sm text-gray-600 dark:text-gray-400">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
