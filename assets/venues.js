// Include the Papa Parse library
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>

// Your JavaScript code
<script>
const googleSheetID = '2PACX-1vQwM9YFlWmK-XWUqjgqI9h8gEaC3gSB-zFfx91BlBPnFRjVqGMe7sBVrqJmGonki8MBDI4Pw7LshgJ6';
const url = `https://docs.google.com/spreadsheets/d/${googleSheetID}/gviz/tq?tqx=out:csv`;

fetch(url)
  .then(response => response.text())
  .then(data => {
    const results = Papa.parse(data, {header: true, dynamicTyping: true}).data;
    let html = '<table>';

    // Add table headers
    html += '<tr><th>Aikaleima</th><th>Name of the venue</th><th>Address</th><th>Description</th><th>Technical information</th><th>Contacts</th><th>Not a robot?</th></tr>';

    results.forEach(row => {
      const aikaleima = row['Aikaleima'];
      const name = row['Name of the venue'];
      const address = row['Address'];
      const description = row['Description'];
      const technicalInfo = row['Technical information'];
      const contacts = row['Contacts'];
      const notARobot = row['Not a robot?'];

      // Add a new row to the table for each entry
      html += `<tr><td>${aikaleima}</td><td>${name}</td><td>${address}</td><td>${description}</td><td>${technicalInfo}</td><td>${contacts}</td><td>${notARobot}</td></tr>`;
    });

    html += '</table>';

    // Add the table to the body of your HTML
    document.body.innerHTML = html;
  });
</script>
