import { motion } from 'framer-motion';
import {
  HiOutlineChatAlt2,
  HiOutlineMicrophone,
  HiOutlineCode,
  HiOutlineLightningBolt,
  HiOutlineShieldCheck,
  HiOutlineColorSwatch,
} from 'react-icons/hi';

const features = [
  {
    icon: HiOutlineChatAlt2,
    title: 'Natural Conversations',
    desc: 'Fluid, context-aware chat that remembers your conversation history and adapts to your tone.',
  },
  {
    icon: HiOutlineMicrophone,
    title: 'Voice Interaction',
    desc: 'Speak naturally with built-in speech-to-text, and have responses read back to you.',
  },
  {
    icon: HiOutlineCode,
    title: 'Code-Aware Answers',
    desc: 'Syntax-highlighted code blocks with one-click copy, perfect for developers.',
  },
  {
    icon: HiOutlineLightningBolt,
    title: 'Lightning Fast',
    desc: 'Optimized architecture delivers near-instant responses with smooth streaming.',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Secure & Private',
    desc: 'End-to-end encrypted authentication with JWT and industry-standard password hashing.',
  },
  {
    icon: HiOutlineColorSwatch,
    title: 'Personalized Themes',
    desc: 'Switch between light, dark, or system themes to match your style.',
  },
];

const Features = () => {
  return (
    <section id="features" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Everything you need in <span className="gradient-text">one assistant</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            LOGAN AI is packed with premium features designed to make your workflow effortless.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="glass-card group rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg transition-transform group-hover:scale-110">
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
