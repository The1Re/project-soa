import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";
import Header from "../components/Header";

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
