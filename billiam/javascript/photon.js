
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
  // API
  return {
    addDummy: addDummy,
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

  //////////////////////////////////////////////////////////
  // all the $vars for UI manipulation
    var defaultPadding = 5;
    var scrollPoint = 300;
    var $fixnav = $('.fixnav');

    var nestOptions = {
      minWidth: 180,
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
  id: Math.floor(Math.random() * (120 - 22 + 1)) + 120,
  originalURL: imgHelper.genLongEdgeURL(2000, 2000),
  smallURL: imgHelper.genLongEdgeURL(500, 500),
  largeURL: imgHelper.genLongEdgeURL(1500, 1500),
  tags: ['people', 'water', 'city', 'portrait', 'abstract', 'gallery', 'camera', 'lecia', 'canon', 'hipster'],
  faceAnnotations: {
    joyLikelihood: "VERY_LIKELY",
    sorrowLikelihood: "VERY_UNLIKELY",
    angerLikelihood: "VERY_UNLIKELY",
    surpriseLikelihood: "VERY_UNLIKELY",
    underExposedLikelihood: "VERY_UNLIKELY",
    blurredLikelihood: "VERY_UNLIKELY",
    headwearLikelihood: "VERY_UNLIKELY"
  },
  landmarkAnnotations: {
    description: "Tour Eiffel",
    latitude: 48.858461,
    longitude: 2.294351
  },
  safeSearchAnnotation: {
    adult: "VERY_LIKELY",
    spoof: "VERY_UNLIKELY",
    medical: "VERY_UNLIKELY",
    violence: "UNLIKELY"
  }
};
