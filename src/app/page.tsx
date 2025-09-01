'use client';

import { useRouter } from 'next/navigation';
import FluidCursor from '@/components/FluidCursor';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  Laugh,
  Layers,
  PartyPopper,
  UserRoundSearch,
  Search,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { searchContent } from '@/lib/searchData';

const questionConfig = [
  { key: 'Me', color: '#329696', icon: Laugh },
  { key: 'Projects', color: '#3E9858', icon: BriefcaseBusiness },
  { key: 'Skills', color: '#856ED9', icon: Layers },
  { key: 'Blog', color: '#B95F9D', icon: PartyPopper },
  { key: 'Contact', color: '#C19433', icon: UserRoundSearch },
] as const;

export default function Home() {
  const router = useRouter();
  const [input, setInput] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const handleSectionClick = (key: string) => router.push(`/${key.toLowerCase()}`);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && searchResults.length > 0) {
      router.push(searchResults[0].path);
    }
  };

  useEffect(() => {
  let active = true;
  (async () => {
    if (input.trim()) {
      const results = await searchContent(input);
      if (active) {
        setSearchResults(results);
        setShowResults(true);
      }
    } else {
      if (active) {
        setSearchResults([]);
        setShowResults(false);
      }
    }
  })();
  return () => { active = false; };
}, [input]);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
    searchActive: {
      marginTop: '6rem', // capped so layout doesn't get pushed off-screen
      transition: { type: 'spring', stiffness: 300, damping: 30 },
    },
  };

  useEffect(() => {
    const img = new window.Image();
    img.src = '/myphoto5.png';
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 pb-10 md:pb-20">
      {/* Decorative bottom text (doesn't affect layout height) */}
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

      {/* SEARCH BLOCK — moved above the emoji and layered above */}
      <motion.div
        variants={bottomElementVariants}
        initial="hidden"
        animate="visible"
        className="z-20 mt-3 w-full max-w-xs md:px-0"
      >
        <div ref={searchRef} className="relative w-full">
          <form onSubmit={handleFormSubmit} className="relative">
            <div className="mx-auto flex items-center rounded-full border border-neutral-300 bg-white/80 px-3 py-1.5 shadow-sm backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-800">
              <Search className="mr-2 h-4 w-4 text-neutral-500 dark:text-neutral-400" />
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onFocus={() => input && setShowResults(true)}
                placeholder="Search my portfolio..."
                className="w-full border-none bg-transparent text-sm text-neutral-800 placeholder:text-neutral-500 focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-400"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Search"
                className="ml-2 flex items-center justify-center rounded-full bg-blue-600 p-1 text-white hover:bg-blue-700 disabled:opacity-70 dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>

          {/* Results */}
          <AnimatePresence>
            {showResults && searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-full left-0 right-0 z-50 mt-2 max-h-80 overflow-y-auto rounded-2xl border bg-white/95 shadow-xl backdrop-blur-lg dark:bg-neutral-800/95"
                style={{ boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
              >
                {searchResults.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => {
                      router.push(result.path);
                      setShowResults(false);
                      setInput('');
                    }}
                    className="flex cursor-pointer items-start gap-3 border-b p-4 transition-colors hover:bg-neutral-100/50 last:border-b-0 dark:hover:bg-neutral-700/50"
                  >
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <span className="font-medium text-neutral-900 dark:text-neutral-100">{result.title}</span>
                        <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                          {result.category}
                        </span>
                      </div>
                      <p className="line-clamp-2 text-sm text-neutral-600 dark:text-neutral-400">{result.snippet}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* No results */}
          <AnimatePresence>
            {showResults && input.trim() && searchResults.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute top-full left-0 right-0 z-50 mt-2 rounded-2xl border bg-white/95 p-4 text-center shadow-xl backdrop-blur-lg dark:bg-neutral-800/95"
              >
                <p className="text-neutral-600 dark:text-neutral-400">No results found for "{input}"</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

{/* PORTRAIT — now below the search, with lower stacking */}
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
          animate={showResults && (searchResults.length > 0 || input.trim()) ? 'searchActive' : 'normal'}
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
