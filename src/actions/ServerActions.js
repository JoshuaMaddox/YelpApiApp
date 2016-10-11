import AppDispatcher from '../AppDispatcher'

const ServerActions = {
  receiveBusinesses(businesses){
    AppDispatcher.dispatch({
      type: 'BUSINESSES_RECEIVED',
      payload: { businesses }
    }) 
  },

  receiveBusiness(business){
     AppDispatcher.dispatch({
      type: 'BUSINESS_RECEIVED',
      payload: { business }
    })
  },

  confirmFav(confirmation){
     AppDispatcher.dispatch({
      type: 'FAV_CONFIRMED',
      payload: { confirmation }
    })
  },

  receiveFavs(favs){
    AppDispatcher.dispatch({
      type: 'FAVS_RECEIVED',
      payload: { favs }
    })
  }
}
export default ServerActions


