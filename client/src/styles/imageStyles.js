export const imageStyles = {
  headerImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.02)',
      boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
    }
  },
  cardImage: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px 8px 0 0',
    transition: 'all 0.3s ease-in-out'
  },
  iconImage: {
    width: '40px',
    height: '40px',
    objectFit: 'contain',
    transition: 'all 0.3s ease-in-out'
  }
};

export const imageAnimations = {
  float: {
    initial: { y: 0 },
    animate: {
      y: [-5, 5, -5],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  pulse: {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  },
  rotate: {
    initial: { rotate: 0 },
    animate: {
      rotate: 360,
      transition: {
        duration: 20,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }
}; 