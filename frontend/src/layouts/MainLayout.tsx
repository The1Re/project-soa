import { ReactNode } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Toaster } from "react-hot-toast";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex flex-col">
      <div>
        <Toaster />
      </div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
