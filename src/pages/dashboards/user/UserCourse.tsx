// pages/dashboard/SubjectTasksPage.jsx

import CourseAttachments from "../../../components/userDashboard/tasks/CourseAttachments";
import TasksOverview from "../../../components/userDashboard/tasks/TasksOverview";
import TasksBoard from "../../../components/userDashboard/tasks/TasksBoard";

export default function UserCourse() {
   

    return (
        <div dir="rtl" className="space-y-10 p-5 text-right font-[Cairo]">
            
            <TasksOverview />

            <CourseAttachments />

            <TasksBoard />

        </div>
    );
};


