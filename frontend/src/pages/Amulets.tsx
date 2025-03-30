import { useEffect, useState } from "react";
import { Amulet } from "../models/Amulet";
import api from "../services/api";
import Loading from "../components/Loading";
import AmuletCard from "../components/AmuletCard";

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

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 mb-6">รายการพระเครื่อง</h2>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {amulets.map((amulet) => (
                    <AmuletCard key={amulet.id} {...amulet} />
                ))}
            </div>
        </div>
    );
}

export default Amulets;
