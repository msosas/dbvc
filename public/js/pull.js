$(document).ready(function() { 

	htmlWarnMsg = '<div class="alert alert-dismissible alert-warning"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Warning!</p></strong> <p>You have uncommited changes. You CANT PULL</p></div>';
	htmlSucsMsg = '<div class="alert alert-dismissible alert-success"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Done...!</p></strong> <p>New code has been pull</p></div>';
	htmlErrMsg = '<div class="alert alert-dismissible alert-danger"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Oops..!</p></strong> <p>Something went wrong...</p><span id="error"></span></div>';

	$("#dev-pull-button").on("click", function() { 
	 	$.get( "http://" + SERVER + ":" + NODEPORT + "/pull_from_dev", function(data) {  
	 		console.log("data.code")
	   	if (data.code != undefined) {
	   		$("#myTabContent").prepend(htmlErrMsg);
	   		$("#error").prepend("Error: " + data.code);
	   	}
	   	else {
	   	 	if(data == "Changes uncommited") {
	 			 	$("#myTabContent").prepend(htmlWarnMsg);
	 		 	}
	 		 	else {
	 				$("#myTabContent").prepend(htmlSucsMsg);
	 			}
	   	}
	 }); 	
  });
  $("#master-pull-button").on("click", function() { 
	  $.get( "http://" + SERVER + ":" + NODEPORT + "/pull_from_master", function( data ) {  
	 		if (data.code != undefined) {
	   		$("#myTabContent").prepend(htmlErrMsg);
	   		$("#error").prepend("Error: " + data.code);
	   	}
	   	else {
	   	 	if(data == "Changes uncommited") {
	 			 	$("#myTabContent").prepend(htmlWarnMsg);
	 		 	}
	 		 	else {
	 				$("#myTabContent").prepend(htmlSucsMsg);
	 			}
	   	}
	 }); 	
  });
});