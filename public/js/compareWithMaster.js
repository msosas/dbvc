$(document).ready(function() { 
  // ---------------  Request table content ---------------------------
  htmlErrMsg = '<div class="alert alert-dismissible alert-danger"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Oops..!</p></strong> <p>Something went wrong...</p><span id="error"></span></div>'
  htmlNoFilesMsg = '<p style="margin-left: 45%; margin-top:17%;">No files</p>';
  $(".jumbotron").hide();

  $.getJSON( "http://" + SERVER + ":" + NODEPORT + "/compare_with_master", function( data ) {   
    $.when(data).done(function(){
      $('#loadingDiv').hide();
      $(".jumbotron").show();
    }); 
    if (data.code != undefined) {
      $("#myTabContent").prepend(htmlErrMsg);
      $("#error").prepend("Error: " + data.code);
      $(".jumbotron").hide();
    }
    else { 
      var noSqlFiles = true;    
      if (data.length == 0 ) {
        $(".status_content").append(htmlNoFilesMsg);
      }
      else { 
        for (var i = 0; i < data.length; i++) {
          if(data[i].toString().search("sql+") > -1) {
            noSqlFiles = false;
            $(".status_content").append("<ul style='margin-right: 45%;'><li id='file_" + i + "'>" + data[i].toString() + "</li></ul>")
        
            if(data[i].toString().search("^\\sD\\s") > -1) { 
              $("#file_" + i).css("background-color", "#FF5252");
            }
            else {
              if(data[i].toString().search("^\\sM\\s") > -1) { 
                $("#file_" + i).css("background-color", "#FFC107");
              } 
              else { 
                $("#file_" + i).css("background-color", "#CDDC39  ");
              }
            }                                      
          }
        }
        if(noSqlFiles) {
          $(".status_content").append(htmlNoFilesMsg);
        }
      }       
    }
  });
});