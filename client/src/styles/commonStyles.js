export const gradientBackgrounds = {
  primary: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
  success: 'linear-gradient(45deg, #2e7d32 30%, #66bb6a 90%)',
  warning: 'linear-gradient(45deg, #ed6c02 30%, #ff9800 90%)',
  error: 'linear-gradient(45deg, #d32f2f 30%, #ef5350 90%)'
};

export const cardStyles = {
  borderRadius: 2,
  boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    boxShadow: '0 5px 15px 2px rgba(0, 0, 0, .2)',
    transform: 'translateY(-2px)'
  }
};

export const buttonStyles = {
  borderRadius: 2,
  textTransform: 'none',
  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 5px 15px 2px rgba(33, 203, 243, .4)'
  }
};

export const tableStyles = {
  '& .MuiTableCell-head': {
    backgroundColor: '#f5f5f5',
    fontWeight: 'bold',
    color: '#1976d2'
  },
  '& .MuiTableRow-root:hover': {
    backgroundColor: 'rgba(25, 118, 210, 0.04)'
  }
};

export const chipStyles = {
  borderRadius: 1,
  transition: 'all 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)'
  }
};

export const dialogStyles = {
  PaperProps: {
    sx: {
      borderRadius: 2,
      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .1)'
    }
  }
}; 