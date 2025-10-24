export default function CourseAttachments() {
  return (
    <div dir="ltr" className="w-full mt-6 mb-15 font-[Cairo]">
      {/* Section Title */}
      <div className="flex justify-end mb-2">
        <h2 className="text-gray-700 font-semibold text-lg">ملحقات المادة</h2>
      </div>

      {/* Divider Line */}
      <div className="w-full h-px bg-gray-200 mb-6"></div>

      {/* Attachment Card */}
      <div className="flex justify-end">
        <div className="flex items-center justify-end gap-5 bg-white border border-gray-200 rounded-xl shadow-[0_2px_6px_rgba(0,0,0,0.08)] hover:shadow-[0_4px_10px_rgba(0,0,0,0.12)] transition-all duration-200 w-64 px-4 py-3 cursor-pointer">
          {/* File Info */}
          <div className="flex flex-col text-right w-full gap-1">
            <p className="font-bold text-gray-800 text-sm">الرياضيات</p>
            <div className="flex w-full items-center justify-between text-xs text-gray-500 gap-1">
              <span>5:30 AM</span>
              <span>PDF</span>
            </div>
          </div>

          {/* Green Box Placeholder */}
          <div className="w-13 h-10 rounded-md bg-green-900 shadow-inner"></div>
        </div>
      </div>
    </div>
  );
}
