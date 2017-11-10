$(document).ready(function() { 

	$.getJSON("http://" + SERVER + ":" + NODEPORT + "/server_info").done(function(data) { 

		$("#db-server").append(data[0]);
		$("#db-port").append(data[1]); 
		for (var i = 2; i < data.length; i++) {
			$("#remote-list").append("<li>" + data[i] + "</li>"); 	
		}		
	});


	$("#save-button").click(function() {
		var pAlias =  document.getElementById("alias-box").value;
		var pUrl = document.getElementById("url-box").value;
		$.post("http://" + SERVER + ":" + NODEPORT + "/set_remote", { alias : pAlias, url : pUrl }, function(data) {
			if(data.code != undefined) {
				$("#myTabContent").prepend('<div class="alert alert-dismissible alert-danger"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Oops..!</p></strong> <p>Something went wrong...</p> Error: ' + data.code + ' </div>');
			}
			else {
				$("#myTabContent").prepend('<div class="alert alert-dismissible alert-success"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Done!</p></strong> <p>New remote repository added</p></div>');
			}
		});
	});
});

