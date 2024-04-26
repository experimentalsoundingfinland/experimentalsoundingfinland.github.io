async function fetchUpcomingEvents() {
    try {
        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/experimentalsoundingfinland@gmail.com/events?key=AIzaSyA8ibG6fO1SGlZilUaFrtQ-oFg0fQF2ksg');
        const data = await response.json();
        const eventsList = document.getElementById('events-list');

        const now = new Date(); // Get the current date and time

        data.items.forEach((event) => {
            const eventDateTime = new Date(event.start.dateTime || event.start.date);

            // Only display upcoming events
            if (eventDateTime >= now) {
                const row = document.createElement('tr');
                const dateCell = document.createElement('td'); // New cell for date
                const summaryCell = document.createElement('td');
                const descriptionCell = document.createElement('td');
                const locationCell = document.createElement('td');

                dateCell.textContent = formatDate(eventDateTime); // Format date
                summaryCell.textContent = event.summary;
                descriptionCell.innerHTML = event.description || 'No description available';
                locationCell.innerHTML = `<a href="https://www.google.com/maps/place/${encodeURIComponent(event.location)}" target="_blank">${event.location}</a>`;

                row.appendChild(dateCell);
                row.appendChild(summaryCell);
                row.appendChild(descriptionCell);
                row.appendChild(locationCell);
                eventsList.appendChild(row);
            }
        });
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

// Call the function to fetch and display upcoming events
fetchUpcomingEvents();

// Function to format date as "YYYY-MM-DD HH:MM"
function formatDate(date) {
    const options = { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleString('fi-FI', options);
}
