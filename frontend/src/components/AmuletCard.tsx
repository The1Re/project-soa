import { useState } from "react";
import { useCart } from "../context"
import { Amulet } from "../models/Amulet"
import Image from "./Image"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AmuletCard({ image, name, price, type, id, templeName }: Amulet) {
    const { addToCart } = useCart();
    const navigate = useNavigate();
    const [showPopup, setShowPopup] = useState<string | null>(null);
    
    const add = () => {
        if (showPopup) 
            toast.dismiss(showPopup);
        const amulet:Amulet = {
            id : id,
            name: name,
            templeName: templeName,
            price: price,
            type: type,
            image: image
        }
        addToCart(amulet);
        setShowPopup(toast.success("เพิ่มลงตะกร้าเรียบร้อยแล้ว", {
            duration: 1000,
            position: "top-center",
            style: {
                backgroundColor: "var(--color-orange-600)",
                color: "#fff",
                fontSize: "16px",
                padding: "10px",
                borderRadius: "8px",
            },
            iconTheme: {
                primary: "#fff",
                secondary: "#4A5568",
            },
        }));
    }

    return (
        <div className="group hover:scale-105 transition-transform duration-200 ease-in-out">
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                <Image onClick={() => navigate(`/amulets/${id}`)} style="h-full w-full object-cover object-center cursor-pointer" image={image} alt={name} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-700">{name}</h3>
            <h3 className="text-sm text-gray-700">{type}</h3>
            <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-medium text-orange-600">
                    {price.toLocaleString()} บาท
                </p>
                <button 
                    className="cursor-pointer px-2 py-1 text-sm font-medium text-white bg-orange-600 rounded-md hover:bg-orange-700 "
                    onClick={() => add()}
                >
                    เพิ่มลงตะกร้า
                </button>
            </div>
        </div>
    )
}

export default AmuletCard