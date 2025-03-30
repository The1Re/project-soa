import axios from "axios";

export const BOOK_URL = 'http://10.35.145.93:8080/bookstore/api';

const api = axios.create({
    baseURL: BOOK_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

export default api;
