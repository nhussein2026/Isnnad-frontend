import { AppDispatch, RootState } from '../../../redux/store';
import { fetchCourses } from '../../../redux/slices/courseSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function UserCourses() {
  const dispatch = useDispatch<AppDispatch>();
  const { courses } = useSelector((state: RootState) => state.courses);
  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-neutral-100 flex items-start justify-center p-4">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {courses.map((course: any) => (
          <Link
            key={course.id}
            to={`${course.id}`} // Adjust the route as needed, e.g., to course details
            className="block"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full hover:shadow-2xl hover:shadow-[#8D1B3D] hover:bg-gray-50 transition-all duration-300 cursor-pointer">
              <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                {course.pic ? (
                  <div className="relative w-full h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img
                      src={course.pic || 'https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png'}
                      alt={course.name || 'Course'}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://foundr.com/wp-content/uploads/2021/09/Best-online-course-platforms.png';
                      }}
                    />
                  </div>

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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
