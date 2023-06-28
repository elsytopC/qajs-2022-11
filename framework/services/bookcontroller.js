import supertest from "supertest";
import config from "../config/bookstore.js";

const { url } = config;

export default {
    addBook: ({ userId, isbns, token }) => {
        return supertest(url)
            .post('/BookStore/v1/Books')
            .set('Authorization', `Bearer ${token}`)
            .send({
                "userId": userId,
                "collectionOfIsbns": isbns.map((isbn) => {
                    return {
                        "isbn": isbn
                    }
                })
            })
    },
    updateBook: ({ userId, bookId, isbn, token }) => {
        return supertest(url)
            .put(`/BookStore/v1/Books/${bookId}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                "userId": userId,
                "isbn": isbn
            })
    },
    deleteBook: ({ userId, isbn, token }) => {
        return supertest(url)
            .delete('/BookStore/v1/Book')
            .set('Authorization', `Bearer ${token}`)
            .send({
                "isbn": isbn,
                "userId": userId
            })
    },
    getBookInformation: (isbn) => {
        return supertest(url)
            .get(`/BookStore/v1/Book?ISBN=${isbn}`)
            .set('Accept', 'application/json')
            .send()
    }
}