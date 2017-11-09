$(document).ready(function() { 
	$('#loadingDiv').hide();

  $("#update-button").on("click", function() { 
  	$('#loadingDiv').show();	
  	if ($("#sp-toggle").prop("checked")) {
  		$.get( "http://" + SERVER + ":" + NODEPORT + "/update_from_local", function(data) { 
	 	 	if(data.code != undefined) {
	 	   	$("#myTabContent").prepend('<div class="alert alert-dismissible alert-danger"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Oops..!</p></strong> <p>Something went wrong...</p> Error: ' + data.code + '</div>');	
	 	 	}
	 	 	else {
	 	 		$("#myTabContent").prepend('<div class="alert alert-dismissible alert-success"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Local environment updated</p></strong> <p>Your data base is up-to-date</p></div>');
	 	 	}
	 	 	$('#loadingDiv').hide();
	  	});
  	}
  	if ($("#tables-toggle").prop("checked")) {
  		var fileName = $("#file-name").val();
  		$.post( "http://" + SERVER + ":" + NODEPORT + "/run_revision", { file : fileName },function(data) {
  			if(data.code != undefined) {
	 	   		$("#myTabContent").prepend('<div class="alert alert-dismissible alert-danger"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Oops..!</p></strong> <p>Something went wrong...</p> Error: ' + data.code + '</div>');	
	 	 		}
	 	 		else {
	 	 			$("#myTabContent").prepend('<div class="alert alert-dismissible alert-success"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Local environment updated</p></strong> <p>Your data base is up-to-date</p></div>');
	 	 		}
	 	 		$('#loadingDiv').hide();
  		});
  	}
  });
});
