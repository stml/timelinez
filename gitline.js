var projectname = '';
var username = '';
var prevurl = '';
var updateinterval = '1000'

$(document).ready(function() {
	$('#container').prepend('<p>Loading...</p>');
	setInterval("getTimeline()", updateinterval);
	});
	
function getTimeline() {
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
	if (event.url != prevurl) {
		if (event.type == 'PushEvent') { pushEvent(event); }
		prevurl = event.url;
		}
	}

function pushEvent(event) {
	$('#container').prepend('<p id="'+event.payload.head+'"><a href="'+event.repository.url+'/commit/'+event.payload.head+'">Push</a>: '+event.actor_attributes.name+' (<a href="https://github.com/'+event.actor_attributes.login+'">'+event.actor_attributes.login+'</a>) pushed to <a href="'+event.repository.url+'">'+event.repository.name+'</a> at '+event.created_at+'</p>');
	$.getJSON(event.repository.url+'/commit/'+event.payload.head+'.json?callback=?', function(commitdata) {
		var diffstring = '';
		$.each(commitdata.commit.modified, function(i,mod) {
			$('#'+event.payload.head).append('<p class="diff">'+mod.filename+': '+mod.diff);
			});
  		});
	}
