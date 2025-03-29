import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import Header from "../components/Header";
import { ReactNode, useEffect, useState } from "react";
import CartSlideOver from "../components/Cart";
import { useAuth } from "../context/AuthContext";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [ openCart , setOpenCart ] = useState(false);
  const { getUser , user} = useAuth();
  
  useEffect(() => {
    getUser();
  },[])

  console.log(user);

  return (
      <div className="flex flex-col">
        <div>
          <Toaster />
        </div>

        {/* Header Section */}
        <Header setOpenCart={setOpenCart}/>

        {/* Cart Section */}
        <CartSlideOver open={openCart} setOpen={setOpenCart}/>

        {/* Content Section */}
        <main>{children}</main>

        {/* Footer Section */}
        <Footer />
      </div>
  );
}
