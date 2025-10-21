import { RootState, AppDispatch } from '../../../redux/store';
import {
  deleteUser,
  fetchUsers,
  editUser,
} from '../../../redux/slices/userSlice'; // Assuming updateUser is added to the slice
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { IUser } from '../../../types/user';

export default function UserManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );
  console.log('Users from Redux Store:', users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<IUser['role']>('user');

  const handleEditRole = (userId: string, currentRole: IUser['role']) => {
    setEditingUserId(userId);
    setSelectedRole(currentRole);
  };

  const handleSaveRole = async (userId: string) => {
    try {
      await dispatch(editUser({ id: userId, data: { role: selectedRole } }));
      setEditingUserId(null);
      toast.success('✅ User role updated successfully');
    } catch {
      toast.error('❌ Failed to update user role');
    }
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
  };

  const handleDelete = (id: string, name: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete user "${name}"? This action cannot be undone.`
      )
    ) {
      dispatch(deleteUser(id))
        .unwrap()
        .then(() => toast.success('✅ User deleted successfully'))
        .catch(() => toast.error('❌ Failed to delete user'));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500 animate-pulse">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 sm:px-6">
      <div className="w-full">
        {users.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No users found.</div>
        ) : (
          <div className="overflow-x-auto bg-white shadow-md rounded-xl border border-gray-100">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avatar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((u) => (
                  <tr
                    key={u._id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-white font-bold text-lg overflow-hidden">
                        {u.profilePic ? (
                          <img
                            src={u.profilePic}
                            alt={u.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                              e.currentTarget.parentElement!.innerText = u.name
                                .charAt(0)
                                .toUpperCase();
                            }}
                          />
                        ) : (
                          u.name.charAt(0).toUpperCase()
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {u.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {u.username || 'N/A'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {u.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {editingUserId === u._id ? (
                        <select
                          value={selectedRole || ''}
                          onChange={(e) =>
                            setSelectedRole(e.target.value as IUser['role'])
                          }
                          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-[#8D1B3D]"
                        >
                          <option value="user">User</option>
                          <option value="student">Student</option>
                          <option value="admin">Admin</option>
                          <option value="manager">Manager</option>
                          <option value="tutor">Tutor</option>
                          <option value="programmer">Programmer</option>
                          <option value="Assistant">Assistant</option>
                        </select>
                      ) : (
                        <span className="capitalize">{u.role || 'user'}</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingUserId === u._id ? (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleSaveRole(u._id)}
                            className="px-3 py-1 text-white bg-green-500 hover:bg-green-600 rounded-md transition-colors"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-3 py-1 text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleEditRole(u._id, u.role)}
                            className="px-3 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded-md transition-colors"
                          >
                            Edit Role
                          </button>
                          <button
                            onClick={() => handleDelete(u._id, u.name)}
                            className="px-3 py-1 text-white bg-red-500 hover:bg-red-600 rounded-md transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
