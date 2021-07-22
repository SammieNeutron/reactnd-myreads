import React from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import DefaultImage from '../icons/add.svg'

const Shelf = props => {
    
    const shelves = [
        { title: 'Currently reading', value: 'currentlyReading' },
        { title: 'Want to read', value: 'wantToRead' },
        { title: 'Read', value: 'read' },
    ];

    const { books, onMoveBookToShelf } = props
    return (  
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                {shelves.map(shelf => (
                <div className="bookshelf" key={shelf.value}>
                        <h2 className="bookshelf-title">{shelf.title}</h2>
                        <div className="bookshelf-books">
                            <ol className="books-grid">
                                {books && books.map((book) => (
                                    book.shelf === shelf.value ?
                                        <Book key={book.id} book={book} title={book.title} onMoveBookToShelf={onMoveBookToShelf} shelf={book.shelf} authors={book.authors} image={book.imageLinks.thumbnail ? book.imageLinks.thumbnail : book.imageLinks.thumbnail = `${DefaultImage}` } /> 
                                    : ""
                                ))}
                            </ol>
                        </div>
                    </div>
                ))}
            </div>

            <div className={"open-search"}>
                <Link to="/search">Add a book</Link>
            </div>
        </div>
    );
}
 
export default Shelf;