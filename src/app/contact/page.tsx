'use client';

import FluidCursor from '@/components/FluidCursor';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Linkedin } from 'lucide-react';

const topElementVariants = {
  hidden: { opacity: 0, y: -60 },
  visible: { opacity: 1, y: 0, transition: { type: 'ease', duration: 0.8 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

export default function ContactPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 pb-16">
      {/* Fluid Cursor Behind */}
      <FluidCursor />

      {/* Back Home */}
      <div className="fixed top-3 left-3 z-50">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border bg-white/30 px-4 py-1.5 text-sm font-medium text-black shadow-md backdrop-blur-lg transition hover:bg-white/60 dark:border-white dark:text-white dark:hover:bg-neutral-800"
        >
          ← Home
        </Link>
      </div>

      

      {/* Heading */}
      <motion.div
        className="mt-20 mb-10 text-center"
        variants={topElementVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-5xl font-bold">Contact Me</h1>
        <p className="mt-3 text-lg text-neutral-600 dark:text-neutral-300 max-w-lg mx-auto">
          I do love to hear from you! Whether its a project, job opportunity, or just to say hi.
        </p>
      </motion.div>

      {/* Card */}
      <motion.div
        className="w-full max-w-md rounded-2xl border bg-white/70 dark:bg-neutral-800/50 backdrop-blur-lg shadow-lg p-6 space-y-6 text-center"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
      >
        <p className="text-neutral-700 dark:text-neutral-300">
          Feel free to reach out via email or connect on LinkedIn.
        </p>
        <div className="space-y-4">
          <motion.a
            href="mailto:nirmalkiran20@mail.com"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-white font-medium shadow-md transition hover:bg-blue-700"
          >
            <Mail size={18} /> Email Me
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/kiran-nirmal/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-white font-medium shadow-md transition hover:bg-blue-700"
          >
            <Linkedin size={18} /> LinkedIn Profile
          </motion.a>
        </div>
      </motion.div>
    </div>
  );
}


