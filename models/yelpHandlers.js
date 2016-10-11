const fs = require('fs'),
      path = require('path'),
      uuid = require('uuid'),
      Yelp = require('yelp')
      bizDataBase = path.join(__dirname, '../data/businesses.json')
      // testDataBase = path.join(__dirname, '../data/test.json')


let yelp = new Yelp({
  consumer_key: 'n431m1PYBjOXlHfh5heTCw',
  consumer_secret: 'imKxTLBkkxHVHf8N3RFEoOsq7BM',
  token: '7-p-JAXp2kaBw9AlBrNN8vKGu5qq92Hj',
  token_secret: 'rOIeC_Hj4JPKJ16yfs4S-3OIJJI',
});

//Write to the businesses database
exports.write = function(newData, cb) {
  let json = JSON.stringify(newData)
  fs.writeFile(bizDataBase, json, cb)
}

//Search For Businesses
exports.searchYelp = function(searchTerms, cb) {
  yelp.search(searchTerms)
    .then((data) => {
      cb(null, data) 
    })
    .catch((err) => {
      cb(err)
    })
}

//Search For Businesses by ID
exports.singleOut = function(searchId, cb) {
  yelp.business(searchId)
    .then((data) => {
      cb(null, data) 
    })
    .catch((err) => {
      cb(err)
    })
}

//add to favs DELETE TO HERE
exports.putToFavs = function(searchId, cb) {
  exports.getAllFavs((err, favs) => {
    let newFavs = []
      yelp.business(searchId)
        .then((data) => {
          newFavs = favs.filter((fav) => {
            if(searchId !== fav.id) {
              return fav
            } 
          })
          newFavs.push(data)
          exports.write(newFavs)
          cb(null, data) 
        })
        .catch((err) => {
          cb(err)
        })
      })
}

//Get all favs
exports.getAllFavs = function(cb){
  fs.readFile(bizDataBase, (err, buffer) => {
    if(err) return cb(err)
      try{
        var favs = JSON.parse(buffer)
      } catch(e) {
        var favs = []
      }
      cb(null, favs)
  })
}

//delete a fav
exports.deleteFavs = function(searchId, cb) {
  exports.getAllFavs((err, favs) => {
    let newFavs = []
    newFavs = favs.filter((fav) => {
      if(searchId !== fav.id) {
        return fav
      } 
    })
    exports.write(newFavs)
    cb(null, newFavs) 
  })
}



