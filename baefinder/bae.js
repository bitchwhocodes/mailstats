var express = require('express');
var router = express.Router();
// var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var fs = require('fs');

//https://graph.microsoft.com/v1.0/me/mailFolders?$filter=displayName eq 'Sent Items' 
// https://graph.microsoft.com/v1.0/me/mailFolders/AAMkADczYTRmYWFjLWFjNjAtNDRiMC1iYTNhLWY0ZDUxN2Y3MGE0MgAuAAAAAAArl7kfqzYMS5c6NtcoKwa4AQAOp_SkTUtaQY-Oow8ABRr9AAAApHXFAAA=/messages

//https://graph.microsoft.com/v1.0/users/marybak@microsoft.com/photo/$value



/* GET home page. */
function determineBae(messages){
   
//   file = fs.readFileSync('public/temp.json').toString();
  file =JSON.stringify(messages);
//   return(file);
//   console.log(file)
  data = JSON.parse(file);
//   data = data['value'];
//   console.log(data);
  totalReceived= data.length;
  var From = {};
  var afterHoursReceived={};
  var totalAfterReceived = 0;
  for(var i = 0; i <data.length; i++){
      data[i]= JSON.parse(data[i]);
      var date = convertDateTime(data[i]['DateTimeReceived']).toString();
      var day = date.split(" ")[0];
      if(day =="Sat" ||day =="Sun"){
          totalAfterReceived +=1;
          if(!afterHoursReceived[data[i]['From']['EmailAddress']['Name']]){
            afterHoursReceived[data[i]['From']['EmailAddress']['Name']] = 1;
          }
          else{
            afterHoursReceived[data[i]['From']['EmailAddress']['Name']] += 1;
          }
      }
      if(!From[data[i]['From']['EmailAddress']['Name']]){
          From[data[i]['From']['EmailAddress']['Name']] = 1;
      }
      else{
          From[data[i]['From']['EmailAddress']['Name']] += 1;
      }
      
  }
  var scores = {};
  var scoresAfterHours = {};
  for(var i=0; i<Object.keys(From).length; i++){
      name = Object.keys(From)[i];
      percentReceived = From[name]/totalReceived;
      scores[name] = percentReceived;
  }
  for(var i=0; i<Object.keys(afterHoursReceived).length; i++){
      name = Object.keys(afterHoursReceived)[i];
      percentReceived = afterHoursReceived[name]/totalReceived;
      scoresAfterHours[name] = percentReceived;
  }
  var totalScores={};

  for(var i =0; i<Object.keys(scores).length; i++){
      name = Object.keys(scores)[i];
      totalScores[name] = scores[name];
  }
  var bool = false;
  for(var i =0; i<Object.keys(scoresAfterHours).length;i++) {
      name = Object.keys(scoresAfterHours)[i];
      if(1 <= scoresAfterHours[name] <=2){
          bool=true;
          if(!totalScores[name]){
              totalScores[name] = scoresAfterHours[name];
          }
          else{
            totalScores[name] += scoresAfterHours[name];
          }
      }
  }
   var bae = Object.keys(totalScores)[0];
   if(bool==true){
      var min = Math.abs(2 - totalScores[Object.keys(totalScores)[0]]);
      for(i =1; i<Object.keys(totalScores).length;i++){
            name = Object.keys(totalScores)[i]
         var diff = Math.abs(2 - totalScores[name])
         if(diff< min){
             bae = name;
         }
     }
  }
  else{
        var min = Math.abs(1 - totalScores[Object.keys(totalScores)[0]]);

        for(i =1; i<Object.keys(totalScores).length;i++){
            name = Object.keys(totalScores)[i];
            var diff = Math.abs(1 - totalScores[name]);
            console.log(diff);
            if(diff< min){
                bae = name;
            }
         }
  }
  return(bae);

//   if(bool==true){
//       var min = Math.abs(2 - totalScores[Object.keys(totalScores)[0]]);
//       for(i =1; i<Object.keys(totalScores).length;i++){
//             name = Object.keys(totalScores)[i]
//          var diff = Math.abs(2 - totalScores[name])
//          if(diff< min){
//              bae = name;
//          }
//      }
//   }
//   else{
//         var min = Math.abs(1 - totalScores[Object.keys(totalScores)[0]]);

//         for(i =1; i<Object.keys(totalScores).length;i++){
//             name = Object.keys(totalScores)[i];
//             var diff = Math.abs(1 - totalScores[name]);
//             console.log(diff);
//             if(diff< min){
//                 bae = name;
//             }
//          }
//   }
    

  
//   var sent = {};
// //   fileSent = fs.readFileSync('public/sent.json').toString();
//   dataSent = JSON.parse(fileSent);
//   dataSent = dataSent['value'];
//   totalSent = dataSent.length;
//   var totalAfterSent = 0
//   afterHoursSent = {};
//     for(var i = 0; i < dataSent.length; i++){
//         emails = dataSent[i]['toRecipients']
//         var date = convertDateTime(dataSent[i]['sentDateTime']).toString();
//         var day = date.split(" ")[0];
//         if(day =="Sat" || day =="Sun"){
//             totalAfterSent+=1;
//              for(var k =0; k<emails.length; k++){
//                 if(!afterHoursSent[emails[k]['EmailAddress']['name']]){
//                     afterHoursSent[emails[k]['EmailAddress']['name']] = 1;
//                 }
//                 else{
//                     afterHoursSent[emails[k]['EmailAddress']['name']] += 1;
//                 }
//             }
//         }
//         for(var k =0; k<emails.length; k++){
//             if(!sent[emails[k]['EmailAddress']['name']]){
//                 sent[emails[k]['EmailAddress']['name']] = 1;
//             }
//             else{
//                 sent[emails[k]['EmailAddress']['name']] += 1;
//             }
//         }
//     }
//   var scores= {};
//   for(var i=0; i<Object.keys(sent).length; i++){
//       name = Object.keys(sent)[i];
//       if(From[name]!=null){
//           percentReceived = From[name]/totalReceived;
//           percentSent = sent[name]/totalSent;
//           scores[name] = percentReceived/percentSent;         
//       }     
//   }
//   var scoresAfterHours= {};
//   for(var i=0; i<Object.keys(sent).length; i++){
//       name = Object.keys(afterHoursSent)[i];
//       if(afterHoursReceived[name]!=null){
//           percentReceived = afterHoursReceived[name]/totalAfterReceived;
//           percentSent = afterHoursSent[name]/totalAfterSent;
//           scoresAfterHours[name] = percentReceived/percentSent;         
//       }     
//   }
//   var totalScores = {};
//   for(var i =0; i<Object.keys(scores).length; i++){
//       name = Object.keys(scores)[i];
//       totalScores[name] = scores[name];
//   }
//   var bool = false;
//   for(var i =0; i<Object.keys(scoresAfterHours).length;i++) {
//       name = Object.keys(scoresAfterHours)[i];
//       if(1 <= scoresAfterHours[name] <=11){
//           bool=true;
//           if(!totalScores[name]){
//               totalScores[name] = scoresAfterHours[name];
//           }
//           else{
//             totalScores[name] += scoresAfterHours[name];
//           }
//       }
//   }
//   var bae = Object.keys(totalScores)[0];

//   if(bool==true){
//       var min = Math.abs(2 - totalScores[Object.keys(totalScores)[0]]);
//       for(i =1; i<Object.keys(totalScores).length;i++){
//             name = Object.keys(totalScores)[i]
//          var diff = Math.abs(2 - totalScores[name])
//          if(diff< min){
//              bae = name;
//          }
//      }
//   }
//   else{
//         var min = Math.abs(1 - totalScores[Object.keys(totalScores)[0]]);

//         for(i =1; i<Object.keys(totalScores).length;i++){
//             name = Object.keys(totalScores)[i];
//             var diff = Math.abs(1 - totalScores[name]);
//             console.log(diff);
//             if(diff< min){
//                 bae = name;
//             }
//          }
//   }
};

function convertDateTime(dt){
    dateTime = dt.split("T");
    var date = dateTime[0].split("-");
    var yyyy = date[0];
    var mm = date[1]-1;
    var dd = date[2];

    var time = dateTime[1].split(":");
    var h = time[0];
    var m = time[1];
    var s = parseInt(time[2]); //get rid of that 00.0;

    return new Date(yyyy,mm,dd,h,m,s);
}
// exports.getAuthUrl = getAuthUrl;
exports.determineBae = determineBae;



