// FILE: src/app/page.tsx
'use client';

import { useRouter } from 'next/navigation';
import FluidCursor from '@/components/FluidCursor';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

import {
  BriefcaseBusiness,
  Laugh,
  Layers,
  PartyPopper,
  UserRoundSearch,
} from 'lucide-react';
import Image from 'next/image';

const questionConfig = [
  { key: 'Me', color: '#329696', icon: Laugh },
  { key: 'Projects', color: '#3E9858', icon: BriefcaseBusiness },
  { key: 'Skills', color: '#856ED9', icon: Layers },
  { key: 'Blog', color: '#B95F9D', icon: PartyPopper },
  { key: 'Contact', color: '#C19433', icon: UserRoundSearch },
] as const;

export default function Home() {
  const router = useRouter();

  const handleSectionClick = (key: string) => router.push(`/${key.toLowerCase()}`);

  const topElementVariants = {
    hidden: { opacity: 0, y: -60 },
    visible: { opacity: 1, y: 0, transition: { type: 'ease', duration: 0.8 } },
  };

  const bottomElementVariants = {
    hidden: { opacity: 0, y: 80 },
    visible: { opacity: 1, y: 0, transition: { type: 'ease', duration: 0.8, delay: 0.2 } },
  };

  const buttonsContainerVariants = {
    normal: {
      marginTop: '1rem',
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-10 md:pb-20">
      {/* Decorative bottom text */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden">
        <div
          className="hidden select-none bg-gradient-to-b from-neutral-500/10 to-neutral-500/0 bg-clip-text text-[10rem] font-black leading-none text-transparent sm:block lg:text-[16rem]"
          style={{ marginBottom: '-2.5rem' }}
        >
          Kiran Nirmal
        </div>
      </div>

      {/* Top-right link */}
      <div className="absolute top-6 right-8 z-20">
        <a
          href="https://github.com/yourusername/your-repo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border bg-white/30 px-4 py-1.5 text-sm font-medium text-black shadow-md backdrop-blur-lg transition hover:bg-white/60 dark:border-white dark:text-white dark:hover:bg-neutral-800"
        >
          ⭐ Star on GitHub
        </a>
      </div>

      {/* Top-left availability */}
      <div className="absolute top-6 left-6 z-20">
        <div className="relative flex items-center gap-2 rounded-full border bg-white/30 px-4 py-1.5 text-sm font-medium text-black shadow-md backdrop-blur-lg dark:border-white dark:text-white">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Available for opportunities
        </div>
      </div>

      {/* Header */}
      <motion.div
        className="z-10 mt-24 mb-4 flex flex-col items-center text-center md:mt-6 md:mb-4"
        variants={topElementVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="inline-flex items-center justify-center rounded-2xl bg-white/30 p-1.5 shadow-lg backdrop-blur-lg hover:bg-white/60">
          <Image src="/logo.png" width={96} height={96} alt="Logo" className="h-10 w-10 rounded-xl" />
        </div>

        <h2 className="text-secondary-foreground mt-1 text-xl font-semibold md:text-2xl">
          Hey, I'm Kiran 👋
        </h2>
        <h1 className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl">My Portfolio</h1>
      </motion.div>

      {/* PORTRAIT */}
      <div className="relative z-10 mt-2 h-52 w-48 overflow-hidden sm:h-72 sm:w-72">
        <video
          src="/myvideo1.webm"
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Buttons */}
      <motion.div
        variants={bottomElementVariants}
        initial="hidden"
        animate="visible"
        className="z-10 -mt-4 flex w-full flex-col items-center justify-center md:px-0"
      >
        <motion.div
          variants={buttonsContainerVariants}
          animate="normal"
          className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3 md:grid-cols-5"
        >
          {questionConfig.map(({ key, color, icon: Icon }, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
            >
              <Button
                onClick={() => handleSectionClick(key)}
                variant="outline"
                className="border-border hover:bg-border/30 aspect-square w-full cursor-pointer rounded-2xl border bg-white/30 py-8 shadow-none backdrop-blur-lg transition-transform active:scale-95 md:p-10"
              >
                <div className="flex h-full flex-col items-center justify-center gap-1 text-gray-700">
                  <Icon size={22} strokeWidth={2} color={color} />
                  <span className="text-xs font-medium sm:text-sm">{key}</span>
                </div>
              </Button>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <FluidCursor />
    </div>
  );
}
