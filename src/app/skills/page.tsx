'use client';

import { motion } from 'framer-motion';
import FluidCursor from '@/components/FluidCursor';
import Link from 'next/link';
import { CheckCircle2, Sparkles, Target, TrendingUp, Gauge, Trophy, Shield } from 'lucide-react';

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

type Skill = { name: string; level: number; highlight?: string; tag?: string; };

const coreSkills: Skill[] = [
  { name: 'SEO Strategy & Audits', level: 92, highlight: 'Technical + Content', tag: 'SEO' },
  { name: 'Google Ads (Search/PMAX)', level: 88, highlight: 'ROAS + CPA', tag: 'Ads' },
  { name: 'GA4 + Conversion Tracking', level: 90, highlight: 'Events/Attribution', tag: 'Analytics' },
  { name: 'Looker Studio Dashboards', level: 86, highlight: 'CMO Reports', tag: 'BI' },
  { name: 'Social Media Strategy (SMM)', level: 80, highlight: 'Paid + Organic', tag: 'SMM' },
  { name: 'CRO & Landing Pages', level: 84, highlight: 'A/B Testing', tag: 'CRO' },
];

const seoSpecialties = [
  'Technical SEO (CWV, crawl, indexation)',
  'Keyword strategy & content clusters',
  'On-page & Internal linking',
  'Schema & SERP features',
  'Backlink strategy & digital PR',
];

const adsSpecialties = [
  'Search, PMAX, Remarketing',
  'SKAG vs. Thematic structures',
  'Ad copy testing & extensions',
  'Bidding strategies & budgets',
  'Feed optimization (ecom)',
];

const analyticsSpecialties = [
  'GA4 events & ecommerce',
  'GTM dataLayer planning',
  'Attribution modelling',
  'Funnel + cohort analysis',
  'Looker Studio automation',
];

const tools = [
  { logo: '/tool-logos/semrush.png', label: 'Semrush' },
  { logo: '/tool-logos/ahrefs.png', label: 'Ahrefs' },
  { logo: '/tool-logos/screamingfrog.png', label: 'Screaming Frog' },
  { logo: '/tool-logos/gsc.png', label: 'Google Search Console' },
  { logo: '/tool-logos/google-ads.png', label: 'Google Ads' },
  { logo: '/tool-logos/meta-ads.png', label: 'Meta Ads' },
  { logo: '/tool-logos/linkedin-ads.png', label: 'LinkedIn Ads' },
  { logo: '/tool-logos/ga4.png', label: 'GA4' },
  { logo: '/tool-logos/gtm.png', label: 'GTM' },
  { logo: '/tool-logos/looker.png', label: 'Looker Studio' },
];

const certifications = [
  { name: 'Google Analytics – GA4 Certification', issuer: 'Google', year: '2025' },
  { name: 'Google Ads Search Certification', issuer: 'Google', year: '2025' },
  { name: 'Meta Media Planning Certification', issuer: 'Meta', year: '2024' },
];

function Meter({ value, color = '#3b82f6' }: { value: number; color?: string }) {
  return (
    <div className="h-2.5 w-full rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ type: 'spring', stiffness: 200, damping: 24 }}
        style={{ background: color }}
      />
    </div>
  );
}

export default function SkillsPage() {
  return (
    <div className="relative min-h-screen flex flex-col px-4 pt-24 pb-16">
      {/* Fluid Cursor Behind */}
      <FluidCursor />

      {/* Back Home Button */}
      <div className="fixed top-3 left-3 z-100">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full border bg-white/30 px-4 py-1.5 text-sm font-medium text-black shadow-md backdrop-blur-lg transition hover:bg-white/60 dark:border-white dark:text-white dark:hover:bg-neutral-800"
        >
          ←🏠
        </Link>
      </div>




      <main className="relative z-10 max-w-6xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-3">Skills & Capabilities</h1>
          <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
            A senior digital marketer with 9.7+ years across SEO, SEM, SMM, Google Ads, GA4 and Looker Studio.
            I blend performance strategy with analytics to drive growth.
          </p>
        </motion.div>

        {/* Core Capabilities */}
        <motion.section
          className="mb-14"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2">
            <Gauge size={24} /> Core Capabilities
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreSkills.map(({ name, level, highlight, tag }) => (
              <motion.div
                key={name}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="rounded-2xl border bg-white/70 dark:bg-neutral-800/50 backdrop-blur-lg shadow-md p-5 transition-all hover:shadow-xl hover:border-blue-300/40"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold">{name}</div>
                  {tag && <span className="rounded-full border px-2 py-0.5 text-xs text-neutral-600 dark:text-neutral-300">{tag}</span>}
                </div>
                {highlight && <div className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">{highlight}</div>}
                <Meter value={level} color="#0171E3" />
                <div className="mt-2 text-right text-xs text-neutral-500">{level}% proficiency</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Specialties */}
        <motion.section
          className="mb-14"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2">
            <Sparkles size={24} /> Specialties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'SEO', items: seoSpecialties, icon: <CheckCircle2 size={16} className="text-emerald-500" /> },
              { title: 'Ads', items: adsSpecialties, icon: <Target size={16} className="text-blue-600" /> },
              { title: 'Analytics', items: analyticsSpecialties, icon: <TrendingUp size={16} className="text-purple-600" /> },
            ].map(({ title, items, icon }) => (
              <motion.div
                key={title}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="rounded-2xl border bg-white/70 dark:bg-neutral-800/50 backdrop-blur-lg shadow-md p-5 transition-all hover:shadow-xl hover:border-blue-300/40"
              >
                <h3 className="text-xl font-semibold mb-3">{title}</h3>
                <ul className="space-y-2 text-neutral-700 dark:text-neutral-300">
                  {items.map((item) => (
                    <li key={item} className="flex items-center gap-2">{icon} {item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Tools Stack */}
        <motion.section className="mb-14" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2"><Trophy size={24} /> My Stack</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
            {tools.map(({ logo, label }) => (
              <motion.div
                key={label}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="rounded-xl border bg-white/60 dark:bg-neutral-800/40 backdrop-blur-lg shadow p-4 flex items-center gap-3 transition-all hover:shadow-xl hover:border-blue-300/40"
              >
                <img src={logo} alt={label} className="h-8 w-8 object-contain" />
                <span className="text-sm font-medium">{label}</span>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Certifications */}
        <motion.section className="mb-20" variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <h2 className="text-3xl font-semibold mb-6 flex items-center gap-2"><Shield size={24} /> Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map(({ name, issuer, year }) => (
              <motion.div
                key={name}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                className="rounded-2xl border bg-white/70 dark:bg-neutral-800/50 backdrop-blur-lg shadow-md p-5 transition-all hover:shadow-xl hover:border-blue-300/40"
              >
                <div className="font-semibold">{name}</div>
                <div className="text-sm text-neutral-500">{issuer}</div>
                <div className="mt-2 inline-block rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 px-2 py-0.5 text-xs">{year}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
    </div>
  );
}
