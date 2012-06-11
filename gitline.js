$(document).ready(function() {
	var url = "https://github.com/timeline.json?callback=?";
	$.getJSON(url, function(data) {
		console.log(data);
  		});
	});