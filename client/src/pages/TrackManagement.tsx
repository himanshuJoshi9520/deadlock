import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Link as LinkIcon,
} from '@mui/icons-material';
import axios from 'axios';

interface Track {
  _id: string;
  trackNumber: string;
  name: string;
  status: 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE';
  currentTrain?: {
    _id: string;
    trainNumber: string;
    name: string;
  };
  requestedBy?: {
    _id: string;
    trainNumber: string;
    name: string;
  };
  connectedTracks: string[];
}

const TrackManagement = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [open, setOpen] = useState(false);
  const [editingTrack, setEditingTrack] = useState<Track | null>(null);
  const [formData, setFormData] = useState({
    trackNumber: '',
    name: '',
    status: 'AVAILABLE',
  });

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tracks');
      setTracks(response.data);
    } catch (error) {
      console.error('Error fetching tracks:', error);
    }
  };

  const handleOpen = (track?: Track) => {
    if (track) {
      setEditingTrack(track);
      setFormData({
        trackNumber: track.trackNumber,
        name: track.name,
        status: track.status,
      });
    } else {
      setEditingTrack(null);
      setFormData({
        trackNumber: '',
        name: '',
        status: 'AVAILABLE',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTrack(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTrack) {
        await axios.patch(`http://localhost:5000/api/tracks/${editingTrack._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/tracks', formData);
      }
      handleClose();
      fetchTracks();
    } catch (error) {
      console.error('Error saving track:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this track?')) {
      try {
        await axios.delete(`http://localhost:5000/api/tracks/${id}`);
        fetchTracks();
      } catch (error) {
        console.error('Error deleting track:', error);
      }
    }
  };

  const getStatusColor = (status: string) => {
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

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Track Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Track
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Track Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Current Train</TableCell>
              <TableCell>Requested By</TableCell>
              <TableCell>Connected Tracks</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tracks.map((track) => (
              <TableRow key={track._id}>
                <TableCell>{track.trackNumber}</TableCell>
                <TableCell>{track.name}</TableCell>
                <TableCell>
                  <Chip
                    label={track.status}
                    color={getStatusColor(track.status)}
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  {track.currentTrain
                    ? `${track.currentTrain.trainNumber} - ${track.currentTrain.name}`
                    : '-'}
                </TableCell>
                <TableCell>
                  {track.requestedBy
                    ? `${track.requestedBy.trainNumber} - ${track.requestedBy.name}`
                    : '-'}
                </TableCell>
                <TableCell>{track.connectedTracks.length}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(track)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(track._id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {editingTrack ? 'Edit Track' : 'Add New Track'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Track Number"
              fullWidth
              value={formData.trackNumber}
              onChange={(e) =>
                setFormData({ ...formData, trackNumber: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Name"
              fullWidth
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <TextField
              select
              margin="dense"
              label="Status"
              fullWidth
              value={formData.status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  status: e.target.value as 'AVAILABLE' | 'OCCUPIED' | 'MAINTENANCE',
                })
              }
              SelectProps={{
                native: true,
              }}
            >
              <option value="AVAILABLE">Available</option>
              <option value="OCCUPIED">Occupied</option>
              <option value="MAINTENANCE">Maintenance</option>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editingTrack ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default TrackManagement; 