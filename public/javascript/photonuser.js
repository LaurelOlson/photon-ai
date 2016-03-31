
if (!window.Photon) {
  window.Photon = {};
}
Photon.User = function(){
  var photos = [];
  var recPhotos = [];
  this.photos = photos;
  this.recPhotos = recPhotos;
};

Photon.User.prototype.setPhotos = function(photoArray){
  console.log('user photos was qty:', this.photos.length);
  this.photos = photoArray;
  console.log('user photos now has qty:', this.photos.length);
};
Photon.User.prototype.setRecPhotos = function(photoArray){
  console.log('rec photos was qty:', this.recPhotos.length);
  this.recPhotos = photoArray;
  console.log('rec photos now has qty:', this.recPhotos.length);
};
