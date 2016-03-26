
// Global vars:
  // $: jquery
  // eventBus: on('event', callback); emit('event', data); listEvents();
  // imgHelper: render($target); multiRender($target); genURL(x, y); genLongEdgeURL(x, y);

// eventBus events:
  // touch.js emits a swipe event and swipe html target ('leftSwipe', <p>oeu</p>)


// photon main IIFE with API
// async should go to the jQuery wrapper below, on doc ready
var photon = (function() {

  //////////////////////////////////////////////////////////
  // fitting images to nestedJS grid, loading them to page
  var gridDict = {
    // example
    // 0.66: ['23'],
    // 0.5: ['12', '24']
  };
  (function genGrid (cols, rows){
    for (var i = 1; i < (cols+1); i++){
      for (var j = 1; j < (rows+1); j++){
        var ratio = (i / j).toString();
        if (!gridDict.hasOwnProperty(ratio)){
          gridDict[ratio] = [];
        }
        gridDict[ratio].push([i, j]);
      }
    }
    return true;
  }(5,5)); // IIFE also makes it anon.

  // returns image spec object, can also pass it to a callback
  // in case of async issues on batch img processing
  // NOTE: conventionally a promise is used instead of return
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

  //////////////////////////////////////////////////////////
  // image loading to DOM's nest container
  // gridFitter also takes an optional callback in case of async issues
  function convertImgToNest (imgObj){
    var gridSpec = photon.gridFitter(imgObj.width, imgObj.height);
    var styleStr = 'background:url(' + imgObj.url + ') no-repeat center center;' + gridSpec.css;
    var nestClass = 'size' + gridSpec.col + gridSpec.row;
    var $imgElement = $('<div>').addClass('nestBox').addClass(nestClass);
    $imgElement.attr('style', styleStr);
    return $imgElement;
  }
  function renderNestImages(imagesObj){
    var imgArr = [];
    imagesObj.photos.forEach(function(ele, i, arr){
      imgArr.push(convertImgToNest(ele));
    });
    $('#nestContainer').append(imgArr).nested('append', imgArr);
  }

  //////////////////////////////////////////////////////////
  // API
  return {
    gridFitter: gridFitter,
    renderNestImages: renderNestImages,
    convertImgToNest: convertImgToNest
  };
}());


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// UI //////////////////////////////////////////////////////////

// photon jQuery wrapper for doc ready
// no API here (yet?)
$(function(){

  //////////////////////////////////////////////////////////
  // helpers while building

  function makeBoxes() {
    var boxes = [],
    count = Math.random()*15;
    if (count < 5) count = 5;
    for (var i=0; i < count; i++ ) {
      var box = document.createElement('div');
      box.className = 'nestBox size' +  Math.ceil( Math.random()*3 ) +  Math.ceil( Math.random()*3 );
      // add box DOM node to array of new elements
      boxes.push( box );
    }
    return boxes;
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
  });
  $('#loginTestBtn').on('click', function(){
    $('#loginBox').toggleClass('is-active');
  });

  $('#loginBox').find('.modal-background').on('click', function(){
    $('#loginBox').toggleClass('is-active');
  });

  // add tags to header
  var bulmaColors = ['is-dark', null, 'is-success', 'is-warning', 'is-danger'];
  function randColor (){
    return bulmaColors[Math.floor(Math.random()*bulmaColors.length)];
  }

  (function addDummy(qty){
    for (var n = 0; n < 20; n++){
      $('#tags').append($('<span>').addClass('tag '+ randColor()).text('tag label'));
    }
  }(21));

  //////////////////////////////////////////////////////////
  // all the $vars for UI manipulation
  var defaultPadding = 5;
  var scrollPoint = 300;
  var $fixnav = $('.fixnav');
  var pLogo = document.querySelector('#wave');
  var $nContainer = $('#nestContainer');
  var $navPadding = $('.navpadding');
  var $window = $(window);

  var nestOptions = {
    minWidth: 177,
    minColumns: 1,
    gutter: 5,
    centered: true,
    resizeToFit: false, // will resize block bigger than the gap
    resizeToFitOptions: {
      resizeAny: true // will resize any block to fit the gap
    },
    animate: false,
    animationOptions: {
      speed: 20,
      duration: 100,
      queue: true,
      complete: function () {} // call back :D works w/ or w/o animate
    }
  };



  //////////////////////////////////////////////////////////
  // nestContainer
  $nContainer.nested(nestOptions);

  //////////////////////////////////////////////////////////
  // footer fade in
  $window.on('scroll', function() {
    if ( $(window).scrollTop() > scrollPoint ) {
      $fixnav.css('opacity', 0.8);
    } else {
      $fixnav.css('opacity', 1);
    }
  });

  //////////////////////////////////////////////////////////
  // navpadding
  $navPadding.css('height', $fixnav.height() + defaultPadding);

  //////////////////////////////////////////////////////////
  // logo
  // forked from http://codepen.io/winkerVSbecks/pen/EVJGVj by Varun Vachhar
  buildWave(90, 60);
  function buildWave(w, h) {
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
    pLogo.setAttribute('d', pathData);
  }

});


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
var samplePhotoObj = {
  id: 0,
  url: 'images/24.jpg',
  width: 1080,
  height: 654,
};

var samplePhotosObj = {
  photos: [
    {
      id: 0,
      url: 'images/22.jpg',
      width: 1080,
      height: 1080,
    },
    {
      url: 'images/26.jpg',
      width: 1080,
      height: 717,
    },
    {
      url: 'images/20.jpg',
      width: 1080,
      height: 1080,
    },
    {
      url: 'images/36.jpg',
      width: 720,
      height: 1080,
    },
    {
      url: 'images/39.jpg',
      width: 1080,
      height: 720,
    },
    {
      url: 'images/18.jpg',
      width: 1080,
      height: 720,
    },
    {
      url: 'images/9.jpg',
      width: 1080,
      height: 720,
    },
    {
      url: 'images/35.jpg',
      width: 1080,
      height: 1080,
    },
    {
      url: 'images/33.jpg',
      width: 950,
      height: 650,
    },
    {
      url: 'images/31.jpg',
      width: 280,
      height: 280,
    },
    {
      url: 'images/24.jpg',
      width: 1080,
      height: 654,
    },
    {
      url: 'images/2.jpg',
      width: 1080,
      height: 391,
    },
    {
      url: 'images/21.jpg',
      width: 1080,
      height: 608,
    },
    {
      url: 'images/4.jpg',
      width: 1080,
      height: 720,
    },
    {
      url: 'images/17.jpg',
      width: 1080,
      height: 720,
    },
    {
      url: 'images/12.jpg',
      width: 1080,
      height: 720,
    },
    {
      url: 'images/19.jpg',
      width: 1080,
      height: 719,
    },
    {
      url: 'images/15.jpg',
      width: 1080,
      height: 683,
    },
    {
      url: 'images/32.jpg',
      width: 1080,
      height: 721,
    },
    {
      url: 'images/28.jpg',
      width: 1080,
      height: 705,
    }
  ]
};
