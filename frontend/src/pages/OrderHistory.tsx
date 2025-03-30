import React, { useEffect, useState } from "react";
import { Order, OrderDetail } from "../models/Order";
import Loading from "../components/Loading";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import Image from "../components/Image";
import { Amulet } from "../models/Amulet";
import { Book } from "../models/Book";
import bookapi from "../services/book.service";
import { BOOK_URL } from "../services/book.service";

const OrderHistory: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [amulets, setAmulets] = useState<Amulet[]>([]);
  const [loading, setloading] = useState<boolean>(true);
  const user = useAuth().user;
  const userId = user?.id;

  // Pagination states
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [ordersPerPage] = useState<number>(3);

  useEffect(() => {
    if (!userId) return;

    setloading(true);

    Promise.all([
      api.get<Order[]>("/orders"),
      api.get<Amulet[]>("/amulets"),
      api.get<OrderDetail[]>("/order-details"),
      bookapi.get<Book[]>("/books"),
    ])
      .then(([orderRes, amuletRes, detailRes, bookRes]) => {
        const userOrders = orderRes.data.filter((o) => o.cusId === userId);
        setOrders(userOrders);
        setAmulets(amuletRes.data);
        setOrderDetails(detailRes.data);

        setBooks(bookRes.data);

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

  // Get current orders for pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Go to next page
  const nextPage = () => {
    if (currentPage < Math.ceil(orders.length / ordersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 bg-orange-50 rounded-lg shadow-sm">
        <h3 className="text-xl font-semibold text-orange-700 mb-2">
          โปรดเข้าสู่ระบบ
        </h3>
        <p className="text-center text-orange-500 text-lg font-semibold mt-2">
          กรุณาเข้าสู่ระบบเพื่อดูประวัติการสั่งซื้อ
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-gradient-to-r from-orange-500 to-orange-400 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold text-white">
          ประวัติการสั่งซื้อของ {user?.username}
        </h2>
      </div>

      {orders.length === 0 ? (
        <p className="text-orange-600 bg-orange-50 p-4 rounded-lg">
          ไม่พบรายการสั่งซื้อ
        </p>
      ) : (
        <>
          <div className="space-y-6">
            {currentOrders.map((order) => {
              const details = orderDetails.filter(
                (od) => od.orderId === order.id
              );

              return (
                <div
                  key={order.id}
                  className="bg-white shadow-md rounded-lg overflow-hidden border border-orange-200"
                >
                  <div className="bg-orange-50 p-4 border-b border-orange-200">
                    <h3 className="text-xl font-semibold text-orange-800">
                      คำสั่งซื้อ #{order.id}
                      <span className="ml-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                        ราคารวม: {order.totalPrice} ฿
                      </span>
                    </h3>
                  </div>

                  <div className="p-4">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {details.map((d) => {
                        // Check if it's a book (productId >= 1000)
                        if (d.productId >= 1000) {
                          // Find book by matching (book_id + 1000) with the productId
                          const book = books.find(
                            (b) => b.book_id + 1000 === d.productId
                          );

                          if (!book) return null;

                          return (
                            <div
                              key={d.id}
                              className="border border-orange-100 rounded-md overflow-hidden hover:shadow-md transition-shadow"
                            >
                              {book.img && (
                                <div className="w-full aspect-square overflow-hidden bg-orange-50">
                                  <div className="h-full w-full flex items-center justify-center">
                                    <div className="object-contain h-full w-full p-2">
                                      <img
                                        src={`${BOOK_URL}/books/images/${book.img}`} 
                                        alt={book.name}
                                        className="w-full h-full object-contain"
                                      />
                                    </div>
                                  </div>
                                </div>
                              )}

                              <div className="p-4 space-y-2 bg-gradient-to-b from-white to-orange-50">
                                <p className="font-medium text-orange-800">
                                  {book.name}
                                </p>
                                <div className="text-sm text-gray-700 space-y-1">
                                  <p className="font-medium text-orange-600">
                                    ราคา: {book.price} ฿
                                  </p>
                                  <p>ผู้เขียน: {book.author}</p>
                                  <p>สำนักพิมพ์: {book.publisher}</p>
                                  <p>ประเภท: หนังสือ</p>
                                </div>
                              </div>
                            </div>
                          );
                        } else {
                          // It's an amulet
                          const amulet = amulets.find(
                            (a) => a.id === d.productId
                          );

                          if (!amulet) return null;

                          return (
                            <div
                              key={d.id}
                              className="border border-orange-100 rounded-md overflow-hidden hover:shadow-md transition-shadow"
                            >
                              {amulet.image && (
                                <div className="w-full aspect-square overflow-hidden bg-orange-50">
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

                              <div className="p-4 space-y-2 bg-gradient-to-b from-white to-orange-50">
                                <p className="font-medium text-orange-800">
                                  {amulet.name}
                                </p>
                                <div className="text-sm text-gray-700 space-y-1">
                                  <p className="font-medium text-orange-600">
                                    ราคา: {amulet.price} ฿
                                  </p>
                                  <p>วัด: {amulet.templeName}</p>
                                  <p>ประเภท: {amulet.type}</p>
                                </div>
                              </div>
                            </div>
                          );
                        }
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center">
            <nav className="inline-flex rounded-md shadow-sm -space-x-px">
              <button
                onClick={prevPage}
                disabled={currentPage === 1}
                className={`relative inline-flex items-center px-3 py-2 rounded-l-md border border-orange-300 bg-white text-sm font-medium ${
                  currentPage === 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-orange-500 hover:bg-orange-50"
                }`}
              >
                &laquo; ก่อนหน้า
              </button>

              {Array.from({
                length: Math.ceil(orders.length / ordersPerPage),
              }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => paginate(index + 1)}
                  className={`relative inline-flex items-center px-4 py-2 border ${
                    currentPage === index + 1
                      ? "bg-orange-500 text-white border-orange-500"
                      : "bg-white text-orange-500 border-orange-300 hover:bg-orange-50"
                  } text-sm font-medium`}
                >
                  {index + 1}
                </button>
              ))}

              <button
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(orders.length / ordersPerPage)
                }
                className={`relative inline-flex items-center px-3 py-2 rounded-r-md border border-orange-300 bg-white text-sm font-medium ${
                  currentPage === Math.ceil(orders.length / ordersPerPage)
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-orange-500 hover:bg-orange-50"
                }`}
              >
                ถัดไป &raquo;
              </button>
            </nav>
          </div>

          <div className="mt-4 text-center text-gray-600">
            แสดง {indexOfFirstOrder + 1}-
            {Math.min(indexOfLastOrder, orders.length)} จากทั้งหมด{" "}
            {orders.length} รายการ
          </div>
        </>
      )}
    </div>
  );
};

export default OrderHistory;
