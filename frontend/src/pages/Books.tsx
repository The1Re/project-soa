import { useEffect, useState } from "react";
import bookApi from "../services/book.service";
import Loading from "../components/Loading";
import Breadcrumbs from "../components/Breadcrumbs";
import { Book } from "../models/Book";
import BookCard from "../components/BookCard";

function Books() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const isLoggedIn = localStorage.getItem("token");

    useEffect(() => {
        setLoading(true);
        bookApi.get<Book[]>("/books")
            .then((response) => {
                setBooks(response.data.filter((book) => book.catalog === "Dhamma"));
            })
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Loading />;

    return (
        <div className="mx-auto max-w-7xl px-8 py-8 sm:px-6">

            <Breadcrumbs items={
                [
                    { label: "หน้าหลัก", path: "/" },
                    { label: "หนังสือพระ" }
                ]
            }/>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-6">
                รายการหนังสือพระ
            </h2>


            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {books.map((book) => (
                    isLoggedIn ? <BookCard key={book.book_id} book={book} /> : <BookCard key={book.book_id} book={book} isView={true} />
                ))}
                {books.length === 0 && (
                    <p className="col-span-full text-center text-gray-500">
                        ไม่พบพระเครื่องตามเงื่อนไขที่เลือก
                    </p>
                )}
            </div>
        </div>
    );
}

export default Books;
