import Header from "../components/Header";
import Footer from "../components/Footer";
import CartSlideOver from "../components/Cart";
import { useEffect, useState } from "react";
import { Amulet } from "../models/Amulet";
import api from "../services/api";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [openCart, setOpenCart] = useState(false);
  const [cart , setCart] = useState<Amulet[]>([]);

  // const fetch = async () => {
  //   const amulet = await api.get("/amulets");
  //   console.log(amulet);
  // }

  // useEffect(()=>{
  //   fetch();
  // },[])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header setOpenCart={setOpenCart} />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Cart SlideOver */}
      <CartSlideOver open={openCart} setOpen={setOpenCart} cart={cart} setCart={setCart}/>

      {/* Footer */}
      <Footer />
    </div>
  );
}
