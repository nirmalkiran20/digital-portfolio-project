'use client';

import { motion } from 'framer-motion';
import FluidCursor from '@/components/FluidCursor';
import { ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';


const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ProjectsPage() {
  const presentations = [
    { title: 'SEO Strategy 2025', image: '/project.jpeg', link: '#' },
    { title: 'Google Ads Masterclass', image: '/project.jpeg', link: '#' },
    { title: 'Analytics Dashboard Walkthrough', image: '/project.jpeg', link: '#' },
  ];

  const videos = [
    { title: 'Podcast on Growth Marketing', image: '/project.jpeg', link: '#' },
    { title: 'YouTube Interview: Future of SEO', image: '/project.jpeg', link: '#' },
  ];

  const otherProjects = [
    { title: 'E-commerce SEO Audit', image: '/project.jpeg', link: '#' },
    { title: 'Ad Campaign Optimization', image: '/project.jpeg', link: '#' },
    { title: 'Content Strategy Roadmap', image: '/project.jpeg', link: '#' },
  ];

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Fluid background */}
      <FluidCursor />

      {/* Navigation back */}
      <div className="fixed top-3 left-3 z-100">
        <Link 
          href="/"
          className="inline-flex items-center gap-2 rounded-full border bg-white/30 px-4 py-1.5 text-sm font-medium text-black shadow-md backdrop-blur-lg transition hover:bg-white/60 dark:border-white dark:text-white dark:hover:bg-neutral-800"
        >
         ←🏠
        </Link>
      </div>

     

      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 pt-28 pb-20">
        {/* Heading */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-3">My Recent Work & Portfolio</h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            A showcase of my presentations, podcasts, and digital marketing projects.
          </p>
        </motion.div>

        {/* Reusable Section Component */}
        {[
          { title: '📊 My Presentations (PPTs)', items: presentations },
          { title: '🎤 Video & Podcast Appearances', items: videos },
          { title: '💡 Other Digital Marketing Projects', items: otherProjects },
        ].map(({ title, items }) => (
          <motion.section
            key={title}
            className="mb-20"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-semibold mb-8">{title}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {items.map(({ title, image, link }) => (
                <motion.div
                  key={title}
                  variants={cardVariants}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="group rounded-2xl border bg-white/70 dark:bg-neutral-800/50 backdrop-blur-lg shadow-md overflow-hidden transition-all hover:shadow-xl hover:border-blue-300/40"
                >
                  <div className="relative w-full h-48">
                    <Image src={image} alt={title} fill className="object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <a
                      href={link}
                      className="inline-flex items-center gap-2 text-blue-600 hover:underline dark:text-blue-400"
                    >
                      View <ExternalLink size={16} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        ))}
      </main>
    </div>
  );
}


