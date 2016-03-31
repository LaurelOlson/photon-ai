
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
  var subRoutes = {
    userPhoto: 'photos',
    recPhoto: 'photos/recommended',
    topRatedPhoto: 'photos/top_rated',
    likedPhoto: 'likedphotos'
  };
  var photoQtyPerRender = 96;
  var currentUser = null;

  var userPhotoPromise = Promise.resolve($.ajax(serverURL + subRoutes.userPhoto));
  var recPhotoPromise = Promise.resolve($.ajax(serverURL + subRoutes.recPhoto));
  var topRatedPhotoPromise = Promise.resolve($.ajax(serverURL + subRoutes.topRatedPhoto));

  //////////////////////////////////////////////////////////
  // EVENT LISTENERS ///////////////////////////////////////
  //////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////
  // from view (API via pubsub)
  pubsub.on('recBtnClicked', function($btn){
    var photoID = $btn.closest('.photonRec').data('id');
    var payload = {
      photo: photoID
    };
    $.ajax({
      url: serverURL + subRoutes.likedPhoto + photoID,
      method: 'POST'
    }).done(function(data, status, xhr){
        console.log('rec controller:', status);
        pubsub.emit('recRegistered', $btn);
    }).fail(function(xhr, status, error){
      console.log(status);
      console.log(error);
    });
  });

  pubsub.on('unlikeBtnClicked', function($btn){
    var photoID = $btn.closest('.nestBox').data('id');
    var payload = {
      photo: photoID
    };
    $.ajax({
      url: serverURL + subRoutes.likedPhoto + photoID,
      method: 'DELETE'
    }).done(function(data, status, xhr){
        console.log('unlike controller:', status);
        pubsub.emit('unlikeRegistered', $btn);
    }).fail(function(xhr, status, error){
      console.log(status);
      console.log(error);
    });
  });

  //////////////////////////////////////////////////////////
  // USER CONTROLLER ///////////////////////////////////////
  //////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////
  // cookies & login
  pubsub.on('userLoggedIn', function(){
    currentUser = new User();
    setCookie('loggedIn', 'true');
    fetchPhotosFor(currentUser);
    Promise.all([userPhotoPromise, recPhotoPromise]).then(function(resolveData){
      pubsub.emit('photosRequested', 'append');
    }, function(rejectReason){
      // there isn't any reject reason in this usecase
      // leaving it anyway to learn about the normal practice
      console.log(rejectReason);
    });
  });

  pubsub.on('noUserLoggedIn', function(){
    setCookie('loggedIn', 'false');
    fetchShowTopPhotos();
  });

  function setCookie(key, value){
    document.cookie = key + '=' + value;
  }

  function getCookie(key){
    var regexStr = '/(?:(?:^|.*;\s*)' + key + '\s*\=\s*([^;]*).*$)|^.*$/';
    return document.cookie.replace(regexStr, "$1");
  }

  function deleteCookie(key){
    document.cookie = key + '=' +'; expires=Thu, 01 Jan 1970 00:00:00 GMT';
  }

  //////////////////////////////////////////////////////////
  // fetching user photos from server
  function fetchPhotosFor(userObj){
    userPhotoPromise.then(function(response){
      normaliseToPhotoModel(response, 'user');
    });
    recPhotoPromise.then(function(response){
      normaliseToPhotoModel(response, 'rec');
    });
  }

  pubsub.on('userPhotosNormalised', function(pPhotos){
    currentUser.photos = pPhotos;
  });

  pubsub.on('recPhotosNormalised', function(pPhotos){
    currentUser.recPhotos = pPhotos;
  });

  //////////////////////////////////////////////////////////
  // fetching and showing top photos for non-users
  function fetchShowTopPhotos(){
    topRatedPhotoPromise.then(function(response){
      normaliseToPhotoModel(response, 'topRated');
    });
  }

  pubsub.on('topRatedPhotosNormalised', function(pPhotos){
    pPhotos.sort(function(){
      return 0.5 - Math.random();
    });
    var payload = pPhotos.slice(0, photoQtyPerRender / 3);
    sendPhotosToView(payload, 'append');
  });

  //////////////////////////////////////////////////////////
  // load user photos from user
  function getPhotosFrom(userObj, qty, typeStr){
    var photoSource = null;
    switch (typeStr){
      case 'rec':
        photoSource = userObj.recPhotos;
        break;
      case 'user':
        photoSource = userObj.photos;
        break;
    }
    var uniqueCounter = qty;
    var payload = [];
    for (var i = 0; i < uniqueCounter; i++){
      var aPhoto = photoSource[i];
      if (aPhoto === undefined){
        console.log('getPhotosFrom: no more', typeStr, 'photos to load');
        break;
      } else if (isPhotoAlreadyLoaded(aPhoto.id)){
        uniqueCounter++;
      } else {
        payload.push(aPhoto);
        registerPhotoState(aPhoto.id);
      }
    }
    console.log(typeStr, 'photo loaded qty:', payload.length);
    return payload;
  }

  //////////////////////////////////////////////////////////
  // PHOTO CONTROLLER //////////////////////////////////////
  //////////////////////////////////////////////////////////

  pubsub.on('photosRequested', function(direction){
    var userRecRatio = 0.8;
    var somePhotos = getPhotosFrom(currentUser, photoQtyPerRender * userRecRatio, 'user');
    var someRecPhotos = getPhotosFrom(currentUser, photoQtyPerRender * (1 - userRecRatio), 'rec');
    var payload = somePhotos.concat(someRecPhotos);
    // shuffles array to get random photos each time
    // http://stackoverflow.com/questions/7158654/how-to-get-random-elements-from-an-array
    payload.sort(function(){
      return 0.5 - Math.random();
    });
    sendPhotosToView(payload, direction);
  });

  function ajaxPhotos(type){
    var subRoute = null;
    switch (type){
      case 'user':
        subRoute = 'photos';
        break;
      case 'rec':
        subRoute = 'photos/recommended';
        break;
      case 'topRated':
        subRoute = 'photos/top_rated';
        break;
    }
    $.getJSON(serverURL + subRoute)
    .done(function(data){
      if (data.length === 0){
        console.log('ajaxPhotos: 0', type, 'photos fetched (array empty)');
      } else {
        // NOTE: currently server returns an array, not JSON
        console.log('ajaxPhotos:', data.length, type, 'photos fetched');
        normaliseToPhotoModel(data, type);
      }
    })
    .fail(function(xhr, status, error){
      console.log(status, error);
    });
  }

  // dependency for ajaxPhotos
  function normaliseToPhotoModel(photos, type){
    var payload = [];
    photos.forEach(function(ele, i, arr){
      ele.type = type;
      payload.push(new Photo(ele));
    });
    pubsub.emit(type + 'PhotosNormalised', payload);
  }

  // send photos to view for rendering
  function sendPhotosToView(photoArray, direction){
    //direction: append, prepend
    var payload = {};
    payload.photos = photoArray;
    payload.direction = direction;
    pubsub.emit('renderImgsToPage', payload);
  }

  //////////////////////////////////////////////////////////
  // STATE LOGGER //////////////////////////////////////////
  //////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////
  // what's already loaded
  var photoStates = {
    // example:
    // 456: 'loaded',
    // 789: 'removed',
  };

  pubsub.on('allPhotosNuked', function(){
      emptyStateLogger();
  });

  function isPhotoAlreadyLoaded(id){
    return photoStates[id] == 'loaded';
  }

  function registerPhotoState(id){
    if (photoStates[id] === 'loaded'){
      console.log('registerPhotoState: duplicated detected, photo:', id);
      return false;
    }
    photoStates[id] = 'loaded';
    return true;
  }

  function updatePhotoState(id, status){
    if (id in obj) {
      photoStates[id] = status;
      return true;
    }
      console.log('updatePhotoState: ID doesn\'t exist', id);
      return false;
  }

  function emptyStateLogger(){
      for (var key in photoStates){
         photoStates[key] = 'removed';
      }
  }

  // this is more for construction and debugging
  function reportStates(){
    var loaded = [];
    var removed = [];
    (function(){
      for (var key in photoStates){
        if (photoStates[key] === 'loaded'){
          loaded.push(key);
        } else {
          removed.push(key);
        }
      }
    }());
    console.log('Registered QTY:', Object.keys(photoStates).length);
    console.log('Loaded:', loaded);
    console.log('Removed:', removed);
  }

  //////////////////////////////////////////////////////////
  // SEARCH ////////////////////////////////////////////////
  //////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////
  // event trigger & logic
  pubsub.on('searchRequested', function(query){
    var queryArr = sanitise(query);
    var foundPhotos = tagSearch(queryArr);
    if (foundPhotos === null || foundPhotos === undefined || foundPhotos.length === 0){
      return;
    }
    pubsub.emit('nukePhotosFromView', 'all');
    for (var key in photoStates){
      photoStates[key] = 'removed';
    }
    foundPhotos.forEach(function(ele, i, arr){
      registerPhotoState(ele.id);
    });
    sendPhotosToView(foundPhotos, 'prepend');
  });

  //////////////////////////////////////////////////////////
  // sanitisation via whitelist of ltrs and nums
  function sanitise(str){
    return str.match(/\w+/g); //any alphaNumChar
  }

  function tagSearch(termsArr){
    if (termsArr === null ||termsArr.length === 0){
      return;
    }
    var matchedPhotos = [];
    currentUser.photos.forEach(function(ele, i, arr){
      var allLabels = ele.tags.concat(ele.landmarks.concat(ele.emotions));
      loop1:
      for (var j = 0; j < allLabels.length; j++){
        var haystack = allLabels[j].toLowerCase();
        loop2:
        for (var k = 0; k < termsArr.length; k++){
          var needle = termsArr[k].toLowerCase();
          if (fuzzySearch(needle, haystack)) {
            matchedPhotos.push(ele);
            break loop1;
          }
        }
      }
    });
    return matchedPhotos;
  }

  // dependency for tagSearch
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
  // API
  return {
    POST: 'status: controller is loaded',
    reportStates: reportStates,
  };

}(Photon.eventBus, Photon.view, Photon.User, Photon.Photo));
