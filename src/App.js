import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Shelf from './components/Shelf'
import Search from './components/Search'

import { ToastContainer, toast } from 'react-toastify';

class BooksApp extends React.Component {
    state = {
      books: [],
      shelf: ""
    }

    componentDidMount() {
      BooksAPI.getAll()
      .then((data) => {
        console.log(data)
        this.setState({books: data})
      })
    }
    

    changeBookShelf(book, shelf) {
      BooksAPI.update(book, shelf)
      .then((data) =>  {
        console.log(data)
        this.setState((currState) => ({
          books: currState.data
        }))
      }).catch(() => {
        toast.success(`${book.title} moved to ${shelf} successfully!`, {
          position: toast.POSITION.TOP_RIGHT
      });
        // alert()
        setTimeout(() => {
          window.location.reload();
      }, 3000);
      })
    }

  render() {

    const { books } = this.state
    return (
      <div className="app">
        <ToastContainer />
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
