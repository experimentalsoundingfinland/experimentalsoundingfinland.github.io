// Your Google Sheet ID
const googleSheetID = '2PACX-1vQwM9YFlWmK-XWUqjgqI9h8gEaC3gSB-zFfx91BlBPnFRjVqGMe7sBVrqJmGonki8MBDI4Pw7LshgJ6';

// The URL to your published Google Sheet in CSV format
const url = `https://docs.google.com/spreadsheets/d/${googleSheetID}/gviz/tq?tqx=out:csv`;

// Fetch the CSV data from the Google Sheet
fetch(url)
  .then(response => response.text())
  .then(data => {
    // Parse the CSV data to JSON
    const results = Papa.parse(data, {header: true, dynamicTyping: true}).data;

    let html = '<table>';

    // Add table headers
    html += '<tr><th>Aikaleima</th><th>Name of the venue</th><th>Address</th><th>Description</th><th>Technical information</th><th>Contacts</th><th>Not a robot?</th></tr>';

    // Loop through each row in the data
    results.forEach(row => {
      // Add a new row to the table for each entry
      html += `<tr><td>${row['Aikaleima']}</td><td>${row['Name of the venue']}</td><td>${row['Address']}</td><td>${row['Description']}</td><td>${row['Technical information']}</td><td>${row['Contacts']}</td><td>${row['Not a robot?']}</td></tr>`;
    });

    html += '</table>';

    // Add the table to the body of your HTML
    document.body.innerHTML = html;
  });
