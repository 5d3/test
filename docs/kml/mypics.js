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





  var pics = ["IMG_20231114_085806", "IMG_20231114_085821"];
  pics = $(".section1 img").attr("pics");
  
  var iI = 0;



    //$(".section1 a").on("click", (evt) => {
      $("body").on("click", (evt) => {
      var poster = $(evt.target).attr("src");
      //console.log(".kml a, clicked");
      var width = $(window).width();
      var x = evt.pageX;

      var strings = $(".section1 img").attr("pics");
      pics = strings.split(",");

      
      if (x > width/2) {
        iI = iI + 1;
        iI>= pics.length-1 ? iI = pics.length-1 : iI;
      } else {
        iI = iI - 1;
        iI<= 0 ? iI = 0 : iI;
      }
      picObj = $(".section1 img")[0];
      picObj.src = pics[iI]+".jpg";
    });








    $(".video-list a").on("click", (evt) => {
      var vName = $(evt.target)/*.find("img.thumb")*/.attr("vName");  //the evt.target is the <img> element instead the <a> element
      //if $("...").find("img") return a prevObject, it might indicate that its parent node contains the expected element.
      var vttName = $(evt.target).attr("vttname");
      var poster = $(evt.target).attr("src");



      $.each($(evt.target.parentNode).siblings(), (index, node) => {
        //console.log( index, node );
        $(node).show();
      });
      //$(evt.target.parentNode).hide();
      


      $("#video-container-bg .video-container .video-bg").prepend('<video class="my-player" controls preload="auto" poster="' + poster + '" data-setup="{}"></video>');
      var my_v = $("#video-container-bg .video-container .video-bg .my-player").get(0);

      
      
      $(my_v).prepend('<source src="' + vName + '" type="video/mp4">' + '<track kind="subtitles" src="' + vttName + '" srclang="en" label="English&amp;Chinese" default>');
      console.log($("#video-container-bg .video-container .video-bg .my-player track").get(0));
      $("#video-container-bg .video-container .video-bg .my-player track").get(0).onload = (evtt) => {
        console.log("onload");
        console.log(evtt.target.track);



        $.each(evtt.target.track.cues, (index, cue) => {
          console.log(cue);
          console.log(index + " : " + cue.startTime + " : " + cue.endTime + " : " + cue.text);

          $(sub).append("<a href='javascript:void(0)'><div starttime=" + cue.startTime + " endTime=" + cue.endTime + ">" + cue.text + "</div></a>");
        });

      
        $("#video-container-bg .subtitle a").on("click", (evt) => {
          var startTimeOfSelectedCue = $(evt.target).attr("startTime");

          my_v.currentTime = startTimeOfSelectedCue;
          evt.stopPropagation();
        });
        /*
        $("#video-container-bg .video-container .my-player track").get(0).onloadedmetadata =  (evv) => {
          var trk = this.track;
          console.log(trk);
        }; */
      };
      
      
      
      my_v.textTracks.onload = (ev) => {  //for test
        console.log("load");
      }
      my_v.textTracks.onchange =  (ev) => { //for test
        console.log("onchange");
        console.log(ev.target);
        console.log(ev.target.length);
      };
      
      my_v.textTracks.onaddtrack = (ev) => {  //for test
        console.log("onaddtrack");
        console.log(ev.target);
        console.log(ev.target.length);
        console.log(ev.target[0]);
        
      };

      
      var sub = $("<div>Hello jQuery</div>");
      sub.addClass("subtitle");
      var v_bg = $("#video-container-bg .video-container .video-bg").get(0);
      $(v_bg).after(sub);
      
      
      $(my_v.textTracks[0]).on("cuechange", (ev) => {

        console.log("oooooooooooooncuechange fired. " + (ev.currentTarget.activeCues.length > 0 ? ev.currentTarget.activeCues[0].text : ev.currentTarget.activeCues));

        if(ev.currentTarget.activeCues.length > 0) {
          //var idx = getCueIndex(my_v.textTracks[0].cues, ev.currentTarget.activeCues[0].startTime);
          var idx;
          $.each( my_v.textTracks[0].cues, (index, cue) => {
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
    
      
      /*
      $(my_v).on("timeupdate", () => {   //use the $() to wrap a DOM to a jQuery-wrapped DOM element.
  //-------      console.log("--" + vid.currentTime + "/" + vid.duration + " : " + vid.textTracks[0] + " crossOrigin: " + vid.crossOrigin );$
        //if(vid.currentTime > 15){
        //  vid.currentTime = 0;
        //}
        if(my_v.textTracks[0].activeCues && my_v.textTracks[0].activeCues.length > 0) {
          var sub0 = my_v.textTracks[0].activeCues[0];
  //-------        console.log("====" + sub0.text);
          //sub[0].innerText = sub0.text;
        }
      });
      */
      
      
      $("#video-container-bg").show();
      my_v.play();
      //console.log("hidden: " + $(evt.target.parentNode).is(":hidden"));
      //console.log("visible: " + $(evt.target.parentNode).is(":visible"));

      return "abc";
    });



    $("#video-container-bg").on("click", (evt) => {
      $("#video-container-bg").hide();
      $("#video-container-bg .video-container .video-bg").children().remove();
      $("#video-container-bg .video-container .video-bg").siblings().remove();
    });

}




document.addEventListener('DOMContentLoaded', (event) => {
    console.log(1, 'document.DOM fully loaded and parsed');
});

$(document).ready(function(){
  console.log(3, 'document.ready fully loaded and parsed');















});		