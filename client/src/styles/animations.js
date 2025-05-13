export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5 }
};

export const staggerContainer = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

export const cardHover = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.02,
    transition: { duration: 0.2 }
  }
};

export const pageTransition = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 },
  transition: { duration: 0.5 }
};

export const buttonHover = {
  initial: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: { duration: 0.2 }
  }
};

export const tableRowAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
}; 