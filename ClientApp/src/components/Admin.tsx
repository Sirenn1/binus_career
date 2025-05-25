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
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

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

  const fetchUsers = async () => {
    try {
      const response = await axios.get<User[]>('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
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
    }
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
          Add New User
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
                <TableCell><strong>Action</strong></TableCell>
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
                      <Button
                        variant="contained"
                        sx={{ 
                          bgcolor: '#f57c00',
                          '&:hover': { bgcolor: '#e65100' }
                        }}
                        startIcon={<AddIcon />}
                        onClick={() => approveUser(user.id)}
                      >
                        Add
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </Box>
  );
};

export default Admin;
