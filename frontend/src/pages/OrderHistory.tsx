import React, { useEffect, useState } from "react";
import { Order, OrderDetail } from "../models/Order";
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import Image from "../components/Image";
import { Amulet } from "../models/Amulet";

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [amulets, setAmulets] = useState<Amulet[]>([]);
  const [loading, setloading] = useState<boolean>(true);
  const user = useAuth().user;
  const userId = user?.id;


  useEffect(() => {
    if (!userId) return;
  
    setloading(true);
  
    Promise.all([
      api.get<Order[]>("/orders"),
      api.get<Amulet[]>("/amulets"),
      api.get<OrderDetail[]>("/order-details"),
    ])
      .then(([orderRes, amuletRes, detailRes]) => {
        const userOrders = orderRes.data.filter((o) => o.cusId === userId);
        setOrders(userOrders);
        setAmulets(amuletRes.data);
        setOrderDetails(detailRes.data);
  
        console.log("amulets", amuletRes.data);
        console.log("orderDetails", detailRes.data);
      })
      .catch((error) => {
        console.error("API error:", error);
      })
      .finally(() => {
        setloading(false);
      });
  }, [userId]);
  

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 bg-gray-50 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          โปรดเข้าสู่ระบบ
        </h3>
        <p className="text-center text-gray-500 text-lg font-semibold mt-2">
          กรุณาเข้าสู่ระบบเพื่อดูประวัติการสั่งซื้อ
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        ประวัติการสั่งซื้อของ {user?.username}
      </h2>
      {orders.length === 0 ? (
        <p className="text-gray-600">ไม่พบรายการสั่งซื้อ</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => {
            const details = orderDetails.filter(
              (od) => od.orderId === order.id
            );

            return (
              <div
                key={order.id}
                className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200"
              >
                <div className="bg-gray-50 p-4 border-b">
                  <h3 className="text-xl font-semibold text-gray-900">
                    คำสั่งซื้อ #{order.id}
                    <span className="ml-4">ราคารวม: {order.totalPrice} ฿</span>
                  </h3>
                </div>

                <div className="p-4">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {details.map((d) => {
                      const amulet = amulets.find((a) => a.id === d.productId);

                      if (!amulet) return null;

                      return (
                        <div
                          key={d.id}
                          className="border rounded-md overflow-hidden hover:shadow-sm transition-shadow"
                        >
                          {amulet.image && (
                            <div className="w-full aspect-square overflow-hidden">
                              <div className="h-full w-full flex items-center justify-center">
                                <div className="object-contain h-full w-full">
                                  <Image
                                    image={amulet.image}
                                    alt={amulet.name}
                                  />
                                </div>
                              </div>
                            </div>
                          )}

                          <div className="p-4 space-y-2">
                            <p className="font-medium text-gray-900">
                              {amulet.name}
                            </p>
                            <div className="text-sm text-gray-600 space-y-1">
                              <p>ราคา: {amulet.price} ฿</p>
                              <p>วัด: {amulet.templeName}</p>
                              <p>ประเภท: {amulet.type}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
