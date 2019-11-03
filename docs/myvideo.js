if (typeof jQuery != 'undefined') {
  console.log("jQuery.version is: " + jQuery.fn.jquery);
}

$(document).ready(function(){
  $("#my-player").on("timeupdate", () => {
    //player.displayCaptions();
    console.log("--"); 
  });
  
  
    //var sub = document.createElement( "div" );
  
  
  //var vid = document.getElementById("my-player");

  var vid = $("#my-player").get(0); //the jQuery method of get(0) returns the DOM element itself
  var sub = $("<div>Hello jQuery</div>");
  sub.addClass("subtitle");
  $(vid).after(sub);
  var sub_ul = $("<ul></ul>");
  if(vid.textTracks[0].cues) {
    $.each(vid.textTracks[0].cues, (index, cue) => {
      console.log(cue);
      console.log(index + " : " + cue.startTime + " : " + cue.endTime + " : " + cue.text);
      var msg = cue.text + "</li>";
      $(sub).append("<div>" + cue.text + "</div>");
    });
  }
  
  $(vid).on("timeupdate", () => {   //use the $() to wrap a DOM to a jQuery-wrapped DOM element.
    //player.displayCaptions();
    console.log("--" + vid.currentTime + "/" + vid.duration + " : " + vid.textTracks[0] + " crossOrigin: " + vid.crossOrigin );
    if(vid.currentTime > 15){
      vid.currentTime = 0;
    }
    if(vid.textTracks[0].activeCues && vid.textTracks[0].activeCues.length > 0) {
      var sub0 = vid.textTracks[0].activeCues[0];
      console.log("====" + sub0.text);
      sub[0].innerText = sub0.text;
    }
  }); 
  
  
  



























});		