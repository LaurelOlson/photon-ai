
if (!window.Photon) {
  window.Photon = {};
}
Photon.View = (function(){

  //////////////////////////////////////////////////////////
  // helpers while building
  function makeBoxes() {
    var boxes = [],
    count = Math.random()*15;
    if (count < 5) count = 5;
    for (var i=0; i < count; i++ ) {
      var box = document.createElement('div');
      box.className = 'nestBox size' +  Math.ceil( Math.random()*3 ) +  Math.ceil( Math.random()*3 );
      box.setAttribute('data-large-url', 'http://placehold.it/1200x800');
      box.setAttribute('data-tags', 'tag1,tag2,tag3,tag4,tag5,tag6');
      // add box DOM node to array of new elements
      boxes.push( box );
    }
    return boxes;
  }

  function gridFitter(width, height, callback){
    var bestFit = {
      ratios: [],
      startErr: Infinity
    };
    var myAspRatio = width / height; // float, ex. 0.73, 1.25..
    for(var key in gridDict){
      var gridVal = gridDict[key];
      newErr = Math.abs(myAspRatio - Number(key)); // TODO: can add trim w/h to this
      if (newErr < bestFit.startErr) {
        bestFit.ratios = gridVal;
        bestFit.startErr = newErr;
      }
    }
    var randSample = bestFit.ratios[Math.floor(Math.random()*bestFit.ratios.length)];
    var output = {
      col: randSample[0],
      row: randSample[1],
      css: ''
    };
    if (myAspRatio > randSample[0]/randSample[1]){
      output.css = 'background-size: auto 100%;'; // width & height for CSS
    } else {
      output.css = 'background-size: 100% auto;';
    } // doesn't need one for 1:1, because no trim, ergo agnostic
    if (callback) {callback(output);}
    return output;
  }

  function convertImgToNest (imgObj){
    var gridSpec = gridFitter(imgObj.width, imgObj.height);
    var styleStr = 'background:url(' + imgObj.url + ') no-repeat center center;' + gridSpec.css;
    var tagStr = imgObj.tags;
    var nestClass = 'size' + gridSpec.col + gridSpec.row;
    var $imgElement = $('<div>').addClass('nestBox').addClass(nestClass);
    $imgElement.attr('style', styleStr);
    $imgElement.attr('data-tags', tagStr);
    $imgElement.attr('data-large-url', imgObj.url);
    return $imgElement;
  }

  function renderNestImages(imagesObj, direction){
    var imgArr = [];
    imagesObj.photos.forEach(function(ele, i, arr){
      imgArr.push(convertImgToNest(ele));
    });
    if (direction == 'prepend') {
      $('#nestContainer').prepend(imgArr).nested('prepend', imgArr);
    } else {
      $('#nestContainer').append(imgArr).nested('append', imgArr);
    }
  }

  function renderTagsTo(dataStr, $target){
    var dataArray = dataStr.split(',');
    dataArray.forEach(function(ele, i, arr){
      $target.append($('<span>').addClass('tag').text(ele));
    });
  }

  $('#nestPrepend').click(function(){
    var boxes = makeBoxes();
    $nContainer.prepend(boxes).nested('prepend',boxes);
  });
  $('#nestAppend').click(function(){
    var boxes = makeBoxes();
    $nContainer.append(boxes).nested('append',boxes);
  });
  $('#nestNuke').click(function(){
    $nContainer.children().remove();
    $nContainer.nested('refresh', nestOptions);
  });
  $('#testPrepend').on('click', function(){
    renderNestImages(samplePhotosObj, 'prepend');
  });
  $('#testAppend').on('click', function(){
    renderNestImages(samplePhotosObj);
  });

  //////////////////////////////////////////////////////////
  // all the vars for UI manipulation
  var defaultPadding = 5,
  scrollPoint = 300,
  $fixnav = $('.fixnav'),
  $pLogo = $('#wave'),
  $nContainer = $('#nestContainer'),
  $navPadding = $('.navpadding'),
  $window = $(window),
  $loginBox = $('#loginBox'),
  $loginBtn = $('#loginBtn'),
  $popupBox = $('#popupBox'),
  $modalBackgrounds = $('.modal-background'),
  $mainContent = $('main'),
  $menuBar = $('menu'),
  $menuToggle = $('.pMenuToggle'),
  $menuToggleBtn = $('#menuToggleBtn');
  var nestOptions = {
    minWidth: calcNestColWidth(),
    minColumns: 1,
    gutter: 5,
    centered: true,
    resizeToFit: false, // NOTE: do NOT make true, nested lib has a bug
    resizeToFitOptions: {
      resizeAny: true
    },
    animate: false,
    animationOptions: {
      speed: 20,
      duration: 100,
      queue: true,
      complete: function(){} // call back :D works w/ or w/o animate
    }
  };
  function calcNestColWidth(){
    var windowWidth = $window.width();
    if (windowWidth > 960) {
      return windowWidth / 10;
    } else if (windowWidth < 768) {
      return windowWidth / 4;
    } else {
      return windowWidth / 9;
    }
  }

  //////////////////////////////////////////////////////////
  // toggle entire page menu slide
  var menuUnhide = function(){
    if ($loginBox.hasClass('is-active') || $popupBox.hasClass('is-active')){
      return;
    }
    $mainContent.toggleClass('is-inactive');
    $menuBar.toggleClass('is-active');
    $menuToggle.toggleClass('is-active');
  };
  var menuHide = function(){
    $mainContent.removeClass('is-inactive');
    $menuBar.removeClass('is-active');
    $menuToggle.removeClass('is-active');
  };

  $menuToggleBtn.on('click', menuUnhide);
  $menuToggle.on('click', menuHide);
  Photon.eventBus.on('rightSwipe', menuUnhide);
  Photon.eventBus.on('leftSwipe', menuHide);



  //////////////////////////////////////////////////////////
  // NOTE: can be deprecated as nav no longer has dynamic height b/c tags
  // navpadding
  $navPadding.css('height', $fixnav.height() + defaultPadding);

  //////////////////////////////////////////////////////////
  // nestContainer
  $nContainer.nested(nestOptions);

  //////////////////////////////////////////////////////////
  // login pop up
  $modalBackgrounds.on('click', function(){ // reusable for all modal-backgrounds
    $('.modal').removeClass('is-active');
  });
  $loginBtn.on('click', function(){
    $loginBox.addClass('is-active');
  });

  //////////////////////////////////////////////////////////
  // nestBox pictures Modal
  $nContainer.on('click', '.nestBox', function(){
    var url = $(this).data('large-url');
    var tags = $(this).data('tags');
    var $tagField = $popupBox.find('div.image-custom');
    $tagField.children().remove();
    renderTagsTo(tags, $tagField);
    $popupBox.find('img').attr('src', url);
    $popupBox.addClass('is-active');
  });
  $popupBox.on('click', function(){
    $(this).removeClass('is-active');
  });

  //////////////////////////////////////////////////////////
  // logo
  // forked from http://codepen.io/winkerVSbecks/pen/EVJGVj by Varun Vachhar
  document.addEventListener("DOMContentLoaded", function(event) {
    (function buildWave(w, h) {
      var logoSmoothness = 0.5;
      var a = h / 4;
      var y = h / 2;
      var pathData = [
        'M', w * 0, y + a / 2,
        'c',
        a * logoSmoothness, 0,
        -(1 - a) * logoSmoothness, -a,
        a, -a,
        's',
        -(1 - a) * logoSmoothness, a,
        a, a,
        's',
        -(1 - a) * logoSmoothness, -a,
        a, -a,
        's',
        -(1 - a) * logoSmoothness, a,
        a, a,
        's',
        -(1 - a) * logoSmoothness, -a,
        a, -a,
        's',
        -(1 - a) * logoSmoothness, a,
        a, a,
        's',
        -(1 - a) * logoSmoothness, -a,
        a, -a,
        's',
        -(1 - a) * logoSmoothness, a,
        a, a,
        's',
        -(1 - a) * logoSmoothness, -a,
        a, -a,
        's',
        -(1 - a) * logoSmoothness, a,
        a, a,
        's',
        -(1 - a) * logoSmoothness, -a,
        a, -a,
        's',
        -(1 - a) * logoSmoothness, a,
        a, a,
        's',
        -(1 - a) * logoSmoothness, -a,
        a, -a,
        's',
        -(1 - a) * logoSmoothness, a,
        a, a,
        's',
        -(1 - a) * logoSmoothness, -a,
        a, -a
      ].join(' ');
      $pLogo.attr('d', pathData);
    }(90, 60));
  });

  // API
  return {
    testing: 'ja you can has API'
  };

}());
