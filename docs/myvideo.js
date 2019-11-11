if (typeof jQuery != 'undefined') {
  console.log("jQuery.version is: " + jQuery.fn.jquery);
}


window.addEventListener('DOMContentLoaded', (event) => {
    console.log('2, window.DOM fully loaded and parsed');
});

window.addEventListener('load', (event) => {
    console.log('4, window.load - DOM fully loaded and parsed');
    var vid1 = $("#my-player").get(0);
});

window.onload = () => {
  console.log("5, window.onload");

  var vid = $(".my-player").get(0); //the jQuery method of get(0) returns the DOM element itself
  var sub = $("<div>Hello jQuery</div>");
  if(vid.textTracks[0]) {
    $(vid.textTracks[0]).on("cuechange", (ev) => {
      console.log(vid);
      console.log("oooooooooooooncuechange fired. " + (ev.currentTarget.activeCues.length > 0 ? ev.currentTarget.activeCues[0].text : ev.currentTarget.activeCues));

      if(ev.currentTarget.activeCues.length > 0) {
        //var idx = getCueIndex(vid.textTracks[0].cues, ev.currentTarget.activeCues[0].startTime);
        var idx;
        $.each( vid.textTracks[0].cues, (index, cue) => {
          console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA: " + index + "    " + cue.startTime + "  " + ev.currentTarget.activeCues[0].startTime);
          if(cue.startTime == ev.currentTarget.activeCues[0].startTime) {
            idx = index;
            console.log("-------------------------------- " + idx + " " + index);
          }
        })
        console.log("PPPPPP " + idx);
        
        $(".currentsub").removeClass("currentsub"); //remove the class for the previous cue.
        var div = $(".subtitle div").get(idx);
        $(div).toggleClass("currentsub");   // set the class for the current cue.
        console.log("TTTTTTTTTTTTTTT:" + div.offsetTop);
        console.log("TTTTTTTTTTTTTTT:" + div.offsetParent);

        var pos = $(div).position().top;
        //$(sub).scrollTop = $(sub).scrollTop + $(div).clientHight;
        $(sub).get(0).scrollTop = div.offsetTop - $(sub).get(0).offsetTop - $(sub).get(0).offsetHeight/2;
        
        console.log("VVVVVVVVV Body, offsetTop: " + $("body").get(0).offsetTop);
        console.log("VVVVVVVVV H1, offsetTop: " + $("body").get(0).offsetTop);
        console.log("VVVVVVVVV Video, offsetTop: " + $("video").get(0).offsetTop);
        console.log("VVVVVVVVV Subtitle, offsetTop: " + $(sub).get(0).offsetTop);
        console.log("VVVVVVVVV offsetHeight: " + $(sub).get(0).offsetHeight);
        console.log("VVVVVVVVV offsetTop: " + div.offsetTop);

        console.log("VVVVVVVVV scrollTop: " + $(sub).get(0).scrollTop);
        
//        $(sub).animate({scrollTop: div.offsetTop},3);
      } else {  //the length == 0, which means a cue reached its stopTime, it's a time point to clear ".currentsub" class
        //$(".currentsub").toggleClass("currentsub");
      }
    });
  
    function getCueIndex(cues, startTime) {
      console.log("BBBBBBBBBBBBBBB: " + cues.length);
      $.each( cues, (index, cue) => {
        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAA: " + index + "    " + cue.startTime + "  " + startTime);
        if(cue.startTime == startTime) {
          var idx = index;
          console.log("-------------------------------- " + idx + " " + index);
          return idx;
        }
      })
      
    }


    sub.addClass("subtitle");
    $(vid).after(sub);

    if(vid.textTracks[0].cues) {
      $.each(vid.textTracks[0].cues, (index, cue) => {
        console.log(cue);
        console.log(index + " : " + cue.startTime + " : " + cue.endTime + " : " + cue.text);

        $(sub).append("<a href='#'><div starttime=" + cue.startTime + " endTime=" + cue.endTime + ">" + cue.text + "</div></a>");
      });
    }
      
    $(vid).on("timeupdate", () => {   //use the $() to wrap a DOM to a jQuery-wrapped DOM element.
//-------      console.log("--" + vid.currentTime + "/" + vid.duration + " : " + vid.textTracks[0] + " crossOrigin: " + vid.crossOrigin );$
      //if(vid.currentTime > 15){
      //  vid.currentTime = 0;
      //}
      if(vid.textTracks[0].activeCues && vid.textTracks[0].activeCues.length > 0) {
        var sub0 = vid.textTracks[0].activeCues[0];
//-------        console.log("====" + sub0.text);
        //sub[0].innerText = sub0.text;
      }
    });
    
    $("a").on("click", (evt) => {
      var startTimeOfSelectedCue = $(evt.target).attr("startTime");

      vid.currentTime = startTimeOfSelectedCue;
    });
  }
}




document.addEventListener('DOMContentLoaded', (event) => {
    console.log(1, 'document.DOM fully loaded and parsed');
});

$(document).ready(function(){
  console.log(3, 'document.ready fully loaded and parsed');















});		