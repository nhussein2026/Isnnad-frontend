// In a page like src/pages/dashboard/new-task.tsx
import AssignmentForm from "../../features/assignments/AssignmentForm";

export default function NewTaskPage() {
  const handleSubmit = (data: any) => {
    // send to API endpoint
    console.log("Submitting assignment:", data);
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-bold">إنشاء مهمة جديدة</h2>
      <AssignmentForm onSubmit={handleSubmit} />
    </div>
  );
}
