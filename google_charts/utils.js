const chart_container = document.querySelector('#chartContainer');

function drawPieChart(title, summary_col, totals) {
  var data = new google.visualization.DataTable();
  data.addColumn('string', summary_col);
  data.addColumn('number', 'Number of vessels');
  data.addRows(Object.entries(totals));

  // Set chart options
  var options = {
    title: title,
    width: 800,
    height: 'fit-content',
  };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.PieChart(chart_container);
  chart.draw(data, options);
}

function drawBarChart(title, summary_col, totals) {
  var data = new google.visualization.DataTable();
  data.addColumn('string', summary_col);
  data.addColumn('number', 'Number of vessels');
  data.addRows(Object.entries(totals));

  // Set chart options
  var options = {
    title: title,
    width: 800,
    height: 'fit-content',
  };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.BarChart(chart_container);
  chart.draw(data, options);
}
