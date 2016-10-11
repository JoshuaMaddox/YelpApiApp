import React, { Component } from 'react'
import ToAPIActions from '../actions/ToAPIActions'
import ServerActions from '../actions/ServerActions'
import SearchStore  from '../stores/SearchStore'
import { browserHistory } from "react-router";
import { Link } from "react-router"
import ReactCSSTransitionGroup from 'react/lib/ReactCSSTransitionGroup'

export default class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      myFavorites: SearchStore.getFavorites()
    }
    this._onChange = this._onChange.bind(this)
    this.removeFavs = this.removeFavs.bind(this)
  }

  componentWillMount() {
    ToAPIActions.getMyFavorites()
    SearchStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    SearchStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({ 
      myFavorites: SearchStore.getFavorites()
    })
  }

  removeFavs(e){
    e.preventDefault()
    let elmItem = document.getElementById(e.target.id)
    let id = elmItem.dataset.id
    ToAPIActions.removeFav(id)
  }

  render() {

    const { myFavorites } = this.state
    let myFavs;

    if(myFavorites){
      myFavs = myFavorites.map((biz, index) => {
        const { id, name, rating, image_url, display_phone, review_count } = biz
        return ( 
          <div className="myFavoritesBox" key={id}>
            <div className="myFavoritesBiz">
              <img src={image_url} alt=""/>
              <p>{name}</p>
              <p>{display_phone}</p>
              <button className='customBtn' id={index} data-id={id} onClick={this.removeFavs}>Remove Favorite</button>
            </div>
          </div>
        )
      }) 
    } else {
      myFavs = <div></div>
    }

    return (
        <div className="row topRow">
          <div className="nextRow">
            <div className="col-sm-6">
              <Link to='/' className="customBtn">Home</Link>
            </div>
            <div className="col-sm-6">
              <Link to='/businesses' className="customBtn">Search Businesses</Link> 
            </div>
          </div>
            {myFavs}
        </div>
    )
  }
}
