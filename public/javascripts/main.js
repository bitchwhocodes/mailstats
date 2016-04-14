

$(document).ready(function(){
    
    console.log("doc is ready")
   
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
    
    
})