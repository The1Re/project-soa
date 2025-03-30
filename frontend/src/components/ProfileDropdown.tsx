// components/ProfileDropdown.tsx
import { Link } from "react-router-dom";

interface ProfileDropdownProps {
  onClose: () => void;
}

export default function ProfileDropdown({ onClose }: ProfileDropdownProps) {
  return (
    <div className="absolute right-10 top-full mt-2 w-60 bg-white shadow-lg rounded-xl border border-gray-200 z-50">
      <div className="flex flex-col py-2">
        <Link
          to="/OrderHistory"
          onClick={onClose}
          className="px-4 py-2 hover:bg-gray-100 text-gray-700 text-sm font-medium"
        >
          ประวัติการสั่งซื้อ
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            location.reload();
          }}
          className="px-4 py-2 text-left hover:bg-gray-100 text-red-500 text-sm font-semibold"
        >
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
}
