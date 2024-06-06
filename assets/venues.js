// The URL to your published Google Sheet in CSV format
const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQwM9YFlWmK-XWUqjgqI9h8gEaC3gSB-zFfx91BlBPnFRjVqGMe7sBVrqJmGonki8MBDI4Pw7LshgJ6/pub?output=csv';

// Fetch the CSV data from the Google Sheet
fetch(url)
  .then(response => response.text())
  .then(data => {
    // Parse the CSV data to JSON
    const results = Papa.parse(data, {header: true, dynamicTyping: true}).data;

    let html = '<table>';

    // Add table headers
    html += '<tr><th>Venue</th><th>Information</th></tr>';

    // Loop through each row in the data
    results.forEach(row => {
      // Add a new row to the table for each entry
      html += `<tr><td>${row['Name of the venue']}<br>${row['Address']}</td><td>${row['Description']}<br><br>${row['Technical information']}<br><br>${row['Contacts']}</td></tr>`;
    });

    html += '</table>';

    // Get the 'venues-list' div and add the table to its innerHTML
    const venuesList = document.getElementById('venues-list');
    venuesList.innerHTML = html;
  });
