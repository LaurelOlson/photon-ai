
// Global vars:
  // $: jquery
  // eventBus: on('event', callback); emit('event', data); listEvents();
  // imgHelper: render(); multiRender(); genURL(x, y);

// eventBus events:
  // touch.js emits a swipe event and swipe html target ('leftSwipe', <p>oeu</p>)


// photon main
var photon = (function() {

  function placehold (){
    console.log('this is a private placeholder template!');
  }

  function initialise (){
    console.log('myApp is initialised');
  }

  function ImageArticle(imgObj){
    // var sampleInputObj = {
    //   thumbURL: 'http://placehold.it/400x400',
    //   imgURL: 'http://placehold.it/1200x800',
    //
    // };
    var thumbURL = imgObj.thumbURL;
    var imgURL = imgObj.imgURL;
  }



  // API
  return {
    init: initialise
  };

}());
