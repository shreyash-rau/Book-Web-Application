import React from 'react';

const BookDetails = ({ book }) => {
  if (!book) {
    return <div>Select a book to see the details</div>;
  }

  return (
    <div className="book-details">
      <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
      <h2>{book.volumeInfo.title}</h2>
      <p>{book.volumeInfo.authors.join(', ')}</p>
      <p>{book.volumeInfo.description}</p>
    </div>
  );
};

export default BookDetails;
