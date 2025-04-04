import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context";
import { useEffect, useState ,useRef} from "react";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";
import UserProfile from "./UserProfile";
import { Link } from "react-router-dom";
import ProfileDropdown from "./ProfileDropdown";
interface HeaderProps {
  setOpenCart: (open: boolean) => void;
}

const path = [
  { name: "หน้าหลัก", path: "/" },
  { name: "พระเครื่อง", path: "/amulets" },
  { name: "หนังสือพระ", path: "/books" },
  { name: "ขายพระเครื่อง", path: "/amulet-add" },
];

export default function Header({ setOpenCart }: HeaderProps) {
  const { cart } = useCart();
  const { login, user } = useAuth();
  const [total, setTotal] = useState<number>(0);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const isLoggedIn = localStorage.getItem("token");

  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setTotal(cart.length);
  }, [cart]);

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold w-2xs flex text-gray-800 hover:text-orange-600 transition-colors">
          ตลาดพระเครื่อง
        </div>

        {/* Right Side Navigation */}
        <div className="flex items-center space-x-6">
          {/* Path */}
          <div className="flex items-center">
            {path.map((item, index) => (
              !(!isLoggedIn && item.name === "ขายพระเครื่อง") &&
              <div
                key={index}
                className="text-gray-600 font-medium border-gray-300 px-4 hover:text-orange-600 transition-all cursor-pointer"
              >
                <Link to={item.path}>{item.name}</Link>
              </div>
            ))}
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-4">
            <div className="text-gray-600 font-semibold border-r border-gray-300 px-6 hover:text-blue-600 transition-all cursor-pointer">
              {user ? (
                <div className="relative" ref={profileRef}>
                  <div
                    onClick={() => setProfileOpen(!isProfileOpen)}
                    className="cursor-pointer"
                  >
                    <UserProfile {...user} />
                  </div>
                  {isProfileOpen && (
                    <div className="absolute right-[-50px] top-full mt-2 z-50">
                      <ProfileDropdown onClose={() => setProfileOpen(false)} />
                    </div>
                  )}
                </div>
              ) : (
                <GoogleOAuthProvider
                  clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
                >
                  <GoogleLogin
                    onSuccess={login}
                    onError={(error: void) =>
                      console.log("Login Failed:", error)
                    }
                  />
                </GoogleOAuthProvider>
              )}
            </div>
          </div>
          {/* <UserProfile /> */}

          {/* Icons */}
          {isLoggedIn && (
            <div className="flex items-center space-x-6">
              {/* Shopping Bag */}
              <div
                className={`text-gray-600 hover:text-orange-600 transition-all relative cursor-pointer ${
                  total > 0 ? "animate-bounce" : ""
                }`}
                onClick={() => setOpenCart(true)}
              >
                <FontAwesomeIcon icon={faBagShopping} size="xl" />
                {total > 0 ? (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {total}
                  </span>
                ) : (
                  <></>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
