import TaskForm from '../../../components/forms/TaskForm';
import { ITask } from '../../../types/task';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../../redux/store';
import { toast } from 'sonner';
import { addTask } from '../../../redux/slices/taskSlice';

export default function UserTask() {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector((state: RootState) => state.auth.user?._id);
  const { loading, error } = useSelector((state: RootState) => state.tasks);

  const handleTaskSubmit = async (data: Omit<ITask, 'createdBy'>) => {
    if (!currentUser) {
      toast.error('User not logged in');
      return;
    }

    const taskData: ITask = {
      ...data,
      createdBy: currentUser,
    };

    try {
      const result = await dispatch(addTask(taskData)).unwrap();
      toast.success('تمت إضافة المهمة بنجاح!');
      console.log('Added Task:', result);
    } catch (err: any) {
      toast.error(err?.message || 'حدث خطأ أثناء إضافة المهمة');
      console.error('Error adding task:', err);
    }
  };

  return (
    <div className="p-4">
      <TaskForm onSubmit={handleTaskSubmit} />
      {loading && <p className="text-gray-500 mt-2">جاري المعالجة...</p>}
      {error && <p className="text-red-500 mt-2">⚠️ {error}</p>}
    </div>
  );
}
