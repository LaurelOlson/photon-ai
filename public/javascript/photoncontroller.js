
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
  var serverURL = '/';
  var photoQtyPerRender = 4;
  var currentUser = null;
  // EVENT LISTENERS ///////////////////////////////////////

  //////////////////////////////////////////////////////////
  // from view (API via pubsub)
  pubsub.on('imagesRequested', function(direction){
    var somePhotos = getPhotosFrom(currentUser, photoQtyPerRender);
    sendPhotosToView(somePhotos, direction);
  });

  pubsub.on('userLoggedIn', function(){
    currentUser = new User();
    fetchPhotosFor(currentUser);
  });
  pubsub.on('searchRequested', function(query){
    // sanitise input
    var queryArr = sanitise(query);
    // find matching photos from user
      // currentUser.photos.tags is an array
    var foundPhotos = tagSearch(queryArr);
    console.log(foundPhotos);
    // ask view to remove images
    // on remove, update state logger
    // render matching images to view
  });

  // USER CONTROLLER ///////////////////////////////////////

  //////////////////////////////////////////////////////////
  // cookies // NOTE: untested
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
  // user login and create user object


  //////////////////////////////////////////////////////////
  // fetching user photos from server
  function fetchPhotosFor(userObj){
    $.getJSON(serverURL + 'photos')
    .done(function(data){
      // NOTE: currently server returns an array, not JSON
      var photonImgs = [];
      data.forEach(function(ele, i, arr){
        photonImgs.push(new Photo(ele));
      });
      userObj.setPhotos(photonImgs);
      pubsub.emit('userPhotosFetched', userObj.photos.length);
      return true;
    })
    .fail(function(xhr, status, error){
      console.log(status, error);
      return false;
    });
  }

  function fetchRandPhotos(){} // TODO

  //////////////////////////////////////////////////////////
  // load user photos from user
  function getPhotosFrom(userObj, qty){
    var outputQty = qty;
    var photoArray = [];
    for (var i = 0; i < outputQty; i++){
      var aPhoto = userObj.photos[i];
      if (aPhoto === undefined){
        console.log('getPhotosFrom: no more user photos to load');
        // TODO: maybe emit an event for frontend
        outputQty = 0;
      } else if (isPhotoAlreadyLoaded(aPhoto)){
        outputQty++;
      } else {
        photoArray.push(aPhoto);
        registerPhotoState(aPhoto);
      }
    }
    console.log('loaded qty:', photoArray.length);
    return photoArray;
  }

  // PHOTO CONTROLLER //////////////////////////////////////

  //////////////////////////////////////////////////////////
  // send photos to view for rendering
  function sendPhotosToView(photoArray, direction){
    //direction: append, prepend
    var returnObj = {};
    returnObj.photos = photoArray;
    returnObj.direction = direction;
    pubsub.emit('renderImgsToPage', returnObj);
  }

  //////////////////////////////////////////////////////////
  // loading callback TODO: found this on StackOverflow
  // function preloadImage(imgObj, callback){
  //   var objImagePreloader = new Image();
  //   objImagePreloader.src = imgObj.url;
  //   if (objImagePreloader.complete){
  //     callback();
  //     objImagePreloader.onload=function(){};
  //   }
  //   else{
  //     objImagePreloader.onload = function() {
  //       callback();
  //       //    clear onLoad, IE behaves irratically with animated gifs otherwise
  //       objImagePreloader.onload=function(){};
  //     };
  //   }
  // }


  // STORAGE CONTROLLER ////////////////////////////////////

  //////////////////////////////////////////////////////////
  //


  // STATE LOGGER //////////////////////////////////////////

  //////////////////////////////////////////////////////////
  // what's already loaded
  var photoStates = {};
  function isPhotoAlreadyLoaded(photoObj){
    return photoStates[photoObj.id];
    // if it's the string 'loaded', it's inherently truthy
  }
  function registerPhotoState(photoObj){
    if (photoStates[photoObj.id]){
      console.log('registerPhotoState: duplicated detected, photo:', photoObj.id);
      return true;
    }
    photoStates[photoObj.id] = 'loaded';
    return true;
  }
  // photoStatesCount is more for debugging
  function photoStatesCount (){
    return Object.keys(photoStates).length;
  }


  // SEARCH ////////////////////////////////////////////////

  //////////////////////////////////////////////////////////
  // sanitisation via whitelist of ltrs and nums
  function sanitise(str){
    return str.match(/\w+/g); //any alphaNumChar
  }

  //////////////////////////////////////////////////////////
  // search against current user's photos
  function tagSearch(termsArr){
    var matchedPhotos = [];
    currentUser.photos.forEach(function(ele, i, arr){
      var haystack = ele.tags.join('');
      for (var j = 0; j < termsArr.length; j++){
        var needle = termsArr[j];
        if (fuzzySearch(needle, haystack)) {
          matchedPhotos.push(ele);
          break;
        }
      }
    });
    return matchedPhotos;
  }

  //////////////////////////////////////////////////////////
  // as long as char appears in order in hay
  function fuzzySearch (needle, haystack) {
    var hLength = haystack.length;
    var nLength = needle.length;
    if (nLength > hLength) {
      return false;
    }
    if (nLength === hLength) {
      return needle === haystack;
    }
    outer: for (var i = 0, j = 0; i < nLength; i++) {
      var nChar = needle.charCodeAt(i);
      while (j < hLength) {
        if (haystack.charCodeAt(j++) === nChar) {
          continue outer;
        }
      }
      return false;
    }
    return true;
  }


  //////////////////////////////////////////////////////////
  // testing variables

  //////////////////////////////////////////////////////////
  // driver code

  //////////////////////////////////////////////////////////
  // API
  return {
    currentUser: currentUser
  };
}(Photon.eventBus, Photon.view, Photon.User, Photon.Photo));
