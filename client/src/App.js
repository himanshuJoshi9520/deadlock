import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import TrainManagement from './pages/TrainManagement';
import TrackManagement from './pages/TrackManagement';
import ScheduleManagement from './pages/ScheduleManagement';

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
      <div className="App">
        <Navbar />
        <main style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/trains" element={<TrainManagement />} />
            <Route path="/tracks" element={<TrackManagement />} />
            <Route path="/schedules" element={<ScheduleManagement />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App; 