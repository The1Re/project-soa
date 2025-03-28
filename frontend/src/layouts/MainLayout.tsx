import { ReactNode } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

interface MainLayoutProps {
    children: ReactNode;
  }
  

export default function MainLayout({ children }:MainLayoutProps) {
  return (
    <div className="flex flex-col"> 
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
