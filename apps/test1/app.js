var counter = 0;

function updateScreen() {
  g.clearRect(0, 50, 250, 150);
  g.setColor(0xFFFF);
  g.setFont("Vector",40).setFontAlign(0,0);
  g.drawString(Math.floor(counter), g.getWidth()/2, 100);
  g.drawString('-', 45, 100);
  g.drawString('+', 185, 100);
}



setWatch(() => {
  counter += 1;
  if(counter==8){
    counter=7;}
  updateScreen();
}, BTN1, {repeat:true});


setWatch(() => {
  counter -= 1;
  if(counter==-1){
    counter=0;}
  updateScreen();
}, BTN3, {repeat:true});


setWatch(() => {
  counter = 0;
  updateScreen();
}, BTN2, {repeat:true});

g.clear(1).setFont("6x8");
g.drawString(' counter for twaf', 25, 200);

Bangle.loadWidgets();
Bangle.drawWidgets();
updateScreen();
