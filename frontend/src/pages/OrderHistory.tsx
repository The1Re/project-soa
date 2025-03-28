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
    <div>
      <h2>Order History for {userId}</h2>
      <ul>
        {order.map((o) => {
          const orderDetail = mockOrderDetails.filter(
            (od) => od.orderId === o.id
          );
          

          return (
            <li key={o.id}>
              <p>Order #{o.id} </p>
              <ul>
                {orderDetail.map((od) => {
                  const amulet = mockAmulets.find((a) => a.id === od.productId);
                  return <li key={od.id}>
                      <p>productId :{amulet?.id}</p>
                      <p>name :{amulet?.name}</p>
                      <p>price :{amulet?.price}</p>
                      <p>templeName :{amulet?.templeName}</p>
                      <p>type :{amulet?.type}</p>
                      <p>image :{amulet?.image}</p>
                  </li>;
                })}
              </ul>
            </li>
          );
        })}
      </ul>
      <ul>
        {order.map((o) => (
          <li key={o.id}></li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;
