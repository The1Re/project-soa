import { useState } from "react";
import { useCart } from "../context"
import { Amulet } from "../models/Amulet"
import Image from "./Image"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { notification } from "../utils/notification";

export type AmuletCardProps = {
    amulet: Amulet,
    isView?: boolean
}

function AmuletCard({ amulet, isView = false }: AmuletCardProps) {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState<string | null>(null);
    
    const add = () => {
        if (showPopup) 
            toast.dismiss(showPopup);
        if (amulet) {
            addToCart(amulet);
            setShowPopup(notification.success("เพิ่มลงตะกร้าเรียบร้อยแล้ว"));
        } else {
            setShowPopup(notification.error("ไม่สามารถเพิ่มพระเครื่องลงตะกร้าได้"));
        }
    }

    return (
        <div className="group hover:scale-105 transition-transform duration-200 ease-in-out">
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                <Image onClick={() => navigate(`/amulets/${amulet.id}`)} style="h-full w-full object-cover object-center cursor-pointer" image={amulet.image} alt={amulet.name} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-700">{amulet.name}</h3>
            <h3 className="text-sm text-gray-700">{amulet.type}</h3>
            <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-medium text-orange-600">
                    {amulet.price.toLocaleString()} บาท
                </p>
                {
                    !isView && (
                        <button 
                            className="cursor-pointer px-2 py-1 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 "
                            onClick={() => add()}
                        >
                            เพิ่มลงตะกร้า
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default AmuletCard