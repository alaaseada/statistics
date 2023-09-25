const chart_container = document.querySelector('#chartContainer');
const table_container = document.querySelector('#tableContainer');

function prepareChartData(title, summary_col, totals) {
  var data = new google.visualization.DataTable();
  data.addColumn('string', summary_col);
  data.addColumn('number', title);
  data.addRows(Object.entries(totals));
  return data;
}

function prepareComboChartData(title, summary_col, totals) {
  const headers = ['النطاق الجغرافي'];
  const result = [];
  Object.keys(totals).map((item) => result.push([item]));

  Object.values(totals)[0].map((item, index) => {
    headers.push(Object.keys(item)[0]);
  });
  Object.values(totals).map((item, index) => {
    item.map((val) => result[index].push(Object.values(val)[0]));
  });
  console.log([headers, ...result]);
  return google.visualization.arrayToDataTable([headers, ...result]);
}

function drawPieChart(title, summary_col, totals) {
  const data = prepareChartData(title, summary_col, totals);
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
  const data = prepareChartData(title, summary_col, totals);
  // Set chart options
  var options = {
    title: title,
    width: 800,
    height: 'fit-content',
  };

  // Instantiate and draw our chart, passing in some options.
  var chart = new google.visualization.BarChart(chart_container);
  chart.draw(data, options);

  console.log('I am here')
  drawTableChart()
}

function drawVisualization(title, summary_col, totals) {
  const data = prepareChartData(title, summary_col, totals);
  const wrapper = new google.visualization.ChartWrapper({
    chartType: 'ColumnChart',
    dataTable: data,
    options: {
      title: title,
      width: 800,
      height: 'fit-content',
    },
    containerId: 'chartContainer',
  });
  wrapper.draw();
}

function drawComboVisualization(title, summary_col, totals) {
  const data = prepareComboChartData(title, summary_col, totals);
  const chart = new google.visualization.ComboChart(chart_container);
  const options = {
    title: 'Vessel Status by Geographic Area',
    vAxis: { title: 'Number of vessels' },
    hAxis: { title: 'Geographic area' },
    seriesType: 'bars',
  };
  chart.draw(data, options);
}

function drawTableChart() {
  table_container.innerHTML = '<h1>Helloooo</h1>'
  const data = new google.visualization.DataTable();
  data.addColumn('string', 'Name');
  data.addColumn('number', 'Salary');
  data.addColumn('boolean', 'Full Time Employee');
  data.addRows([
    ['Mike',  {v: 10000, f: '$10,000'}, true],
    ['Jim',   {v:8000,   f: '$8,000'},  false],
    ['Alice', {v: 12500, f: '$12,500'}, true],
    ['Bob',   {v: 7000,  f: '$7,000'},  true]
  ]);

  const table = new google.visualization.Table(table_container);
  table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
}
