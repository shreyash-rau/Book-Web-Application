import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookDetails = ({ book }) => {
  const navigate = useNavigate();
  const [showAll, setShowAll] = useState(false);

  if (!book) {
    return <div className='details'>Select a book to see the details</div>;
  }

  const handleBuyNow = () => {
    navigate(`/buy/${book.id}`);
    return alert('Ready to Deliver Your Place')
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  const description = showAll ? book.volumeInfo.description : `${book.volumeInfo.description.substring(0, 300)}...`;

  return (
    <div className="book-details">
      <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
      <h2>{book.volumeInfo.title}</h2>
      <p>{book.volumeInfo.authors.join(', ')}</p>
      <p>{description}</p>
      <button onClick={toggleShowAll}>{showAll ? 'Show Less' : 'Show More'}</button>
      <button onClick={() => alert('Added to cart')}>Add to Cart</button>
      <button onClick={handleBuyNow}>Buy Now</button>
    </div>
  );
};

export default BookDetails;
