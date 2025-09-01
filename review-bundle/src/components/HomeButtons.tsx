'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, Sparkles, BookOpen, Mail, Cpu } from 'lucide-react'; // replaced Target with Cpu

type Btn = {
  key: 'home' | 'me' | 'skills' | 'projects' | 'blog' | 'contact';
  label: string;
  href: string;
  icon: React.ReactNode;
};

const BUTTONS: Btn[] = [
  { key: 'home',     label: 'Home',     href: '/',        icon: <Home size={16} /> },
  { key: 'me',       label: 'Me',       href: '/me',      icon: <User size={16} /> },
  { key: 'skills',   label: 'Skills',   href: '/skills',  icon: <Sparkles size={16} /> },
  { key: 'projects', label: 'Projects', href: '/projects',icon: <Cpu size={16} /> },
  { key: 'blog',     label: 'Blog',     href: '/blog',    icon: <BookOpen size={16} /> },
  { key: 'contact',  label: 'Contact',  href: '/contact', icon: <Mail size={16} /> },
];

function activeKeyFromPath(pathname: string): Btn['key'] {
  if (pathname === '/' || pathname.startsWith('/#')) return 'home';
  if (pathname.startsWith('/me')) return 'me';
  if (pathname.startsWith('/skills')) return 'skills';
  if (pathname.startsWith('/projects')) return 'projects';
  if (pathname.startsWith('/blog')) return 'blog';
  if (pathname.startsWith('/contact')) return 'contact';
  return 'home';
}

interface HomeButtonsProps {
  exclude?: Btn['key']; // allow manual override
}

export default function HomeButtons({ exclude }: HomeButtonsProps) {
  const pathname = usePathname();
  const active = exclude ?? activeKeyFromPath(pathname);

  // 1️⃣ Hide entirely on home page
  if (active === 'home') return null;

  // 2️⃣ Hide active page + Home button
  const toHide = new Set<Btn['key']>(['home', active]);

  const items = BUTTONS.filter((b) => !toHide.has(b.key));

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-wrap items-center gap-2"
      aria-label="Quick navigation"
    >
      {items.map((b) => (
        <Link
          key={b.key}
          href={b.href}
          className="inline-flex items-center gap-2 rounded-full border border-neutral-200/70 dark:border-white/15 
                     bg-white/70 dark:bg-neutral-900/60 px-3 py-1.5 text-sm font-medium text-neutral-900 dark:text-neutral-100 
                     shadow-sm backdrop-blur-md hover:bg-white/90 dark:hover:bg-neutral-900/80 transition"
        >
          {b.icon}
          {b.label}
        </Link>
      ))}
    </div>
  );
}
