/**
 * Created by Denis on 12.04.2016.
 */

  for (var i = 0; i < 6; i++) {

    if (i % 2 == 0)
      console.log("Право");
    else
      console.log("Лево");

  }

canvas = document.querySelector("canvas");

var ctx = canvas.getContext('2d');

var i = 0;

while(i < 100) {

  setTimeout(draw(i), 5000);

  i+=5;

  console.log(i);
}

function draw(i) {

  //ctx.clear();
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.rect(i, i, 80, 110);
  ctx.fill();
  ctx.closePath();
  ctx.stroke();

}
