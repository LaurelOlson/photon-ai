
if (!window.Photon) {
  window.Photon = {};
}
Photon.User = function(userObj){
  var userID = userObj.id; //num
  var userName = userObj.name;
  var photos = userObj.photos; //Array
  var recommendedPhotos = userObj.recommended;
  this.getPhotos = function(){
    return photos;
  };
  this.getRecPhotos = function(){
    return recommendedPhotos;
  };
};
