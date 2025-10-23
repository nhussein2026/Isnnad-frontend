import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Pencil,
  Trash2,
  Search,
  Filter,
  X,
  Clock,
  BookOpen,
} from 'lucide-react';
import { AppDispatch, RootState } from '../../../redux/store';
import {
  editTask,
  fetchTasks,
  removeTask,
} from '../../../redux/slices/taskSlice';
import { ITask } from '@/types/task';

const TaskManagementPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: tasks } = useSelector((state: RootState) => state.tasks);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('الكل');
  const [filterType, setFilterType] = useState('الكل');
  const [sortBy, setSortBy] = useState('date');
  const [editingTask, setEditingTask] = useState<ITask | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch tasks from backend
  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  // Status color mapping
  const getStatusColor = (status?: string) => {
    const colors: Record<string, string> = {
      'قيد التنفيذ': 'bg-blue-100 text-blue-800 border-blue-200',
      'تم الإنجاز': 'bg-green-100 text-green-800 border-green-200',
      'قيد الانتظار': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      متأخر: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status || ''] || 'bg-gray-100 text-gray-800';
  };

  const getTypeColor = (type?: string) => {
    const colors: Record<string, string> = {
      'واجب منزلي': 'bg-purple-50 text-purple-700',
      مشروع: 'bg-indigo-50 text-indigo-700',
      اختبار: 'bg-orange-50 text-orange-700',
      أخرى: 'bg-gray-50 text-gray-700',
    };
    return colors[type || ''] || 'bg-gray-50 text-gray-700';
  };

  // Filter and sort tasks
  const filteredTasks = tasks
    .filter((task) => {
      const matchesSearch =
        task.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.question.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        filterStatus === 'الكل' || task.status === filterStatus;
      const matchesType = filterType === 'الكل' || task.type === filterType;

      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      // if (sortBy === 'date') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      if (sortBy === 'student')
        return a.studentName.localeCompare(b.studentName, 'ar');
      if (sortBy === 'status') return a.status.localeCompare(b.status, 'ar');
      return 0;
    });

  // Delete task
  const handleDelete = (taskId?: string) => {
    if (!taskId) {
      console.warn('Cannot delete task: missing taskId', taskId);
      return;
    }
    if (window.confirm('هل أنت متأكد من حذف هذه المهمة؟')) {
      dispatch(removeTask(taskId));
    }
  };

  // Edit task
  const handleEdit = (task: ITask) => {
    setEditingTask({ ...task });
  };

  const handleSaveEdit = async () => {
    if (editingTask) {
      const id = editingTask._id;
      if (!id) {
        // Guard: _id is required for update; log and exit if missing
        console.error('Cannot save task edit: missing task _id', editingTask);
        return;
      }
      await dispatch(editTask({ id, updates: editingTask }));
      setEditingTask(null);
    }
  };

  // Stats
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === 'تم الإنجاز').length,
    inProgress: tasks.filter((t) => t.status === 'قيد التنفيذ').length,
    overdue: tasks.filter((t) => t.status === 'متأخر').length,
  };
  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">
            إدارة المهام
          </h1>
          <p className="text-slate-600">عرض وإدارة جميع المهام الدراسية</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm mb-1">إجمالي المهام</p>
                <p className="text-3xl font-bold text-slate-800">
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-slate-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm mb-1">مكتملة</p>
                <p className="text-3xl font-bold text-green-600">
                  {stats.completed}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">✓</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm mb-1">قيد التنفيذ</p>
                <p className="text-3xl font-bold text-blue-600">
                  {stats.inProgress}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm mb-1">متأخرة</p>
                <p className="text-3xl font-bold text-red-600">
                  {stats.overdue}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-2xl">⚠</span>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <input
                type="text"
                placeholder="بحث عن طالب، رقم الطالب، المادة..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pr-10 pl-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition flex items-center gap-2"
            >
              <Filter className="w-5 h-5" />
              فلتر
            </button>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="date">ترتيب حسب التاريخ</option>
              <option value="student">ترتيب حسب الطالب</option>
              <option value="status">ترتيب حسب الحالة</option>
            </select>
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  الحالة
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="الكل">جميع الحالات</option>
                  <option value="قيد التنفيذ">قيد التنفيذ</option>
                  <option value="تم الإنجاز">تم الإنجاز</option>
                  <option value="قيد الانتظار">قيد الانتظار</option>
                  <option value="متأخر">متأخر</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  النوع
                </label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="الكل">جميع الأنواع</option>
                  <option value="واجب منزلي">واجب منزلي</option>
                  <option value="مشروع">مشروع</option>
                  <option value="اختبار">اختبار</option>
                  <option value="أخرى">أخرى</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Tasks Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                    الطالب
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                    المادة
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                    السؤال
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                    النوع
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                    الحالة
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                    الوقت
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                    الإجراءات
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredTasks.map((task) => (
                  <tr key={task._id} className="hover:bg-slate-50 transition">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-slate-800">
                          {task.studentName}
                        </p>
                        <p className="text-sm text-slate-500">
                          {task.studentId}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="text-slate-800">{task.course.name}</p>
                        <p className="text-sm text-slate-500">
                          {task.doctorName}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-slate-800 line-clamp-2">
                        {task.question}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor(task.type)}`}
                      >
                        {task.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}
                      >
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-slate-600">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">
                          {task.timeToComplete} دقيقة
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(task)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="تعديل"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(task._id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500 text-lg">
                لا توجد مهام تطابق معايير البحث
              </p>
            </div>
          )}
        </div>

        {/* Edit Modal */}
        {editingTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
                <h2 className="text-2xl font-bold text-slate-800">
                  تعديل المهمة
                </h2>
                <button
                  onClick={() => setEditingTask(null)}
                  className="p-2 hover:bg-slate-100 rounded-lg transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    اسم الطالب
                  </label>
                  <input
                    type="text"
                    value={editingTask.studentName}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        studentName: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    السؤال
                  </label>
                  <input
                    type="text"
                    value={editingTask.question}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        question: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    الوصف
                  </label>
                  <textarea
                    value={editingTask.description}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        description: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      النوع
                    </label>
                    <select
                      value={editingTask.type}
                      onChange={(e) =>
                        setEditingTask({
                          ...editingTask,
                          type: e.target.value as ITask['type'],
                        })
                      }
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="واجب منزلي">واجب منزلي</option>
                      <option value="مشروع">مشروع</option>
                      <option value="اختبار">اختبار</option>
                      <option value="أخرى">أخرى</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      الحالة
                    </label>
                    <select
                      value={editingTask.status}
                      onChange={(e) =>
                        setEditingTask({
                          ...editingTask,
                          status: e.target.value as ITask['status'],
                        })
                      }
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="قيد التنفيذ">قيد التنفيذ</option>
                      <option value="تم الإنجاز">تم الإنجاز</option>
                      <option value="قيد الانتظار">قيد الانتظار</option>
                      <option value="متأخر">متأخر</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    الوقت المطلوب (دقيقة)
                  </label>
                  <input
                    type="number"
                    value={editingTask.timeToComplete}
                    onChange={(e) =>
                      setEditingTask({
                        ...editingTask,
                        timeToComplete: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="p-6 border-t border-slate-200 flex gap-3 justify-end">
                <button
                  onClick={() => setEditingTask(null)}
                  className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition"
                >
                  إلغاء
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  حفظ التغييرات
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskManagementPage;
