if (typeof jQuery != 'undefined') {
  console.log("jQuery.version is: " + jQuery.fn.jquery);
}

$(document).ready(function(){
  $("#my-player").on("timeupdate", () => {
    //player.displayCaptions();
    console.log("--"); 
  });
  //var vid = document.getElementById("my-player");

  var vid = $("#my-player").get(0); //the jQuery method of get(0) returns the DOM element itself
  $(vid).on("timeupdate", () => {   //use the $() to wrap a DOM to a jQuery-wrapped DOM element.
    //player.displayCaptions();
    console.log("--" + vid.currentTime + "/" + vid.duration + " : " + vid.textTracks[0] + " crossOrigin: " + vid.crossOrigin );
    if(vid.currentTime > 15){
      vid.currentTime = 0;
    }
  }); 
  
  //var sub = document.createElement( "div" );
  sub = $("<div>Hello jQuery</div>");
  sub.addClass("subtitle");

  $(vid).after(sub);

});		