import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import bookApi, { BOOK_URL } from "../services/book.service";
import Loading from "../components/Loading";
import { useCart } from "../context";
import { notification } from "../utils/notification";
import Breadcrumbs from "../components/Breadcrumbs";
import { Book } from "../models/Book";

function BookDetail() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const [book, setBook] = useState<Book>();
    const [loading, setLoading] = useState(true);
    const [showPopup, setShowPopup] = useState<string | null>(null);
    const isLoggedIn = localStorage.getItem("token");

    useEffect(() => {
        setLoading(true);
        bookApi.get<Book>(`/books/${id}`)
            .then((response) => {
                setBook(response.data);
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, [id]);

    const add = () => {
        if (showPopup)
            notification.canel(showPopup);
        if (book) {
            addToCart(book);
            setShowPopup(notification.success("เพิ่มลงตะกร้าเรียบร้อยแล้ว"));
        } else {
            setShowPopup(notification.error("ไม่สามารถเพิ่มพระเครื่องลงตะกร้าได้"));

        }
    }

    if (loading) return <Loading />;
    if (!book) return <div className="text-center py-16">ไม่พบข้อมูลพระเครื่อง</div>;

    return (
        <div className="mx-auto max-w-7xl px-8 py-8">
            {/* Breadcrumbs */}
            <Breadcrumbs items={
                [
                    { label: "หน้าหลัก", path: "/" },
                    { label: "หนังสือพระ", path: "/books" },
                    { label: book.name }
                ]
            } />

            <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
                {/* Image section */}
                <div className="flex flex-col">
                    <div className="overflow-hidden rounded-lg mb-4">
                        <img
                            src={`${BOOK_URL}/books/images/${book.img}`}
                            alt={book.name}
                            className="h-96 w-full object-contain object-center"
                        />
                    </div>
                </div>

                {/* Amulet details */}
                <div className="mt-10 lg:mt-0 lg:pl-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">{book.name}</h1>

                    {/* Price */}
                    <div className="mt-4">
                        <p className="text-2xl font-medium text-gray-900">
                            ฿{book.price.toLocaleString()}
                        </p>
                    </div>

                    {/* Temple Name */}
                    <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-900">ชื่อผู้แต่ง</h3>
                        <p className="mt-1 text-sm text-gray-500">{book.author}</p>
                    </div>

                    {/* Type */}
                    <div className="mt-4">
                        <h3 className="text-sm font-medium text-gray-900">สำนักพิมพ์</h3>
                        <p className="mt-1 text-sm text-gray-500">{book.publisher}</p>
                    </div>

                    {/* Description (if you add this field in the future) */}
                    <div className="mt-6">
                        <h3 className="text-sm font-medium text-gray-900">รายละเอียด</h3>
                        <div className="mt-2 text-sm text-gray-500 space-y-2">
                            <p>{book.description ?? "ไม่มีรายละเอียด"}</p>
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

                </div>
            </div>

            
        </div>
    );
}

export default BookDetail;