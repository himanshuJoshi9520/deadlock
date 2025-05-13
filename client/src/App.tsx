import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import TrainManagement from './pages/TrainManagement';
import TrackManagement from './pages/TrackManagement';
import ScheduleManagement from './pages/ScheduleManagement';
import DeadlockDetection from './pages/DeadlockDetection';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/trains" element={<TrainManagement />} />
              <Route path="/tracks" element={<TrackManagement />} />
              <Route path="/schedules" element={<ScheduleManagement />} />
              <Route path="/deadlock" element={<DeadlockDetection />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App; 