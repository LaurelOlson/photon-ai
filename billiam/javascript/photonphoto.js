
if (!window.Photon) {
  window.Photon = {};
}
Photon.Photo = function(imgObj){
  this.id = imgObj.id;
  this.smallURL = null;
  this.url = imgObj.url;
  this.tags = imgObj.tags;
  this.height = imgObj.height || null;
  this.width = imgObj.width || null;
  this.people = [];
  this.landmark = [];
  this.safeSearch = {};
};
Photon.Photo.prototype.resize = function(){
  if (!this.smallURL) {
    this.smallURL = monicasResizer + this.url.replace(/^http[s]*:[/]*/g, '');
  }
};
Photon.Photo.prototype.findWidthHeight = function(callback){
  var photoObj = this;
  if (!this.width || !this.height) {
    var $tempImg = $('<img>').attr({
      src: this.url,
      id: 'photonImgFindSize'
    }).css({
      position: 'fixed',
      top: 0,
      left: 0,
      visibility: 'hidden',
      'z-index': -100
    });
    $('body').append($tempImg);
    $('#photonImgFindSize').on('load', function(){
      var $zeImg = $(this);
      photoObj.width = $zeImg.width();
      photoObj.height = $zeImg.height();
      console.log('img loaded');
      $zeImg.remove();
      if (callback){callback();}
    });
  }
};
