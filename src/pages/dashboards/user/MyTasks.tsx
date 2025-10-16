import { useEffect } from 'react';
import { TasksSection } from '../../../components/dashboard/Tasks Section';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/store';
import { fetchTasks } from '../../../redux/slices/taskSlice';
import { groupTasksByStatus } from '../../../lib/utils';

export default function MyTasks() {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.tasks.loading);

  const tasks = useSelector((state: RootState) => state.tasks.items);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const groupedTasks = groupTasksByStatus(tasks || []);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">مهامي</h2>

      {loading && <p>جاري تحميل المهام...</p>}

      {!loading &&
        Object.entries(groupedTasks).map(([status, tasks]) => (
          <TasksSection
            key={status}
            title={status}
            courses={tasks.map((task) => ({
              subject: task.course?.name || 'بدون مقرر',
              tasks: [task.description || 'بدون وصف'], // or other info
            }))}
          />
        ))}
    </div>
  );
}
