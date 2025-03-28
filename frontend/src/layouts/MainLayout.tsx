import Header from "../components/Header";
import Footer from "../components/Footer";
import CartSlideOver from "../components/Cart";
import { useState } from "react";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const [openCart, setOpenCart] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header setOpenCart={setOpenCart} />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-6">
        {children}
      </main>

      {/* Cart SlideOver อยู่ระหว่าง Header กับ Footer */}
      <CartSlideOver open={openCart} setOpen={setOpenCart} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
