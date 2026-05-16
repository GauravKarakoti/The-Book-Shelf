import axios from "axios";
import { BOOK_ADD, BOOK_CLEAR, BOOK_GET, BOOK_UPDATE, BOOKS_GET } from "../types";

export function getBooks(
    limit = 50,
    start = 0,
    order = 'asc',
    list
) {
    const request = axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/books/all_books?limit=${limit}&skip=${start}&order=${order}`)
        .then(response => {
            return list ? [...list, ...response.data] : response.data;
        });
    return {
        type: BOOKS_GET,
        payload: request
    }
}
export function editBook(book) {
    // /api/books/book
    const request = axios.patch(`${process.env.REACT_APP_BACKEND_URL}/api/books/book`, book)
        .then(response => response.data)
    return {
        type: BOOK_UPDATE,
        payload: request
    }
}
export function getBook(bookId) {
    // /api/books/book?id=vfddfgb
    const request = axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/books/book?id=${bookId}`)
        .then(response => {
            return response.data;
        }).catch((err) => {
            return false;
        });
    return {
        type: BOOK_GET,
        payload: request
    }
}
export function addBook(book) {
    const request = axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/books/book`, book)
        .then(response => response.data);
    return {
        type: BOOK_ADD,
        payload: request
    }
}
export function clearBook(book) {
    return {
        type: BOOK_CLEAR,
        payload: null
    }
}