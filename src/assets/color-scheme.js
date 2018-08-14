export default function randomColor (colorScheme) {
  return colorScheme === 'rainbows' ? getRainbowColor() : getColor(colorScheme);
}

function getRainbowColor () {
  var characters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += randomElement(characters);
  }
  return color;
}

function getColor (colorScheme) {
  let colorPaletteArray = COLORS[colorScheme];
  return randomElement(colorPaletteArray);
}

function randomElement (input) {
  return input[Math.floor(input.length * Math.random())]
}

const COLORS = {
  grays:
    ['#585858',
      '#606060',
      '#686868',
      '#696969',
      '#707070',
      '#787878',
      '#808080',
      '#888888',
      '#909090',
      '#989898',
      '#A0A0A0',
      '#A8A8A8',
      '#A9A9A9',
      '#B0B0B0',
      '#B8B8B8',
      '#BEBEBE',
      '#C0C0C0',
      '#C8C8C8'],
  blues:
    ['#00868B ',
      '#00C5CD ',
      '#67E6EC ',
      '#53868B ',
      '#7AC5CD ',
      '#98F5FF ',
      '#39B7CD ',
      '#C3E4ED ',
      '#9AC0CD ',
      '#B2DFEE ',
      '#00E5EE ',
      '#4A777A ',
      '#73B1B7 ',
      '#8EE5EE ',
      '#B0E0E6 ',
      '#65909A ',
      '#68838B ',
      '#50A6C2 ',
      '#00688B '],
  greens:
    ['#37BC61 ',
      '#40664D ',
      '#0E8C3A ',
      '#2C5D3F ',
      '#00FF66 ',
      '#00C957 ',
      '#34925E ',
      '#426352 ',
      '#006633 ',
      '#70DB93 ',
      '#92CCA6 ',
      '#78A489 ',
      '#759B84 ',
      '#2E8B57 ',
      '#54FF9F ',
      '#3CB371 ',
      '#607C6E ',
      '#008B45 '],
  violets:
    ['#EED2EE',
      '#EAADEA',
      '#EE82EE',
      '#990099',
      '#FF00FF',
      '#FFE1FF',
      '#DA70D6',
      '#9C6B98',
      '#DDA0DD',
      '#DB70DB',
      '#800080',
      '#CD00CD',
      '#FF00FF',
      '#8B4789',
      '#FF83FA',
      '#871F78'],
  reds:
    ['#FF4040',
      '#FFC1C1',
      '#A02422',
      '#F2473F',
      '#CDB7B5',
      '#FC1501',
      '#FF6666',
      '#FFCCCC',
      '#C65D57',
      '#E3170D',
      '#AF4035',
      '#CC1100',
      '#FF3030',
      '#FF0000']
};
