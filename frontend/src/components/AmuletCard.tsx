import { Amulet } from "../models/Amulet"
import Image from "./Image"

function AmuletCard({ image, name, price, type } : Amulet ) {
    return (
        <div className="cursor-pointer group">
            <div className="aspect-square w-full overflow-hidden rounded-lg bg-gray-100">
                <Image image={image} alt={name} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-gray-700">{name}</h3>
            <h3 className="text-sm text-gray-700">{type}</h3>
            <p className="mt-2 text-lg font-medium text-orange-600">
                {price.toLocaleString()} บาท
            </p>
        </div>
    )
}

export default AmuletCard