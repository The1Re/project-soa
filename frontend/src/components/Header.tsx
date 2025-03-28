import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBagShopping, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

interface HeaderProps {
  setOpenCart: (open: boolean) => void;
}

export default function Header({ setOpenCart }: HeaderProps) {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
          Logo
        </div>

        {/* Right Side Navigation */}
        <div className="flex items-center space-x-6">
          {/* User Profile */}
          <div className="flex items-center space-x-4">
            <div className="bg-blue-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-md">
              <span className="font-semibold">HI</span>
            </div>
            <div className="text-gray-800 font-medium">Hatsawat Intrasod</div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-5">
            {/* Shopping Bag */}
            <div
              className="text-gray-600 hover:text-blue-600 transition-colors relative cursor-pointer"
              onClick={() => setOpenCart(true)}
            >
              <FontAwesomeIcon icon={faBagShopping} size="xl" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </div>

            {/* Search */}
            <button className="text-gray-600 hover:text-blue-600 transition-colors cursor-pointer">
              <FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
