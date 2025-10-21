import React from 'react';

interface Attachment {
  id: string;
  title: string;
  fileType: string;
  uploadTime: string;
  imageUrl: string;
  fileSize?: string;
}

const UserAttachments: React.FC = () => {
  // Sample data - replace with your actual data
  const attachments: Attachment[] = [
    {
      id: '1',
      title: 'تقرير المشروع النهائي',
      fileType: 'PDF',
      uploadTime: 'منذ ساعتين',
      imageUrl: '/api/placeholder/80/80',
      fileSize: '2.4 MB',
    },
    {
      id: '2',
      title: 'صورة الهوية الشخصية',
      fileType: 'صورة',
      uploadTime: 'منذ 5 أيام',
      imageUrl: '/api/placeholder/80/80',
      fileSize: '1.8 MB',
    },
    {
      id: '3',
      title: 'العقد الموقع',
      fileType: 'PDF',
      uploadTime: 'منذ أسبوع',
      imageUrl: '/api/placeholder/80/80',
      fileSize: '3.1 MB',
    },
    {
      id: '3',
      title: 'العقد الموقع',
      fileType: 'PDF',
      uploadTime: 'منذ أسبوع',
      imageUrl: '/api/placeholder/80/80',
      fileSize: '3.1 MB',
    },
    {
      id: '3',
      title: 'العقد الموقع',
      fileType: 'PDF',
      uploadTime: 'منذ أسبوع',
      imageUrl: '/api/placeholder/80/80',
      fileSize: '3.1 MB',
    },
    {
      id: '3',
      title: 'العقد الموقع',
      fileType: 'PDF',
      uploadTime: 'منذ أسبوع',
      imageUrl: '/api/placeholder/80/80',
      fileSize: '3.1 MB',
    },
    {
      id: '3',
      title: 'العقد الموقع',
      fileType: 'PDF',
      uploadTime: 'منذ أسبوع',
      imageUrl: '/api/placeholder/80/80',
      fileSize: '3.1 MB',
    },
    {
      id: '3',
      title: 'العقد الموقع',
      fileType: 'PDF',
      uploadTime: 'منذ أسبوع',
      imageUrl: '/api/placeholder/80/80',
      fileSize: '3.1 MB',
    },
    {
      id: '4',
      title: 'الشهادة العلمية',
      fileType: 'صورة',
      uploadTime: 'منذ 3 أيام',
      imageUrl: '/api/placeholder/80/80',
      fileSize: '2.1 MB',
    },
  ];

  const getFileTypeColor = (fileType: string) => {
    switch (fileType) {
      case 'PDF':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'صورة':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'وثيقة':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="w-full mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        {/* Upload Button */}
        <div className="text-left">
          <button className="bg-[#8D1B3D] hover:bg-[#8d1b3dbe] text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center">
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            إضافة مرفق جديد
          </button>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 text-right">
            المرفقات
          </h2>
          <p className="text-gray-600 text-right mt-2">
            قائمة بجميع المرفقات والمستندات المضافة
          </p>
        </div>
      </div>

      {/* Attachments List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
        {attachments.map((attachment) => (
          <div
            key={attachment.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
          >
            {/* Left Side - Content */}
            <div className="flex-1 text-right">
              {/* Title */}
              <h3 className="text-lg font-semibold text-gray-800">
                {attachment.title}
              </h3>

              {/* File Type and Upload Time */}
              <div className="flex items-center justify-between">
                {/* File Type Badge */}
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getFileTypeColor(attachment.fileType)}`}
                >
                  {attachment.fileType}
                </span>

                {/* Upload Time */}
                <div>
                  <div className="flex items-center justify-col text-gray-600">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm">{attachment.uploadTime}</span>
                  </div>
                  {/* File Size (optional) */}
                  {attachment.fileSize && (
                    <span className="text-xs text-gray-500">
                      الحجم: {attachment.fileSize}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="flex-shrink-0 ml-2">
              <div className="w-16 h-16 rounded-2xl border-2 border-gray-300 overflow-hidden bg-white flex items-center justify-center">
                <img
                  src={attachment.imageUrl}
                  alt={attachment.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden flex-col items-center justify-center p-2 text-center">
                  <span className="text-xs font-medium text-gray-600">
                    {attachment.fileType}
                  </span>
                  <span className="text-[10px] text-gray-500">ملف</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {attachments.length === 0 && (
        <div className="text-center py-12">
          <svg
            className="w-16 h-16 mx-auto text-gray-400 mb-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            لا توجد مرفقات
          </h3>
          <p className="text-gray-500">لم يتم إضافة أي مرفقات حتى الآن</p>
        </div>
      )}
    </div>
  );
};

export default UserAttachments;
