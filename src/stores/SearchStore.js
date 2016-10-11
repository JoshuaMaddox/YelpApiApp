import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'
import { browserHistory } from 'react-router'

let _searchResults;
let _singleBusiness;
let _confirmFav;
let _allFavs;

class SearchStore extends EventEmitter {
  constructor(){
    super()

    AppDispatcher.register(action => {
      switch(action.type) {
        case 'BUSINESSES_RECEIVED':
          _searchResults = action.payload.businesses
          this.emit('CHANGE')
          break
        case 'BUSINESS_RECEIVED':
          _singleBusiness = action.payload.business
          this.emit('CHANGE')
          break
        case 'FAV_CONFIRMED':
          _confirmFav = action.payload.confirmation
          this.emit('CHANGE')
          break
        case 'FAVS_RECEIVED':
          _allFavs = action.payload.favs
          this.emit('CHANGE')
          break
      }
    })
  }

  startListening(cb){
    this.on('CHANGE', cb)
  }

  stopListening(cb){
    this.removeListener('CHANGE', cb)
  }

  getSearchResults(){
    return _searchResults
  }

  getSingleBusiness(){
    return _singleBusiness
  }

  getFavConfirm(){
    return _confirmFav
  }

  getFavorites(){
    return _allFavs 
  }

}

export default new SearchStore