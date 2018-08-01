export default function randomColor(colorScheme){
  return colorScheme === "grayscale" ? getRandomGrayScale() :  getRandomColor();

}

function getRandomColor() {
  var characters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += characters[Math.floor(Math.random() * 16)];
  }
  return color;
}


function getRandomGrayScale(){
  let grayScale = ["#585858",
  "#606060"	,
  "#686868" ,
  "#696969" ,
  "#707070"	,
  "#787878"	,
  "#808080"	,
  "#888888"	,
  "#909090"	,
  "#989898"	,
  "#A0A0A0"	,
  "#A8A8A8"	,
  "#A9A9A9"	,
  "#B0B0B0"	,
  "#B8B8B8"	,
  "#BEBEBE"	,
  "#C0C0C0"	,
  "#C8C8C8"	,
 ];

  return grayScale[Math.floor(Math.random() * grayScale.length)];

}
