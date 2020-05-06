import React, { useState, createContext, useReducer, useEffect } from 'react';
import { BookReducer } from '../Reducers/BookReducer';
import axios from 'axios'



export const BookContext = createContext();

const BookContextProvider = (props) => {

    const [initialState, setInitialState] = useState([]);
    const [books, dispatch] = useReducer(BookReducer, initialState);

    useEffect(() => {
        axios.get('api/booklist').then( res => {
            console.log(res.data);
            setInitialState([...res.data]);
            dispatch({ type: 'UPDATE_STATE', payload:  res.data});
        })
    }, [])
    
    

    // const addBook = (title, author) => {
    //     setBooks([...books, { title, author, id: uuid() }])
    // }  { title: 'name of the wind', author: 'Patrick rothfus', id: 1 },
    // { title: 'Alibaba', author: 'Duncan Clarke', id: 2 }
    //]

    // const removeBook = (id) => {
    //     setBooks(books.filter(book => book.id !== id ))
    // }
    return (
        <BookContext.Provider value={{ books, dispatch }} >
            {props.children}
        </BookContext.Provider>
    );
}

export default BookContextProvider;