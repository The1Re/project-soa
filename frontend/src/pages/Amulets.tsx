import { useEffect, useState } from "react";
import { Amulet } from "../models/Amulet";
import api from "../services/api";
import Loading from "../components/Loading";
import AmuletCard from "../components/AmuletCard";
import AmuletFilter from "../components/AmuletFilter";

function Amulets() {
    const [amulets, setAmulets] = useState<Amulet[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        api.get<Amulet[]>("/amulets")
            .then((response) => {
                setAmulets(response.data);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="mx-auto max-w-7xl px-8 py-16 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
                รายการพระเครื่อง
            </h2>

            <AmuletFilter
                setAmulets={setAmulets}
                setLoading={setLoading}
            />

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {amulets.map((amulet) => (
                    <AmuletCard key={amulet.id} {...amulet} />
                ))}
                {amulets.length === 0 && (
                    <p className="col-span-full text-center text-gray-500">
                        ไม่พบพระเครื่องตามเงื่อนไขที่เลือก
                    </p>
                )}
            </div>
        </div>
    );
}

export default Amulets;
