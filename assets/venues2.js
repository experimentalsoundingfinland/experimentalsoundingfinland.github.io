// The URL to your published Google Sheet in CSV format
const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQwM9YFlWmK-XWUqjgqI9h8gEaC3gSB-zFfx91BlBPnFRjVqGMe7sBVrqJmGonki8MBDI4Pw7LshgJ6/pub?output=csv';

// Get the spinner and venues list elements
const spinner = document.getElementById('spinner');
const venuesList = document.getElementById('venues-list');

// Show the spinner
spinner.style.display = 'block';

// Fetch the CSV data from the Google Sheet
fetch(url)
  .then(response => response.text())
  .then(data => {
    // Parse the CSV data to JSON
    const results = Papa.parse(data, {header: true, dynamicTyping: true}).data;

    // Sort the results array by 'City' and then by 'Name of the venue / organisation'
    results.sort((a, b) => {
      const cityA = a['City'] || '';
      const cityB = b['City'] || '';
      const cityComparison = cityA.localeCompare(cityB);
      return cityComparison === 0 ? a['Name of the venue / organisation'].localeCompare(b['Name of the venue / organisation']) : cityComparison;
    });

    // Loop through each row in the data
    results.forEach(row => {
      // Check if 'Street Address' is empty
      const streetAddress = row['Street address'] ? `${row['Street address']}, ` : '';
      // Combine 'Street Address' and 'City' into a single address
      const address = `${streetAddress}${row['City']}`;

      // Create a new row for each entry
      const rowDiv = document.createElement('div');
      rowDiv.className = 'row';

      // Create the venue cell
      const venueCell = document.createElement('div');
      venueCell.className = 'cell';
      venueCell.innerHTML = `<strong>${row['Name of the venue / organisation']}</strong><br/><a href="https://www.google.com/maps/place/${encodeURIComponent(address)}" target="_blank">${address}</a>`;
      rowDiv.appendChild(venueCell);

      // Create the information cell
      const infoCell = document.createElement('div');
      infoCell.className = 'cell';
      // Check if 'Technical information' is empty
      const techInfo = row['Technical information'] ? `<br><br><strong>Technical Information</strong><br>${row['Technical information'].split('\n').join('<br>')}` : '';
      const contacts = `<br><br><strong>Contacts</strong><br>${row['Contacts'].split('\n').join('<br>')}`;
      infoCell.innerHTML = `${row['Description'].split('\n').join('<br>')}${techInfo}${contacts}`;
      rowDiv.appendChild(infoCell);

      // Add the row to the venues list
      venuesList.appendChild(rowDiv);

      // Add a spacer after each row
      const spacerDiv = document.createElement('div');
      spacerDiv.className = 'spacer';
      venuesList.appendChild(spacerDiv);
    });

    // Hide the spinner
    spinner.style.display = 'none';
  });
