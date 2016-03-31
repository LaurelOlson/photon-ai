
if (!window.Photon) {
  window.Photon = {};
}

Photon.Photo = function(imgObj){
  // width x height, then add img URL w/o http(s), ex: 'images.unsplash.com/photo-1431051047106-f1e17d81042f'
  var monicasResizer = 'http://104.131.96.71/unsafe/fit-in/' + '800x4000/';
  var imgID = imgObj.id;
  var imgURL = imgObj.url;
  var imgSmallURL = imgObj.smallurl || null;
  var imgTags = null;
  var imgLandmarks = null;
  var imgEmotions = null;
  // var imgSafesearch = null;
  var imgWidth = imgObj.width || null;
  var imgHeight = imgObj.height || null;
  var imgType = imgObj.type;

  this.id = imgID;
  this.url = imgURL;
  this.smallURL = (function(){
    if(imgSmallURL){
      return imgSmallURL;
    }
    return monicasResizer + imgURL.replace(/^http[s]*:[/]*/g, '');
  }());
  this.height = imgHeight;
  this.width = imgWidth;

  (function parseTags(tagsArr){
    var allTags = [];
    var allLandmarks = [];
    var allEmotions = [];
    tagsArr.forEach(function(ele, i, arr){
      switch(ele.type){
        case 'label':
          allTags.push(ele.name);
          break;
        case 'landmark':
          allLandmarks.push(ele.name);
          break;
        case 'emotion':
          allEmotions.push(ele.name);
          break;
      }
    });
    imgTags = allTags;
    imgLandmarks = allLandmarks;
    imgEmotions = allEmotions;
  }(imgObj.tags));

  this.type = imgType;
  this.tags = imgTags;
  this.landmarks = imgLandmarks;
  this.emotions = imgEmotions;
};
