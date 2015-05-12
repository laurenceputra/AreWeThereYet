//Log a message to the console:
console.log("Locator.js is working!");

//Hide form if user can't check-in:
$("form").hide();

//Update user on inability to check-in:
$("p#message").html("Are you STILL hiding? Enable geolocation to play!");

// Find the users location using geolocation
watchUser = navigator.geolocation.watchPosition(success, error);

// Success is run when watchPosition is successful 
function success(position){

  // Test if tracking worked in browser console
  console.log("Tracking was successful!");
  
  // View position object in browser console
  console.log(position);

  // Capture user location coordinates in variables
  var userLat = position.coords.latitude;
  var userLon = position.coords.longitude;
  
  // Define target location
  var targetLat = 1.298902;
  var targetLon = 103.859324;
  
  // Define distance
  var dist = getDistanceFromLatLonInKm(userLat,userLon,targetLat,targetLon);
  
  var distRoundOff = dist.toFixed(2)
  
  // Check if distance works
  console.log("You are " + dist + "km away from target!");
  
  // Define radius in kilometres
  var radius = 0.05; // 50m
  
  // If dist lessthanorequalto radius, allow check-in, else, disallow
  if (dist <= radius) {
    // show form
    $("form").show();
    $("p#message").html("WOOHOO, YOU'VE FOUND ME!");

  }
  else {
    $("form").hide();
    $("p#message").html("You're still " + distRoundOff + " km away. Keep trying!");
  }
} // END success

// Error is run when watchPosition is unsuccessful
function error(){
  alert("I CAN'T FIND YOU!!! *bawls* Did you turn on geolocation?");
}

// Calculating distance
// http://stackoverflow.com/questions/18883601/
function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}