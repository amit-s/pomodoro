$(document).ready(function(){
  
  /*$("#timerProgress").easyPieChart({
    size: 250,
    lineWidth: 20,
    lineCap: "butt"
  });
  $("#timerVal").flipcountdown({showHour:false});*/
  
  var isRunning = false,
      isSession = true,
      sessionCount = 0,
      interval;      

  $(".breakVal").on('click',setTime);
  $(".sessionVal").on('click',setTime);
  
  $("#start").on('click',function(){     
    if(isRunning === false){
      timer();
      $("#start").text("Reset");
    }else{
      clearInterval(interval);
      isRunning = false;
      isSession = true;
      sessionCount = 0;
      $("#start").text("Start");
      $("#plusB, #minusB").show();
      $("#plusS, #minusS").show();
      $("#sessionCount").text("0");
      $("#break").removeClass("pink");
      $("#session").removeClass("teal");
      $("#timerProgress").data("easyPieChart").update(0);
      $("#timerVal").flipcountdown({
      tick: "0000"      
      });      
    }
  }); // /#start click
  
function timer(){
    var breakVal = $("#breakVal").text(),
        sessionVal = $("#sessionVal").text(),
        buttonSelector = "",
        seconds,
        progressColor = "";

        if(isSession === true){
        seconds = Number(sessionVal) * 60;
        buttonSelector = "S";
        progressColor = "#008080";
        }else{
        seconds = Number(breakVal) * 60;
        buttonSelector = "B";
        progressColor = "#FF69B4";        
        }
  
    $("#plus"+buttonSelector+", #minus" + buttonSelector).hide();
    $("#timerProgress").easyPieChart({
    size: 250,
    barColor: progressColor,    
    lineWidth: 20,
    lineCap: "butt",
    scaleColor: false
  });
  
    isRunning = true;
  
    var timerChartChange = 100/seconds,        
        timerPercent = timerChartChange,
        start = new Date(2016, 1, 1, 0, 0, seconds);
  
  setTimeout(function(){
  $("#timerProgress").data("easyPieChart").options.barColor = progressColor;
    
    if(isSession === true){
        $("#break").removeClass("pink");
        $("#session").addClass("teal");
        sessionCount++;
        }else{
        $("#break").addClass("pink");
        $("#session").removeClass("teal");        
        }
    },2000);
    
    interval = setInterval(function(){
      var timeDisplay = "";
      timeDisplay = (start.getMinutes().toString().length<2 ? "0" + start.getMinutes().toString() : start.getMinutes().toString()) + (start.getSeconds().toString().length<2 ? "0" + start.getSeconds() : start.getSeconds());
  
      $("#timerProgress").data("easyPieChart").update(timerPercent);
      timerPercent += timerChartChange;
         
      $("#timerVal").flipcountdown({
        tick: timeDisplay      
      });
     
      start.setSeconds(start.getSeconds()-1);      
      seconds--;
      
    if(seconds < 0){
      playBell();
      clearInterval(interval);
      $("#plus"+buttonSelector+", #minus" + buttonSelector).show();
      isRunning = false;      
      isSession = !isSession;      
      $(".sessionCount").removeClass("sessionHide");
      $("#sessionCount").text(sessionCount);
      timer();
    }    
  },1000);  
  
 
} // /timer()

  function setTime(e){  
  var $target = $(e.target),      
      id = $target.parent().attr("class").split(" ")[0],
      currentTime = Number($("#" + id).text()),
      change = $target.attr("class");  
    
  if(change == "minus" && currentTime>1){
    $("#" + id).text(currentTime - 1);
  }  
  if(change == "plus" && currentTime>=1){
    $("#" + id).text(currentTime + 1);
  }
} // /setTime()
  
  function playBell(){
    var audio = document.getElementById("bell");
    audio.play();
  } // /playBell()
  
}); // /document ready