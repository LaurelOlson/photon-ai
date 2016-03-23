
// Global vars:
  // $: jquery
  // eventBus: on('event', callback); emit('event', data); listEvents();
  // imgHelper: render(); multiRender(); genURL(x, y);

// eventBus events:
  // touch.js emits a swipe event and swipe html target ('leftSwipe', <p>oeu</p>)


// photon main
var photon = (function() {

  function addDummy(){
    for (var i = 1; i < 4; i++){
      $('.column'+i).addClass('is-4-desktop');
      imgHelper.multiRender($('#column'+i), 8);
    }
  }

  // footer fade in
  $(window).on('scroll', function() {
    var amountScrolled = 300;
    if ( $(window).scrollTop() > amountScrolled ) {
      $('.fixbottom').fadeIn('slow');
    } else {
      $('.fixbottom').fadeOut('slow');
    }
  });

  function testInit(){
    addDummy();
  }

  // API
  return {
    testInit: testInit
  };

}());



//sample gVision response
var gVisionSample = {
  "responses": [
    {
      "faceAnnotations": [
        {
          "boundingPoly": {
            "vertices": [
              {
                "x": 1146,
                "y": 1019
              },
              {
                "x": 1254,
                "y": 1019
              },
              {
                "x": 1254,
                "y": 1144
              },
              {
                "x": 1146,
                "y": 1144
              }
            ]
          },
          "fdBoundingPoly": {
            "vertices": [
              {
                "x": 1167,
                "y": 1062
              },
              {
                "x": 1243,
                "y": 1062
              },
              {
                "x": 1243,
                "y": 1138
              },
              {
                "x": 1167,
                "y": 1138
              }
            ]
          },
          "landmarks": [
            {
              "type": "LEFT_EYE",
              "position": {
                "x": 1187.9954,
                "y": 1083.5132,
                "z": -8.9282381e-05
              }
            },
            {
              "type": "RIGHT_EYE",
              "position": {
                "x": 1218.9396,
                "y": 1085.3304,
                "z": 2.7616532
              }
            },
            {
              "type": "LEFT_OF_LEFT_EYEBROW",
              "position": {
                "x": 1177.2656,
                "y": 1074.813,
                "z": 0.039756022
              }
            },
            {
              "type": "RIGHT_OF_LEFT_EYEBROW",
              "position": {
                "x": 1197.0594,
                "y": 1078.0463,
                "z": -7.3574243
              }
            },
            {
              "type": "LEFT_OF_RIGHT_EYEBROW",
              "position": {
                "x": 1213.0304,
                "y": 1078.4915,
                "z": -6.0443554
              }
            },
            {
              "type": "RIGHT_OF_RIGHT_EYEBROW",
              "position": {
                "x": 1231.2155,
                "y": 1077.726,
                "z": 4.7631269
              }
            },
            {
              "type": "MIDPOINT_BETWEEN_EYES",
              "position": {
                "x": 1204.4147,
                "y": 1084.3746,
                "z": -5.5866957
              }
            },
            {
              "type": "NOSE_TIP",
              "position": {
                "x": 1203.9592,
                "y": 1105.5889,
                "z": -9.9819164
              }
            },
            {
              "type": "UPPER_LIP",
              "position": {
                "x": 1202.1803,
                "y": 1114.6241,
                "z": 0.19579422
              }
            },
            {
              "type": "LOWER_LIP",
              "position": {
                "x": 1201.3508,
                "y": 1125.1644,
                "z": 5.3319955
              }
            },
            {
              "type": "MOUTH_LEFT",
              "position": {
                "x": 1186.3414,
                "y": 1115.6,
                "z": 9.2084446
              }
            },
            {
              "type": "MOUTH_RIGHT",
              "position": {
                "x": 1215.8278,
                "y": 1116.786,
                "z": 11.408581
              }
            },
            {
              "type": "MOUTH_CENTER",
              "position": {
                "x": 1201.3986,
                "y": 1120.295,
                "z": 4.05759
              }
            },
            {
              "type": "NOSE_BOTTOM_RIGHT",
              "position": {
                "x": 1212.8971,
                "y": 1105.3102,
                "z": 3.7906621
              }
            },
            {
              "type": "NOSE_BOTTOM_LEFT",
              "position": {
                "x": 1194.1696,
                "y": 1104.9454,
                "z": 1.9514693
              }
            },
            {
              "type": "NOSE_BOTTOM_CENTER",
              "position": {
                "x": 1203.072,
                "y": 1109.3242,
                "z": -1.4238683
              }
            },
            {
              "type": "LEFT_EYE_TOP_BOUNDARY",
              "position": {
                "x": 1188.0619,
                "y": 1081.9556,
                "z": -2.6878076
              }
            },
            {
              "type": "LEFT_EYE_RIGHT_CORNER",
              "position": {
                "x": 1194.2708,
                "y": 1084.2184,
                "z": 0.74486667
              }
            },
            {
              "type": "LEFT_EYE_BOTTOM_BOUNDARY",
              "position": {
                "x": 1187.5953,
                "y": 1085.6293,
                "z": 0.24229412
              }
            },
            {
              "type": "LEFT_EYE_LEFT_CORNER",
              "position": {
                "x": 1181.0994,
                "y": 1082.5813,
                "z": 2.3291278
              }
            },
            {
              "type": "LEFT_EYE_PUPIL",
              "position": {
                "x": 1187.3135,
                "y": 1083.7411,
                "z": -0.887199
              }
            },
            {
              "type": "RIGHT_EYE_TOP_BOUNDARY",
              "position": {
                "x": 1220.3325,
                "y": 1083.6924,
                "z": 0.14283456
              }
            },
            {
              "type": "RIGHT_EYE_RIGHT_CORNER",
              "position": {
                "x": 1226.223,
                "y": 1085.0164,
                "z": 6.2803884
              }
            },
            {
              "type": "RIGHT_EYE_BOTTOM_BOUNDARY",
              "position": {
                "x": 1219.4916,
                "y": 1087.5493,
                "z": 3.0781896
              }
            },
            {
              "type": "RIGHT_EYE_LEFT_CORNER",
              "position": {
                "x": 1213.6154,
                "y": 1085.5831,
                "z": 2.4804277
              }
            },
            {
              "type": "RIGHT_EYE_PUPIL",
              "position": {
                "x": 1220.4562,
                "y": 1085.5413,
                "z": 2.0057013
              }
            },
            {
              "type": "LEFT_EYEBROW_UPPER_MIDPOINT",
              "position": {
                "x": 1187.5247,
                "y": 1073.1464,
                "z": -6.7679038
              }
            },
            {
              "type": "RIGHT_EYEBROW_UPPER_MIDPOINT",
              "position": {
                "x": 1222.5637,
                "y": 1075.0146,
                "z": -3.6941295
              }
            },
            {
              "type": "LEFT_EAR_TRAGION",
              "position": {
                "x": 1163.2433,
                "y": 1087.6141,
                "z": 40.826283
              }
            },
            {
              "type": "RIGHT_EAR_TRAGION",
              "position": {
                "x": 1236.5853,
                "y": 1091.5779,
                "z": 47.285252
              }
            },
            {
              "type": "FOREHEAD_GLABELLA",
              "position": {
                "x": 1205.0585,
                "y": 1078.396,
                "z": -7.9697156
              }
            },
            {
              "type": "CHIN_GNATHION",
              "position": {
                "x": 1199.9829,
                "y": 1138.2397,
                "z": 13.372303
              }
            },
            {
              "type": "CHIN_LEFT_GONION",
              "position": {
                "x": 1166.1923,
                "y": 1111.2653,
                "z": 33.565289
              }
            },
            {
              "type": "CHIN_RIGHT_GONION",
              "position": {
                "x": 1232.4445,
                "y": 1114.8273,
                "z": 39.376175
              }
            }
          ],
          "rollAngle": 4.34425,
          "panAngle": 5.164144,
          "tiltAngle": -14.364238,
          "detectionConfidence": 0.98853165,
          "landmarkingConfidence": 0.55196851,
          "joyLikelihood": "VERY_LIKELY",
          "sorrowLikelihood": "VERY_UNLIKELY",
          "angerLikelihood": "VERY_UNLIKELY",
          "surpriseLikelihood": "VERY_UNLIKELY",
          "underExposedLikelihood": "VERY_UNLIKELY",
          "blurredLikelihood": "VERY_UNLIKELY",
          "headwearLikelihood": "VERY_UNLIKELY"
        }
      ],
      "landmarkAnnotations": [
        {
          "description": "Tour Eiffel",
          "score": 0.58810472,
          "boundingPoly": {
            "vertices": [
              {
                "x": 1401,
                "y": 102
              },
              {
                "x": 1729,
                "y": 102
              },
              {
                "x": 1729,
                "y": 873
              },
              {
                "x": 1401,
                "y": 873
              }
            ]
          }
        },
        {
          "mid": "/m/02j81",
          "description": "Eiffel Tower",
          "score": 0.50778717,
          "boundingPoly": {
            "vertices": [
              {
                "x": 1452,
                "y": 609
              },
              {
                "x": 1748,
                "y": 609
              },
              {
                "x": 1748,
                "y": 1093
              },
              {
                "x": 1452,
                "y": 1093
              }
            ]
          },
          "locations": [
            {
              "latLng": {
                "latitude": 48.858461,
                "longitude": 2.294351
              }
            }
          ]
        }
      ],
      "labelAnnotations": [
        {
          "mid": "/m/038hg",
          "description": "green",
          "score": 0.89997339
        },
        {
          "mid": "/m/08t9c_",
          "description": "grass",
          "score": 0.73878413
        },
        {
          "mid": "/m/06npx",
          "description": "sea",
          "score": 0.63954788
        },
        {
          "mid": "/m/0166ls",
          "description": "park",
          "score": 0.55552322
        }
      ],
      "safeSearchAnnotation": {
        "adult": "VERY_UNLIKELY",
        "spoof": "VERY_UNLIKELY",
        "medical": "VERY_UNLIKELY",
        "violence": "UNLIKELY"
      }
    }
  ]
};
