import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './components/Shelf'
import Search from './components/Search'

class BooksApp extends React.Component {
    state = {
      /**
       * TODO: Instead of using this state variable to keep track of which page
       * we're on, use the URL in the browser's address bar. This will ensure that
       * users can use the browser's back and forward buttons to navigate between
       * pages, as well as provide a good URL they can bookmark and share.
       */
      books: [],
      shelf: ""
    }

    componentDidMount() {
      BooksAPI.getAll()
      .then((res) => {
        // console.log(res)
        this.setState({books: res})
      })
    }
    

    changeBookShelf(book, shelf) {
      BooksAPI.update(book, shelf)
      .then(() => {
        BooksAPI.getAll()
        .then((res) => {
          // console.log(res)
          this.setState({books: res})
        })
      })
    }

  render() {

    const { books } = this.state
    return (
      <div className="app">
        <Route exact path="/" render={() => 
            <Shelf books={books} onMoveBookToShelf={this.changeBookShelf} />
        } />

        <Route path="/search" books={books} render={() => 
          <Search homepageBooks={books} onMoveBookToShelf={this.changeBookShelf} />
        } />
      </div>
    )
  }
}

export default BooksApp
