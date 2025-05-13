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
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DirectionsRailwayIcon from '@mui/icons-material/DirectionsRailway';
import axios from 'axios';
import { motion } from 'framer-motion';

const MotionPaper = motion(Paper);
const MotionTableRow = motion(TableRow);

function TrackManagement() {
  const [tracks, setTracks] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newTrack, setNewTrack] = useState({
    trackNumber: '',
    name: '',
    status: 'AVAILABLE'
  });

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tracks');
      setTracks(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching tracks:', error);
      setLoading(false);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewTrack({
      trackNumber: '',
      name: '',
      status: 'AVAILABLE'
    });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/tracks', newTrack);
      handleClose();
      fetchTracks();
    } catch (error) {
      console.error('Error creating track:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'AVAILABLE':
        return 'success';
      case 'OCCUPIED':
        return 'error';
      case 'MAINTENANCE':
        return 'warning';
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
              <DirectionsRailwayIcon sx={{ fontSize: 32, color: '#ffffff' }} />
            </Box>
            Track Management
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
              Add New Track
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
                <TableCell>Track Number</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tracks.map((track, index) => (
                <MotionTableRow 
                  key={track._id}
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
                        <DirectionsRailwayIcon sx={{ color: '#ffffff' }} />
                      </Box>
                      {track.trackNumber}
                    </Box>
                  </TableCell>
                  <TableCell>{track.name}</TableCell>
                  <TableCell>
                    <Chip
                      label={track.status}
                      color={getStatusColor(track.status)}
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
          Add New Track
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Track Number"
            fullWidth
            value={newTrack.trackNumber}
            onChange={(e) => setNewTrack({ ...newTrack, trackNumber: e.target.value })}
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
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255,255,255,0.7)'
              }
            }}
          />
          <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={newTrack.name}
            onChange={(e) => setNewTrack({ ...newTrack, name: e.target.value })}
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
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(255,255,255,0.7)'
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

export default TrackManagement; 