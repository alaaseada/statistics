const summarizing_option_form = document.querySelector(
  '#summarizing_option_form'
);
const result_table = document.querySelector('#result_table');
let report_window;

summarizing_option_form.addEventListener('submit', (e) => {
  e.preventDefault();
  const selected_filters = [].filter
    .call(
      summarizing_option_form.querySelectorAll('input[type=checkbox]'),
      (elem) => elem.checked
    )
    .map((elem) => elem.value);
  if (report_window) report_window.close();
  report_window = window.open('', '_blank');
  summarize_Table('result_table', selected_filters);
});

function summarize_Table(tableId, selected_filters) {
  // Get table Headers
  var tableHeaders = Array.prototype.map.call(
    document.querySelectorAll(`#${tableId} thead tr th`),
    (th) => th.innerHTML
  );
  // Calculate Summaries
  var tableInfo = Array.prototype.map.call(
    document.querySelectorAll(`#${tableId} tbody tr`),
    (tr) => {
      return Array.prototype.map.call(tr.querySelectorAll('td'), (td) => {
        return td.innerHTML;
      });
    }
  );
  // Get the targeted column
  const summary_col = tableInfo.map(
    (row) => row[tableHeaders.indexOf(selected_filters[0])]
  );
  const distinct_status = Array.from(new Set(summary_col));
  const totals = {};
  distinct_status.forEach((value) => {
    const value_to_compare = value;
    if (value === '') value = 'empty';
    totals[value] = summary_col.reduce((total, currentValue) => {
      if (currentValue === value_to_compare) {
        total += 1;
      }
      return total;
    }, 0);
  });
  // ================Display=============
  report_window.document.write(`
    <html>
      <head>
        <title>Summary of result data</title>
        <link rel="stylesheet" href="index.css" />`);

  var script = document.createElement('script');
  script.src = 'loader.js';
  report_window.document.write(script.outerHTML);
  report_window.document.write(
    `<script>google.charts.load('current', {'packages':['corechart']});</script>`
  );

  report_window.document.write(`</head>
      <body>
        <header>
          <h1>Statistics</h1>
          <div class='btn-container'>
          <button class='btn header-btn' id='draw-pie' onclick='drawPieChart("Title", "Field",${JSON.stringify(
            totals
          )});'>Pie Chart</button>
          <button class='btn header-btn' id='draw-bar' onclick='drawBarChart("Title", "Field",${JSON.stringify(
            totals
          )});'>Bar Chart</button>
          </div>
        </header>
        <main>
          <section>
            <div id="chartContainer"></div>
          </section>
        </main>`);

  var script = document.createElement('script');
  script.src = 'utils.js';
  report_window.document.write(script.outerHTML);

  report_window.document.write(`
        </body>
        </html>`);
}
