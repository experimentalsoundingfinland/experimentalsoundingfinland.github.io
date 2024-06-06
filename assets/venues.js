// The URL to your published Google Sheet in CSV format
const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQwM9YFlWmK-XWUqjgqI9h8gEaC3gSB-zFfx91BlBPnFRjVqGMe7sBVrqJmGonki8MBDI4Pw7LshgJ6/pub?output=csv';

// Fetch the CSV data from the Google Sheet
fetch(url)
  .then(response => response.text())
  .then(data => {
    // Parse the CSV data to JSON
    const results = Papa.parse(data, {header: true, dynamicTyping: true}).data;

    // Sort the results array by 'Name of the venue'
    results.sort((a, b) => a['Name of the venue'].localeCompare(b['Name of the venue']));

    let html = '<table>';

    // Add table headers
    html += '<tr><th>Venue</th><th>Information</th></tr>';

    // Loop through each row in the data
    results.forEach(row => {
      // Add a new row to the table for each entry
      html += `<tr><td style="vertical-align: top;"><strong>${row['Name of the venue']}</strong><br/><a href="https://www.google.com/maps/place/${encodeURIComponent(row['Address'])}" target="_blank">${row['Address']}</a></td><td>${row['Description']}<br>${row['Technical information']}<br>${row['Contacts']}</td></tr>`;
    });

    html += '</table>';

    // Get the 'venues-list' div and add the table to its innerHTML
    const venuesList = document.getElementById('venues-list');
    venuesList.innerHTML = html;
  });
