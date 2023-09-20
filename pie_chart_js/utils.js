const chart_container = document.querySelector('#chartContainer');
const colors = [
  '#00A676',
  '#373F51',
  '#008DD5',
  '#DFBBB1',
  '#F56476',
  '#E43F6F',
  '#8EB1C7',
  '#B02E0C',
  '#EB4511',
  '#290E44',
];
window.onresize = function () {
  var c = document.getElementById('pieChart');
  if (c) c.resize();
};

function drawPieChart(totals) {
  let html_code = `<pie-chart id="pieChart">`;
  Object.entries(totals).forEach((entry, index) => {
    html_code += `<pchart-element name="${entry[0]}" value="${entry[1]}" colour="${colors[index]}">`;
  });
  html_code += `</pie-chart>`;
  chart_container.innerHTML = html_code;
}
