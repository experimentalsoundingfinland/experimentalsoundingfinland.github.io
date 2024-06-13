function linkify(inputText) {
    let replacedText, replacePattern1, replacePattern2, replacePattern3;

    const inputTextArray = inputText.split('<br/>');

    const replacedTextArray = inputTextArray.map((text) => {
        replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
        replacedText = text.replace(replacePattern1, (match) => {
            return match.length > 40 ? `<a href="${match}" target="_blank" class="url">${match.substring(0, 40)}...</a>` : `<a href="${match}" target="_blank" class="url">${match}</a>`;
        });

        replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
        replacedText = replacedText.replace(replacePattern2, (match, group1, group2) => {
            return group2.length > 40 ? `${group1}<a href="http://${group2}" target="_blank" class="url">${group2.substring(0, 40)}...</a>` : `${group1}<a href="http://${group2}" target="_blank" class="url">${group2}</a>`;
        });

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
                const row = document.createElement('div');
                row.className = 'row';
                const dateLocationCell = document.createElement('div');
                dateLocationCell.className = 'cell';
                const summaryDescriptionCell = document.createElement('div');
                summaryDescriptionCell.className = 'cell';

                const location = event.location || 'Location missing';

                const venuePrefix = 'event_venue123 ';
                let venue = 'Venue missing';
                let description = event.description || 'No description available';
                if (description.includes(venuePrefix)) {
                    const splitDescription = description.split(venuePrefix);
                    venue = splitDescription[1].toUpperCase(); // Capitalize the venue name
                    description = splitDescription[0];
                }

                dateLocationCell.innerHTML = `<span class="event-date"><strong>${formatDate(eventStartDateTime).split('<br/>')[0]}</strong></span><br/>${formatDate(eventStartDateTime).split('<br/>')[1]}<br/><strong class="venue-name">${venue}</strong><br/><a href="https://www.google.com/maps/place/${encodeURIComponent(location)}" target="_blank">${location}</a>`;
                summaryDescriptionCell.innerHTML = `<strong class="event-title">${event.summary.toUpperCase()}</strong><br/>${linkify(description.replace(/\n/g, '<br/>'))}`;

                row.appendChild(dateLocationCell);
                row.appendChild(summaryDescriptionCell);
                eventsList.appendChild(row);
                const spacerRow = document.createElement('div');
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
