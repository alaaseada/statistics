const action_btn = document.querySelector('#summarize-btn');
const result_table = document.querySelector('#result_table');
let report_window;

action_btn.addEventListener('click', () => {
  if (report_window) report_window.close();
  report_window = window.open('', '_blank');
  summarize_Table(result_table);
});

function summarize_Table(tableId) {
  report_window.document.write(`
    <html>
      <head>
        <title>Summary of result data</title>
        <link rel="stylesheet" href="index.css" />`);

  var script = document.createElement('script');
  script.src = 'canvasjs.min.js';
  report_window.document.write(script.outerHTML);

  report_window.document.write(`</head>
      <body>
        <header>
          <h1>Statistics</h1>
          <div class='btn-container'>
          <button class='btn header-btn' id='draw-pie'>Pie Chart</button>
          </div>
        </header>
        <main>
          <section>
            <div id="chartContainer" style="height: 300px; width: 100%;"></div>
          </section>
        </main>`);

  var script = document.createElement('script');
  script.src = 'utils.js';
  report_window.document.write(script.outerHTML);

  report_window.document.write(`
        </body>
        </html>`);
}
