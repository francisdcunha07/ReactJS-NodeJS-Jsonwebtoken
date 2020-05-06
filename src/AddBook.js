import React, { useState, useContext } from 'react';
import { BookContext } from './context/BookContext';
import axios from 'axios'
import uuid from 'uuid/v1'

const AddBook = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthorName] = useState('');
    const { dispatch } = useContext(BookContext);
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(author);
      const book = {title, author, id:uuid()};
      console.log(book)
      axios.post('/api/addbook',  book).then( res => {
        dispatch({ type: 'ADD_BOOK',  book });
        setTitle('');
        setAuthorName('');
       console.log(res.data);
      })
      
    }
    return (
        <form onSubmit={ handleSubmit}>
            <input type="text" placeholder="Book Title" value={title} required onChange={e => setTitle(e.target.value)} />
            <input type="text" placeholder="Author Name" value={author} required onChange={e => setAuthorName(e.target.value)} />
            <input type="submit" value="Add Book" /> 
        </form>
    );
}

export default AddBook;