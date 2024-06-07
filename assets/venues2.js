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

    const venuesList = document.getElementById('venues-list');

    // Loop through each row in the data
    results.forEach(row => {
      // Create a new row for each entry
      const rowDiv = document.createElement('div');
      rowDiv.className = 'row';

      // Create the venue cell
      const venueCell = document.createElement('div');
      venueCell.className = 'cell';
      venueCell.innerHTML = `<strong>${row['Name of the venue']}</strong><br/><a href="https://www.google.com/maps/place/${encodeURIComponent(row['Address'])}" target="_blank">${row['Address']}</a>`;
      rowDiv.appendChild(venueCell);

      // Create the information cell
      const infoCell = document.createElement('div');
      infoCell.className = 'cell';
      infoCell.innerHTML = `${row['Description']}<br>${row['Technical information']}<br>${row['Contacts']}`;
      rowDiv.appendChild(infoCell);

      // Add the row to the venues list
      venuesList.appendChild(rowDiv);

      // Add a spacer after each row
      const spacerDiv = document.createElement('div');
      spacerDiv.className = 'spacer';
      venuesList.appendChild(spacerDiv);
    });
  });
