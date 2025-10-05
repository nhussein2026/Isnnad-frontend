export default function UserCourses() {
    // Sample course data
  const courses = [
    { id: 1, name: 'Web Development', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop' },
    { id: 2, name: 'Mobile Development', image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop' },
    { id: 3, name: 'Data Science', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop' },
    { id: 4, name: 'UI/UX Design', image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop' },
    { id: 5, name: 'Machine Learning', image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=300&fit=crop' },
    { id: 6, name: 'Cloud Computing', image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop' },
    { id: 7, name: 'Cybersecurity', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop' },
    { id: 8, name: 'Digital Marketing', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop' },
    { id: 9, name: 'Game Development', image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop' },
    { id: 10, name: 'Blockchain', image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=300&fit=crop' },
    { id: 11, name: 'DevOps', image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=300&fit=crop' },
    { id: 12, name: 'Photography', image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop' },
  ];
  return (
  <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Grid: 2 columns on mobile, 4 on sm, 8 on lg */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              {/* Course Image */}
              <div className="aspect-square w-full overflow-hidden">
                <img
                  src={course.image}
                  alt={course.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              
              {/* Course Name */}
              <div className="p-3">
                <h3 className="text-sm font-semibold text-gray-800 text-center line-clamp-2">
                  {course.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  
  );
}
