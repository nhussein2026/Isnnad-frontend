import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Edit2, Trash2, X, Check, Plus, Loader2 } from 'lucide-react';
import {
  fetchCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  clearError,
} from '../../../redux/slices/courseSlice';
import { AppDispatch, RootState } from '../../../redux/store';
import { toast } from 'sonner';
import { ICourse } from '../../../types/course';
import { Link } from 'react-router-dom';

export default function CourseManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const { courses, loading, error } = useSelector(
    (state: RootState) => state.courses
  );

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editImage, setEditImage] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [newCourseName, setNewCourseName] = useState('');
  const [newCourseImage, setNewCourseImage] = useState('');

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const handleDelete = async (_id: string, name: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete the course "${name}"? This action cannot be undone.`
      )
    ) {
      const result = await dispatch(deleteCourse(_id));
      if (deleteCourse.fulfilled.match(result)) {
        toast.success('Course deleted successfully');
      }
    }
  };

  const startEdit = (course: ICourse) => {
    setEditingId(course._id || '');
    setEditName(course.name);
    setEditImage(course.pic || '');
  };

  const saveEdit = async (_id: string) => {
    if (!editName.trim() || !editImage.trim()) {
      toast.error('Please provide both a name and an image URL');
      return;
    }
    const result = await dispatch(
      updateCourse({ _id, name: editName, pic: editImage })
    );
    if (updateCourse.fulfilled.match(result)) {
      toast.success('Course updated successfully');
      setEditingId(null);
      setEditName('');
      setEditImage('');
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditImage('');
  };

  const handleAddCourse = async () => {
    if (!newCourseName.trim() || !newCourseImage.trim()) {
      toast.error('Please provide both a name and an image URL');
      return;
    }
    const result = await dispatch(
      addCourse({ name: newCourseName, pic: newCourseImage })
    );
    if (addCourse.fulfilled.match(result)) {
      toast.success('Course added successfully');
      setNewCourseName('');
      setNewCourseImage('');
      setIsAdding(false);
    }
  };

  const cancelAdd = () => {
    setNewCourseName('');
    setNewCourseImage('');
    setIsAdding(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold text-gray-800">
            Course Management
          </h1>
          <p className="text-gray-500 mt-2">
            Add, edit, or delete courses with ease
          </p>
        </div>

        <div className="mb-6">
          <button
            onClick={() => setIsAdding(true)}
            disabled={isAdding}
            className="flex items-center gap-2 bg-[#8D1B3D] text-white px-6 py-3 rounded-lg hover:bg-[#be2653c9] transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={20} />
            Add New Course
          </button>
        </div>

        {isAdding && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Add New Course
            </h2>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                value={newCourseName}
                onChange={(e) => setNewCourseName(e.target.value)}
                placeholder="Course Name"
                className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8D1B3D]"
              />
              <input
                type="text"
                value={newCourseImage}
                onChange={(e) => setNewCourseImage(e.target.value)}
                placeholder="Image URL"
                className="flex-1 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8D1B3D]"
              />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleAddCourse}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-2 bg-[#8D1B3D] text-white rounded-md hover:bg-[#be2653c9] transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={20} />
                ) : (
                  <Check size={20} />
                )}
                Save
              </button>
              <button
                onClick={cancelAdd}
                className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                <X size={20} />
                Cancel
              </button>
            </div>
          </div>
        )}

        {loading && (
          <div className="text-center text-gray-500 py-8 animate-pulse">
            Loading courses...
          </div>
        )}

        {error && (
          <div className="text-center text-red-500 py-8">Error: {error}</div>
        )}

        {!loading && !error && courses.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No courses found.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.map((course: ICourse) => (
            <div
              key={course._id}
              className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col"
            >
              {editingId === course._id ? (
                <div className="p-4">
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Course Name"
                    className="w-full mb-2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8D1B3D]"
                  />
                  <input
                    type="text"
                    value={editImage}
                    onChange={(e) => setEditImage(e.target.value)}
                    placeholder="Image URL"
                    className="w-full mb-2 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#8D1B3D]"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => saveEdit(course._id || '')}
                      disabled={loading}
                      className="flex items-center gap-2 px-4 py-2 bg-[#8D1B3D] text-white rounded-md hover:bg-[#be2653c9] transition-colors disabled:opacity-50"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={20} />
                      ) : (
                        <Check size={20} />
                      )}
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                    >
                      <X size={20} />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <Link to={`/courses/${course._id}`} className="block">
                    <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                      {course.pic ? (
                        <img
                          src={course.pic}
                          alt={course.name}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src =
                              'https://via.placeholder.com/400x192?text=No+Image';
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium">
                          No Image Available
                        </div>
                      )}
                    </div>
                    <div className="p-4 flex-grow">
                      <h3 className="text-lg font-bold text-gray-900 text-center">
                        {course.name}
                      </h3>
                    </div>
                  </Link>
                  <div className="p-4 flex justify-end gap-2 border-t border-gray-100">
                    <button
                      onClick={() => startEdit(course)}
                      className="flex items-center gap-2 px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(course._id || '', course.name)
                      }
                      className="flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
