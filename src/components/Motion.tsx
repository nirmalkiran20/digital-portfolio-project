'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';

export function MotionDiv(props: HTMLMotionProps<'div'>) {
  return <motion.div {...props} />;
}
export function MotionSection(props: HTMLMotionProps<'section'>) {
  return <motion.section {...props} />;
}
export function MotionArticle(props: HTMLMotionProps<'article'>) {
  return <motion.article {...props} />;
}
export function MotionH1(props: HTMLMotionProps<'h1'>) {
  return <motion.h1 {...props} />;
}


