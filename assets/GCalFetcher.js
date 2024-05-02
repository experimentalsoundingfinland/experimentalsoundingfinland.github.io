function linkify(inputText) {
    let replacedText, replacePattern1, replacePattern2, replacePattern3;

    const inputTextArray = inputText.split('<br/>');

    const replacedTextArray = inputTextArray.map((text) => {
        replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
        replacedText = text.replace(replacePattern1, '<a href="$1" target="_blank" class="url">$1</a>');

        replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
        replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank" class="url">$2</a>');

        replacePattern3 = /(([a-zA-Z0-9\-.])+@[a-zA-Z0-9\-.]+\.[a-zA-Z0-9]{2,5})/gim;
        replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

        return replacedText;
    });

    return replacedTextArray.join('<br/>');
}

async function fetchUpcomingEvents() {
    try {
        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/experimentalsoundingfinland@gmail.com/events?singleEvents=true&key=AIzaSyA8ibG6fO1SGlZilUaFrtQ-oFg0fQF2ksg');
        const data = await response.json();
        const eventsList = document.getElementById('events-list');

        const now = new Date();

        data.items.sort((a, b) => new Date(a.start.dateTime || a.start.date) - new Date(b.start.dateTime || b.start.date));

        data.items.forEach((event) => {
            const eventStartDateTime = new Date(event.start.dateTime || event.start.date);
            const eventEndDateTime = new Date(event.end.dateTime || event.end.date);

           if (eventEndDateTime > now) {
               const row = document.createElement('div'); // Changed from 'tr' to 'div'
               row.className = 'row'; // Added this line
               const dateLocationCell = document.createElement('div'); // Changed from 'td' to 'div'
               dateLocationCell.className = 'cell'; // Added this line
               const summaryDescriptionCell = document.createElement('div'); // Changed from 'td' to 'div'
               summaryDescriptionCell.className = 'cell'; // Added this line

                const location = event.location || 'Location missing';

                const venuePrefix = 'event_venue123 ';
                let venue = 'Venue missing';
                let description = event.description || 'No description available';
                if (description.includes(venuePrefix)) {
                    const splitDescription = description.split(venuePrefix);
                    venue = splitDescription[1];
                    description = splitDescription[0];
                }

                dateLocationCell.innerHTML = `<strong>${formatDate(eventStartDateTime).split('<br/>')[0]}</strong><br/>${formatDate(eventStartDateTime).split('<br/>')[1]}<br/><strong>${venue}</strong><br/><a href="https://www.google.com/maps/place/${encodeURIComponent(location)}" target="_blank">${location}</a>`;
                summaryDescriptionCell.innerHTML = `<strong>${event.summary}</strong><br/>${linkify(description.replace(/\n/g, '<br/>'))}`;

                row.appendChild(dateLocationCell);
               row.appendChild(summaryDescriptionCell);
               eventsList.appendChild(row);
               const spacerRow = document.createElement('div'); // Changed from 'tr' to 'div'
               spacerRow.className = 'spacer';
               eventsList.appendChild(spacerRow);
    }
});
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

fetchUpcomingEvents();

function formatDate(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear().toString().substr(-2);
    const weekday = days[date.getDay()];
    const hours = date.getHours();
    const minutes = date.getMinutes();

    if(day && month && year && weekday && hours != null && minutes != null) {
        return `<strong>${day}.${month < 10 ? '0' : ''}${month}.${year}</strong><br/>${weekday}, ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    } else {
        return 'Invalid date';
    }
}
