// components/dashboard/SubjectTasksBoard.tsx
import React, { useMemo, useState } from "react";

/* ---------- Types ---------- */
type ColumnKey = "todo" | "doing" | "done";

type Task = {
  id: string;
  title: string;
  description: string;
};

type BoardState = Record<ColumnKey, Task[]>;

/* ---------- Helpers ---------- */
const uid = () => Math.random().toString(36).slice(2, 9);

/* ---------- Icons (inline SVGs, zero deps) ---------- */
const CheckIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" width="14" height="14" className={className} aria-hidden>
    <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
  </svg>
);
const MinusIcon = ({ className = "" }) => (
  <svg viewBox="0 0 24 24" width="14" height="14" className={className} aria-hidden>
    <rect x="5" y="11" width="14" height="2" fill="currentColor" />
  </svg>
);
const EmptyIcon = () => (
  <span className="inline-block w-3.5 h-3.5 rounded-[2px] border border-gray-300" />
);

/* ---------- Task Card ---------- */
function TaskCard({
  task,
  variant, // todo | doing | done (for border color + icon)
  onDragStart,
}: {
  task: Task;
  variant: ColumnKey;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
}) {
  const border =
    variant === "done"
      ? "border-rose-700"
      : variant === "doing"
      ? "border-black/70"
      : "border-gray-300";

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task.id)}
      className={`group rounded-xl border-2 ${border} bg-gray-100 px-5 py-4 transition-shadow shadow-[inset_0_0_0_1px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] cursor-grab active:cursor-grabbing`}
    >
      <div className="flex items-center justify-between">
        <div className="text-[13px] font-bold text-gray-800">{task.title}</div>
        <span
          className={`inline-flex items-center justify-center w-4.5 h-4.5 rounded-[3px] ${
            variant === "done"
              ? "bg-rose-700 text-white"
              : variant === "doing"
              ? "bg-black/80 text-white"
              : "text-gray-400"
          }`}
          aria-hidden
        >
          {variant === "done" ? (
            <CheckIcon />
          ) : variant === "doing" ? (
            <MinusIcon />
          ) : (
            <EmptyIcon />
          )}
        </span>
      </div>
      <p className="mt-2 text-[12px] leading-5 text-gray-500">{task.description}</p>
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
export default function TasksBoard() {
  // initial data mapped to your screenshot: done (left), doing (middle), todo (right) in RTL
  const [board, setBoard] = useState<BoardState>({
    done: [
      { id: uid(), title: "مهمة 1", description: "وصف المهمة التي يجب إنجازها" },
      { id: uid(), title: "مهمة 5", description: "وصف المهمة التي يجب إنجازها" },
    ],
    doing: [
      { id: uid(), title: "مهمة 2", description: "وصف المهمة التي يجب إنجازها" },
      { id: uid(), title: "مهمة 3", description: "وصف المهمة التي يجب إنجازها" },
    ],
    todo: [
      { id: uid(), title: "مهمة 4", description: "وصف المهمة التي يجب إنجازها" },
      { id: uid(), title: "مهمة 4", description: "وصف المهمة التي يجب إنجازها" },
    ],
  });

  const [dragInfo, setDragInfo] = useState<{ id: string; from: ColumnKey } | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, id: string) => {
    // find source column
    let from: ColumnKey = "todo";
    (Object.keys(board) as ColumnKey[]).forEach((k) => {
      if (board[k].some((t) => t.id === id)) from = k;
    });
    setDragInfo({ id, from });
    e.dataTransfer.effectAllowed = "move";
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

  // Add task to TODO like the screenshot button
  const addTask = () =>
    setBoard((prev) => ({
      ...prev,
      todo: [
        ...prev.todo,
        {
          id: uid(),
          title: `مهمة ${prev.todo.length + prev.doing.length + prev.done.length + 1}`,
          description: "وصف المهمة الجديدة",
        },
      ],
    }));

  
  return (
    <section dir="rtl" className="w-full mb-15">
      {/* Header row like the screenshot */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-right text-lg font-semibold text-gray-800">مهام المادة</h2>

        <div className="flex items-center gap-3">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-md px-3 md:px-7 py-1.5 text-[12px] md:text-[15px] font-semibold bg-[var(--primary-color)] text-[#ffff] hover:bg-rose-700  transition"
            onClick={addTask}
          >
            إضافة مهمة
          </button>
        </div>
      </div>

      {/* Divider line */}
      <div className="w-full h-px bg-gray-200 mb-5" />

      {/* 3 columns: RTL order to match the screenshot visually (right=todo, middle=doing, left=done) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* TODO (right column in RTL) */}
        <Column column="todo" onDropTask={handleDropTask}>
          {board.todo.map((t) => (
            <TaskCard key={t.id} task={t} variant="todo" onDragStart={handleDragStart} />
          ))}
        </Column>

        {/* DOING (middle) */}
        <Column column="doing" onDropTask={handleDropTask}>
          {board.doing.map((t) => (
            <TaskCard key={t.id} task={t} variant="doing" onDragStart={handleDragStart} />
          ))}
        </Column>

        {/* DONE (left column in RTL) */}
        <Column column="done" onDropTask={handleDropTask}>
          {board.done.map((t) => (
            <TaskCard key={t.id} task={t} variant="done" onDragStart={handleDragStart} />
          ))}
        </Column>
      </div>

      {/* Subtle background sheen in the far-right like your screenshot (optional, harmless) */}
      <div className="pointer-events-none relative">
        <div className="absolute -top-24 right-0 w-64 h-24 bg-gradient-to-b from-black/5 to-transparent rounded-bl-[60px] blur-[2px]" />
      </div>

      
    </section>
  );
}
