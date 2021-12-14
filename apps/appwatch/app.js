Bangle.setLCDPower(1);
Bangle.setLCDTimeout(0);
var counter = 0;

function updateScreen() {
  g.clearRect(0, 250, 250, 150);
  g.setColor(0xFFFF);
  g.setFont("Vector",40).setFontAlign(0,0);
  //g.drawString(Math.floor(counter), g.getWidth()/2, 100);
  g.drawString(Math.floor(counter), g.getWidth()/2, 200);
  g.drawString('-', 45, 200);
  g.drawString('-', 45, 200);
  //g.drawString('-', 45, 100);
  g.drawString('+', 190, 200);
 // g.drawString('+', 185, 100);
}



setWatch(() => {
   if(counter!=7){
  counter += 1;}
  if(counter==7){
   //g.drawImage(require("Storage").read("am.img"),66,27);
    //g.clear(1).setFont("6x8");
    g.drawString('Taqabal', 125, 50);
    g.drawString('Allah', 125, 100);
    counter=7;
  }
  updateScreen();
}, BTN1, {repeat:true});


setWatch(() => {
  counter -= 1;
  g.clear();
  if(counter==-1){
    counter=0;}
  updateScreen();
}, BTN3, {repeat:true});


setWatch(() => {
  g.clear();
  counter = 0;
  updateScreen();
}, BTN2, {repeat:true});

g.clear(1).setFont("6x8");
//g.drawString(' Taqabal Allah', 25, 100);

Bangle.loadWidgets();
Bangle.drawWidgets();
updateScreen();
