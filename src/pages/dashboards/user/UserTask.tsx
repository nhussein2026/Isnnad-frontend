import TaskForm from '../../../components/forms/TaskForm';
import { ITask } from '../../../types/task';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { toast } from 'sonner';

export default function UserTask() {
  const currentUser = useSelector((state: RootState) => state.auth.user?._id);

  const handleTaskSubmit = (data: Omit<ITask, 'createdBy'>) => {
    if (!currentUser) {
      toast.error('User not logged in');
      return;
    }
    const taskData: ITask = {
      ...data,
      createdBy: currentUser,
    };
    console.log('Task Data Submitted: ', taskData);
    toast.success('Task submitted successfully!');
  };
  return (
    <div>
      <TaskForm onSubmit={handleTaskSubmit} />
    </div>
  );
}
