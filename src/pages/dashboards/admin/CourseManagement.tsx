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
import { AppDispatch, RootState } from '@/redux/store';
import { toast } from 'sonner';

export default function CourseManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const { courses, loading, error } = useSelector(
    (state: RootState) => state.courses
  );

  const [editingId, setEditingId] = useState<number | null>(null);
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
      toast(error);
      dispatch(clearError());
    }
  });

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      const result = await dispatch(deleteCourse(id));
      if (deleteCourse.fulfilled.match(result)) {
        toast('Course deleted successfully');
      }
    }
  };

  const startEdit = (course: any) => {
    setEditingId(course.id);
    setEditName(course.name);
    setEditImage(course.image);
  };

  const saveEdit = async (id: number) => {
    const result = await dispatch(
      updateCourse({ id, name: editName, image: editImage })
    );
    if (updateCourse.fulfilled.match(result)) {
      toast('Course updated successfully');
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
    if (newCourseName.trim() && newCourseImage.trim()) {
      const result = await dispatch(
        addCourse({ name: newCourseName, image: newCourseImage })
      );
      if (addCourse.fulfilled.match(result)) {
        toast('Course added successfully');
        setNewCourseName('');
        setNewCourseImage('');
        setIsAdding(false);
      }
    }
  };

  const cancelAdd = () => {
    setNewCourseName('');
    setNewCourseImage('');
    setIsAdding(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Course Manager
          </h1>
          <p className="text-gray-600">Manage your courses with ease</p>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          disabled={loading || isAdding}
          className="mb-6 flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={20} />
          Add New Course
        </button>

        {loading && courses.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-indigo-600" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {isAdding && (
              <div className="bg-white rounded-lg shadow-md p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Add New Course
                </h3>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Course Name"
                    value={newCourseName}
                    onChange={(e) => setNewCourseName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <input
                    type="text"
                    placeholder="Image URL"
                    value={newCourseImage}
                    onChange={(e) => setNewCourseImage(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleAddCourse}
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <Loader2 className="animate-spin" size={16} />
                      ) : (
                        <Check size={16} />
                      )}
                      Add
                    </button>
                    <button
                      onClick={cancelAdd}
                      disabled={loading}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-colors disabled:opacity-50"
                    >
                      <X size={16} />
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {courses &&
              courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.name}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src =
                          'https://images.unsplash.com/photo-1516397281156-ca07cf9746fc?w=400&h=300&fit=crop';
                      }}
                    />
                  </div>

                  <div className="p-4">
                    {editingId === course.id ? (
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={editName}
                          onChange={(e) => setEditName(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          autoFocus
                        />
                        <input
                          type="text"
                          value={editImage}
                          onChange={(e) => setEditImage(e.target.value)}
                          placeholder="Image URL"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => saveEdit(course.id)}
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
                          >
                            {loading ? (
                              <Loader2 className="animate-spin" size={16} />
                            ) : (
                              <Check size={16} />
                            )}
                            Save
                          </button>
                          <button
                            onClick={cancelEdit}
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition-colors disabled:opacity-50"
                          >
                            <X size={16} />
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 min-h-[3rem]">
                          {course.name}
                        </h3>

                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(course)}
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50"
                          >
                            <Edit2 size={16} />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(course.id)}
                            disabled={loading}
                            className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors disabled:opacity-50"
                          >
                            <Trash2 size={16} />
                            Delete
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}

        {courses.length === 0 && !loading && !isAdding && (
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl">No courses available</p>
            <p className="text-gray-400 mt-2">
              Click "Add New Course" to get started
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
