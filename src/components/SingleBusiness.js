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
      singleBusiness: SearchStore.getSingleBusiness()
    }
    this._onChange = this._onChange.bind(this)
    this.addToFavs = this.addToFavs.bind(this)
  }

  componentWillMount() {
    SearchStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    SearchStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({ 
      singleBusiness: SearchStore.getSingleBusiness() 
    })
  }

  addToFavs(e){
    e.preventDefault()
    let elmItem = e.target.id
    ToAPIActions.addFav(elmItem)
  }

  render() {
    console.log("I've mounted", this.state.singleBusiness)
    const { singleBusiness } = this.state
    let singleBizShow;
   
    if(singleBusiness){
      const { display_phone, id, image_url, name, rating, rating_img_url, review_count, snippet_image_url, snippet_text, url} = singleBusiness
      singleBizShow = (
          <div className="searchResultsBox">
            <div className="searchResultsBiz" key={id}>
              <p>{name}</p>
              <img src={image_url} alt=""/>
              <p>{rating}</p>
              <img src={rating_img_url} alt=""/>
              <p>{review_count}</p>
              <p>{display_phone}</p>
              <img src={snippet_image_url} alt=""/>
              <p>{snippet_text}</p>
              <p>{url}</p>
              <button className='searchBtn' id={id} ref='favorite' onClick={this.addToFavs}>Favorite Me</button>
            </div>
          </div>
        )
    } else {
      singleBizShow = <div></div>
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
        <h1>I'm a single business</h1>
        {singleBizShow}
      </div>
    )
  }
}
