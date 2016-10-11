import React, { Component } from 'react'
import ToAPIActions from '../actions/ToAPIActions'
import ServerActions from '../actions/ServerActions'
import SearchStore  from '../stores/SearchStore'
import { browserHistory } from "react-router";
import { Link } from "react-router"

export default class SearchForm extends Component {
  constructor() {
    super();
    this.state = {
      searchResults: SearchStore.getSearchResults(),
      favConfirm: SearchStore.getFavConfirm()

    }
    this._onChange = this._onChange.bind(this)
    this.sendSearch = this.sendSearch.bind(this)
    this.addToFavs = this.addToFavs.bind(this)
    this.singleOut = this.singleOut.bind(this)
  }

  componentWillMount() {
    SearchStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    SearchStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({ 
      searchResults: SearchStore.getSearchResults(),
      favConfirm: SearchStore.getFavConfirm() 
    })
  }

  sendSearch(e){
    e.preventDefault()
    const { term, location } = this.refs
    let searchObj = {
      term: term.value,
      location: location.value 
    }
    ToAPIActions.sendSearch(searchObj)
  }

  singleOut(e){
    e.preventDefault()
    let elmItem = document.getElementById(e.target.id)
    let id = elmItem.dataset.id
    ToAPIActions.singledOut(id)
  }

  addToFavs(e){
    e.preventDefault()
    let elmItem = document.getElementById(e.target.id)
    let id = elmItem.dataset.id
    ToAPIActions.addFav(id)
  }

  render() {

    const { searchResults } = this.state
    let searchResponse;

    if(searchResults){
      searchResponse = searchResults.map((biz, index) => {
        const { id, name, rating, image_url, display_phone, review_count } = biz
        return ( 
          <div className="col-md-6 searchResultsBiz text-center" key={id}>
            <img src={image_url} alt=""/>
            <p>{name}</p>
            <p>{display_phone}</p>
            <p>{rating}</p>
            <p>{review_count}</p>
            <button className='searchBtn' id={index} data-id={id} onClick={this.addToFavs}>Add Me to Favorites</button>
            <button className='searchBtn' id={id} data-id={id} onClick={this.singleOut}>Single Me Out</button>
          </div>
        )
      }) 
    } else {
      searchResponse = <div></div>
    }


    return (
        <div className="row topRow">
          <div className="nextRow">
            <div className="col-sm-6">
              <Link to='/' className="customBtn">Home</Link>
            </div>
            <div className="col-sm-6">
              <Link to='/favorites' className="customBtn">View Your Favorites</Link> 
            </div>
          </div>
          <div className="col-sm-8 col-sm-offset-2 searchForm">
            <h1>HOLLA UP A BIZNESS</h1>
              <form onSubmit={this.sendSearch}>
                <div className="form-group">
                  <input type="text" className="form-control" ref='term' id="term" placeholder="Enter a search term" required/>
                </div>
                <div className="form-group">
                  <input type="text" className="form-control" ref='location' id="location" placeholder="Enter a location" required/>
                </div>
                <button type="submit" className="customBtn">HOLLA</button>
              </form>
          </div>
          <div className="row text-center">
            {searchResponse}
          </div>
        </div>
    )
  }
}
