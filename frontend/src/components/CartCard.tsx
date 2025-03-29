import { useCart } from "../context";
import { Amulet } from "../models/Amulet";
import Image from "./Image";

interface CartCardProps extends Amulet {
    index : number;
}

export const CartCard = ({name , price , image , type , index} : CartCardProps ) => {
    const { removeFromCart } = useCart();

    return (
        <li className="flex py-6">
            <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                <Image image={image} alt={name} />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3>
                            {name}
                        </h3>
                        <p className="ml-4">{price}</p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{type}</p>
                </div>
                <div className="flex flex-1 items-end justify-end text-sm">
                    <div className="flex">
                        <button type="button" onClick={() => removeFromCart(index)} className="font-medium cursor-pointer text-indigo-600 hover:text-indigo-500">
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </li>
    );
}