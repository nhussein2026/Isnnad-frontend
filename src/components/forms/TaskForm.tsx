import React, { useState } from 'react';
import {
  User,
  BookOpen,
  HelpCircle,
  FileText,
  Clock,
  Paperclip,
  Info,
  // Plus,
  Upload,
  // X,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { ICourse } from '../../types/course';
import { ITask } from '../../types/task';
import { toast } from 'sonner';

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
  console.log('Available Courses:', courses);

  const [formData, setFormData] = useState<TaskFormData>({
    studentName: initialData?.studentName || '',
    studentId: initialData?.studentId || '',
    doctorName: initialData?.doctorName || '',
    course: initialData?.course || ({} as ICourse),
    question: initialData?.question || '',
    type: initialData?.type || 'أخرى',
    description: initialData?.description || '',
    timeToComplete: initialData?.timeToComplete || 60,
    attachments: initialData?.attachments ?? [],
    additionalInfo: initialData?.additionalInfo || '',
    status: initialData?.status || 'قيد الانتظار', // Added default status
  });

  // const [newAttachment, setNewAttachment] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === 'course') {
      const selectedCourse = courses.find((course) => course._id === value);
      setFormData((prev) => ({
        ...prev,
        course: selectedCourse || ({} as ICourse),
      }));
      return;
    }

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

  // const handleAddAttachment = () => {
  //   if (newAttachment.trim()) {
  //     setFormData((prev) => ({
  //       ...prev,
  //       attachments: [...(prev.attachments || []), newAttachment.trim()],
  //     }));
  //     setNewAttachment('');
  //   }
  // };

  // const handleRemoveAttachment = (index: number) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     attachments: (prev.attachments || []).filter((_, i) => i !== index),
  //   }));
  // };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.studentName.trim() ||
      !formData.studentId.trim() ||
      !formData.doctorName.trim() ||
      !formData.course._id ||
      !formData.question.trim()
    ) {
      toast.error('يرجى ملء جميع الحقول المطلوبة');
      return;
    }
    onSubmit(formData);
    console.log('Submitted Data:', formData);
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8D1B3D] focus:border-[#8D1B3D]"
              placeholder="أدخل اسم الطالب"
            />
          </div>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8D1B3D] focus:border-[#8D1B3D]"
              placeholder="أدخل رقم الطالب"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8D1B3D] focus:border-[#8D1B3D]"
              placeholder="أدخل اسم الدكتور"
            />
          </div>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8D1B3D] focus:border-[#8D1B3D]"
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8D1B3D] focus:border-[#8D1B3D]"
              placeholder="أدخل السؤال"
            />
          </div>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8D1B3D] focus:border-[#8D1B3D]"
            >
              <option value="واجب منزلي">واجب منزلي</option>
              <option value="مشروع">مشروع</option>
              <option value="اختبار">اختبار</option>
              <option value="أخرى">أخرى</option>
            </select>
          </div>
        </div>

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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8D1B3D] focus:border-[#8D1B3D]"
            placeholder="أدخل وصف المهمة"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8D1B3D] focus:border-[#8D1B3D]"
              placeholder="أدخل الوقت بالدقائق"
            />
          </div>
          <div>
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              حالة المهمة *
            </label>
            <select
              id="status"
              name="status"
              required
              value={formData.status}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8D1B3D] focus:border-[#8D1B3D]"
            >
              <option value="قيد الانتظار">قيد الانتظار</option>
              <option value="قيد التنفيذ">قيد التنفيذ</option>
              <option value="تم الإنجاز">تم الإنجاز</option>
              <option value="متأخر">متأخر</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
            <Paperclip className="w-4 h-4" />
            المرفقات
          </label>
          {/* <div className="space-y-2">
            <div className="flex gap-2">
              <input
                type="text"
                value={newAttachment}
                onChange={(e) => setNewAttachment(e.target.value)}
                placeholder="أدخل رابط الملف أو المسار"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8D1B3D] focus:border-[#8D1B3D]"
              />
              <button
                type="button"
                onClick={handleAddAttachment}
                className="px-4 py-2 bg-[#8D1B3D] text-white rounded-md hover:bg-[#be2653c9] focus:outline-none focus:ring-2 focus:ring-[#8D1B3D] focus:ring-offset-2 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                إضافة
              </button>
            </div>
            {formData.attachments.length > 0 && (
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
            )}
          </div> */}
        </div>

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
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#8D1B3D] focus:border-[#8D1B3D]"
            placeholder="أدخل أي معلومات إضافية"
          />
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#8D1B3D] focus:ring-offset-2"
            >
              إلغاء
            </button>
          )}
          <button
            type="submit"
            className="px-6 py-2 bg-[#8D1B3D] text-white rounded-md shadow-sm hover:bg-[#be2653c9] focus:outline-none focus:ring-2 focus:ring-[#8D1B3D] focus:ring-offset-2 flex items-center gap-2"
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
