import React, { useEffect, useState } from "react";
import { mockOrders, mockAmulets, mockOrderDetails } from "./MockData";
import { Order } from "../models/Order";
import Loading from "../components/Loading";

const OrderHistory: React.FC = () => {
  const [order, setOrder] = useState<Order[]>([]);
  const [loading, setloading] = useState<boolean>(true);
  const userId = "C001"; //mock userid
  // console.log(order)

  useEffect(() => {
    setloading(true);

    setTimeout(() => {
      const userOrder = mockOrders.filter((o) => o.cusId === userId);
      console.log(userOrder);
      setOrder(userOrder);
      setloading(false);
    }, 100);

    console.log(userId);
  }, [userId]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Order History for {userId}
      </h2>

      {order.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {order.map((order) => {
            const orderDetails = mockOrderDetails.filter(
              (od) => od.orderId === order.id
            );

            return (
              <div
                key={order.id}
                className="bg-white shadow-md rounded-lg p-6 border border-gray-100"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-900">
                  Order #{order.id}
                </h3>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {orderDetails.map((orderDetail) => {
                    const amulet = mockAmulets.find(
                      (a) => a.id === orderDetail.productId
                    );

                    if (!amulet) return null;

                    return (
                      <div
                        key={orderDetail.id}
                        className="border rounded-md p-4 hover:shadow-sm transition-shadow"
                      >
                        {amulet.image && (
                          <img
                            src={amulet.image}
                            alt={amulet.name}
                            className="w-full h-48 object-cover rounded-md mb-4"
                          />
                        )}

                        <div className="space-y-2">
                          <p className="font-medium text-gray-900">
                            {amulet.name}
                          </p>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>Price: {amulet.price} ฿</p>
                            <p>Temple: {amulet.templeName}</p>
                            <p>Type: {amulet.type}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
