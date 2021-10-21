// Load fonts
require("Font7x11Numeric7Seg").add(Graphics);
// position on screen
const X = 160, Y = 140;
var counterInterval;

function showmess() {
  E.showMessage("Pray Time","Fajar");

  // again, 10 secs later
  setTimeout(showmess, 10000);
  var d = new Date();
  var h = d.getHours()+5, m = d.getMinutes();
  var time = (" "+h).substr(-2) + ":" + ("0"+m).substr(-2);
    if (time === '14:09'){
      g.clear();
      draw();
  }
}

function draw() {
  // work out how to display the current time
  var d = new Date();
  var h = d.getHours()+5, m = d.getMinutes();
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
  var daydate = d.getDate()-7;
  g.drawString("H "+yeardate+"/"+ monthdata+"/"+ daydate,120,90);
  g.drawString(dateStr, g.getWidth()/2, Y+15, true /*clear background*/);
  //g.drawString("F|4:55 D|12:11 A|3:34 M|6:10 E|7:40",120,90);
  g.setFont("6x8",2);
  g.drawString("Past Duh 12:05 PM",120,65);
  g.drawString("Next Asr 3:23 PM",120,200);

  var f = "14:08";
  if (time === f){
    showmess();
    setTimeout(showmess, 10000);
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
