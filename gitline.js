var projectname = '';
var username = '';
var prevurl = '';
var updateinterval = '1000'

$(document).ready(function() {
	getTimeline();
	setInterval("getTimeline()", updateinterval);
	});
	
function getTimeline() {
	console.log('checking');
	if (projectname == '' && username == '') {
		var url = "https://github.com/timeline.json?callback=?";
		}
	else {
		var url = "https://github.com/timeline.json?callback=?";
		}
	$.getJSON(url, function(data) {
		printEvent(data);
  		});
	}
	
function printEvent(data) {
	if (data[0].url != prevurl) {
		$('#container').prepend('<p>'+data[0].url+'</p>');
		prevurl = data[0].url;
		}
	}