
if (!window.Photon) {
  window.Photon = {};
}
Photon.User = function(id){
  var userID = id || null; //num
  var photos = [];
  var recommendedPhotos = [];
  this.id = userID;
  this.getPhotos = function(){
    return photos;
  };
  this.setPhotos = function(photoArray){
    console.log('photos was qty:', photos.length);
    photos = photoArray;
    console.log('photos now has qty:', photos.length);
  };
  this.getRecPhotos = function(){
    return recommendedPhotos;
  };
  this.setRecPhotos = function(photoArray){
    recommendedPhotos = photoArray;
  };
};
