import React from 'react'
import { render } from 'react-dom'
import { Router, Route, browserHistory } from 'react-router'
import Layout from './components/Layout'
import SearchForm from './components/SearchForm'
import SingleBusiness from './components/SingleBusiness'
import Favorites from './components/Favorites'




render(
  <div className="container text-center">
    <Router history = {browserHistory}>
      <Route path = '/' component = {Layout}></Route>
      <Route path = '/businesses' component = {SearchForm}/> 
      <Route path = '/businesses/:id' component = {SingleBusiness} />
      <Route path = '/favorites' component = { Favorites } />
    </Router>
  </div>,
  document.getElementById('root')  
)