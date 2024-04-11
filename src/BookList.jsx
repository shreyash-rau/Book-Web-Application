import React from 'react';

const BookList = ({ books, onBookSelect }) => {
  return (
    <div className="book-list">
      {books.map(book => (
        <div key={book.id} onClick={() => onBookSelect(book)}>
          <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
          <h2>{book.volumeInfo.title}</h2>
          <p>{book.volumeInfo.authors.join(', ')}</p>
        </div>
      ))}
    </div>
  );
};

export default BookList;
