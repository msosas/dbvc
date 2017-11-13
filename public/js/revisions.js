$(document).ready(function() { 
  htmlErrMsg = '<div class="alert alert-dismissible alert-danger"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Oops..!</p></strong> <p>Something went wrong...</p><span id="error"></span></div>';
  htmlScsMsg = '<div class="alert alert-dismissible alert-success"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Done!</p></strong> <p>Revision file saved</p></div>';
  $('#loadingDiv').hide();
  $("#save-button").on("click", function() { 
  	var revCode = $("#revision-code").val();
    var fileName = $("#file-name").val();
    $.post("http://" + SERVER + ":" + NODEPORT + "/save_file", { revision : revCode,  file : fileName }, function(data) {
      if (data.code != undefined) {
        $("#myTabContent").prepend(htmlErrMsg);
        $("#error").prepend("Error: " + data.code);
      }
      else {
        $("#myTabContent").prepend(htmlScsMsg);
      }     
    });
  });
});
