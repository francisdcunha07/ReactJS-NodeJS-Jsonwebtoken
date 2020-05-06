import React, { useContext } from 'react';
import { BookContext } from './context/BookContext';
import axios from 'axios'

const BookDetails = ({ book }) => {
    const { dispatch } = useContext(BookContext)

  const  handleRemoveBook =(id) => {
        axios.delete("/api/delete/book/"+id).then(response => {
            console.log(response);
            dispatch({ type:'REMOVE_BOOK', id});
          });
    }

    return (
        <li onClick={() => handleRemoveBook(book.id) }>
            <div className="title">{book.title}</div>
            <div className="author">{book.author}</div>
        </li>
    );
}

export default BookDetails;