import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Train as TrainIcon,
  Track as TrackIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Train Scheduling System
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
            startIcon={<DashboardIcon />}
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/trains"
            startIcon={<TrainIcon />}
          >
            Trains
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/tracks"
            startIcon={<TrackIcon />}
          >
            Tracks
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/schedules"
            startIcon={<ScheduleIcon />}
          >
            Schedules
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/deadlock"
            startIcon={<WarningIcon />}
          >
            Deadlock Detection
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 