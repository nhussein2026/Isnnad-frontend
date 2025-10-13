import { Phone, Mail, MessageCircle, Copyright } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#8B1537] text-white py-6 px-6 flex flex-col justify-between min-h-[25vh]">
      {/* القسم العلوي */}
      <div className="container mx-auto flex justify-end">
        <div className="flex flex-col items-end text-sm space-y-3">
          <div className="flex items-center gap-2">
            <span>123 456 7890</span>
            <Phone className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span>Isnnad@gmail.com</span>
            <Mail className="w-4 h-4 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span>123 456 7890</span>
            <MessageCircle className="w-4 h-4 text-white" />
          </div>
        </div>
      </div>

      {/* خط فاصل */}
      <div className="w-[90%] mx-auto border-t border-gray-300/30 my-4"></div>

      {/* عبارة الحقوق */}
      <div className="text-center text-sm text-gray-100">
        <p className="flex items-center justify-center gap-1">
          <Copyright className="w-3 h-3" />
          2025 جميع الحقوق محفوظة لمنصة إسناد
        </p>
      </div>
    </footer>
  );
}
