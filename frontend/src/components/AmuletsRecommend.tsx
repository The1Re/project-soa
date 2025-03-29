import { useEffect, useState } from "react";
import { Amulet } from "../models/Amulet";
import api from "../services/api";
import { getRandomItems } from "../utils/itemRandom";
import AmuletCard from "./AmuletCard";

function AmuletsRecommend() {
    const [amulets, setAmulets] = useState<Amulet[]>([]);

    useEffect(() => {
        api.get<Amulet[]>("/amulets")
            .then((response) => {
                setAmulets(getRandomItems(response.data, 4));
            })
            .catch(console.error)
    }, []);

    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold tracking-tight text-gray-900">พระเครื่องแนะนำ</h2>
            <div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                    {amulets.map((amulet) => (
                        <AmuletCard key={amulet.id} amulet={amulet} isView={true} />
                    ))}
                    {amulets.length === 0 && (
                        <div className="text-center text-gray-500">
                            <p>ยังไม่มีรายการแนะนำ</p>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default AmuletsRecommend