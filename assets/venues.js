const googleSheetID = '2PACX-1vQwM9YFlWmK-XWUqjgqI9h8gEaC3gSB-zFfx91BlBPnFRjVqGMe7sBVrqJmGonki8MBDI4Pw7LshgJ6';
const url = `https://docs.google.com/spreadsheets/feeds/list/${googleSheetID}/od6/public/values?alt=json`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const rows = data.feed.entry;
    let html = '<table>';

    // Add table headers
    html += '<tr><th>Aikaleima</th><th>Name of the venue</th><th>Address</th><th>Description</th><th>Technical information</th><th>Contacts</th><th>Not a robot?</th></tr>';

    rows.forEach(row => {
      const aikaleima = row.gsx$aikaleima.$t;
      const name = row.gsx$nameofthevenue.$t;
      const address = row.gsx$address.$t;
      const description = row.gsx$description.$t;
      const technicalInfo = row.gsx$technicalinformation.$t;
      const contacts = row.gsx$contacts.$t;
      const notARobot = row.gsx$notarobot.$t;

      // Add a new row to the table for each entry
      html += `<tr><td>${aikaleima}</td><td>${name}</td><td>${address}</td><td>${description}</td><td>${technicalInfo}</td><td>${contacts}</td><td>${notARobot}</td></tr>`;
    });

    html += '</table>';

    // Add the table to the body of your HTML
    document.body.innerHTML = html;
  });
