import React, { useEffect, useState } from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
} from '@mui/material';
import {
  Train as TrainIcon,
  Track as TrackIcon,
  Schedule as ScheduleIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import axios from 'axios';

interface DashboardStats {
  totalTrains: number;
  activeTrains: number;
  totalTracks: number;
  occupiedTracks: number;
  activeSchedules: number;
  deadlockDetected: boolean;
}

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalTrains: 0,
    activeTrains: 0,
    totalTracks: 0,
    occupiedTracks: 0,
    activeSchedules: 0,
    deadlockDetected: false,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [trainsRes, tracksRes, schedulesRes, deadlockRes] = await Promise.all([
          axios.get('http://localhost:5000/api/trains'),
          axios.get('http://localhost:5000/api/tracks'),
          axios.get('http://localhost:5000/api/schedules'),
          axios.post('http://localhost:5000/api/detect-deadlock', {
            trains: (await axios.get('http://localhost:5000/api/trains')).data,
            tracks: (await axios.get('http://localhost:5000/api/tracks')).data,
          }),
        ]);

        const trains = trainsRes.data;
        const tracks = tracksRes.data;
        const schedules = schedulesRes.data;

        setStats({
          totalTrains: trains.length,
          activeTrains: trains.filter((t: any) => t.status === 'MOVING').length,
          totalTracks: tracks.length,
          occupiedTracks: tracks.filter((t: any) => t.status === 'OCCUPIED').length,
          activeSchedules: schedules.filter((s: any) => s.status === 'ACTIVE').length,
          deadlockDetected: deadlockRes.data.deadlock.detected,
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const StatCard = ({ title, value, icon: Icon, color }: any) => (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Icon sx={{ fontSize: 40, color, mr: 2 }} />
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" component="div">
          {value}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        System Overview
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Trains"
            value={stats.totalTrains}
            icon={TrainIcon}
            color="primary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Trains"
            value={stats.activeTrains}
            icon={TrainIcon}
            color="success.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Tracks"
            value={stats.totalTracks}
            icon={TrackIcon}
            color="info.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Occupied Tracks"
            value={stats.occupiedTracks}
            icon={TrackIcon}
            color="warning.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Schedules"
            value={stats.activeSchedules}
            icon={ScheduleIcon}
            color="secondary.main"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Deadlock Status"
            value={stats.deadlockDetected ? 'Detected' : 'No Deadlock'}
            icon={WarningIcon}
            color={stats.deadlockDetected ? 'error.main' : 'success.main'}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 