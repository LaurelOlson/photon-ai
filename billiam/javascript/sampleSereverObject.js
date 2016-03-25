var sampleStreamObj = {
  photos: [{}, {}, {}, {}],
  userID: 0,
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