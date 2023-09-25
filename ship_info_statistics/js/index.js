import { _query, _queryAll } from './helpers.js';

// Grab the elements that contain data
const summarizing_option_form = _query('summarizing_option_form');
const result_table = _query('result_table');

let report_window;

// Handle the filters form's submit event
summarizing_option_form.addEventListener('submit', (e) => {
  e.preventDefault();
  // Get the selected filters
  const selected_filters = [].filter
    .call(
      summarizing_option_form.querySelectorAll('input[type=checkbox]'),
      (elem) => elem.checked
    )
    .map((elem) => elem.value);
  // allow to comined 2 filters for now
  if (selected_filters.length > 2) {
    alert('Sorry! You can combine only 2 filters for now.');
    return;
  }
  // Open the window
  if (report_window) report_window.close();
  report_window = window.open('', '_blank');

  // Call the summerizing table
  summarize_Table('result_table', selected_filters);
});

function summarize_Table(tableId, selected_filters) {
  // Get table Headers
  var tableHeaders = Array.prototype.map.call(
    _queryAll(`#${tableId} thead tr th`),
    (th) => th.innerHTML
  );

  // Calculate Summaries
  var tableInfo = Array.prototype.map.call(
    _queryAll(`#${tableId} tbody tr`),
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

  // Aggregate 2 filters
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
    // Calculate totals for 1 filter
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
        <link rel="stylesheet" href="css/index.css" />    
        <link rel="stylesheet" href="css/charts.css" />
`);

  var script = document.createElement('script');
  script.src = 'js/loader.js';
  report_window.document.write(script.outerHTML);
  report_window.document.write(
    `<script>google.charts.load('current',{'packages':['corechart', 'table', 'geochart']});</script>`
  );

  report_window.document.write(`</head>
      <body>
        <header>
          <h1>Statistics</h1>
          <div class='btn-container'>
      `);
  if (selected_filters.length === 1) {
    const fieldName = selected_filters[0];
    const title = 'Number of vessels based on ' + fieldName;
    report_window.document.write(`
          <button class='btn header-btn' id='draw-pie' onclick='drawPieChart("${title}", "${fieldName}",${JSON.stringify(
      totals
    )});'>Pie Chart</button>
          <button class='btn header-btn' id='draw-bar' onclick='drawBarChart("${title}","${fieldName}",${JSON.stringify(
      totals
    )});'>Bar Chart</button>
          <button class='btn header-btn' id='draw-column' onclick='drawVisualization("${title}","${fieldName}",${JSON.stringify(
      totals
    )});'>Column Chart</button>
    `);
    if (selected_filters[0] === 'Country Flag') {
      report_window.document.write(`
          <button class='btn header-btn' id='draw-geo-chart' onclick='drawGeoChart("${title}", "${fieldName}",${JSON.stringify(
        totals
      )});'>Geo Chart</button>`);
    }
  } else {
    const heading = selected_filters[0];
    const title =
      'Number of vessels based on ' +
      heading +
      ' and grouped by ' +
      selected_filters[1];
    report_window.document.write(`
     <button class='btn header-btn' id='draw-combo' onclick='drawComboVisualization("${title}", "${heading}",${JSON.stringify(
      totals
    )});'>Combo Chart</button>
    `);
  }

  report_window.document.write(`
          </div>
        </header>
        <main>
          <section>
            <div id="chartContainer"></div>
            <div id="tableContainer"></div>
          </section>
        </main>`);

  var script = document.createElement('script');
  script.src = 'js/utils.js';
  report_window.document.write(script.outerHTML);

  report_window.document.write(`
        </body>
        </html>`);
}
