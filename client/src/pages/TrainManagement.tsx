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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import axios from 'axios';

interface Train {
  _id: string;
  trainNumber: string;
  name: string;
  status: 'IDLE' | 'MOVING' | 'STOPPED';
}

const TrainManagement = () => {
  const [trains, setTrains] = useState<Train[]>([]);
  const [open, setOpen] = useState(false);
  const [editingTrain, setEditingTrain] = useState<Train | null>(null);
  const [formData, setFormData] = useState({
    trainNumber: '',
    name: '',
    status: 'IDLE',
  });

  useEffect(() => {
    fetchTrains();
  }, []);

  const fetchTrains = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/trains');
      setTrains(response.data);
    } catch (error) {
      console.error('Error fetching trains:', error);
    }
  };

  const handleOpen = (train?: Train) => {
    if (train) {
      setEditingTrain(train);
      setFormData({
        trainNumber: train.trainNumber,
        name: train.name,
        status: train.status,
      });
    } else {
      setEditingTrain(null);
      setFormData({
        trainNumber: '',
        name: '',
        status: 'IDLE',
      });
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditingTrain(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTrain) {
        await axios.patch(`http://localhost:5000/api/trains/${editingTrain._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/trains', formData);
      }
      handleClose();
      fetchTrains();
    } catch (error) {
      console.error('Error saving train:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this train?')) {
      try {
        await axios.delete(`http://localhost:5000/api/trains/${id}`);
        fetchTrains();
      } catch (error) {
        console.error('Error deleting train:', error);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Train Management</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpen()}
        >
          Add Train
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Train Number</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {trains.map((train) => (
              <TableRow key={train._id}>
                <TableCell>{train.trainNumber}</TableCell>
                <TableCell>{train.name}</TableCell>
                <TableCell>{train.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleOpen(train)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(train._id)}>
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
          {editingTrain ? 'Edit Train' : 'Add New Train'}
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Train Number"
              fullWidth
              value={formData.trainNumber}
              onChange={(e) =>
                setFormData({ ...formData, trainNumber: e.target.value })
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
                  status: e.target.value as 'IDLE' | 'MOVING' | 'STOPPED',
                })
              }
              SelectProps={{
                native: true,
              }}
            >
              <option value="IDLE">Idle</option>
              <option value="MOVING">Moving</option>
              <option value="STOPPED">Stopped</option>
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              {editingTrain ? 'Update' : 'Add'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default TrainManagement; 