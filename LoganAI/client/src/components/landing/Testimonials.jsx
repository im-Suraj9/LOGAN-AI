import { motion } from 'framer-motion';
import { HiStar } from 'react-icons/hi';

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Product Designer',
    quote:
      'LOGAN AI has completely changed how I brainstorm. The voice feature means I can capture ideas while sketching.',
    initials: 'SC',
  },
  {
    name: 'Marcus Webb',
    role: 'Software Engineer',
    quote:
      'The code formatting and copy button alone save me so much time. It feels like pairing with a senior dev.',
    initials: 'MW',
  },
  {
    name: 'Priya Patel',
    role: 'Marketing Lead',
    quote:
      'Clean interface, fast responses, and the chat history makes it easy to pick up right where I left off.',
    initials: 'PP',
  },
];

const Testimonials = () => {
  return (
    <section className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Loved by <span className="gradient-text">thousands</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Here&apos;s what our users have to say about their experience.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="glass-card flex flex-col rounded-2xl p-6"
            >
              <div className="mb-3 flex gap-1 text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <HiStar key={i} className="h-4 w-4" />
                ))}
              </div>
              <p className="mb-6 flex-1 text-sm text-gray-700 dark:text-gray-300">
                &quot;{t.quote}&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-accent-500 text-sm font-bold text-white">
                  {t.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
