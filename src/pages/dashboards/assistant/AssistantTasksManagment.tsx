// components/dashboard/AssistantTasksManagement.tsx
import { RootState, AppDispatch } from '@/redux/store';
import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from './../../../redux/slices/taskSlice'; // Adjust path to your actual slice

/* ---------- Types ---------- */
type ColumnKey = 'todo' | 'doing' | 'done';

type TaskStatus = 'قيد التنفيذ' | 'تم الإنجاز' | 'قيد الانتظار' | 'متأخر';
type TaskType = 'مشروع' | 'واجب منزلي' | 'اختبار' | 'أخرى';

type ReduxTask = {
  _id: string;
  question: string;
  description: string;
  status: string;
  type: string;
  studentName: string;
  studentId: string;
  doctorName: string;
  timeToComplete: number;
  additionalInfo?: string;
  course?: {
    _id: string;
    name: string;
    pic?: string;
  };
  createdBy?: {
    _id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
};

type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  type: TaskType;
  fullData: ReduxTask;
};

type BoardState = Record<ColumnKey, Task[]>;

/* ---------- Icons (inline SVGs, zero deps) ---------- */
const CheckIcon = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    className={className}
    aria-hidden
  >
    <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
  </svg>
);

const MinusIcon = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    className={className}
    aria-hidden
  >
    <rect x="5" y="11" width="14" height="2" fill="currentColor" />
  </svg>
);

const EmptyIcon = () => (
  <span className="inline-block w-3.5 h-3.5 rounded-[2px] border border-gray-300" />
);

const ClockIcon = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    className={className}
    aria-hidden
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      fill="currentColor"
      d="M12 6v6l4 2"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const AlertIcon = ({ className = '' }) => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    className={className}
    aria-hidden
  >
    <path
      fill="currentColor"
      d="M12 2L1 21h22L12 2zm0 6l.01 6h-.02L12 8zm0 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"
    />
  </svg>
);

const ExpandIcon = ({ className = '', expanded = false }) => (
  <svg
    viewBox="0 0 24 24"
    width="16"
    height="16"
    className={`${className} transition-transform ${expanded ? 'rotate-180' : ''}`}
    aria-hidden
  >
    <path fill="currentColor" d="M7 10l5 5 5-5z" />
  </svg>
);

