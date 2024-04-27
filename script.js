async function fetchUpcomingEvents() {
    try {
        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/experimentalsoundingfinland@gmail.com/events?singleEvents=true&key=AIzaSyA8ibG6fO1SGlZilUaFrtQ-oFg0fQF2ksg');
        const data = await response.json();
        const eventsList = document.getElementById('events-list');

        const now = new Date(); // Get the current date and time

        // Sort the items array by date
        data.items.sort((a, b) => new Date(a.start.dateTime || a.start.date) - new Date(b.start.dateTime || b.start.date));

        data.items.forEach((event) => {
            const eventDateTime = new Date(event.start.dateTime || event.start.date);

            // Only display upcoming events
            if (eventDateTime >= now) {
                const row = document.createElement('tr');
                const dateLocationCell = document.createElement('td'); // New cell for date and location
                const summaryDescriptionCell = document.createElement('td'); // New cell for summary and description

                dateLocationCell.innerHTML = `<strong>${formatDate(eventDateTime).split('<br/>')[0]}</strong><br/>${formatDate(eventDateTime).split('<br/>')[1]}<br/><a href="https://www.google.com/maps/place/${encodeURI(event.location)}" target="_blank">${event.location}</a>`; // Format date and location
                summaryDescriptionCell.innerHTML = `<strong>${event.summary}</strong><br/>${event.description || 'No description available'}`; // Format summary and description

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
