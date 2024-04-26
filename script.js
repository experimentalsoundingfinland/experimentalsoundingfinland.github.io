// script.js
async function fetchEvents() {
    try {
        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/experimentalsoundingfinland@gmail.com/events?key=AIzaSyA8ibG6fO1SGlZilUaFrtQ-oFg0fQF2ksg');
        const data = await response.json();
        const eventsList = document.getElementById('events-list');

        data.items.forEach((event) => {
            const listItem = document.createElement('li');
            const when = event.start.dateTime || event.start.date;
            const description = event.description || 'No description available';
            const location = event.location || 'No location specified';

            listItem.textContent = `${event.summary} - ${when} - Description: ${description} - Location: ${location}`;
            eventsList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

// Call the function to fetch and display events
fetchEvents();
