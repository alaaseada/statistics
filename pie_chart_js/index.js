const action_btn = document.querySelector('#summarize-btn');
const result_table = document.querySelector('#result_table');
let report_window;

action_btn.addEventListener('click', () => {
  if (report_window) report_window.close();
  report_window = window.open('', '_blank');
  summarize_Table('result_table');
});

function summarize_Table(tableId) {
  // =========== Calculate summaries=======
  var tableInfo = Array.prototype.map.call(
    document.querySelectorAll(`#${tableId} tbody tr`),
    (tr) => {
      return Array.prototype.map.call(tr.querySelectorAll('td'), (td) => {
        return td.innerHTML;
      });
    }
  );
  const status_column = tableInfo.map((row) => row[14]);
  const distinct_status = Array.from(new Set(status_column));
  const totals = {};
  distinct_status.forEach((value) => {
    const value_to_compare = value;
    if (value === '') value = 'empty';
    totals[value] = status_column.reduce((total, currentValue) => {
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
  script.src = 'pie-chart-js.js';
  report_window.document.write(script.outerHTML);

  report_window.document.write(`</head>
      <body>
        <header>
          <h1>Statistics</h1>
          <div class='btn-container'>
          <button class='btn header-btn' id='draw-pie' onclick='drawPieChart(${JSON.stringify(
            totals
          )});'>Pie Chart</button>
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
