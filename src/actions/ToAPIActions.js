import API from '../API'

const ToAPIActions = {
  sendSearch(searchTerm){
  API.sendSearch(searchTerm) 
  },

  singledOut(id){
    API.singledOut(id)
  },

  addFav(id){
    API.addFav(id)
  },
  getMyFavorites(){
    API.getMyFavorites()
  },
  removeFav(favId){
    API.removeFav(favId)
  }
}
export default ToAPIActions