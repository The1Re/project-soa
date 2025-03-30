import { useState } from "react";
import { useCart } from "../context";
import { Amulet } from "../models/Amulet";
import { Book } from "../models/Book";
import { BOOK_URL } from "../services/book.service";
import Image from "./Image";

export const CartCard = ({ item, index }: { item: Amulet | Book; index: number }) => {
    const { removeFromCart } = useCart();
    const [isHovered, setIsHovered] = useState(false);

    const isAmulet = (item: Amulet | Book): item is Amulet => {
        return (item as Amulet).image !== undefined;
    };

    if (!item) {
        console.error("CartCard Error: item is undefined");
        return null;
    }

    return (
        <li 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)} 
            className={`${isHovered ? "bg-orange-50" : ""} flex py-6 px-2 rounded-lg transition-colors duration-200 relative`}
        >
            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200 shadow-sm">
                {isAmulet(item) ? (
                    <Image image={item.image} alt={item.name} />
                ) : (
                    <img className="h-full w-full object-cover object-center" src={`${BOOK_URL}/books/images/${item.img}`} alt={item.name} />
                )}
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3 className="text-gray-800 font-medium">{item.name}</h3>
                        <p className="ml-4 text-orange-600 font-medium">{item.price.toLocaleString()} ฿</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{isAmulet(item) ? item.type : item.publisher}</p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
                    <div className="text-xs text-gray-500">
                        {isAmulet(item) && (
                            <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-1 text-xs font-medium text-orange-700">
                                พระเครื่อง
                            </span>
                        )}
                        {!isAmulet(item) && (
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-1 text-xs font-medium text-blue-700">
                                หนังสือ
                            </span>
                        )}
                    </div>
                    <div className="flex">
                        <button
                            type="button"
                            onClick={() => removeFromCart(index)}
                            className="font-medium cursor-pointer text-orange-600 hover:text-orange-700 transition-colors duration-200 flex items-center gap-1"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                            ลบออก
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
};