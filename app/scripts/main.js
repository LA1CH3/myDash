(function () {
  'use strict';

  function loadDash(){
  	getWeather();
  	getArticles();
  }

  function getWeather(){

  	navigator.geolocation.getCurrentPosition(function(position){
  		var lat = position.coords.latitude;
  		var lon = position.coords.longitude;
  		var loc = lat + "," + lon;
  		getWS(loc);
  	});

  	function getWS(loc){

  		$.simpleWeather({
  			location: loc,
  			unit: "f",
  			success: function(weather){
  				var html = "<h1>" +
  				weather.temp +
  				"&deg;F</h1>" +
  				"<h2>" +
  				weather.city +
  				"," +
  				weather.region +
  				"</h2>";

  				$(".item-weather").html(html);
  			},
  			error: function(error){
  				console.log(error);
  			}
  		});
  	}
  }

  function getArticles(){
  	$.get("http://dash.jaylaiche.com/proxy.php?yws_path=svc/mostpopular/v2/mostviewed/all-sections/1?api-key=568503f1ab8b3cc36369c8c018852c72:17:72461535",
  		function(data){
  			var results = data.results;
  			for(var i = 0; i < 5; i++){
  				var title = results[i].title;
  				var url   = results[i].url;
  				var $link  = $("<a>");
  				$link.attr('href', url);
  				$link.html(title);
  				$(".item-news").append($link);
  			}
  		});
  }

  // fire it up
  loadDash();
})();
