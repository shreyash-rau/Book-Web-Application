import React, { useState, useEffect } from 'react';
import BookList from "./BookList.jsx"
import BookDetails from './BookDetails.jsx';
import "../src/App.css";

const App = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://d1krvzwx5oquy1.cloudfront.net/books.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setBooks(data))
      .catch(error => {
        console.error('There was an error!', error);
        setError(error);
      });
  }, []);

  const filteredBooks = books.filter(book => book.volumeInfo.averageRating >= Number(filter));

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>

      
        <div className='filter'>
          
          <label>Minimum Rating: </label>
          <input type="number" min="0" max="5" value={filter} onChange={e => setFilter(e.target.value)} />
        </div>
        <div className="app">
        <BookList onBookSelect={setSelectedBook} books={filteredBooks} />
        <BookDetails book={selectedBook} />
      </div>
    </>
  );
};

export default App;
