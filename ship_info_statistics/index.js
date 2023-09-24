// import { _query, _queryAll } from './helpers';

// const summarizing_option_form = _query('summarizing_option_form');
// const result_table = _query('result_table');

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
  const summary_cols = tableInfo.map((row) => {
    if (selected_filters.length > 1) {
      const columns = selected_filters.map(
        (criteria) => row[tableHeaders.indexOf(criteria)]
      );
      return columns;
    } else {
      return row[tableHeaders.indexOf(selected_filters[0])];
    }
  });
  let totals = {};

  if (selected_filters.length === 2) {
    const root_distinct_values = Array.from(
      new Set(summary_cols.map((item) => item[0]))
    ).filter((elem) => elem);
    const child_distinct_values = Array.from(
      new Set(summary_cols.map((item) => item[1]))
    ).filter((elem) => elem);

    root_distinct_values.forEach((root_item) => {
      const value_to_compare = root_item;
      if (root_item === '') root_item = 'empty';
      totals[root_item] = child_distinct_values.map((child_item) => {
        if (child_item === '') child_item = 'empty';
        const total = summary_cols.reduce((total, current_item) => {
          if (
            current_item[0] === value_to_compare &&
            current_item[1] === child_item
          ) {
            total += 1;
          }
          return total;
        }, 0);
        return { [child_item]: total };
      });
    });
  } else if (selected_filters.length === 1) {
    const distinct_values = Array.from(
      new Set(summary_cols.map((item) => item))
    ).filter((elem) => elem);
    distinct_values.forEach((value) => {
      const value_to_compare = value;
      if (value === '') value = 'empty';
      totals[value] = summary_cols.reduce((total, currentValue) => {
        if (currentValue === value_to_compare) {
          total += 1;
        }
        return total;
      }, 0);
    });
  }
  console.log(totals);
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
    `<script>google.charts.load('current',{'packages':['corechart']});</script>`
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
          <button class='btn header-btn' id='draw-column' onclick='drawVisualization("Title", "Field",${JSON.stringify(
            totals
          )});'>Column Chart</button>
          <button class='btn header-btn' id='draw-combo' onclick='drawComboVisualization("Title", "Field",${JSON.stringify(
            totals
          )});'>Combo Chart</button>
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
