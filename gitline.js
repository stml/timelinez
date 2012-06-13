var projectname = '';
var username = '';
var prevurl = '';
var updateinterval = '5000'

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
	$('#container').prepend('<div class="commit" id="'+event.payload.head+'"><p class="event"><strong><a href="https://github.com/'+event.actor_attributes.login+'">'+event.actor_attributes.login+'</a></strong> <a href="'+event.repository.url+'/commit/'+event.payload.head+'">pushed</a> to <a href="'+event.repository.url+'">'+event.repository.name+'</a> at '+event.created_at+'</p></div>');
	$.getJSON(event.repository.url+'/commit/'+event.payload.head+'.json?callback=?', function(commitdata) {
		var diffstring = '';
		$.each(commitdata.commit.modified, function(i,mod) {
			$('#'+event.payload.head).append('<p class="diff"><strong>'+mod.filename+':</strong><br>'+addlines(htmlencode(mod.diff)));
			$('#'+event.payload.head).css("background-image","http://www.gravatar.com/avatar/"+event.actor_attributes.gravatar_id+"?s=512");
			});
  		});
	}
	
function htmlencode(str) {
    return str.replace(/[&<>"']/g, function($0) {
        return "&" + {"&":"amp", "<":"lt", ">":"gt", '"':"quot", "'":"#39"}[$0] + ";";
		});
	}

function addlines(str) {
	str = str.replace(" @@","<br><strong>@@</strong>");
	str = str.replace(/\+/g,"<br><strong>+</strong>&nbsp;&nbsp;&nbsp;");
	str = str.replace(/\-/g,"<br><strong>-</strong>&nbsp;&nbsp;&nbsp;");
	return str;
	}
