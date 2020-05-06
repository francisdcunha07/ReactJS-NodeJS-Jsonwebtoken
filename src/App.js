import React from 'react';

import './App.css';
import BookContextProvider from './context/BookContext';
import NavBar from './NavBar';
import Books from './Books';
import AddBook from './AddBook';

function App() {
  return (
    <div className="App">
      <BookContextProvider>
        <NavBar />
        <Books />
        <AddBook />
      </BookContextProvider>
    </div>
  );
}

export default App;