/* ---------- Task Card ---------- */
function TaskCard({
  task,
  variant,
  onDragStart,
}: {
  task: Task;
  variant: ColumnKey;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const border =
    variant === 'done'
      ? 'border-rose-700'
      : variant === 'doing'
        ? 'border-black/70'
        : 'border-gray-300';

  // Map status to icon and color
  const getStatusDisplay = (status: TaskStatus) => {
    switch (status) {
      case 'تم الإنجاز':
        return {
          icon: <CheckIcon />,
          bg: 'bg-rose-700',
          text: 'text-white',
        };
      case 'قيد التنفيذ':
        return {
          icon: <MinusIcon />,
          bg: 'bg-black/80',
          text: 'text-white',
        };
      case 'قيد الانتظار':
        return {
          icon: <ClockIcon />,
          bg: 'bg-yellow-500',
          text: 'text-white',
        };
      case 'متأخر':
        return {
          icon: <AlertIcon />,
          bg: 'bg-red-600',
          text: 'text-white',
        };
      default:
        return {
          icon: <EmptyIcon />,
          bg: '',
          text: 'text-gray-400',
        };
    }
  };

  const statusDisplay = getStatusDisplay(task.status);

  // Map type to Arabic display
  const getTypeDisplay = (type: string) => {
    const typeMap: Record<string, string> = {
      homework: 'واجب منزلي',
      project: 'مشروع',
      exam: 'اختبار',
      other: 'أخرى',
    };
    return typeMap[type] || type;
  };

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className={`group rounded-xl border-2 ${border} bg-gray-100 px-5 py-4 transition-shadow shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] cursor-grab active:cursor-grabbing`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-[13px] font-bold text-gray-800 line-clamp-2">
            {task.title}
          </div>
          <div className="mt-1 text-[10px] text-gray-500">
            {getTypeDisplay(task.fullData.type)}
          </div>
        </div>
        <div className="flex items-center gap-2 mr-3">
          <span
            className={`inline-flex items-center justify-center w-4.5 h-4.5 rounded-[3px] ${statusDisplay.bg} ${statusDisplay.text}`}
            aria-hidden
            title={task.status}
          >
            {statusDisplay.icon}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label={expanded ? 'طي التفاصيل' : 'عرض التفاصيل'}
          >
            <ExpandIcon expanded={expanded} />
          </button>
        </div>
      </div>

      <p className="mt-2 text-[12px] leading-5 text-gray-500 line-clamp-2">
        {task.description}
      </p>

      {/* Expanded Details */}
      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 text-[11px]">
          {task.fullData.studentName && (
            <div className="flex justify-between">
              <span className="text-gray-500">اسم الطالب:</span>
              <span className="text-gray-700 font-medium">
                {task.fullData.studentName}
              </span>
            </div>
          )}
          {task.fullData.doctorName && (
            <div className="flex justify-between">
              <span className="text-gray-500">اسم المدرس:</span>
              <span className="text-gray-700 font-medium">
                {task.fullData.doctorName}
              </span>
            </div>
          )}
          {task.fullData.course?.name && (
            <div className="flex justify-between">
              <span className="text-gray-500">المادة:</span>
              <span className="text-gray-700 font-medium">
                {task.fullData.course.name}
              </span>
            </div>
          )}
          {task.fullData.timeToComplete && (
            <div className="flex justify-between">
              <span className="text-gray-500">الوقت المتوقع:</span>
              <span className="text-gray-700 font-medium">
                {task.fullData.timeToComplete} دقيقة
              </span>
            </div>
          )}
          {task.fullData.additionalInfo && (
            <div className="mt-2">
              <span className="text-gray-500 block mb-1">معلومات إضافية:</span>
              <span className="text-gray-700">
                {task.fullData.additionalInfo}
              </span>
            </div>
          )}
          <div className="flex justify-between text-[10px] pt-2 border-t border-gray-100">
            <span className="text-gray-400">تاريخ الإنشاء:</span>
            <span className="text-gray-500">
              {new Date(task.fullData.createdAt).toLocaleDateString('ar-SA')}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- Column (drop zone) ---------- */
function Column({
  column,
  children,
  onDropTask,
}: {
  column: ColumnKey;
  children: React.ReactNode;
  onDropTask: (column: ColumnKey) => void;
}) {
  return (
    <div
      onDragOver={(e) => e.preventDefault()}
      onDrop={() => onDropTask(column)}
      className="min-h-[172px] space-y-4"
      aria-label={column}
      role="list"
    >
      {children}
    </div>
  );
}

/* ---------- Main Section ---------- */
export default function AssistantTasksManagement() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: tasks } = useSelector((state: RootState) => state.tasks);
  console.log('Tasks from Redux:', tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  // Map status to column
  const mapStatusToColumn = (status: string): ColumnKey => {
    switch (status) {
      case 'completed':
      case 'تم الإنجاز':
        return 'done';
      case 'in_progress':
      case 'قيد التنفيذ':
        return 'doing';
      case 'pending':
      case 'قيد الانتظار':
      case 'overdue':
      case 'متأخر':
      default:
        return 'todo';
    }
  };

  // Map Arabic status
  const mapStatusToArabic = (status: string): TaskStatus => {
    const statusMap: Record<string, TaskStatus> = {
      in_progress: 'قيد التنفيذ',
      completed: 'تم الإنجاز',
      pending: 'قيد الانتظار',
      overdue: 'متأخر',
    };
    return statusMap[status] || 'قيد الانتظار';
  };

  // Initialize board from Redux tasks
  const initialBoard = useMemo(() => {
    const boardData: BoardState = {
      todo: [],
      doing: [],
      done: [],
    };

    if (tasks && Array.isArray(tasks)) {
      tasks.forEach((reduxTask: any) => {
        const column = mapStatusToColumn(reduxTask.status);
        const task: Task = {
          id: reduxTask._id,
          title: reduxTask.question || 'بدون عنوان',
          description: reduxTask.description || 'بدون وصف',
          status: mapStatusToArabic(reduxTask.status),
          type: reduxTask.type as TaskType,
          fullData: reduxTask,
        };
        boardData[column].push(task);
      });
    }

    return boardData;
  }, [tasks]);

  const [board, setBoard] = useState<BoardState>(initialBoard);

  // Update board when tasks change
  React.useEffect(() => {
    setBoard(initialBoard);
  }, [initialBoard]);

  const [dragInfo, setDragInfo] = useState<{
    id: string;
    from: ColumnKey;
  } | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    // find source column
    let from: ColumnKey = 'todo';
    (Object.keys(board) as ColumnKey[]).forEach((k) => {
      if (board[k].some((t) => t.id === id)) from = k;
    });
    setDragInfo({ id, from });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDropTask = (to: ColumnKey) => {
    if (!dragInfo) return;
    const { id, from } = dragInfo;
    if (from === to) return setDragInfo(null);

    setBoard((prev) => {
      const moving = prev[from].find((t) => t.id === id);
      if (!moving) return prev;
      return {
        ...prev,
        [from]: prev[from].filter((t) => t.id !== id),
        [to]: [...prev[to], moving],
      };
    });
    setDragInfo(null);
  };

  return (
    <section dir="rtl" className="w-full mb-15">
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-right text-lg font-semibold text-gray-800">
          المهام المتاحة
        </h2>
        <span className="text-sm text-gray-500">{tasks?.length || 0} مهمة</span>
      </div>

      {/* Divider line */}
      <div className="w-full h-px bg-gray-200 mb-5" />

      {/* 3 columns: RTL order (right=todo, middle=doing, left=done) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* TODO (right column in RTL) */}
        <div>
          <div className="mb-3 text-sm font-medium text-gray-600 flex items-center justify-between">
            <span>قيد الانتظار</span>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
              {board.todo.length}
            </span>
          </div>
          <Column column="todo" onDropTask={handleDropTask}>
            {board.todo.length > 0 ? (
              board.todo.map((t) => (
                <TaskCard
                  key={t.id}
                  task={t}
                  variant="todo"
                  onDragStart={handleDragStart}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-400 text-sm">
                لا توجد مهام
              </div>
            )}
          </Column>
        </div>

        {/* DOING (middle) */}
        <div>
          <div className="mb-3 text-sm font-medium text-gray-600 flex items-center justify-between">
            <span>قيد التنفيذ</span>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
              {board.doing.length}
            </span>
          </div>
          <Column column="doing" onDropTask={handleDropTask}>
            {board.doing.length > 0 ? (
              board.doing.map((t) => (
                <TaskCard
                  key={t.id}
                  task={t}
                  variant="doing"
                  onDragStart={handleDragStart}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-400 text-sm">
                لا توجد مهام
              </div>
            )}
          </Column>
        </div>

        {/* DONE (left column in RTL) */}
        <div>
          <div className="mb-3 text-sm font-medium text-gray-600 flex items-center justify-between">
            <span>مكتملة</span>
            <span className="text-xs bg-gray-200 px-2 py-1 rounded-full">
              {board.done.length}
            </span>
          </div>
          <Column column="done" onDropTask={handleDropTask}>
            {board.done.length > 0 ? (
              board.done.map((t) => (
                <TaskCard
                  key={t.id}
                  task={t}
                  variant="done"
                  onDragStart={handleDragStart}
                />
              ))
            ) : (
              <div className="text-center py-8 text-gray-400 text-sm">
                لا توجد مهام
              </div>
            )}
          </Column>
        </div>
      </div>

      {/* Subtle background sheen */}
      <div className="pointer-events-none relative">
        <div className="absolute -top-24 right-0 w-64 h-24 bg-gradient-to-b from-black/5 to-transparent rounded-bl-[60px] blur-[2px]" />
      </div>
    </section>
  );
}
