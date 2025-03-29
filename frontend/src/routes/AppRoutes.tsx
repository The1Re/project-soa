import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AddAmulet from "../pages/AddAmulet";
import Amulets from "../pages/Amulets";
import AmuletDetail from "../pages/AmuletDetail";


export default function AppRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/amulet-add" element={<AddAmulet />} />
        <Route path="/amulets" element={<Amulets />} />
        <Route path="/amulets/:id" element={<AmuletDetail />} />
      </Routes>
    </MainLayout>
  );
}
