
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
  // footer fade in
  $(window).on('scroll', function() {
    var amountScrolled = 300;
    if ( $(window).scrollTop() > amountScrolled ) {
      $('.fixnav').css('opacity', 0.8);
    } else {
      $('.fixnav').css('opacity', 1);
    }
  });

  //////////////////////////////////////////////////////////
  // API
  return {
    addDummy: addDummy,
  };
}());

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////



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
