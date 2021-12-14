// Load fonts
require("Font7x11Numeric7Seg").add(Graphics);
// position on screen
const X = 160, Y = 140;
var counterInterval;

function showmess(time) {
  var t = time;
  if(time === "5:30"){
E.showMessage("Pray Time","Fajar");
  }
  if(time === "12:16"){
E.showMessage("Pray Time","Duhur");
  }
   if(time === "15:21"){
E.showMessage("Pray Time","Asr");
  }
   if(time === "17:42"){
E.showMessage("Pray Time","Maghrib");
  }
   if(time === "19:12"){
E.showMessage("Pray Time","Isha");
  }

  if(time != t){
    g.clear(); 
    draw();
  }
}

function draw() {
  // work out how to display the current time
  var d = new Date();
  var h = d.getHours(), m = d.getMinutes();
  var time = (" "+h).substr(-2) + ":" + ("0"+m).substr(-2);
  // Reset the state of the graphics library
  g.reset();
  // draw the current time (4x size 7 segment)
  g.setFont("7x11Numeric7Seg",4);
  g.setFontAlign(1,1); // align right bottom
  g.drawString(time, X, Y, true /*clear background*/);
  // draw the seconds (2x size 7 segment)
  g.setFont("7x11Numeric7Seg",2);
  g.drawString(("0"+d.getSeconds()).substr(-2), X+30, Y, true /*clear background*/);
  // draw the date, in a normal font
  g.setFont("6x8");
  g.setFontAlign(0,1); // align center bottom
  // pad the date - this clears the background if the date were to change length
  var dateStr = "    "+require("locale").date(d)+"    ";
  var yeardate = d.getFullYear()-578;
  var monthdata = d.getMonth()-6;
  var daydate = d.getDate()-4;
  g.drawString("H "+yeardate+"/"+ monthdata+"/"+ daydate,120,90);
  g.drawString(dateStr, g.getWidth()/2, Y+15, true /*clear background*/);
  //g.drawString("F|4:55 D|12:11 A|3:34 M|6:10 E|7:40",120,90);
  g.setFont("6x8",2);
  
  if(time > "05:30" && time < "12:16" ){ 
  g.drawString("Past Fajr 05:30 AM",120,40); 
  g.drawString("Next Duhur 12:16 PM",120,220);
  }
  
  if(time > "12:16" && time < "15:21" ){ 
  g.drawString("Past Duh 12:16 PM",120,40);
  g.drawString("Next Asr 15:21 PM",120,220);
  }
  
  if(time > "15:21" && time < "17:42" ){ 
  g.drawString("Past Asr 15:21 PM",120,40); 
  g.drawString("Next Maghrib 17:42 PM",120,220); 
  }
  if(time > "17:42" && time < "19:12" ){ 
  g.drawString("Past Maghrib 17:42 PM",120,40); 
  g.drawString("Next Isha 19:12",120,220); 
  }
  if(time > "19:12" && time < "5:30" ){ 
  g.drawString("Past Isha 19:12 PM",120,40); 
  g.drawString("Next Fajr 5:30 AM",120,220); 
  }

  var fajr= "14:50";
  if (time === fajr){
    g.clear();
    showmess(time);
  }
  var duhur= "12:16";
  if (time === duhur){
    g.clear();
    showmess(time);
  }
  var asr= "15:21";
  if (time === asr){
    g.clear();
    showmess(time);
  }
  var maghrib= "17:42";
  if (time === maghrib){
    g.clear();
    showmess(time);
  }
  var isha= "19:12";
  if (time === isha){
    g.clear();
    showmess(time);
  }
  
}
// Clear the screen once, at startup
g.clear();
// draw immediately at first
draw();
var secondInterval = setInterval(draw, 1000);
// Stop updates when LCD is off, restart when on
Bangle.on('lcdPower',on=>{
  if (secondInterval) clearInterval(secondInterval);
  secondInterval = undefined;
  if (on) {
    secondInterval = setInterval(draw, 1000);
    draw(); // draw immediately
  }
});
// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();
// Show launcher when middle button pressed
Bangle.setUI("clock");
