import { useCart } from "../context";
import { Amulet } from "../models/Amulet";
import { Book } from "../models/Book";
import { BOOK_URL } from "../services/book.service";
import Image from "./Image";

export const CartCard = ({ item, index }: { item: Amulet | Book; index: number }) => {
    const { removeFromCart } = useCart();

    const isAmulet = (item: Amulet | Book): item is Amulet => {
        return (item as Amulet).image !== undefined;
    };

    if (!item) {
        console.error("CartCard Error: item is undefined");
        return null;
    }


    return (
        <li className="flex py-6">
            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                {isAmulet(item) ? (
                    <Image image={item.image} alt={item.name} />
                ) : (
                    <img src={`${BOOK_URL}/books/images/${item.img}`} alt={item.name} />
                )}
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">{item.price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{}</p>
                </div>
                <div className="flex flex-1 items-end justify-end text-sm">
                    <div className="flex">
                        <button
                            type="button"
                            onClick={() => removeFromCart(index)}
                            className="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500"
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
};
