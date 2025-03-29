import React from "react";
import { useCart } from "../context";

const Checkout: React.FC = () => {
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

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
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full border rounded-md p-2"
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
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1 text-sm">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-gray-500">{item.templeName}</p>
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
