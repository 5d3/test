if (typeof jQuery != 'undefined') {
  console.log("jQuery.version is: " + jQuery.fn.jquery);
}


window.addEventListener('DOMContentLoaded', (event) => {
    console.log('window.DOM fully loaded and parsed');
});

window.addEventListener('load', (event) => {
    console.log('window.load - DOM fully loaded and parsed');
});

window.onload = () => {
  console.log("window.onload");
  var vid1 = $("#my-player").get(0);
}

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('document.DOM fully loaded and parsed');
});

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

  if(vid.textTracks[0]) {
    $(vid.textTracks[0]).on("cuechange", () => {
      console.log("oncuechange fired.");
    });
    
    $(vid.textTracks).on("change", (e) => {
      console.log("onchange fired.");
    });
    $(vid.textTracks).on("addtrack", (e) => {
      console.log("onaddtrack fired.");
    });
    
    
    
    
    $(vid).on("addtrack", (e) => {
      console.log("onaddtrack fired.");
    });
    
    vid.textTracks.addEventListener("addtrack", function(e) {console.log("addtrack fired.")}, false);
    
    
    vid.textTracks[0].onchange = () => {

      if(vid.textTracks[0].cues) {
        $.each(vid.textTracks[0].cues, (index, cue) => {
          console.log(cue);
          console.log(index + " : " + cue.startTime + " : " + cue.endTime + " : " + cue.text);
          var msg = cue.text + "</li>";
          $(sub).append("<div>" + cue.text + "</div>");
        });
      }
    }
  }
  
  //--------------------delete
  $(vid).on("addtrack", () => {
    console.log("addTrack fired!!!!!!!!!!!!");
  });
  
  $(vid).on("timeupdate", () => {   //use the $() to wrap a DOM to a jQuery-wrapped DOM element.
    //player.displayCaptions();
    console.log("--" + vid.currentTime + "/" + vid.duration + " : " + vid.textTracks[0] + " crossOrigin: " + vid.crossOrigin );$
    if(vid.currentTime > 15){
      vid.currentTime = 0;
    }
    if(vid.textTracks[0].activeCues && vid.textTracks[0].activeCues.length > 0) {
      var sub0 = vid.textTracks[0].activeCues[0];
      console.log("====" + sub0.text);
      sub[0].innerText = sub0.text;
    }
  }); 
  
  
  


const videoElement = document.querySelector('video');

videoElement.textTracks.addEventListener('addtrack', (event) => {
  console.log(`Video track: ${event.track.label} added`);
});
























});		