import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CourseTask {
  subject: string;
  tasks: string[];
}

interface SectionProps {
  title: string;
  courses: CourseTask[];
}

export const TasksSection: React.FC<SectionProps> = ({ title, courses }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white shadow rounded-2xl p-4 mb-6">
      {/* Header */}
      <div
        className="flex justify-between items-center cursor-pointer select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <button
          className="text-gray-600 hover:text-gray-800 transition-transform"
          aria-label="toggle section"
        >
          {isOpen ? <ChevronUp size={22} /> : <ChevronDown size={22} />}
        </button>
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>

      {/* Content */}
      <div
        className={`grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 transition-all duration-300 ${
          isOpen
            ? 'opacity-100 max-h-screen'
            : 'opacity-0 max-h-0 overflow-hidden'
        }`}
      >
        {courses.map((subj, index) => (
          <div key={index} className="border rounded-xl p-3 bg-gray-50">
            <h3 className="font-semibold text-gray-700 mb-2 text-center">
              {subj.subject}
            </h3>
            <ul className="space-y-2">
              {subj.tasks.map((task, idx) => (
                <li
                  key={idx}
                  className="bg-white border rounded-lg p-2 text-sm text-gray-600"
                >
                  {task}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};
