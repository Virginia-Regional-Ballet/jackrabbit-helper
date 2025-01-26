fetch('https://app.jackrabbitclass.com/jr3.0/Openings/OpeningsJS?OrgID=506286')
  .then(response => response.text())
  .then(html => {
    // Parse the HTML and extract the data into a JavaScript object
    const data = parseHtmlToTableData(html); 

    // Create the DataTable using the extracted data
    createDataTable(data);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// Function to parse the HTML and extract the table data
function parseHtmlToTableData(html) {
  // Extract the HTML content from the document.write() call
  const startIndex = html.indexOf('<table class="responsive-table">');
  const endIndex = html.lastIndexOf('</table>') + 8; // +8 to include the closing tag
  const tableHtml = html.substring(startIndex, endIndex);

  // Now parse the extracted table HTML
  const parser = new DOMParser();
  const doc = parser.parseFromString(tableHtml, 'text/html');
  const rows = doc.querySelectorAll('.responsive-table tbody tr');
  const data = [];

  rows.forEach(row => {
    const rowData = [];
    const cells = row.querySelectorAll('td, th'); // Include both td and th
    cells.forEach(cell => {
      rowData.push(cell.textContent.trim());
    });
    data.push(rowData);
  });

  return data;
}

// Function to create the DataTable
function createDataTable(data) {
  $(document).ready(function () {
    $('#myTable').DataTable({
      data: data,
      columns: [ // Define columns to match your data
        { title: "Register" },
        { title: "Class" },
        { title: "Description" },
        { title: "Days" },
        { title: "Times" },
        { title: "Gender" },
        { title: "Ages" },
        { title: "Openings" },
        { title: "Class Starts" },
        { title: "Class Ends" },
        { title: "Session" },
        { title: "Tuition" }
      ]
    });
  });
}
