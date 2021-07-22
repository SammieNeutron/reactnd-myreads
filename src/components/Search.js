import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import { search } from '../BooksAPI'
import Book from './Book'
import DefaultImage from '../icons/add.svg'

class Shelf extends Component {
    state = { 
        query: "",
        searchResult: []
    }

    handleSearch = query => {
        this.setState({query: query})
        if (query.length > 0) {
            search(query)
            .then((res) => {
                if(typeof res !== undefined && res.length > 0) {
                    this.setState(() => ({
                        searchResult: res
                    }))
                }
            })
            .catch(this.setState({ searchResult: [] }))
        }
        this.setState({ searchResult: [] })  
    }

    clearQuery = () => {
        this.updateQuery("")
    }

    render() { 

        const { homepageBooks, onMoveBookToShelf } = this.props
        const { query, searchResult } = this.state

        return (  
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input 
                            type="text" 
                            placeholder="Search by title or author"
                            value={query}
                            onChange={e => this.handleSearch(e.target.value)}
                        />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {searchResult && searchResult.map((currentBook) => {
                            let bookOnShelf = homepageBooks.find(
                                (bk) => bk.id === currentBook.id
                            );

                            bookOnShelf ? currentBook.shelf = bookOnShelf.shelf : currentBook.shelf = "none"
                            let unknownImage;
                            if (!(currentBook.hasOwnProperty('imageLinks'))) {
                                unknownImage = `${DefaultImage}`;
                            }
                            // currentBook.imageLinks.thumbnail = unknownImage; 
                            return (
                                <Book key={currentBook.id} book={currentBook} title={currentBook.title} onMoveBookToShelf={onMoveBookToShelf} shelf={currentBook.shelf} authors={currentBook.authors} image={currentBook.imageLinks ? currentBook.imageLinks.thumbnail : unknownImage} /> 
                            )
                        })}
                    </ol>
                </div>
            </div>
        );
    }
}
 
export default Shelf;