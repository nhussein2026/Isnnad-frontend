import { RootState, AppDispatch } from '../../../redux/store';
import { deleteUser, fetchUsers } from '../../../redux/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { toast } from 'sonner';

export default function UserManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );
  console.log('users', users);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteUser(id));
      toast.success('✅ User deleted successfully');
    } catch {
      toast.error('❌ Failed to delete user');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            User Management
          </h1>
          <p className="text-gray-500 mt-2">
            Manage your users easily and safely
          </p>
        </div>

        {loading && (
          <div className="text-center text-gray-500 py-8 animate-pulse">
            Loading users...
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 py-8">Error: {error}</div>
        )}

        {!loading && !error && users.length === 0 && (
          <div className="text-center text-gray-500 py-8">No users found.</div>
        )}

        <ul className="space-y-4">
          {users.map((u) => (
            <li
              key={u._id}
              className="flex items-center justify-between bg-white shadow-md hover:shadow-lg transition-shadow rounded-xl px-6 py-4 border border-gray-100"
            >
              <div>
                <h2 className="text-lg font-medium text-gray-800">{u.name}</h2>
                <p className="text-gray-500 text-sm">{u.email}</p>
              </div>

              <button
                onClick={() => handleDelete(u._id)}
                className="px-4 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 transition-colors rounded-lg"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
