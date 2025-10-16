import React, { useState } from 'react';
import {
  User,
  BookOpen,
  HelpCircle,
  FileText,
  Clock,
  Flag,
  Paperclip,
  Info,
  Plus,
  Upload,
} from 'lucide-react';
import { ITask } from '../../types/task';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ICourse } from '../../types/course';

export type TaskFormData = Omit<ITask, 'createdBy' | '_id'>;

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
  onCancel?: () => void;
  initialData?: Partial<TaskFormData>;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
}) => {
  const { courses } = useSelector((state: RootState) => state.courses);
  const [formData, setFormData] = useState<TaskFormData>({
    studentName: initialData?.studentName || '',
    studentId: initialData?.studentId || '',
    doctorName: initialData?.doctorName || '',
    course: initialData?.course || ({} as ICourse),
    question: initialData?.question || '',
    type: initialData?.type || 'homework',
    description: initialData?.description || '',
    timeToComplete: initialData?.timeToComplete || 60,
    status: initialData?.status || 'in_progress',
    attachments: initialData?.attachments ?? ([] as string[]),
    additionalInfo: initialData?.additionalInfo || '',
  });

  const [newAttachment, setNewAttachment] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }));
  };

  const handleAddAttachment = () => {
    if (newAttachment.trim()) {
      setFormData((prev) => ({
        ...prev,
        attachments: [...(prev.attachments || []), newAttachment.trim()],
      }));
      setNewAttachment('');
    }
  };

  //   const handleRemoveAttachment = (index: number) => {
  //     setFormData(prev => ({
  //       ...prev,

  // attachments: (prev.attachments || []).filter((_, i) => i !== index),
  //     }));
  //   };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div
      className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6"
      dir="rtl"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <FileText className="w-6 h-6" />
        {initialData ? 'تعديل المهمة' : 'إنشاء مهمة جديدة'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* قسم معلومات الطالب */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* اسم الطالب */}
          <div>
            <label
              htmlFor="studentName"
              className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              اسم الطالب *
            </label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              required
              value={formData.studentName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="أدخل اسم الطالب"
            />
          </div>

          {/* رقم الطالب */}
          <div>
            <label
              htmlFor="studentId"
              className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              رقم الطالب *
            </label>
            <input
              type="text"
              id="studentId"
              name="studentId"
              required
              value={formData.studentId}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="أدخل رقم الطالب"
            />
          </div>
        </div>

        {/* قسم الدكتور والمادة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* اسم الدكتور */}
          <div>
            <label
              htmlFor="doctorName"
              className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
            >
              <User className="w-4 h-4" />
              اسم الدكتور *
            </label>
            <input
              type="text"
              id="doctorName"
              name="doctorName"
              required
              value={formData.doctorName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="أدخل اسم الدكتور"
            />
          </div>

          {/* اختيار المادة */}
          <div>
            <label
              htmlFor="course"
              className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              المادة *
            </label>
            <select
              id="course"
              name="course"
              required
              value={formData.course?._id || ''}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">اختر المادة</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* قسم السؤال ونوع المهمة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* السؤال */}
          <div>
            <label
              htmlFor="question"
              className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              السؤال *
            </label>
            <input
              type="text"
              id="question"
              name="question"
              required
              value={formData.question}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="أدخل السؤال"
            />
          </div>

          {/* نوع المهمة */}
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              نوع المهمة *
            </label>
            <select
              id="type"
              name="type"
              required
              value={formData.type}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="homework">واجب منزلي</option>
              <option value="project">مشروع</option>
              <option value="quiz">اختبار</option>
              <option value="other">أخرى</option>
            </select>
          </div>
        </div>

        {/* الوصف */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
          >
            <FileText className="w-4 h-4" />
            الوصف
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            value={formData.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="أدخل وصف المهمة"
          />
        </div>

        {/* قسم الوقت والحالة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* الوقت اللازم للإنجاز */}
          <div>
            <label
              htmlFor="timeToComplete"
              className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              الوقت اللازم للإنجاز (دقيقة) *
            </label>
            <input
              type="number"
              id="timeToComplete"
              name="timeToComplete"
              required
              min="1"
              value={formData.timeToComplete}
              onChange={handleNumberChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="أدخل الوقت بالدقائق"
            />
          </div>

          {/* الحالة */}
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
            >
              <Flag className="w-4 h-4" />
              الحالة *
            </label>
            <select
              id="status"
              name="status"
              required
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="in_progress">قيد التنفيذ</option>
              <option value="achieved">مكتمل</option>
              <option value="pending">معلق</option>
              <option value="overdue">متأخر</option>
            </select>
          </div>
        </div>

        {/* المرفقات */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Paperclip className="w-4 h-4" />
            المرفقات
          </label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={newAttachment}
                onChange={(e) => setNewAttachment(e.target.value)}
                placeholder="أدخل رابط الملف أو المسار"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleAddAttachment}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                إضافة
              </button>
            </div>
            {/* {formData.attachments.length > 0 && (
              <div className="space-y-2">
                {formData.attachments.map((attachment, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-md"
                  >
                    <span className="text-sm text-gray-700 truncate">{attachment}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAttachment(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )} */}
          </div>
        </div>

        {/* معلومات إضافية */}
        <div>
          <label
            htmlFor="additionalInfo"
            className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
          >
            <Info className="w-4 h-4" />
            معلومات إضافية
          </label>
          <textarea
            id="additionalInfo"
            name="additionalInfo"
            rows={3}
            value={formData.additionalInfo}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="أدخل أي معلومات إضافية"
          />
        </div>

        {/* أزرار النموذج */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              إلغاء
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            {initialData ? 'تحديث المهمة' : 'إنشاء المهمة'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
