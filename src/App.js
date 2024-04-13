

import React, { useState, useEffect } from 'react';
import BookList from "./BookList.jsx"
import BookDetails from './BookDetails.jsx';
import "../src/App.css";

const App = () => {
  const [selectedBook, setSelectedBook] = useState(null);
  const [books, setBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [filter, setFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [sort, setSort] = useState("asc");
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://d1krvzwx5oquy1.cloudfront.net/books.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        setAllBooks(data);
        setBooks(data);
      })
      .catch(error => {
        console.error('There was an error!', error);
        setError(error);
      });
  }, []);

  const handleSort = () => {
    const filteredBooks = allBooks.filter(book => {
      const averageRating = book.volumeInfo.averageRating >= Number(filter);
      const retailPrice = book.saleInfo.retailPrice ? book.saleInfo.retailPrice.amount <= Number(priceFilter) : true;
      return averageRating && retailPrice;
    });

    const sortedBooks = [...filteredBooks].sort((a, b) => {
      const priceA = a.saleInfo.retailPrice ? a.saleInfo.retailPrice.amount : Infinity;
      const priceB = b.saleInfo.retailPrice ? b.saleInfo.retailPrice.amount : Infinity;
      return sort === "asc" ? priceA - priceB : priceB - priceA;
    });

    setBooks(sortedBooks);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
    
      <div className='filter'>
        <label>Minimum Rating: </label>
        <input type="number" min="0" max="5" value={filter} onChange={e => setFilter(e.target.value)} />
        <label>Maximum Price: </label>
        <input type="number" min="0" value={priceFilter} onChange={e => setPriceFilter(e.target.value)} />
        <label>Sort by Price: </label>
        <select value={sort} onChange={e => setSort(e.target.value)}>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
        <button onClick={handleSort}>Sort</button>
      </div>
      <div className="app">
        <BookList onBookSelect={setSelectedBook} books={books} />
        <BookDetails book={selectedBook} />
      </div>
    </>
  );
};

export default App;

