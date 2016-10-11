import { get, put, post } from 'axios'
import axios from 'axios'
import ServerActions from './actions/ServerActions'
import { browserHistory } from 'react-router'

const API = {
   sendSearch(searchTerm) {
    get(`http://localhost:8000/businesses?term=${searchTerm.term}&location=${searchTerm.location}`)
      .then(res => {
        let { data } = res
        let businesses = data.businesses
        ServerActions.receiveBusinesses(businesses)
      })
      .catch(console.error)
  },

  singledOut(id) { 
    get(`http://localhost:8000/businesses/${id}`)
      .then(res => {
        let { data } = res
        let business = data
        ServerActions.receiveBusiness(business)
        browserHistory.push(`/businesses/${id}`)
      })
      .catch(console.error)
  },

  addFav(id) { 
    put(`http://localhost:8000/businesses/${id}`)
      .then(res => {
        let { data } = res
        ServerActions.confirmFav(data)
      })
      .catch(console.error)
  },

  getMyFavorites() {
    get(`http://localhost:8000/businesses/favorites`)
      .then(res => {
        let { data } = res
        let favs = data
        ServerActions.receiveFavs(favs)
      })
      .catch(console.error)
  },

  removeFav(favId) {
    axios.delete(`http://localhost:8000/businesses/favorites/${favId}`)
      .then(res => {
        let data = res
        let favs = data.data        
        ServerActions.receiveFavs(favs)
      })
      .catch(console.error)
  }
}

export default API