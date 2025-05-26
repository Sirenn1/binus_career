import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import { ModalAlert } from './common/modal-alert';

interface User {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
  isApproved: boolean;
  position: string;
}

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setErrorMessage('Failed to fetch users.');
      setErrorModalOpen(true);
    }
  };

  const approveUser = async (id: number) => {
    try {
      await axios.put(`/api/users/${id}/approve`);
      setUsers((prev) =>
        prev.map((user) => (user.id === id ? { ...user, isApproved: true } : user))
      );
    } catch (error) {
      console.error('Error approving user:', error);
      setErrorMessage(`Failed to approve user with ID: ${id}.`);
      setErrorModalOpen(true);
    }
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    try {
      await axios.put(`/api/users/${userToDelete.id}/reject`);
      setUsers((prev) => prev.filter((user) => user.id !== userToDelete.id));
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    } catch (error: any) {
      console.error('Error deleting user:', error);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
      setErrorMessage(`Failed to delete user ${userToDelete?.username || ''} : ${error.response?.data || error.message}`);
      setErrorModalOpen(true);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#ffffff', width: '100%' }}>
      <Container maxWidth="md" sx={{ mt: 5, p: 3, borderRadius: 2 }}>
        <Typography variant="h5" gutterBottom>
          User Management
        </Typography>

        <Stack direction="row" spacing={2} mb={3}>
          <TextField
            fullWidth
            label="Search by email"
            variant="outlined"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button 
            variant="contained" 
            sx={{ 
              bgcolor: '#f57c00',
              '&:hover': { bgcolor: '#e65100' }
            }}
          >
            SEARCH
          </Button>
        </Stack>

        <TableContainer component={Paper} elevation={3}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.isApproved ? (
                      <Typography color="success.main">Approved</Typography>
                    ) : (
                      <Typography color="warning.main">Pending</Typography>
                    )}
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      {!user.isApproved && (
                        <Button
                          variant="contained"
                          sx={{ 
                            bgcolor: '#4caf50',
                            '&:hover': { bgcolor: '#388e3c' }
                          }}
                          startIcon={<AddIcon />}
                          onClick={() => approveUser(user.id)}
                        >
                          Approve
                        </Button>
                      )}
                      <Button
                        variant="contained"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDeleteClick(user)}
                      >
                        Reject
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <ModalAlert
          variant="failed" 
          open={deleteDialogOpen}
          title="Confirm Rejection"
          message={`Are you sure you want to reject and delete ${userToDelete?.username}'s account? This action cannot be undone.`}
          buttonTitle="Reject & Delete"
          cancelButton={true}
          onClose={handleDeleteCancel}
          onConfirm={handleDeleteConfirm}
        />

        <ModalAlert
          variant="failed"
          open={errorModalOpen}
          title="Error"
          message={errorMessage}
          buttonTitle="OK"
          onClose={() => setErrorModalOpen(false)}
        />
      </Container>
    </Box>
  );
};

export default Admin;
