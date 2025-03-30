import React, { useState } from "react";
import { useCart } from "../context";
import Image from "../components/Image";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BOOK_URL } from "../services/book.service";

interface Order {
  cusId: string | undefined;
  totalPrice: number;
}

interface OrderDetail {
  productId: number;
  orderId: number;
}

const Checkout: React.FC = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

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

  const checkOut = async (e: React.FormEvent) => {
    e.preventDefault();
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
      navigate("/");
    } catch (error) {
      console.error("Checkout error:", error);
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b-2 border-orange-500 pb-2 inline-block">
        ชำระเงิน
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Shipping Form */}
        <div className="md:col-span-2 space-y-6">
          <form className="space-y-6" onSubmit={checkOut}>
            <div>
              <label className="block font-medium mb-1 text-gray-700">
                ชื่อ-นามสกุล
              </label>
              <input
                type="text"
                placeholder="ชื่อ นามสกุล"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                value={user?.username}
                readOnly
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-700">
                อีเมล
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                value={user?.email}
                readOnly
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-700">
                เบอร์โทรศัพท์
              </label>
              <input
                type="tel"
                placeholder="0812345678"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                required
              />
            </div>

            <div>
              <label className="block font-medium mb-1 text-gray-700">
                ที่อยู่จัดส่ง
              </label>
              <textarea
                placeholder="123 หมู่บ้าน ABC ซอย 5 แขวงบางนา เขตบางนา กรุงเทพฯ"
                className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition"
                rows={3}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={loading || cart.length === 0}
              className="w-full bg-orange-600 text-white font-medium py-3 rounded-md hover:bg-orange-700 transition-colors duration-200 shadow-md disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  กำลังดำเนินการ...
                </span>
              ) : (
                "ยืนยันการสั่งซื้อ"
              )}
            </button>
          </form>
        </div>

        {/* Cart Summary - Sticky */}
        <div className="md:sticky md:top-4 self-start bg-white shadow rounded-lg p-6 border border-gray-200">
          <h2 className="text-lg font-bold mb-4 border-b border-orange-200 pb-2">
            สินค้า {cart.length} รายการ
          </h2>
          <div className="max-h-96 overflow-y-auto mb-4 pr-2 scrollbar-thin">
            <ul className="divide-y divide-gray-200">
              {cart.map((item, index) => (
                <li key={index} className="py-4 flex gap-4">
                  <div className="size-20 shrink-0 overflow-hidden rounded-md border border-gray-200 shadow-sm">
                    {
                      "id" in item ? (
                        <Image image={item.image} alt={item.name} />
                      ) : (
                        <img
                          className="h-full w-full object-cover object-center"
                          src={`${BOOK_URL}/books/images/${item.img}`}
                          alt={item.name}
                        />
                      )
                    }
                  </div>
                  <div className="flex-1 text-sm">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    {"id" in item ? (
                      <p className="text-gray-500 text-xs">{item.templeName}</p>
                    ) : (
                      <></>
                    )}
                    <div className="flex mt-1">
                      <span className="inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                        {
                          "id" in item ? ("พระเครื่อง") : ("หนังสือ")
                        }
                      </span>
                    </div>
                  </div>
                  <div className="text-right font-medium text-orange-600">
                    {item.price.toLocaleString()} ฿
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-gray-200">
            <div className="flex justify-between font-medium text-gray-600">
              <span>ราคารวม</span>
              <span>{total.toLocaleString()} ฿</span>
            </div>
            <div className="flex justify-between mt-2 font-bold text-lg">
              <span className="text-gray-800">ยอดชำระทั้งหมด</span>
              <span className="text-orange-600">{total.toLocaleString()} ฿</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;