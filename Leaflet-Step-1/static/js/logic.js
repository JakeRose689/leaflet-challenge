// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// // Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures and createVariables functions.
  createFeatures(data.features);
//   createVariables(data.features);
});


function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
    var lat = feature.geometry.coordinates[0]
    var long = feature.geometry.coordinates[1]
    var latlng = [lat,long]
    var depth = feature.geometry.coordinates[2]
    var mag = feature.properties.mag
    var color = "";
        if (depth <10, color='#1a9850');
            else if (depth <30, color='#91cf60');
            else if (depth <50, color='#d9ef8b');
            else if (depth <70, color='#fee08b');
            else if (depth <90, color='#fc8d59');
            else color='#d73027';

            var circles = [] 
        
            circles.push(L.circleMarker(latlng, {
                stroke: false,
                fillOpacity: 1,
                color: 'black',
                fillColor: color,
                radius: mag*10
            }))
        console.log(circles)
        // return circles
    // console.log(feature)
    var test = L.marker(circles).addTo('map');
    createMap(test)
 }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
//   var earthquakes = L.geoJSON(earthquakeData, {
//     onEachFeature: onEachFeature}
    
//   );


//   console.log(earthquakes);
//   console.log(earthquakeData);

  // Send our earthquakes layer to the createMap function/
 
}

// function createVariables(earthquakeinfo) {
//     test = []
//     for (var i=0; i < earthquakeinfo.length; i++){
//         lat = earthquakeinfo[i].geometry.coordinates[0]
//     test.push(lat)
//     }
    // console.log(test)
// }

function createMap(test) {

  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Earthquakes: test
  };

//   console.log(overlayMaps)

//   console.log(earthquakes)

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      38.55, 0
    ],
    zoom: 3,
    layers: [street, test]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}

// // Store our API endpoint as queryUrl.
// var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// // Creating the map object
// var myMap = L.map("map", {
//     center: [38.55, 0],
//     zoom: 3
//   });
  
//   // Adding the tile layer
//   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//   }).addTo(myMap);
  
//   // Store the API query variables.
//   // For docs, refer to https://dev.socrata.com/docs/queries/where.html.
//   // And, refer to https://dev.socrata.com/foundry/data.cityofnewyork.us/erm2-nwe9.
// //   var baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
// //   var date = "$where=created_date between'2016-01-01T00:00:00' and '2017-01-01T00:00:00'";
// //   var complaint = "&complaint_type=Rodent";
// //   var limit = "&$limit=10000";
  
//   // Assemble the API query URL.
// //   var url = baseURL + date + complaint + limit;
  
//   // Get the data with d3.
//   d3.json(queryUrl).then(function(response) {
  
//     // Create a new marker cluster group.
//     var markers = L.markerClusterGroup();
  
//     // Loop through the data.
//     for (var i = 0; i < response.length; i++) {
  
//       // Set the data location property to a variable.
//         var lat = feature.geometry.coordinates[0]
//         var long = feature.geometry.coordinates[1]
//         var depth = feature.geometry.coordinates[2]
//         var mag = feature.properties.mag
        
//         circles = [] 
        
//         circles.push(L.circleMarker(lat, long, {
//             stroke: false,
//             fillOpacity: 1,
//             color: 'black',
//             fillColor: 'grey',
//             radius: mag*100
//         }))
    
  
//         // Add a new marker to the cluster group, and bind a popup.
//         markers.addLayer(L.circleMarker(lat, long, {
//             stroke: false,
//             fillOpacity: 1,
//             color: 'black',
//             fillColor: 'grey',
//             radius: mag*100}))
//         //   .bindPopup(response[i].descriptor));
      
  
//     }
  
//     // Add our marker cluster layer to the map.
//     myMap.addLayer(markers);
//   console.log(markers)
//   });