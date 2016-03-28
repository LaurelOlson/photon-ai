
// Global vars:
  // $: jquery
  // eventBus
    // subscribe: eventBus.on('eventName', callback);
    // emit: eventBus.emit('eventName', data);
    // helper: if there are no listeners to that event, it will console.log
  // (touch.js) IIFE
    // emits: ('tap', target), ('upSwipe', target) <- all directions
    // on desktop direction keys ard bound to swipe dirs, but no target data
  // $.Nested
    // some .prototype 'APIs'
    // .append(nestBoxes);
    // .prepend(nestBoxes);
    // .resize(nestBoxes);
    // .refresh(options);
    // .destroy();
    // example: $nestContainer.nested('refresh', {options object});
// PhotonUser constructor
// PhotonPhoto constructor
// PhotonView constructor
// document.cookie 4KB
// sessionStorage (scoped to current window tab) 5MB
// localStorage (scoped domain, persistent)
  // setItem('key', 'value'), getItem('key'), removeItem('key') // also localStorage.key



// photon main IIFE with API
// requires modules to be initialised first (html loading order matters)
Photon.Controller = (function(pubsub, view, User, Photo) {

  //////////////////////////////////////////////////////////
  // config important variables
  var serverURL = 'https://localhost:3000/';

  // USER CONTROLLER ///////////////////////////////////////

  //////////////////////////////////////////////////////////
  // cookies
  function setUserIDCookie(userObj){
    if (userObj){
      document.cookie = 'userID=' + userObj.id;
      return true;
    }
    console.log('setUserIDCookie: userObj missing');
    return false;
  }
  function getUserIDCookie(){
    return document.cookie.replace(/(?:(?:^|.*;\s*)userID\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  }
  function removeUserIDCookie(){
    document.cookie = 'userID=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    return true;
  }

  //////////////////////////////////////////////////////////
  // fetching user photos from server
  function fetchPhotosFor(userObj){
    if (userObj.id){
      $.getJSON(serverURL + 'users/' + userObj.id + '/photos')
      .done(function(data){
        // NOTE: currently server returns an array, not JSON
        userObj.setPhotos(data);
        return true;
      })
      .fail(function(xhr, status, error){
        console.log(status, error);
        return false;
      });
    } else {
      console.log('fetchPhotosFor: missing user id');
      // then fetch random photos
      return false;
    }
  }

  function fetchRandPhotos(){} // TODO

  //////////////////////////////////////////////////////////
  // load user photos from user
  function loadPhotosFrom(userObj, qty){
    var photoArray = [];

    return photoArray;
  }

  // PHOTO CONTROLLER //////////////////////////////////////

  //////////////////////////////////////////////////////////
  //


  // STORAGE CONTROLLER ////////////////////////////////////

  //////////////////////////////////////////////////////////
  //


  // STATE MACHINE /////////////////////////////////////////

  //////////////////////////////////////////////////////////
  //


  // SEARCH ////////////////////////////////////////////////

  //////////////////////////////////////////////////////////
  // TODO: search
  function fuzzysearch (needle, haystack) {
    var hlen = haystack.length;
    var nlen = needle.length;
    if (nlen > hlen) {
      return false;
    }
    if (nlen === hlen) {
      return needle === haystack;
    }
    outer: for (var i = 0, j = 0; i < nlen; i++) {
      var nch = needle.charCodeAt(i);
      while (j < hlen) {
        if (haystack.charCodeAt(j++) === nch) {
          continue outer;
        }
      }
      return false;
    }
    return true;
  }


  //////////////////////////////////////////////////////////
  // testing variables
  var jason = new User(9);
  var vanGogh = new Photo(samplePhotoObjExtNoWidth);
  //////////////////////////////////////////////////////////
  // driver code
  fetchPhotosFor(jason);

  //////////////////////////////////////////////////////////
  // API
  return {
    user: jason,
    photo: vanGogh,
    fetchPhotosFor: fetchPhotosFor,
  };
}(Photon.eventBus, Photon.view, Photon.User, Photon.Photo));
