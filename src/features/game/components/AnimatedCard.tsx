import { motion, AnimatePresence } from 'framer-motion';
import type { Character } from '@/types/game';

interface AnimatedCardProps {
  character: Character;
  state: 'initial' | 'revealed-good' | 'revealed-bad';
  children: React.ReactNode;
}

export const AnimatedCard = ({ character, state, children }: AnimatedCardProps) => {
  const variants = {
    initial: {
      scale: 1,
      rotate: 0
    },
    reveal: {
      scale: [1, 1.1, 1],
      rotate: [0, 5, -5, 0],
      transition: {
        duration: 0.5
      }
    },
    exit: {
      scale: 0.8,
      opacity: 0
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`${character.id}-${state}`}
        initial="initial"
        animate={state !== 'initial' ? 'reveal' : 'initial'}
        exit="exit"
        variants={variants}
        layout
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}; 