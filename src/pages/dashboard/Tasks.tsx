import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { fetchTasks, addTask, removeTask } from '../../redux/slices/taskSlice';
import { fetchCourses } from '../../redux/slices/courseSlice';

export default function Tasks() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: tasks, loading } = useSelector((s: RootState) => s.tasks);
  const { items: courses } = useSelector((s: RootState) => s.courses);

  const [newTask, setNewTask] = useState({
    studentName: '',
    studentId: '',
    doctorName: '',
    course: '',
    question: '',
    type: 'homework',
    description: '',
    timeToComplete: 60,
    status: 'in_progress',
    attachments: [] as string[],
    additionalInfo: '',
  });

  useEffect(() => {
    dispatch(fetchTasks());
    dispatch(fetchCourses()); // so we can select a course
  }, [dispatch]);

  const handleAdd = () => {
    if (
      !newTask.studentName ||
      !newTask.studentId ||
      !newTask.doctorName ||
      !newTask.course ||
      !newTask.question ||
      !newTask.timeToComplete
    ) {
      alert('Please fill in all required fields');
      return;
    }
    dispatch(addTask(newTask));
    setNewTask({
      studentName: '',
      studentId: '',
      doctorName: '',
      course: '',
      question: '',
      type: 'homework',
      description: '',
      timeToComplete: 60,
      status: 'in_progress',
      attachments: [],
      additionalInfo: '',
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      {/* Add Task */}
      <div className="grid grid-cols-2 gap-2 mb-4 bg-gray-100 p-4 rounded">
        <input
          type="text"
          placeholder="Student Name *"
          value={newTask.studentName}
          onChange={(e) =>
            setNewTask({ ...newTask, studentName: e.target.value })
          }
          className="border px-2 py-1 rounded"
        />
        <input
          type="text"
          placeholder="Student ID *"
          value={newTask.studentId}
          onChange={(e) =>
            setNewTask({ ...newTask, studentId: e.target.value })
          }
          className="border px-2 py-1 rounded"
        />
        <input
          type="text"
          placeholder="Doctor Name *"
          value={newTask.doctorName}
          onChange={(e) =>
            setNewTask({ ...newTask, doctorName: e.target.value })
          }
          className="border px-2 py-1 rounded"
        />
        <select
          value={newTask.course}
          onChange={(e) => setNewTask({ ...newTask, course: e.target.value })}
          className="border px-2 py-1 rounded"
        >
          <option value="">Select Course *</option>
          {courses.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Question *"
          value={newTask.question}
          onChange={(e) => setNewTask({ ...newTask, question: e.target.value })}
          className="border px-2 py-1 rounded col-span-2"
        />
        <select
          value={newTask.type}
          onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
          className="border px-2 py-1 rounded"
        >
          <option value="homework">Homework</option>
          <option value="project">Project</option>
          <option value="quiz">Quiz</option>
          <option value="other">Other</option>
        </select>
        <input
          type="number"
          placeholder="Time to Complete (min) *"
          value={newTask.timeToComplete}
          onChange={(e) =>
            setNewTask({ ...newTask, timeToComplete: Number(e.target.value) })
          }
          className="border px-2 py-1 rounded"
        />
        <textarea
          placeholder="Description"
          value={newTask.description}
          onChange={(e) =>
            setNewTask({ ...newTask, description: e.target.value })
          }
          className="border px-2 py-1 rounded col-span-2"
        />
        <textarea
          placeholder="Additional Info"
          value={newTask.additionalInfo}
          onChange={(e) =>
            setNewTask({ ...newTask, additionalInfo: e.target.value })
          }
          className="border px-2 py-1 rounded col-span-2"
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded col-span-2"
        >
          Add Task
        </button>
      </div>

      {/* List */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between items-center border p-2 rounded bg-white shadow"
            >
              <span>
                <strong>{task.studentName}</strong> - {task.question} (
                {task.type})
              </span>
              <button
                onClick={() => dispatch(removeTask(task._id))}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
