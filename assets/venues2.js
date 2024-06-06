// The URL to your published Google Sheet in CSV format
const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQwM9YFlWmK-XWUqjgqI9h8gEaC3gSB-zFfx91BlBPnFRjVqGMe7sBVrqJmGonki8MBDI4Pw7LshgJ6/pub?output=csv';

// Fetch the CSV data from the Google Sheet
fetch(url)
  .then(response => response.text())
  .then(data => {
    // Parse the CSV data to JSON
    const results = Papa.parse(data, {header: true, dynamicTyping: true}).data;

    const venuesList = document.getElementById('venues-list');

    // Loop through each row in the data
    results.forEach(row => {
      const venueDiv = document.createElement('div');
      venueDiv.className = 'venue';

      const nameDiv = document.createElement('div');
      nameDiv.className = 'name';
      nameDiv.innerHTML = `<strong>${row['Name of the venue']}</strong>`;
      venueDiv.appendChild(nameDiv);

      const addressDiv = document.createElement('div');
      addressDiv.className = 'address';
      addressDiv.innerHTML = row['Address'];
      venueDiv.appendChild(addressDiv);

      const descriptionDiv = document.createElement('div');
      descriptionDiv.className = 'description';
      descriptionDiv.innerHTML = row['Description'];
      venueDiv.appendChild(descriptionDiv);

      const technicalInfoDiv = document.createElement('div');
      technicalInfoDiv.className = 'technical-info';
      technicalInfoDiv.innerHTML = row['Technical information'];
      venueDiv.appendChild(technicalInfoDiv);

      const contactsDiv = document.createElement('div');
      contactsDiv.className = 'contacts';
      contactsDiv.innerHTML = row['Contacts'];
      venueDiv.appendChild(contactsDiv);

      venuesList.appendChild(venueDiv);
    });
  });
