const chart_container = document.querySelector('#chartContainer');

function drawPieChart(totals) {
  var data = new google.visualization.DataTable();
  data.addColumn('string', 'Topping');
  data.addColumn('number', 'Slices');
  data.addRows([
    ['Mushrooms', 3],
    ['Onions', 1],
    ['Olives', 1],
    ['Zucchini', 1],
    ['Pepperoni', 2]
  ]);

  // Set chart options
  var options = {'title':'How Much Pizza I Ate Last Night',
                  'width':400,
                  'height':300};

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(chart_container);
  chart.draw(data, options);
}
