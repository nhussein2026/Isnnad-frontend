// src/pages/Courses.tsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { addCourse, fetchCourses, removeCourse } from "../../redux/slices/courseSlice";

export default function Courses() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, loading } = useSelector((state: RootState) => state.courses);
  const user = useSelector((state: RootState) => state.auth.user);
  const [newCourse, setNewCourse] = useState({ name: "", pic: "", isOther: false });

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const handleAdd = async () => {
    if (!newCourse.name) return;

    // derive createdBy from user (support id or _id)
    const createdBy = user?.id ?? user?._id;
    if (!createdBy) {
      alert("Please login to create a course");
      return;
    }

    const payload = { ...newCourse, createdBy };

    try {
      await dispatch(addCourse(payload)).unwrap();
      // success
      setNewCourse({ name: "", pic: "", isOther: false });
    } catch (err: any) {
      // handle error (toast or alert)
      alert(err || "Failed to create course");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this course?")) return;
    try {
      await dispatch(removeCourse(id)).unwrap();
    } catch (err: any) {
      alert(err || "Delete failed");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Courses</h1>

      {/* Add Course */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Course name"
          value={newCourse.name}
          onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-1 rounded">
          Add
        </button>
      </div>

      {/* Courses List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {items.map((course) => (
            <li
              key={course._id}
              className="flex justify-between items-center border p-2 rounded bg-white shadow"
            >
              <div>
                <div className="font-semibold">{course.name}</div>
                <div className="text-sm text-gray-500">
                  Created by: {course.createdBy?.name ?? course.createdBy ?? "—"}
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleDelete(course._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
