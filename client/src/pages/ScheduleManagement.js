import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Chip,
  Box,
  CircularProgress,
  Tooltip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import ScheduleIcon from '@mui/icons-material/Schedule';
import axios from 'axios';
import { motion } from 'framer-motion';

const MotionPaper = motion(Paper);
const MotionTableRow = motion(TableRow);

function ScheduleManagement() {
  const [schedules, setSchedules] = useState([]);
  const [trains, setTrains] = useState([]);
  const [tracks, setTracks] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newSchedule, setNewSchedule] = useState({
    trainId: '',
    trackId: '',
    startTime: '',
    endTime: '',
    status: 'PENDING'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [schedulesRes, trainsRes, tracksRes] = await Promise.all([
        axios.get('http://localhost:5000/api/schedules'),
        axios.get('http://localhost:5000/api/trains'),
        axios.get('http://localhost:5000/api/tracks')
      ]);

      setSchedules(schedulesRes.data);
      setTrains(trainsRes.data);
      setTracks(tracksRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewSchedule({
      trainId: '',
      trackId: '',
      startTime: '',
      endTime: '',
      status: 'PENDING'
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/schedules', newSchedule);
      handleClose();
      fetchData();
    } catch (error) {
      console.error('Error creating schedule:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'ACTIVE':
        return 'success';
      case 'COMPLETED':
        return 'info';
      case 'CANCELLED':
        return 'error';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress sx={{ color: '#00ff88' }} />
      </Box>
    );
  }

  const tableRowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={3}
          sx={{
            background: 'linear-gradient(145deg, #1a1a1a, #2d2d2d)',
            p: 3,
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.1)'
          }}
        >
          <Typography 
            variant="h4" 
            sx={{ 
              color: '#ffffff',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              textShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
          >
            <Box 
              sx={{ 
                background: 'linear-gradient(145deg, #00ff88, #00cc6a)',
                borderRadius: '50%', 
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0,255,136,0.3)'
              }}
            >
              <ScheduleIcon sx={{ fontSize: 32, color: '#ffffff' }} />
            </Box>
            Schedule Management
          </Typography>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="contained"
              onClick={handleClickOpen}
              startIcon={<AddIcon />}
              sx={{
                background: 'linear-gradient(145deg, #00ff88, #00cc6a)',
                borderRadius: 2,
                textTransform: 'none',
                px: 3,
                py: 1,
                color: '#ffffff',
                boxShadow: '0 4px 15px rgba(0,255,136,0.3)',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(0,255,136,0.4)',
                  background: 'linear-gradient(145deg, #00cc6a, #00ff88)'
                }
              }}
            >
              Add New Schedule
            </Button>
          </motion.div>
        </Box>
      </motion.div>

      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        sx={{
          background: 'linear-gradient(145deg, #1a1a1a, #2d2d2d)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
          borderRadius: 3,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ 
                background: 'linear-gradient(145deg, #2d2d2d, #1a1a1a)',
                '& th': {
                  fontWeight: 600,
                  color: '#00ff88',
                  fontSize: '1rem',
                  borderBottom: '1px solid rgba(255,255,255,0.1)'
                }
              }}>
                <TableCell>Train</TableCell>
                <TableCell>Track</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedules.map((schedule, index) => (
                <MotionTableRow 
                  key={schedule._id}
                  custom={index}
                  variants={tableRowVariants}
                  initial="hidden"
                  animate="visible"
                  sx={{
                    '&:hover': {
                      background: 'linear-gradient(145deg, rgba(0,255,136,0.05), rgba(0,204,106,0.1))'
                    },
                    '& td': {
                      color: '#ffffff',
                      borderBottom: '1px solid rgba(255,255,255,0.1)'
                    }
                  }}
                >
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      <Box 
                        sx={{ 
                          background: 'linear-gradient(145deg, #00ff88, #00cc6a)',
                          borderRadius: '50%', 
                          p: 1, 
                          mr: 1,
                          boxShadow: '0 4px 15px rgba(0,255,136,0.3)'
                        }}
                      >
                        <ScheduleIcon sx={{ color: '#ffffff' }} />
                      </Box>
                      {trains.find(t => t._id === schedule.trainId)?.name || 'Unknown'}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {tracks.find(t => t._id === schedule.trackId)?.name || 'Unknown'}
                  </TableCell>
                  <TableCell>{new Date(schedule.startTime).toLocaleString()}</TableCell>
                  <TableCell>{new Date(schedule.endTime).toLocaleString()}</TableCell>
                  <TableCell>
                    <Chip
                      label={schedule.status}
                      color={getStatusColor(schedule.status)}
                      size="small"
                      sx={{ 
                        borderRadius: 1,
                        fontWeight: 500,
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IconButton 
                          sx={{
                            color: '#00ff88',
                            '&:hover': {
                              background: 'rgba(0,255,136,0.1)'
                            }
                          }}
                          size="small"
                        >
                          <EditIcon />
                        </IconButton>
                      </motion.div>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IconButton 
                          sx={{
                            color: '#ff4444',
                            '&:hover': {
                              background: 'rgba(255,68,68,0.1)'
                            }
                          }}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </motion.div>
                    </Tooltip>
                  </TableCell>
                </MotionTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </MotionPaper>

      <Dialog 
        open={open} 
        onClose={handleClose}
        PaperProps={{
          sx: {
            background: 'linear-gradient(145deg, #1a1a1a, #2d2d2d)',
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.1)'
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            color: '#00ff88',
            fontWeight: 600,
            pb: 2,
            textShadow: '0 2px 4px rgba(0,255,136,0.3)'
          }}
        >
          Add New Schedule
        </DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>Train</InputLabel>
            <Select
              value={newSchedule.trainId}
              onChange={(e) => setNewSchedule({ ...newSchedule, trainId: e.target.value })}
              sx={{
                color: '#ffffff',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.2)'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00ff88'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00ff88'
                }
              }}
            >
              {trains.map((train) => (
                <MenuItem key={train._id} value={train._id}>
                  {train.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel sx={{ color: 'rgba(255,255,255,0.7)' }}>Track</InputLabel>
            <Select
              value={newSchedule.trackId}
              onChange={(e) => setNewSchedule({ ...newSchedule, trackId: e.target.value })}
              sx={{
                color: '#ffffff',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: 'rgba(255,255,255,0.2)'
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00ff88'
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#00ff88'
                }
              }}
            >
              {tracks.map((track) => (
                <MenuItem key={track._id} value={track._id}>
                  {track.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            margin="dense"
            label="Start Time"
            type="datetime-local"
            fullWidth
            value={newSchedule.startTime}
            onChange={(e) => setNewSchedule({ ...newSchedule, startTime: e.target.value })}
            InputLabelProps={{
              shrink: true,
              sx: { color: 'rgba(255,255,255,0.7)' }
            }}
            sx={{ 
              mb: 2,
              '& .MuiOutlinedInput-root': {
                color: '#ffffff',
                '& fieldset': {
                  borderColor: 'rgba(255,255,255,0.2)'
                },
                '&:hover fieldset': {
                  borderColor: '#00ff88'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00ff88'
                }
              }
            }}
          />

          <TextField
            margin="dense"
            label="End Time"
            type="datetime-local"
            fullWidth
            value={newSchedule.endTime}
            onChange={(e) => setNewSchedule({ ...newSchedule, endTime: e.target.value })}
            InputLabelProps={{
              shrink: true,
              sx: { color: 'rgba(255,255,255,0.7)' }
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                color: '#ffffff',
                '& fieldset': {
                  borderColor: 'rgba(255,255,255,0.2)'
                },
                '&:hover fieldset': {
                  borderColor: '#00ff88'
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#00ff88'
                }
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button 
            onClick={handleClose}
            sx={{ 
              color: 'rgba(255,255,255,0.7)',
              '&:hover': {
                background: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            Cancel
          </Button>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={handleSubmit} 
              variant="contained"
              sx={{
                background: 'linear-gradient(145deg, #00ff88, #00cc6a)',
                borderRadius: 2,
                textTransform: 'none',
                px: 3,
                color: '#ffffff',
                boxShadow: '0 4px 15px rgba(0,255,136,0.3)',
                '&:hover': {
                  boxShadow: '0 6px 20px rgba(0,255,136,0.4)',
                  background: 'linear-gradient(145deg, #00cc6a, #00ff88)'
                }
              }}
            >
              Add
            </Button>
          </motion.div>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ScheduleManagement; 