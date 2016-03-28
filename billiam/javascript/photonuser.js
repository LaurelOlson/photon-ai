
if (!window.Photon) {
  window.Photon = {};
}
Photon.User = function(id){
  var userID = id || null; //num
  var photos = [];
  var recommendedPhotos = [];
  this.getPhotos = function(){
    return photos;
  };
  this.setPhotos = function(photoArray){
    photos = photoArray;
  };
  this.getRecPhotos = function(){
    return recommendedPhotos;
  };
  this.setRecPhotos = function(photoArray){
    recommendedPhotos = photoArray;
  };
};
