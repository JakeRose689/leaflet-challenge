// // Store our API endpoint as queryUrl.
// var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// // // Perform a GET request to the query URL/
// d3.json(queryUrl).then(function (data) {
//   variables(data.features);
//   // Define a function that we want to run once for each feature in the features array.
//   // Give each feature a popup that describes the place and time of the earthquake.
//   function variables(feature) {
//     console.log(feature)
//     return {
//     lat: feature.geometry.coordinates[0],
//     long: feature.geometry.coordinates[1],
//     latlng: [lat,long],
//     depth: geometry.coordinates[2],
//     mag: properties.mag,
//     color: getColor(geometry.coordinates[2])
//     };
    
//   }
//   console.log(lat)
    
//   function getColor(depth){
//     switch (true) {
//       case depth <10:
//         return '#1a9850';
//       case depth <30:
//         return'#91cf60';
//       case depth <50:
//         return '#d9ef8b';
//       case depth <70:
//         return '#fee08b';
//       case depth <90:
//         return '#fc8d59';
//       case depth >=90:
//         return '#d73027';
//     }
//   }

//   L.geoJson(data, {
//     pointToLayer: function(feature, latlng) {
//       return L.circleMarker(latlng, {
//         stroke: false,
//         fillOpacity: 1,
//         color: 'black',
//         fillColor: getColor,
//         radius: mag*10
//       })
//     },
//     onEachFeature: function(feature, layer) {
//       layer.bindPopup(
//         `<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`
//       );
//     }    
//  }).addTo(map)
// });


d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  // This function returns the style data for each of the earthquakes we plot on
  // the map. We pass the magnitude of the earthquake into two separate functions
  // to calculate the color and radius.
  
  function styling(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.geometry.coordinates[2]),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }
  // This function determines the color of the marker based on the magnitude of the earthquake.
  function getColor(depth) {
    switch (true) {
    case depth > 90:
      return "#EA2C2C";
    case depth > 70:
      return "#EA822C";
    case depth > 50:
      return "#EE9C00";
    case depth > 30:
      return "#EECC00";
    case depth > 10:
      return "#D4EE00";
    default:
      return "#98EE00";
    }
  }
  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }
  // Here we add a GeoJSON layer to the map once the file is loaded.
  L.geoJson(data, {
    // We turn each feature into a circleMarker on the map.
    pointToLayer: function(feature, latlng) {
      return {
        circle: L.circleMarker(latlng)};
    },
    // We set the style for each circleMarker using our styleInfo function.
    style: styling,
    // We create a popup for each marker to display the magnitude and location of the earthquake after the marker has been created and styled
    onEachFeature: function(feature, layer) {
      layer.bindPopup(
        "Magnitude: "
          + feature.properties.mag
          + "<br>Depth: "
          + feature.geometry.coordinates[2]
          + "<br>Location: "
          + feature.properties.place
      );
    }
  }).addTo(map = L.map('map', {
    center: [
      37.09, 0
    ],
    zoom: 3,
    layers: circle
  }));
  // Here we create a legend control object.
  var legend = L.control({
    position: "bottomright"
  });
  // Then add all the details for the legend
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var grades = [-10, 10, 30, 50, 70, 90];
    var colors = [
      "#98EE00",
      "#D4EE00",
      "#EECC00",
      "#EE9C00",
      "#EA822C",
      "#EA2C2C"
    ];
    // Looping through our intervals to generate a label with a colored square for each interval.
    for (var i = 0; i < grades.length; i++) {
      div.innerHTML += "<i style='background: " + colors[i] + "'></i> "
      + grades[i] + (grades[i + 1] ? "&ndash;" + grades[i + 1] + "<br>" : "+");
    }
    return div;
  };
  // Finally, we our legend to the map.
  legend.addTo(map);
});