async function fetchUpcomingEvents() {
    try {
        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/experimentalsoundingfinland@gmail.com/events?key=AIzaSyA8ibG6fO1SGlZilUaFrtQ-oFg0fQF2ksg');
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
                const summaryCell = document.createElement('td');
                const descriptionCell = document.createElement('td');

                // Add inline styles to the cells
                dateLocationCell.style.width = '25%';
                summaryCell.style.width = '25%';
                descriptionCell.style.width = '50%';

                dateLocationCell.innerHTML = `<strong>${formatDate(eventDateTime).split(' ')[0]}</strong> ${formatDate(eventDateTime).split(' ')[1]}<br/><a href="https://www.google.com/maps/place/${encodeURI(event.location)}" target="_blank">${event.location}</a>`; // Format date and location
                summaryCell.textContent = event.summary;
                descriptionCell.innerHTML = event.description || 'No description available';

                row.appendChild(dateLocationCell);
                row.appendChild(summaryCell);
                row.appendChild(descriptionCell);
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
