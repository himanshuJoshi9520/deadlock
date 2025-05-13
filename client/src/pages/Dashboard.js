import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Grid,
  Box,
  CircularProgress,
} from '@mui/material';
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';
import ScheduleIcon from '@mui/icons-material/Schedule';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import axios from 'axios';
import { motion } from 'framer-motion';

const MotionPaper = motion(Paper);

// Add the train background styles
const trainBackgroundStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(145deg, rgba(26,26,26,0.95), rgba(45,45,45,0.95))',
    zIndex: 1
  }
};

const movingTrainStyles = {
  position: 'absolute',
  bottom: '10%',
  left: '-20%',
  width: '40%',
  height: 'auto',
  animation: 'moveTrain 20s linear infinite',
  '@keyframes moveTrain': {
    '0%': {
      transform: 'translateX(-100%)',
    },
    '100%': {
      transform: 'translateX(200%)',
    }
  }
};

function Dashboard() {
  const [stats, setStats] = useState({
    trains: 0,
    tracks: 0,
    schedules: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [trainsRes, tracksRes, schedulesRes] = await Promise.all([
        axios.get('http://localhost:5000/api/trains'),
        axios.get('http://localhost:5000/api/tracks'),
        axios.get('http://localhost:5000/api/schedules')
      ]);

      setStats({
        trains: trainsRes.data.length,
        tracks: tracksRes.data.length,
        schedules: schedulesRes.data.length
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress sx={{ color: '#00ff88' }} />
      </Box>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <MotionPaper
      variants={itemVariants}
      sx={{
        p: 3,
        height: '100%',
        background: 'linear-gradient(145deg, rgba(26,26,26,0.9), rgba(45,45,45,0.9))',
        borderRadius: 3,
        boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        border: '1px solid rgba(255,255,255,0.1)',
        position: 'relative',
        overflow: 'hidden',
        backdropFilter: 'blur(10px)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: `linear-gradient(90deg, ${color}, ${color}80)`,
        }
      }}
    >
      <Box display="flex" alignItems="center" mb={2}>
        <Box
          sx={{
            background: `linear-gradient(145deg, ${color}, ${color}80)`,
            borderRadius: '50%',
            p: 1.5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 4px 15px ${color}40`,
            mr: 2
          }}
        >
          <Icon sx={{ fontSize: 28, color: '#ffffff' }} />
        </Box>
        <Typography
          variant="h6"
          sx={{
            color: '#ffffff',
            fontWeight: 500,
            textShadow: '0 2px 4px rgba(0,0,0,0.2)'
          }}
        >
          {title}
        </Typography>
      </Box>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Typography
          variant="h3"
          sx={{
            color: color,
            fontWeight: 700,
            textShadow: `0 2px 4px ${color}40`,
            textAlign: 'center',
            mb: 1
          }}
        >
          {value}
        </Typography>
      </motion.div>
    </MotionPaper>
  );

  return (
    <>
      <Box sx={trainBackgroundStyles}>
        <Box
          component="img"
          src="/train.png"
          alt="Moving Train"
          sx={movingTrainStyles}
        />
      </Box>
      <Container maxWidth="lg" sx={{ py: 4, position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Box 
            sx={{
              background: 'linear-gradient(145deg, rgba(26,26,26,0.9), rgba(45,45,45,0.9))',
              p: 4,
              borderRadius: 3,
              mb: 4,
              boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
              border: '1px solid rgba(255,255,255,0.1)',
              position: 'relative',
              overflow: 'hidden',
              backdropFilter: 'blur(10px)'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '100%',
                background: 'linear-gradient(45deg, rgba(0,255,136,0.1), rgba(0,204,106,0.05))',
                zIndex: 0
              }}
            />
            <Typography
              variant="h4"
              sx={{
                color: '#ffffff',
                fontWeight: 700,
                mb: 1,
                position: 'relative',
                zIndex: 1,
                textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: 2
              }}
            >
              <Box
                sx={{
                  background: 'linear-gradient(145deg, #00ff88, #00cc6a)',
                  borderRadius: '50%',
                  p: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 15px rgba(0,255,136,0.3)'
                }}
              >
                <ScheduleIcon sx={{ fontSize: 32, color: '#ffffff' }} />
              </Box>
              System Overview
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: 'rgba(255,255,255,0.7)',
                position: 'relative',
                zIndex: 1,
                maxWidth: '600px'
              }}
            >
              Welcome to the Railway Management System. Here's a quick overview of your system's current status.
            </Typography>
          </Box>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <StatCard
                icon={DirectionsRailwayIcon}
                title="Total Trains"
                value={stats.trains}
                color="#00ff88"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <StatCard
                icon={TrackChangesIcon}
                title="Total Tracks"
                value={stats.tracks}
                color="#00bcd4"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <StatCard
                icon={ScheduleIcon}
                title="Active Schedules"
                value={stats.schedules}
                color="#ff4081"
              />
            </Grid>
          </Grid>
        </motion.div>
      </Container>
    </>
  );
}

export default Dashboard; 