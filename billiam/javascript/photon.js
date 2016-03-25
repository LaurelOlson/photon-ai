
// Global vars:
  // $: jquery
  // eventBus: on('event', callback); emit('event', data); listEvents();
  // imgHelper: render($target); multiRender($target); genURL(x, y); genLongEdgeURL(x, y);

// eventBus events:
  // touch.js emits a swipe event and swipe html target ('leftSwipe', <p>oeu</p>)


// photon main
var photon = (function() {

  //////////////////////////////////////////////////////////
  // this section is for construction and testing
  var bulmaColors = ['is-dark', null, 'is-success', 'is-warning', 'is-danger'];
  function randColor (){
    return bulmaColors[Math.floor(Math.random()*bulmaColors.length)];
  }

  function addDummy(){
    for (var n = 0; n < 20; n++){
      $('#tags').append($('<span>').addClass('tag '+ randColor()).text('tag label'));
    }
  }


  //////////////////////////////////////////////////////////
  // this section is for construction and testing
  var testURL = "https://drscdn.500px.org/photo/145937969/m%3D1080_k%3D1_a%3D1/4bf683311a2660bc80d03cb5e30a3c0e";
  function preLoadImg(url){
    var myImgObj = new Image();
    myImgObj.src = url;
    return myImgObj;
  }

  var gridDict = {
    // example
    // 0.66: ['23'],
    // 0.5: ['12', '24']
  };
  function genGrid (cols, rows){
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
  }

  function gridFitter(width, height){
    var bestFit = {
      ratios: [],
      startErr: Infinity
    };
    var myAspRatio = width / height; // float, ex. 0.73, 1.25..
    for(var key in gridDict){
      var gridVal = gridDict[key];
      newErr = Math.abs(myAspRatio - Number(key));
      if (newErr < bestFit.startErr) {
        bestFit.ratios = gridVal;
        bestFit.startErr = newErr;
      }
    }
    var randSample = bestFit.ratios[Math.floor(Math.random()*bestFit.ratios.length)];
    return randSample; // ex. [3,2]
  }

  //////////////////////////////////////////////////////////
  // API
  return {
    addDummy: addDummy,
    preLoadImg: preLoadImg,
    genGrid: genGrid,
    gridFitter: gridFitter
  };
}());


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
// UI //////////////////////////////////////////////////////////


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

  //////////////////////////////////////////////////////////
  // all the $vars for UI manipulation
    var defaultPadding = 5;
    var scrollPoint = 300;
    var $fixnav = $('.fixnav');

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
  // footer fade in
    $(window).on('scroll', function() {
      if ( $(window).scrollTop() > scrollPoint ) {
        $fixnav.css('opacity', 0.8);
      } else {
        $fixnav.css('opacity', 1);
      }
    });

  //////////////////////////////////////////////////////////
  // navpadding
    $('.navpadding').css('height', $fixnav.height() + defaultPadding);

  //////////////////////////////////////////////////////////
  // logo
  // forked from http://codepen.io/winkerVSbecks/pen/EVJGVj by Varun Vachhar
    buildWave(90, 60);
    function buildWave(w, h) {
      var pLogo = document.querySelector('#wave');
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

  //////////////////////////////////////////////////////////
  // nestContainer
  var $nContainer = $('#nestContainer').nested(nestOptions);

});


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////


var samplePhotoObj = {
  photos: [
    {
      originalURL: 'images/22.jpg',
      width: 1080,
      height: 1080,
    },
    {
      originalURL: 'images/26.jpg',
      width: 1080,
      height: 717,
    },
    {
      originalURL: 'images/20.jpg',
      width: 1080,
      height: 1080,
    },
    {
      originalURL: 'images/36.jpg',
      width: 720,
      height: 1080,
    },
    {
      originalURL: 'images/39.jpg',
      width: 1080,
      height: 720,
    },
    {
      originalURL: 'images/18.jpg',
      width: 1080,
      height: 720,
    },
    {
      originalURL: 'images/9.jpg',
      width: 1080,
      height: 720,
    },
    {
      originalURL: 'images/35.jpg',
      width: 1080,
      height: 1080,
    },
    {
      originalURL: 'images/33.jpg',
      width: 950,
      height: 650,
    },
    {
      originalURL: 'images/31.jpg',
      width: 280,
      height: 280,
    },
    {
      originalURL: 'images/24.jpg',
      width: 1080,
      height: 654,
    },
    {
      originalURL: 'images/2.jpg',
      width: 1080,
      height: 391,
    },
    {
      originalURL: 'images/21.jpg',
      width: 1080,
      height: 608,
    },
    {
      originalURL: 'images/4.jpg',
      width: 1080,
      height: 720,
    },
    {
      originalURL: 'images/17.jpg',
      width: 1080,
      height: 720,
    },
    {
      originalURL: 'images/12.jpg',
      width: 1080,
      height: 720,
    },
    {
      originalURL: 'images/19.jpg',
      width: 1080,
      height: 719,
    },
    {
      originalURL: 'images/15.jpg',
      width: 1080,
      height: 683,
    },
    {
      originalURL: 'images/32.jpg',
      width: 1080,
      height: 721,
    },
    {
      originalURL: 'images/28.jpg',
      width: 1080,
      height: 705,
    }
  ]
};
