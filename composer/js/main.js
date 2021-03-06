$(document).ready(function(){
  $('#find').on('click', function(event) {
  		event.preventDefault();
  		console.log("loading");
  		$("#main-box").append("<div class='progress progress-striped active'><div id='progress' class='bar' style='width: 0%;'></div></div>");
  		var progress_bar = document.getElementById("progress");
  		//TweenMax.to(progress_bar, .5, {width:"800px", ease:Elastic.easeOut});
        codeAddress("Irvine, CA", map);
        /*$.ajax({
                    type: 'GET',
                    url: "routes/location.php",
                    data: {
                    	address: $("#location").val()
                    },
                    context: $(this),
                    success: function (data) {
                    	console.log("showing map " + data);
                    	var map = $("#map");
                        TweenMax.to(map, 2.5, {height:"200px", ease:Elastic.easeOut});
                        drawMap(data.lat, data.lng);
                    },
                    error: function (msg) {
                    	console.log("error" + msg);
                    	$("#main-box").append(msg);
                    }
                });*/
        });
    });
    

$(function() {
  $( "#sortable" ).sortable();
  $( "#sortable" ).disableSelection();
});
      		      
      navigator.geolocation.getCurrentPosition(initialize, displayError);
      
       function displayError(error) {
         var errors = { 
           1: 'Permission denied',
           2: 'Position unavailable',
           3: 'Request timeout'
         };
         alert("Error: " + errors[error.code]);
       }
       
      function initialize(position) {
        geocoder = new google.maps.Geocoder();
      	myCoords = position.coords;
        mapDiv = document.getElementById('map-canvas');
        gmap = new google.maps.Map(mapDiv, {
          center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          zoom: 20,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var marker = new google.maps.Marker({
          map: gmap,
          position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
          draggable: false
        });
        
       drawingManager = new google.maps.drawing.DrawingManager({
           drawingMode: google.maps.drawing.OverlayType.MARKER,
           drawingControl: true,
           drawingControlOptions: {
             position: google.maps.ControlPosition.TOP_CENTER,
             drawingModes: [
               google.maps.drawing.OverlayType.MARKER,
               google.maps.drawing.OverlayType.CIRCLE,
               google.maps.drawing.OverlayType.POLYGON,
               google.maps.drawing.OverlayType.POLYLINE,
               google.maps.drawing.OverlayType.RECTANGLE
             ]
           },
           markerOptions: {
             draggable: true
           },
           circleOptions: {
             fillColor: '#ffff00',
             fillOpacity: 1,
             strokeWeight: 1,
             clickable: false,
             editable: true,
             zIndex: 1
           }
         });
         drawingManager.setMap(gmap);
       
       setDrawing('img/Tree-icon.png', gmap);
        
        var homeControlDiv = document.createElement('div');
                var homeControl = new HomeControl(homeControlDiv, gmap);
        
                homeControlDiv.index = 1;
                gmap.controls[google.maps.ControlPosition.TOP_RIGHT].push(homeControlDiv);
                
        var markerControlDiv = document.createElement('div');
                var homeControl = new markerChange(markerControlDiv, gmap);
        
                markerControlDiv.index = 2;
                gmap.controls[google.maps.ControlPosition.TOP_RIGHT].push(markerControlDiv);
        
       	var weatherLayer = new google.maps.weather.WeatherLayer({
        	temperatureUnits: google.maps.weather.TemperatureUnit.FAHRENHEIT
        	});
        weatherLayer.setMap(gmap);
        
        var cloudLayer = new google.maps.weather.CloudLayer();
        cloudLayer.setMap(gmap);
        
        //windspeedLayer = new google.maps.weather.WeatherConditions();
        //console.log(windspeedLayer);
        //windspeedLayer.setMap(map);
        
        
         google.maps.event.addListener(gmap, 'click', function(event) {
                addMarker(event.latLng);
        });
      } 
      
      
      
      
       function setDrawing(icon, gmap) {
        drawingManager.setOptions({
              drawingMode: google.maps.drawing.OverlayType.MARKER,
           drawingControl: true,
           drawingControlOptions: {
             position: google.maps.ControlPosition.TOP_CENTER,
             drawingModes: [
               google.maps.drawing.OverlayType.MARKER,
               google.maps.drawing.OverlayType.CIRCLE,
               google.maps.drawing.OverlayType.POLYGON,
               google.maps.drawing.OverlayType.POLYLINE,
               google.maps.drawing.OverlayType.RECTANGLE
             ]
           },
           markerOptions: {
             icon: icon,
             draggable: true
           },
           circleOptions: {
             fillColor: '#ffff00',
             fillOpacity: 1,
             strokeWeight: 1,
             clickable: false,
             editable: true,
             zIndex: 1
           }
         });
        
       }
      
      function addMarker(location) {
          marker = new google.maps.Marker({
            position: location,
            map: gmap,
          });
          markersArray.push(marker);
        }
        
        // Removes the overlays from the map, but keeps them in the array
        function clearOverlays() {
          if (markersArray) {
            for (i in markersArray) {
              markersArray[i].setMap(null);
            }
          }
        }
        
        // Shows any overlays currently in the array
        function showOverlays() {
          if (markersArray) {
            for (i in markersArray) {
              markersArray[i].setMap(gmap);
            }
          }
        }
        
        // Deletes all markers in the array by removing references to them
        function deleteOverlays() {
          if (markersArray) {
            for (i in markersArray) {
              markersArray[i].setMap(null);
            }
            markersArray.length = 0;
          }
        }
      
       
      
      function codeAddress(address, gmap) {
        geocoder.geocode( { 'address': address}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
          	$("#map").slideDown("normal", function(){
          		
          		google.maps.event.trigger(gmap, 'resize');
          		gmap.setZoom( gmap.getZoom() );
          		gmap.setCenter(results[0].geometry.location);
          		var marker = new google.maps.Marker({
          		    map: gmap,
          		    position: results[0].geometry.location
          		});
          		
          		//$("#confirm").slideDown();
          		var photo = document.getElementById("confirm");
          		TweenLite.to(photo, 2, {width:"200px", height:"150px"});
          	});
            		            
          } else {
            console.log(status);
          }
        });
        
      }
      
	
	    /**
	     * The HomeControl adds a control to the map that simply
	     * returns the user to Chicago. This constructor takes
	     * the control DIV as an argument.
	     */
	
	    function HomeControl(controlDiv, gmap) {
	
	      // Set CSS styles for the DIV containing the control
	      // Setting padding to 5 px will offset the control
	      // from the edge of the map
	      controlDiv.style.padding = '5px';
	
	      // Set CSS for the control border
	      var controlUI = document.createElement('div');
	      controlUI.style.backgroundColor = 'white';
	      controlUI.style.borderStyle = 'solid';
	      controlUI.style.borderWidth = '2px';
	      controlUI.style.cursor = 'pointer';
	      controlUI.style.textAlign = 'center';
	      controlUI.title = 'Click to set the map to Home';
	      controlDiv.appendChild(controlUI);
	
	      // Set CSS for the control interior
	      var controlText = document.createElement('div');
	      controlText.style.fontFamily = 'Arial,sans-serif';
	      controlText.style.fontSize = '12px';
	      controlText.style.paddingLeft = '4px';
	      controlText.style.paddingRight = '4px';
	      controlText.innerHTML = '<b>Current Location</b>';
	      controlUI.appendChild(controlText);
	
	      // Setup the click event listeners: simply set the map to
	      // Chicago
	      google.maps.event.addDomListener(controlUI, 'click', function() {
	        gmap.panTo(new google.maps.LatLng(myCoords.latitude, myCoords.longitude))
	      });
	
	    }
        
          function markerChange(controlDiv, gmap) {
	
	      // Set CSS styles for the DIV containing the control
	      // Setting padding to 5 px will offset the control
	      // from the edge of the map
	      controlDiv.style.padding = '5px';
	
	      // Set CSS for the control border
	      var controlUI = document.createElement('div');
	      controlUI.style.backgroundColor = 'white';
	      controlUI.style.borderStyle = 'solid';
	      controlUI.style.borderWidth = '2px';
	      controlUI.style.cursor = 'pointer';
	      controlUI.style.textAlign = 'center';
	      controlUI.title = 'Click to set the map to Home';
	      controlDiv.appendChild(controlUI);
	
	      // Set CSS for the control interior
	      var controlText = document.createElement('div');
	      controlText.style.fontFamily = 'Arial,sans-serif';
	      controlText.style.fontSize = '12px';
	      controlText.style.paddingLeft = '4px';
	      controlText.style.paddingRight = '4px';
	      controlText.innerHTML = '<b>Icon Change</b>';
	      controlUI.appendChild(controlText);
	
	      // Setup the click event listeners: simply set the map to
	      // Chicago
	      google.maps.event.addDomListener(controlUI, 'click', function() {
	        setDrawing("img/backpack.png", gmap);
	      });
	
	    }

      google.maps.event.addDomListener(window, 'load', initialize);




