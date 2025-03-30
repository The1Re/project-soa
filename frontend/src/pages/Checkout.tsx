import React, { useState } from "react";
import { useCart } from "../context";
import Image from "../components/Image";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


interface Order {
  cusId : string | undefined,
  totalPrice : number,
}

interface OrderDetail {
    productId: number,
    orderId: number
}

const Checkout: React.FC = () => {
  const { cart , clearCart } = useCart();
  const { user } = useAuth();
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const [loading , setLoading] = useState(false);
  const navigate = useNavigate();

  console.log(cart);

  const postData = async (endpoint: string, data: Order | OrderDetail) => {
    try {
      const response = await api.post(endpoint, data, { withCredentials: true });
      console.log("Response:", response.data);
      return response.data;
    } catch (error) {
      console.error("API Error:", error);
      throw error; 
    }
  };
  

  const checkOut = async () => {
    try {
      setLoading(true);
      
      const sendOrder: Order = {
        cusId: user?.id,
        totalPrice: total,
      };
      console.log("Send Order Data:", sendOrder);
      
      const order = await postData(`/orders`, sendOrder);
  
      if (!order?.id) {
        throw new Error("Order creation failed: No order ID returned");
      }
  
      const promises = cart?.map(async (item) => {
        let productId;
  
        if ("id" in item) {
          productId = item.id;
        } else if ("book_id" in item) {
          productId = 1000 + item.book_id;
        }
  
        if (productId !== undefined) {
          const sendOrderdetail: OrderDetail = {
            productId,
            orderId: order.id,
          };
          return postData(`/order-details`, sendOrderdetail);
        }
      }) ?? [];
  
      await Promise.all(promises);
  
      console.log("Checkout success.");
      setLoading(false);
      clearCart();
      navigate('/');
    } catch (error) {
      console.error("Checkout error:", error);
      setLoading(false);
    }
  };
  
  
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-10">CHECKOUT</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* hipping Form */}
        <div className="md:col-span-2 space-y-6">
          <form className="space-y-6">
            <div>
              <label className="block font-semibold mb-1">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className="w-full border rounded-md p-2"
                value={user?.username}
                readOnly
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border rounded-md p-2"
                value={user?.email}
                readOnly
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="0812345678"
                className="w-full border rounded-md p-2"
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Delivery Address</label>
              <textarea
                placeholder="123 หมู่บ้าน ABC ซอย 5 แขวงบางนา เขตบางนา กรุงเทพฯ"
                className="w-full border rounded-md p-2"
                rows={3}
                required
              ></textarea>
            </div>

            <button
              onClick={checkOut}
              type="submit"
              className="w-full bg-indigo-600 text-white font-semibold py-3 rounded hover:bg-indigo-700"
            >
              Confirm Order
            </button>
          </form>
        </div>

        {/* Cart Summary */}
        <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-bold mb-4">
            {cart.length} ITEM{cart.length > 1 && "S"}
          </h2>
          <ul className="divide-y divide-gray-200 mb-4">
            {cart.map((item, index) => (
              <li key={index} className="py-4 flex gap-4">
                <div className="size-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                  {
                    "id" in item ? <Image image={item.image} alt={item.name} /> : <Image image={item.img} alt={item.name} />
                  }
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-medium">{item.name}</p>
                  {
                    "id" in item ? <p className="text-gray-500">{item.templeName}</p> : <></>
                  }
                  <p className="text-gray-500 text-xs">Qty: 1</p>
                </div>
                <div className="text-right font-semibold">{item.price} ฿</div>
              </li>
            ))}
          </ul>

          <div className="flex justify-between font-semibold">
            <span>Subtotal</span>
            <span>{total} ฿</span>
          </div>
          <div className="flex justify-between mt-2 font-bold">
            <span>TOTAL TO PAY</span>
            <span>{total} ฿</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
