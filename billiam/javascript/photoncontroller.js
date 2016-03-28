
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

//////////////////////////////////////////////////////////
// sample data objects for testing, can delete when deploy

var sampleUserObj = {
  id: 9,
  name: 'Jason',
  photos: [
  {
    id: 0,
    url: 'images/24.jpg',
    width: 1080,
    height: 654,
    tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6']
  },
  {
    id: 1,
    url: 'images/26.jpg',
    width: 1080,
    height: 717,
    tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6']
  }
  ],
  recommendedPhotos: [
  {
    id: 3,
    url: 'images/36.jpg',
    width: 720,
    height: 1080,
    tags: ['tag2', 'tag4', 'tag5']
  },
  {
    id: 5,
    url: 'images/39.jpg',
    width: 1080,
    height: 720,
    tags: ['tag1', 'tag5', 'tag6']
  }
  ],
};

var samplePhotoObj1 = {
  "id": 6,
  "url": "https://images.unsplash.com/photo-1432383079404-c66efb4828a3",
  "tags": [{"name":"sea","type":"label"},{"name":"coast","type":"label"},{"name":"water","type":"label"},{"name":"ocean","type":"label"},{"name":"shore","type":"label"},{"name":"reflection","type":"label"},{"name":"stack","type":"label"}]
};

var samplePhotoObj2 = {
  id: 0,
  url: 'images/24.jpg',
  width: 1080,
  height: 654,
  tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6']
};

var samplePhotoObjExt = {
  id: 456,
  url: 'https://images.unsplash.com/photo-1449177009399-be6867ef0505',
  width: 5616,
  height: 3744,
  tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6']
};

var samplePhotosObj = {
  photos: [
    {
      id: 0,
      url: 'images/22.jpg',
      width: 1080,
      height: 1080,
      tags: ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6']
    },
    {
      url: 'images/26.jpg',
      width: 1080,
      height: 717,
      tags: ['tag1', 'tag2', 'tag4', 'tag6']
    },
    {
      url: 'images/20.jpg',
      width: 1080,
      height: 1080,
      tags: ['tag1', 'tag3', 'tag4', 'tag6']
    },
    {
      url: 'images/36.jpg',
      width: 720,
      height: 1080,
      tags: ['tag2', 'tag4', 'tag5']
    },
    {
      url: 'images/39.jpg',
      width: 1080,
      height: 720,
      tags: ['tag1', 'tag5', 'tag6']
    },
    {
      url: 'images/18.jpg',
      width: 1080,
      height: 720,
      tags: ['tag5', 'tag6']
    },
    {
      url: 'images/9.jpg',
      width: 1080,
      height: 720,
      tags: ['tag1', 'tag2', 'tag5', 'tag6']
    },
    {
      url: 'images/35.jpg',
      width: 1080,
      height: 1080,
      tags: ['tag1', 'tag2']
    },
    {
      url: 'images/33.jpg',
      width: 950,
      height: 650,
      tags: ['tag1', 'tag2', 'tag6']
    },
    {
      url: 'images/31.jpg',
      width: 280,
      height: 280,
      tags: ['tag1', 'tag2', 'tag3', 'tag4']
    },
    {
      url: 'images/24.jpg',
      width: 1080,
      height: 654,
      tags: ['tag1', 'tag4', 'tag5', 'tag6']
    },
    {
      url: 'images/2.jpg',
      width: 1080,
      height: 391,
      tags: ['tag1', 'tag2', 'tag3', 'tag4']
    },
    {
      url: 'images/21.jpg',
      width: 1080,
      height: 608,
      tags: ['tag1', 'tag4', 'tag5', 'tag6']
    },
    {
      url: 'images/4.jpg',
      width: 1080,
      height: 720,
      tags: ['tag1', 'tag2', 'tag3']
    },
    {
      url: 'images/17.jpg',
      width: 1080,
      height: 720,
      tags: ['tag2', 'tag5', 'tag6']
    },
    {
      url: 'images/12.jpg',
      width: 1080,
      height: 720,
      tags: ['tag3', 'tag4']
    },
    {
      url: 'images/19.jpg',
      width: 1080,
      height: 719,
      tags: ['tag1', 'tag3', 'tag6']
    },
    {
      url: 'images/15.jpg',
      width: 1080,
      height: 683,
      tags: ['tag1', 'tag3', 'tag4', 'tag5']
    },
    {
      url: 'images/32.jpg',
      width: 1080,
      height: 721,
      tags: ['tag1', 'tag2', 'tag5', 'tag6']
    },
    {
      url: 'images/28.jpg',
      width: 1080,
      height: 705,
      tags: ['tag1', 'tag3', 'tag6']
    }
  ]
};
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////



// photon main IIFE with API
// async should go to the jQuery wrapper below, on doc ready
// NOTE: to be executed after modules have loaded
Photon.Controller = (function() {

  //////////////////////////////////////////////////////////
  // config important variables
  var serverURL = 'https://localhost:3000/';
  var monicasResizer = 'http://104.131.96.71/unsafe/fit-in/' + '800x8000/'; // width x height, then add img URL w/o http(s), ex: 'images.unsplash.com/photo-1431051047106-f1e17d81042f'

  //////////////////////////////////////////////////////////
  // testing variables
  var jason = new Photon.User (sampleUserObj);
  var vanGogh = new Photon.Photo (samplePhotoObj2);

  //////////////////////////////////////////////////////////
  // fetching User from server
  function fetchPhotos(userID, callback){
    if (userID){
      $.getJSON(serverURL + 'users/' + userID + '/photos')
      .done(function(data){
        // NOTE: currently server returns an array, not JSON
        photos = data;
        if (callback){
          callback(data);
        } else {
          console.log('no callback provided, data will be console logged');
          console.log(data);
        }
      })
      .fail(function(xhr, status, error){
        console.log(status, error);
      });
    } else {
      console.log('missing user id');
      // then fetch random photos
    }
  }

  function fetchRandPhotos(){} // TODO




  //////////////////////////////////////////////////////////
  // search
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
  // API
  return {
    user: jason,
    photo: vanGogh,
    test: fetchPhotos,
  };
}());
