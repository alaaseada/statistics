const chart_container = document.querySelector('#chartContainer');

function prepareChartData(title, summary_col, totals){
  delete totals['empty']
  var data = new google.visualization.DataTable();
  data.addColumn('string', summary_col);
  data.addColumn('number', title);
  data.addRows(Object.entries(totals));
  return data
}

function drawPieChart(title, summary_col, totals) {
  const data = prepareChartData(title, summary_col, totals)
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
  const data = prepareChartData(title, summary_col, totals)
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

function drawVisualization(title, summary_col, totals){
  const data = prepareChartData(title, summary_col, totals)
  const wrapper = new google.visualization.ChartWrapper({
    chartType: 'ColumnChart',
    dataTable: data,
    options: {
    title: title,
    width: 800,
    height: 'fit-content',
  },containerId: 'chartContainer'
  });
  wrapper.draw()
}