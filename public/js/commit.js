
$(document).ready(function() { 

  $("#save-button").on("click", function() { 
    var htmlMessage =  document.getElementsByName("message")[0].value;
    $.post("http://" + SERVER + ":" + NODEPORT + "/commit", { message : htmlMessage}, function(data) {
      console.log(data);
      if(data.code !== undefined) {
        $("#myTabContent").prepend('<div class="alert alert-dismissible alert-danger"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Oops..!</p></strong> <p>Something went wrong...</p> Error: ' + data.code + ' </div>');
      }
      else {
        if(data == "No changes to commit") {
          $("#myTabContent").prepend('<div class="alert alert-dismissible alert-warning"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Hey...!</p></strong> <p>There are no changes to commit</p></div>');
        }
        else {
          $("#myTabContent").prepend('<div class="alert alert-dismissible alert-success"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Changes Commited!</p></strong> <p>Your changes were commited</p></div>');
        }      
      }  
    }); 	
  });
});
