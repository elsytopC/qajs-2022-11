import { Severity, Status } from "jest-allure/dist/Reporter.js";
import "core-js/stable";
import "regenerator-runtime/runtime";
import config from '../framework/config/bookstore.js'
import bookEntity from '../framework/services/bookcontroller.js'
import userEntity from '../framework/services/usercontroller.js'

describe('Working condition of books API for user', () => {

    let token;
    beforeEach(async () => {
        token = await userEntity.getAuthToken({
            userName: config.credentials.userName,
            password: config.credentials.password
        })
    })

    it('Add book to user list', async function () {

       const isbn = '9781593277574'
       const addBookResponse = await bookEntity.addBook({
           userId: config.userID,
           token: token,
           isbns: [isbn]

       })

        expect(addBookResponse.body).toEqual({
            "books": [
                {
                    "isbn": isbn
                }
            ]
        })
        expect(addBookResponse.status).toBe(201)

    })

    it('Updating book for the user', async function () {

        const isbn = '9781593275846'
        const bookNumber = '9781593277574'
        const updateBookResponse = await bookEntity.updateBook({
            userId: config.userID,
            token: token,
            isbn: isbn,
            bookId: bookNumber
        })

        expect(updateBookResponse.status).toBe(200)
    })

    it('Deleting book for the user', async function () {

        const isbn = '9781593275846'
        const deleteBookResponse = await bookEntity.deleteBook({
            userId: config.userID,
            token: token,
            isbn: isbn
        })

        expect(deleteBookResponse.status).toBe(204)
    });

    it('Get information about book', async function () {

        const isbn = '9781593277574'
        const getBookInformation = await bookEntity.getBookInformation(isbn)


        expect(getBookInformation.status).toBe(200)
        expect(getBookInformation.body).toEqual({
            "isbn": "9781593277574",
            "title": "Understanding ECMAScript 6",
            "subTitle": "The Definitive Guide for JavaScript Developers",
            "author": "Nicholas C. Zakas",
            "publish_date": "2016-09-03T00:00:00.000Z",
            "publisher": "No Starch Press",
            "pages": 352,
            "description": "ECMAScript 6 represents the biggest update to the core of JavaScript in the history of the language. In Understanding ECMAScript 6, expert developer Nicholas C. Zakas provides a complete guide to the object types, syntax, and other exciting changes that E",
            "website": "https://leanpub.com/understandinges6/read"
        })
    });
})

// describe('Getting information about a book', () => {
//     it('GET /BookStore/v1/Book', async function () {
//         let getBookInfo = await supertest(url)
//             .get('/BookStore/v1/Book?ISBN=9781491904244')
//             .set('Accept', 'application/json')
//             .send()
//
//         expect(getBookInfo.status).toBe(200)
//     });
// })
