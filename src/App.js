import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './components/Shelf'
import Search from './components/Search'

class BooksApp extends React.Component {
    state = {
      books: [],
      shelf: ""
    }

    componentDidMount() {
      BooksAPI.getAll()
      .then((res) => {
        console.log(res)
        this.setState({books: res})
      })
    }
    

    changeBookShelf(book, shelf) {
      BooksAPI.update(book, shelf)
      .then(() =>  {
        // console.log(res)
        this.setState((currState) => ({
          books: currState.books
        }))
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
