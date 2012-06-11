var projectname = '';
var username = '';
var prevurl = '';
var updateinterval = '5000'

$(document).ready(function() {
	$('#container').prepend('<p>Loading...</p>');
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
		printEvent(data[0]);
  		});
	}
	
// Github Types:
// PushEvent: 	
	
function printEvent(event) {
	console.log(event.type);
	if (event.url != prevurl) {
		if (event.type == 'PushEvent') {
			$('#container').prepend('<p id="'+event.payload.head+'"><a href="'+event.repository.url+'/commit/'+event.payload.head+'">Push</a>: '+event.actor_attributes.name+' (<a href="https://github.com/'+event.actor_attributes.login+'">'+event.actor_attributes.login+'</a>) pushed to <a href="'+event.repository.url+'">'+event.repository.name+'</a> at '+event.created_at+'</p>');
			}
		prevurl = event.url;
		}
	}