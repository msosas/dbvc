$(document).ready(function() { 
  // ---------------  Request branches ---------------------------

  $(".jumbotron").hide();
  $.getJSON( "http://" + SERVER + ":" + NODEPORT + "/branch", function( data ) {  
    if (data.code != undefined) {
      $("#myTabContent").prepend('<div class="alert alert-dismissible alert-danger"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Oops..!</p></strong> <p>Something went wrong...</p> Error: ' + data.code + ' </div>');
    } 
    else {
      $.when(data).done(function(){
        $('#loadingDiv').hide();
        $(".jumbotron").show();
        for (var i = 0; i < data.length; i++) {
          $("#branches-menu").append('<li id="branch-' + data[i] + '"><a href="javascript:void(0)" >' + data[i] + '</a></li>');
        }
      }); 

      $("[id^=branch-").on("click", function(){
        var selectedBranch = $(this).text();
        if(selectedBranch.search("^\\*") > -1) {
          selectedBranch = (selectedBranch.substr(2));  
        }
      
        $("#selected-branch").val(selectedBranch);
        $("#push-button").on("click", function() { 

          $.post("http://" + SERVER + ":" + NODEPORT + "/push", { localBranch: $("#selected-branch").val() }, function(data) {
            if (data.code != undefined) {
              $("#myTabContent").prepend('<div class="alert alert-dismissible alert-danger"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Oops..!</p></strong> <p>Something went wrong...</p> Error: ' + data.code + ' </div>');
            }
            else {
              $("#myTabContent").prepend('<div class="alert alert-dismissible alert-success"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Done!</p></strong> <p>Your code was push</p></div>');
            }
          });       
        });
      });
    }
  });
});