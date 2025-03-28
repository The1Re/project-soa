import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home";
import AddAmulet from "../pages/AddAmulet";


export default function AppRoutes() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/amulet-add" element={<AddAmulet />} />
      </Routes>
    </MainLayout>
  );
}
