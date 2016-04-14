

$(document).ready(function(){
    addAudioFile();
    animateHead();
    if($('.cta a').hasClass('hide')){
        console.log("fire get loginresult")
        
        getLoginResult();
        $('.status').text("Finding your bae....");
        $('.status').each(function() {
            var elem = $(this);
            var interval = setInterval(function() {
                if (elem.css('visibility') == 'hidden') {
                    elem.css('visibility', 'visible');
                } else {
                    elem.css('visibility', 'hidden');
                }    
            }, 500);
        });   
 }
    
    //animation for the dog
    
  
  function animateHead()
  {
      var angle = 0;
    var direction = 1;
  setInterval(function(){
    if(angle >=20){
        direction = -1;
    }else if(angle<= -20){
        direction = 1;
    }
       angle+=direction*5;
  $('.baehead').rotate(angle);
  },100);
  }
  function getLoginResult(){
      console.log("get the result");
      $.ajax({
        url: '/mail',
        success: success,
        dataType: 'json'
      });
  }
  
  function success(result){
      console.log("Has the result"+result.result);
      console.log(result)
      $('#result').text("Your Bae is: "+result.result);
      $('#result').removeClass("hide").addClass("show"); 
  }
  
  function addAudioFile(){
         var soundFile = document.createElement("audio");
        soundFile.preload = "auto";

        //Load the sound file (using a source element for expandability)
        var src = document.createElement("source");
        src.src = '../audio/thug.mp3';
        soundFile.appendChild(src);

        //Load the audio tag
        //It auto plays as a fallback
        soundFile.load();

        soundFile.play();
  }
})