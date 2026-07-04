import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HiCheck } from 'react-icons/hi';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    desc: 'Perfect for trying things out.',
    features: ['50 messages / day', 'Basic chat history', 'Light & dark themes', 'Community support'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/ month',
    desc: 'For power users who chat daily.',
    features: [
      'Unlimited messages',
      'Voice input & output',
      'Priority response speed',
      'Full chat history & search',
      'Email support',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Team',
    price: '$39',
    period: '/ month',
    desc: 'Collaborate with your whole team.',
    features: [
      'Everything in Pro',
      'Up to 10 seats',
      'Shared workspaces',
      'Admin dashboard',
      'Priority support',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const Pricing = () => {
  return (
    <section id="pricing" className="relative py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Simple, transparent <span className="gradient-text">pricing</span>
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Choose the plan that fits how you work. Upgrade or cancel anytime.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`relative flex flex-col rounded-3xl p-8 ${
                plan.highlighted
                  ? 'scale-105 bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-2xl shadow-primary-500/30'
                  : 'glass-card'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1 text-xs font-bold text-primary-600 shadow-md">
                  MOST POPULAR
                </span>
              )}
              <h3 className={`text-lg font-bold ${plan.highlighted ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                {plan.name}
              </h3>
              <p className={`mt-1 text-sm ${plan.highlighted ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}`}>
                {plan.desc}
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">{plan.price}</span>
                <span className={plan.highlighted ? 'text-white/80' : 'text-gray-500 dark:text-gray-400'}>
                  {plan.period}
                </span>
              </div>

              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <HiCheck className={`mt-0.5 h-5 w-5 flex-shrink-0 ${plan.highlighted ? 'text-white' : 'text-primary-500'}`} />
                    <span className={plan.highlighted ? 'text-white/90' : 'text-gray-700 dark:text-gray-300'}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                to="/signup"
                className={`mt-8 w-full rounded-xl py-3 text-center font-semibold transition-all ${
                  plan.highlighted
                    ? 'bg-white text-primary-600 hover:bg-gray-100'
                    : 'btn-secondary'
                }`}
              >
                {plan.cta}
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
