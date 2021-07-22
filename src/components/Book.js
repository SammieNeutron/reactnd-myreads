import React from 'react';
// import DefaultImage from '../icons/add.svg'
// import { update } from '../BooksAPI'
const Book = props => {
    const { shelf, image, title, authors, id, onMoveBookToShelf, book } = props

    return (  
        <li key={id}>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${image})` }}></div>
                    <div className="book-shelf-changer">
                        <select
                            value={shelf}
                            onChange={e => onMoveBookToShelf(book, e.target.value)}
                        >
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{ title }</div>
                { authors && authors.map((author) => (
                    <div className="book-authors" key={author}>
                        {author}
                    </div>   
                )) }
            </div>
        </li>
    );
}
 
export default Book;