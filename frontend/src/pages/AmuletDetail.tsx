import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Amulet } from "../models/Amulet";
import api from "../services/api";
import Loading from "../components/Loading";
import Image from "../components/Image";
import { useCart } from "../context";
import { notification } from "../utils/notification";
import AmuletsRecommend from "../components/AmuletsRecommend";
import Breadcrumbs from "../components/Breadcrumbs";

function AmuletDetail() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [amulet, setAmulet] = useState<Amulet>();
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState<string | null>(null);
    const isLoggedIn = localStorage.getItem("token");

    useEffect(() => {
        setLoading(true);
        api.get<Amulet>(`/amulets/${id}`)
            .then((response) => {
                setAmulet(response.data);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    const add = () => {
        if (showPopup)
            notification.canel(showPopup);
        if (amulet) {
            addToCart(amulet);
            setShowPopup(notification.success("เพิ่มลงตะกร้าเรียบร้อยแล้ว"));
        } else {
            setShowPopup(notification.error("ไม่สามารถเพิ่มพระเครื่องลงตะกร้าได้"));

        }
    }

    if (loading) return <Loading />;
    if (!amulet) return <div className="text-center py-16">ไม่พบข้อมูลพระเครื่อง</div>;

    return (
        <div className="mx-auto max-w-7xl px-8 py-8">
            {/* Breadcrumbs */}
            <Breadcrumbs items={
                [
                    { label: "หน้าหลัก", path: "/" },
                    { label: "พระเครื่อง", path: "/amulets" },
                    { label: amulet.name }
                ]
            } />

            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
                {/* Image section */}
                <div className="flex flex-col">
                    <div className="overflow-hidden rounded-lg mb-4">
                        <Image
                            image={amulet.image}
                            alt={amulet.name}
                            style="h-96 w-full object-contain object-center"
                        />
                    </div>
                </div>

                {/* Amulet details */}
                <div className="mt-10 lg:mt-0 lg:pl-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">{amulet.name}</h1>

                    {/* Price */}
                    <div className="mt-4">
                        <p className="text-2xl font-medium text-gray-900">
                            ฿{amulet.price.toLocaleString()}
                        </p>
                    </div>

                    {/* Temple Name */}
                    <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-900">วัด</h3>
                        <p className="mt-1 text-sm text-gray-500">{amulet.templeName}</p>
                    </div>

                    {/* Type */}
                    <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-900">ประเภท</h3>
                        <p className="mt-1 text-sm text-gray-500">{amulet.type}</p>
                    </div>

                    {/* Description (if you add this field in the future) */}
                    <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-900">รายละเอียด</h3>
                        <div className="mt-2 text-sm text-gray-500 space-y-2">
                            <p>พระเครื่องรุ่นพิเศษ จากวัด{amulet.templeName} เป็นพระประเภท{amulet.type} ที่หายากและมีความเก่าแก่ ได้รับความนิยมจากผู้ศรัทธาทั่วประเทศ</p>
                        </div>
                    </div>

                    {/* Contact/Buy button */}
                    {
                        isLoggedIn && (
                            <div className="mt-8">
                                <button
                                    type="button"
                                    className="cursor-pointer flex w-full items-center justify-center rounded-md border border-transparent bg-orange-600 px-8 py-3 text-base font-medium text-white hover:bg-orange-700"
                                    onClick={() => add()}
                                >
                                    เพิ่มลงตะกร้า
                                </button>
                            </div>
                        )
                    }

                    {/* Additional details section - you can expand this later */}
                    <div className="mt-6">
                        <div className="flex items-center">
                            <svg className="h-5 w-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <p className="ml-2 text-sm text-gray-500">
                                รับประกันความแท้ 100%
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related amulets - you could add this section later */}
            <AmuletsRecommend amuletFocus={amulet} />
        </div>
    );
}

export default AmuletDetail;