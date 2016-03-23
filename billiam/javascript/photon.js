
// Global vars:
  // $: jquery
  // eventBus: on('event', callback); emit('event', data); listEvents();
  // imgHelper: render($target); multiRender($target); genURL(x, y); genLongEdgeURL(x, y);

// eventBus events:
  // touch.js emits a swipe event and swipe html target ('leftSwipe', <p>oeu</p>)


// photon main
var photon = (function() {

  var bulmaColors = ['is-dark', null, 'is-success', 'is-warning', 'is-danger'];
  function randColor (){
    return bulmaColors[Math.floor(Math.random()*bulmaColors.length)];
  }

  function addDummy(){
    for (var i = 1; i < 4; i++){
      $('.column'+i).addClass('is-4-desktop');
      imgHelper.multiRender($('#column'+i), 8);
    }
    for (var n = 0; n < 20; n++){
      $('#tags').append($('<span>').addClass('tag '+ randColor()).text('tag label'));
    }
  }
  addDummy();

  // überHack to extend JS Hash function
  // so columns can find the shortest one
  Object.prototype.getKeyByValue = function(value) {
    for (var prop in this) {
      if (this.hasOwnProperty(prop)) {
        if (this[prop] === value) {
          return prop;
        }
      }
    }
  };

  var columns = {
    heights: {
      // column1: 1234 (auto parsed by updateColHeights)
    },
    shortest: function(){
      var values = [];
      for (var key in this.heights) {
          values.push(this.heights[key]);
      }
      values.sort();
      return this.heights.getKeyByValue(values[0]);
    }
  };
  function updateColHeights(){
    var $cols = $('.section').find('.columns').children(); // array: each a $element
    $cols.each(function(){
      record($(this));
    });
    function record($ele){
      var id = $ele.attr('id');
      var $lastItem = $ele.children().last();
      var lastY = $lastItem.offset().top;
      var lastHeight = $lastItem.height();
      columns.heights[id] = lastY + lastHeight;
    }
  }
  function addToColumns(URL){
    updateColHeights();
    var target = columns.shortest();
    console.log(target);
    $('#'+target).append($('<img>').attr('src', URL));
  }


  // footer fade in
  $(window).on('scroll', function() {
    var amountScrolled = 300;
    if ( $(window).scrollTop() > amountScrolled ) {
      $('.fixnav').css('opacity', 0.8);
    } else {
      $('.fixnav').css('opacity', 1);
    }
  });

  // API
  return {
    addDummy: addDummy,
    updateColHeights: updateColHeights,
    columns: columns,
    addToColumns: addToColumns
  };

}());


////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

var sampleUser = {

};

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
