
if (!window.Photon) {
  window.Photon = {};
}

Photon.Photo = function(imgObj){
  // width x height, then add img URL w/o http(s), ex: 'images.unsplash.com/photo-1431051047106-f1e17d81042f'
  var monicasResizer = 'http://104.131.96.71/unsafe/fit-in/' + '800x8000/';

  var imgID = imgObj.id;
  var imgURL = imgObj.url;
  var imgSmallURL = imgObj.smallurl || null;
  var imgTags = imgObj.tags;
  var imgWidth = imgObj.width || null;
  var imgHeight = imgObj.height || null;
  // below is exporting of private vars
  this.id = imgID;
  this.url = imgURL;
  this.smallURL = (function(){
    if(imgSmallURL){
      return imgSmallURL;
    }
    return monicasResizer + imgURL.replace(/^http[s]*:[/]*/g, '');
  }());
  this.tags = imgTags;
  this.height = imgHeight;
  this.width = imgWidth;
};

Photon.Photo.prototype.findWidthHeight = function(){
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
    });
  }
};
