angular.module('app', []).controller('mapcontroller', function($scope){
	//var map, heatmap, polymap, polylineMap;

	// var heatmapData = [
	//   new google.maps.LatLng(37.782, -122.447),
	//   new google.maps.LatLng(37.782, -122.445),
	//   new google.maps.LatLng(37.782, -122.443),
	//   new google.maps.LatLng(37.782, -122.441),
	//   new google.maps.LatLng(37.782, -122.439),
	//   new google.maps.LatLng(37.782, -122.437),
	//   new google.maps.LatLng(37.782, -122.435),
	//   new google.maps.LatLng(37.785, -122.447),
	//   new google.maps.LatLng(37.785, -122.445),
	//   new google.maps.LatLng(37.785, -122.443),
	//   new google.maps.LatLng(37.785, -122.441),
	//   new google.maps.LatLng(37.785, -122.439),
	//   new google.maps.LatLng(37.785, -122.437),
	//   new google.maps.LatLng(37.785, -122.435)
	// ];
	// $scope.initMap=function() {
	// 	map = new google.maps.Map(document.getElementById('heatmap'), {
	// 			zoom: 12,
	// 			center: {lat: 3.43, lng: -76.52},
	// 			mapTypeId: google.maps.MapTypeId.ROADMAP	
	// 		});
	// 	polylineMap = new google.maps.Map(document.getElementById('polymap'), {
	// 			zoom: 12,
	// 			center: {lat: 3.43, lng: -76.52},
	// 			mapTypeId: google.maps.MapTypeId.ROADMAP	
	// 		});
	// 	heatmap = new google.maps.visualization.HeatmapLayer({
 //          data: heatmapData,
 //          map: map
 //        });

 //        polymap = new google.maps.Polyline({
 //          path: heatmapData,
 //          geodesic: true,
 //          strokeColor: '#3d3d29',
 //          strokeOpacity: 1.0,
 //          strokeWeight: 4
 //        });
 //        polymap.setMap(polylineMap);
	// 	google.maps.event.addDomListener(window, 'load', $scope.initMap);
	// }

	var map, polymap;

	var polyMapData = [
	  new google.maps.LatLng(37.782, -122.447),
	  new google.maps.LatLng(37.782, -122.445),
	  new google.maps.LatLng(37.782, -122.443),
	  new google.maps.LatLng(37.782, -122.441),
	  new google.maps.LatLng(37.782, -122.439),
	  new google.maps.LatLng(37.782, -122.437),
	  new google.maps.LatLng(37.782, -122.435),
	  new google.maps.LatLng(37.785, -122.447),
	  new google.maps.LatLng(37.785, -122.445),
	  new google.maps.LatLng(37.785, -122.443),
	  new google.maps.LatLng(37.785, -122.441),
	  new google.maps.LatLng(37.785, -122.439),
	  new google.maps.LatLng(37.785, -122.437),
	  new google.maps.LatLng(37.785, -122.435)
	];

	$scope.initMap=function() {
		map = new google.maps.Map(document.getElementById('polymap'), {
				zoom: 12,
				center: {lat: 3.43, lng: -76.52},
				mapTypeId: google.maps.MapTypeId.ROADMAP	
			});
		polymap = new google.maps.Polyline({
          path: polyMapData,
          geodesic: true,
          strokeColor: '#3d3d29',
          strokeOpacity: 1.0,
          strokeWeight: 4
        });
        polymap.setMap(map);
		google.maps.event.addDomListener(window, 'load', $scope.initMap);
	}
});