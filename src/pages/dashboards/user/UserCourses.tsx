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
    <div>
      <Link
        to="/user/new-task"
        className="min-h-screen text-neutral-200 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-4"
      >
        {courses.map((course: any) => (
          <div
            key={course.id}
            className="max-w-7xl max-auto bg-white rounded text-neutral-300 p-4 flex flex-col items-center justify-between hover:bg-gray-100 hover:shadow-2xl hover:shadow-[#8D1B3D] transition-all duration-300 cursor-pointer"
          >
            <div className="w-full h-40 rounded overflow-hidden">
              <img
                src={course.pic}
                alt={course.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <p className="font-extrabold text-lg text-black">{course.name}</p>
          </div>
        ))}
      </Link>
    </div>
  );
}
