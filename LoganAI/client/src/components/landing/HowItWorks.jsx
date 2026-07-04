import { motion } from 'framer-motion';
import { HiOutlineUserAdd, HiOutlineChatAlt, HiOutlineSparkles } from 'react-icons/hi';

const steps = [
  {
    icon: HiOutlineUserAdd,
    title: 'Create your account',
    desc: 'Sign up in seconds with just your name, email, and a password.',
  },
  {
    icon: HiOutlineChatAlt,
    title: 'Start a conversation',
    desc: 'Type or speak your question — LOGAN AI understands natural language.',
  },
  {
    icon: HiOutlineSparkles,
    title: 'Get instant answers',
    desc: 'Receive intelligent, formatted responses you can copy, refine, or build on.',
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            How it <span className="gradient-text">works</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Getting started with LOGAN AI takes less than a minute.
          </p>
        </div>

        <div className="relative mt-16 grid grid-cols-1 gap-10 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-8 hidden h-0.5 bg-gradient-to-r from-primary-300 via-accent-400 to-primary-300 md:block" />
          {steps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-xl">
                <step.icon className="h-7 w-7" />
              </div>
              <span className="mb-2 text-sm font-bold text-primary-500">STEP {idx + 1}</span>
              <h3 className="mb-2 text-lg font-bold text-gray-900 dark:text-white">
                {step.title}
              </h3>
              <p className="max-w-xs text-sm text-gray-600 dark:text-gray-400">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
