$(document).ready(function() { 

	$("#dev-pull-button").on("click", function() { 
	 	$.get( "http://" + SERVER + ":" + NODEPORT + "/pull_from_dev", function(data) {  
	 		console.log(data.code);
	   	if (data.code != undefined) {
	   		$("#myTabContent").prepend('<div class="alert alert-dismissible alert-danger"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Oops..!</p></strong> <p>Something went wrong...</p> Error: ' + data.code + ' </div>');
	   	}
	   	else {
	   	 	if(data == "Changes uncommited") {
	 			 	$("#myTabContent").prepend('<div class="alert alert-dismissible alert-warning"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Warning!</p></strong> <p>You have uncommited changes. You CANT PULL</p></div>');
	 		 	}
	 		 	else {
	 				$("#myTabContent").prepend('<div class="alert alert-dismissible alert-success"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Done...!</p></strong> <p>New code has been pull</p></div>');
	 			}
	   	}
	 }); 	
  });
  $("#master-pull-button").on("click", function() { 
	  $.get( "http://" + SERVER + ":" + NODEPORT + "/pull_from_master", function( data ) {  
	 		if (data.code != undefined) {
	   		$("#myTabContent").prepend('<div class="alert alert-dismissible alert-danger"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Oops..!</p></strong> <p>Something went wrong...</p> Error: ' + data.code + ' </div>');
	   	}
	   	else {
	   	 	if(data == "Changes uncommited") {
	 			 	$("#myTabContent").prepend('<div class="alert alert-dismissible alert-warning"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Warning!</p></strong> <p>You have uncommited changes. You CANT PULL</p></div>');
	 		 	}
	 		 	else {
	 				$("#myTabContent").prepend('<div class="alert alert-dismissible alert-success"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Done...!</p></strong> <p>New code has been pull</p></div>');
	 			}
	   	}
	 }); 	
  });
});