$(document).ready(function() { 
  
  $.get("http://" + SERVER + ":" + NODEPORT + "/check", function() {

    $.get("http://" + SERVER + ":" + NODEPORT + "/get_db", function(data) {
      if(data == "mysql") {
        $("#navbar-title").html("<b> DISCONNECTED </b>");
        $(".panel panel-primary").hide();
      }
      else {
        $("#navbar-title").html("<b>" + data + " </b>");
      }
    });

  	$.getJSON("http://" + SERVER + ":" + NODEPORT + "/show_schemas", function(data) { 
      for (var i = 0; i < data.length; i++) {
        $("#db-buttons").append('<a id="db-button-"' + i + 'href="#" class="btn btn-default btn-lg btn-block btn-raised">' + data[i] + '</a>');
        $("#db-selector").append('<li id="db-button-"' + i + '><a href="#"><i class="material-icons">grade &nbsp;</i>' + data[i] + '</a></li>');
      }
      $("[id=db-button-]").click(function() { 
        $("#database-changed-message").hide();
        var database;
        if($(this).text().search("sga") > -1) {
          database = "sga";
        }
        else {
          if ($(this).text().search("ag") > -1) {
            database = "ruviag";
          }
          else {
            if ($(this).text().search("cons") > -1) {
              database = "ruvicons";
            }
            else {
              console.log($(this).text());
              if ($(this).text().search("poker") > -1) {
                database = "poker";
              }
              else {
                database = "ruviweb";
              }
            }
          }
        }
        
        $.post("http://" + SERVER + ":" + NODEPORT + "/set_db", {db: database })
        .done(function() {
          $("#myTabContent").prepend( '<div id="database-changed-message" class="alert alert-dismissible alert-success"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Done!</p></strong> <p>Database changed</p></div>');
          $.get("http://" + SERVER + ":" + NODEPORT + "/get_db", function(data) {
            $("#navbar-title").html("<b>" + data + " </b>");
          });
        })
        .fail(function() {
          $("#myTabContent").prepend('<div class="alert alert-dismissible alert-danger"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Oops..!</p></strong> <p>Something went wrong...</p></div>');
        })
      });
      $.get("http://" + SERVER + ":" + NODEPORT + "/get_user", function(data) {
        $("#navbar-user-name").append('<a><i class="material-icons">perm_identity &nbsp; </i> ' + data + '</a>');
      });

      $("#sync-button").click(function(data) {
        $(".jumbotron").prepend('<div id="loadingDiv" style="position: absolute; right: 50%; top: 50%; left: 50%;"> <div class="spinningCircle"></div> </div>');
        $.get( "http://" + SERVER + ":" + NODEPORT + "/status", function( data ) {   
          
          $.when(data).done(function(){
            $("#loadingDiv").hide();
            $("#myTabContent").prepend( '<div id="database-changed-message" class="alert alert-dismissible alert-success"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Done!</p></strong> <p>Files updated</p></div>');
          });
        });
      });
    });
  })
  .fail(function() {
  	$("#myTabContent").prepend('<div class="alert alert-dismissible alert-danger"><button type="button" class="close" data-dismiss="alert">×</button><strong><p>Oops..!</p></strong> <p>Something went wrong...</p></div>');
  	$(".jumbotron").hide();
  });
});
