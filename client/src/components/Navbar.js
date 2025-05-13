import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import TrainIcon from '@mui/icons-material/Train';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <TrainIcon sx={{ mr: 2 }} />
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Train Scheduling System
        </Typography>
        <Box>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/trains"
          >
            Trains
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/tracks"
          >
            Tracks
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/schedules"
          >
            Schedules
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar; 