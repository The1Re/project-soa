import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import OrderHistory from "../pages/OrderHistory";
import Amulets from "../pages/Amulets";


export default function AppRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/OrderHistory" element={<OrderHistory />} />
        <Route path="/amulets" element={<Amulets />} />
      </Routes>
    </MainLayout>
  );
}
