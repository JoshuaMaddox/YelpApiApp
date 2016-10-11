import React, { Component } from 'react'
import SearchStore from '../stores/SearchStore'
import ToAPIActions from '../actions/ToAPIActions'
import { Link } from 'react-router'
import EasyTransition from 'react-easy-transition'

export default class Layout extends Component {
  constructor() {
    super();
    this.state = {
      testData: SearchStore.getSearchResults()
    }

    this.testFunc = this.testFunc.bind(this)
    this._onChange = this._onChange.bind(this)
  }

  componentWillMount() {
    SearchStore.startListening(this._onChange);
  }

  componentWillUnmount() {
    SearchStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({ 
      testData: SearchStore.getSearchResults() 
    })
  }

  testFunc(e){
    e.preventDefault()
    ToAPIActions.getFlashCards()
  }

  render() {
    return (
      <div className='row topRow'>
        <div className="bannerRow">
          <h1>"HOLLA" <br />IS AN API FETCHER DESIGNED TO GET YOU TO USE THIS APP INSTEAD OF YELP BUT USING YELP'S DATA.<br />PLEASE GIVE THIS APP 5 STARS ON YELP.<br />OUR YELP RATING IS IMPORTANT IN OUR GOAL OF OVERTAKING YELP!</h1>
        </div>
        <div className="nextRow">
          <div className="col-sm-6">
            <Link to='/businesses' className="customBtn">Search Businesses</Link>
          </div>
          <div className="col-sm-6">
            <Link to='/favorites' className="customBtn">View Your Favorites</Link> 
          </div>
        </div> 
        <div className='row text-align'>
          {this.props.children}
        </div>
      </div>

    )
  }
}
  