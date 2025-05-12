import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
  isAdmin: boolean;
  isApproved: boolean;
}

const Admin: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

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
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === id ? { ...user, isApproved: true } : user
        )
      );
    } catch (error) {
      console.error('Error approving user:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Is Admin</th>
            <th>Is Approved</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, username, email, isAdmin, isApproved }) => (
            <tr key={id}>
              <td>{username}</td>
              <td>{email}</td>
              <td>{isAdmin ? 'Yes' : 'No'}</td>
              <td>{isApproved ? 'Yes' : 'No'}</td>
              <td>
                {!isApproved && (
                  <button onClick={() => approveUser(id)}>Approve</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
