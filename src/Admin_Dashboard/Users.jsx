import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); 
  const [usersPerPage] = useState(5); 

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('https://edukator-server.vercel.app/api/users', {
          params: { search },
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Error fetching users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [search]);

  const makeAdmin = async (email) => {
    try {
      const response = await axios.put('https://edukator-server.vercel.app/api/users/make-admin', { email });
      toast.success(response.data.message);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email ? { ...user, role: 'admin' } : user
        )
      );
    } catch (error) {
      console.error('Error making user admin:', error);
      toast.error('Failed to make user admin');
    }
  };

  const removeAdmin = async (email) => {
    try {
      const response = await axios.put('https://edukator-server.vercel.app/api/users/remove-admin', { email });
      toast.success(response.data.message);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.email === email ? { ...user, role: 'student' } : user
        )
      );
    } catch (error) {
      console.error('Error removing from admin:', error);
      toast.error('Failed to remove from admin');
    }
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Users : {users.length}</h1>
      <div className="mb-4">
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="Search by username or email"
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Image</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user._id}>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2">
                  <img
                    src={user.photoURL || '/default-profile.png'}
                    alt={user.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                </td>
                <td className="border p-2">
                  {user.role !== 'admin' && user.role !== 'super-admin' && (
                    <button
                      className="btn bg-green-500 text-white"
                      onClick={() => makeAdmin(user.email)}
                    >
                      Make Admin
                    </button>
                  )}
                  {user.role === 'admin' && user.role !== 'super-admin' && (
                    <button
                      className="btn bg-red-500 text-white"
                      onClick={() => removeAdmin(user.email)}
                    >
                      Remove from Admin
                    </button>
                  )}
                  {user.role === 'super-admin' && (
                    <p className="text-red-500 font-bold text-center">
                      You can do nothing to the superadmin
                    </p>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={`px-4 py-2 rounded ${
                currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Users;
