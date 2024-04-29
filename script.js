function linkify(inputText) {
    let replacedText, replacePattern1, replacePattern2, replacePattern3;

    // Split the input text into an array of strings using <br/> as the separator
    const inputTextArray = inputText.split('<br/>');

    // Apply the linkify function to each string in the array
    const replacedTextArray = inputTextArray.map((text) => {
        //URLs starting with http://, https://, or ftp://
        replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
        replacedText = text.replace(replacePattern1, '<a href="$1" target="_blank" class="url">$1</a>');

        //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
        replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
        replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank" class="url">$2</a>');

        //Change email addresses to mailto:: links.
        replacePattern3 = /(([a-zA-Z0-9\-.])+@[a-zA-Z0-9\-.]+\.[a-zA-Z0-9]{2,5})/gim;
        replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

        return replacedText;
    });

    // Join the array of strings back into a single string, using <br/> as the separator
    return replacedTextArray.join('<br/>');
}

async function fetchUpcomingEvents() {
    try {
        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/experimentalsoundingfinland@gmail.com/events?singleEvents=true&key=AIzaSyA8ibG6fO1SGlZilUaFrtQ-oFg0fQF2ksg');
        const data = await response.json();
        const eventsList = document.getElementById('events-list');

        const now = new Date(); // Get the current date and time

        // Sort the items array by date
        data.items.sort((a, b) => new Date(a.start.dateTime || a.start.date) - new Date(b.start.dateTime || b.start.date));

        data.items.forEach((event) => {
            const eventStartDateTime = new Date(event.start.dateTime || event.start.date);
            const eventEndDateTime = new Date(event.end.dateTime || event.end.date);

            // Display events that have started but not yet finished, and future events
            if (eventEndDateTime > now) {
                const row = document.createElement('tr');
                const dateLocationCell = document.createElement('td'); // New cell for date and location
                const summaryDescriptionCell = document.createElement('td'); // New cell for summary and description

                // Check if location is defined, if not, set it to 'Location missing'
                const location = event.location || 'Location missing';

                // Extract the venue from the event description and remove it from the description
                const venuePrefix = 'event_venue123 ';
                let venue = 'Venue missing';
                let description = event.description || 'No description available';
                if (description.includes(venuePrefix)) {
                    const splitDescription = description.split(venuePrefix);
                    venue = splitDescription[1]; // Take everything after the prefix as the venue
                    description = splitDescription[0];
                }

                dateLocationCell.innerHTML = `<strong>${formatDate(eventStartDateTime).split('<br/>')[0]}</strong><br/>${formatDate(eventStartDateTime).split('<br/>')[1]}<br/><strong>${venue}</strong><br/><a href="https://www.google.com/maps/place/${encodeURIComponent(location)}" target="_blank">${location}</a>`; // Format date, venue, and location
                summaryDescriptionCell.innerHTML = `<strong>${event.summary}</strong><br/>${linkify(description.replace(/\n/g, '<br/>'))}`; // Format summary and description

                row.appendChild(dateLocationCell);
                row.appendChild(summaryDescriptionCell);
                eventsList.appendChild(row);
            }
        });
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

// Call the function to fetch and display upcoming events
fetchUpcomingEvents();

// Function to format date as "dd.mm.yy", "weekday", and "hh:mm"
function formatDate(date) {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based in JavaScript
    const year = date.getFullYear().toString().substr(-2);
    const weekday = days[date.getDay()];
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Ensure all values are defined before returning
    if(day && month && year && weekday && hours != null && minutes != null) {
        return `<strong>${day}.${month < 10 ? '0' : ''}${month}.${year}</strong><br/>${weekday}, ${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
    } else {
        return 'Invalid date';
    }
}
