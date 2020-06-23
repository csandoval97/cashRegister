import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import Home from './pages/Home'
import Item from './pages/Item'
import Product from './pages/Product'
import Store from './pages/Store'

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      setup:false
    }
    this.saveStore()
  }

  saveStore(){
    if(!this.state.setup){
      fetch('http://localhost:3000/api/store')
      .then(response => response.json())
      .then(data => localStorage.setItem('store',JSON.stringify(data.store)) )
      this.setState({
        setup:true
      })
    }
  }

  render(){
    return(
      <Router>
        <div>
          <nav class="navbar navbar-expand-lg navbar-light bg-light d-print-none">
            {/* <a class="navbar-brand" href="#">Navbar</a> */}
            <Link to="/" class="navbar-brand">CashApp</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
              <ul class="navbar-nav mr-auto">

              </ul>
              <ul class="navbar-nav mr-right">
                <li class="nav-item">
                  <Link to="/item" class="nav-link">Item</Link>
                </li>
                <li class="nav-item">
                  <Link to="/product" class="nav-link">Product</Link>
                </li>
                <li class="nav-item">
                  <Link to="/store" class="nav-link">Store</Link>
                </li>
              </ul>
            </div>
          </nav>

          <div class="container-fluid mt-4">
            <Switch>
                <Route path="/store">
                  <Store />
                </Route>
                <Route path="/item">
                  <Item />
                </Route>
                <Route path="/product">
                  <Product />
                </Route>
                <Route path="/">
                  <Home />
                </Route>
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}

export default App;
