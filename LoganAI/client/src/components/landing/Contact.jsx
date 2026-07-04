import { useState } from 'react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { HiOutlineMail, HiOutlinePaperAirplane } from 'react-icons/hi';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill in all fields');
      return;
    }
    setSubmitting(true);
    // Simulate sending — in production this would POST to a backend endpoint
    await new Promise((resolve) => setTimeout(resolve, 900));
    toast.success("Message sent! We'll get back to you soon.");
    setForm({ name: '', email: '', message: '' });
    setSubmitting(false);
  };

  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-3xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-3xl p-8 sm:p-12"
        >
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-white shadow-lg">
              <HiOutlineMail className="h-6 w-6" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Get in <span className="gradient-text">touch</span>
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Have questions or feedback? We&apos;d love to hear from you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className="input-field"
              />
              <input
                type="email"
                name="email"
                placeholder="Your email"
                value={form.email}
                onChange={handleChange}
                className="input-field"
              />
            </div>
            <textarea
              name="message"
              placeholder="Your message"
              rows={5}
              value={form.message}
              onChange={handleChange}
              className="input-field resize-none"
            />
            <button type="submit" disabled={submitting} className="btn-primary w-full">
              {submitting ? 'Sending...' : 'Send Message'} <HiOutlinePaperAirplane className="rotate-90" />
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
