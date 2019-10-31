
$(document).ready(function(){
  if (typeof jQuery != 'undefined') {
    console.log("jQuery.version is: " + jQuery.fn.jquery);
  }

  $("#my-player").on("timeupdate", () => {
    //player.displayCaptions();
    console.log("--"); 
  });
  //var vid = document.getElementById("my-player");

  var vid = $("#my-player");
  vid.on("timeupdate", () => {
    //player.displayCaptions();
    console.log("--" + vid[0].currentTime + "/" + vid[0].duration + " : " + vid[0].textTracks[0] + " crossOrigin: " + vid[0].crossOrigin );
    if(vid[0].currentTime > 15){
      vid[0].currentTime = 0;
    }
  }); 
});		