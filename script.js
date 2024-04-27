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
                const summaryDescriptionCell = document.createElement('td'); // New cell for summary and description

                dateLocationCell.innerHTML = `<strong>${formatDate(eventDateTime).split(' ')[0]}</strong> ${formatDate(eventDateTime).split(' ')[1]}<br/><a href="https://www.google.com/maps/place/${encodeURI(event.location)}" target="_blank">${event.location}</a>`; // Format date and location
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
    const optionsDate = { day: '2-digit', month: '2-digit', year: '2-digit' };
    const optionsTime = { hour: '2-digit', minute: '2-digit' };
    const optionsWeekday = { weekday: 'long' };

    const formattedDate = date.toLocaleString('en-GB', optionsDate);
    const formattedTime = date.toLocaleString('en-GB', optionsTime);
    const formattedWeekday = date.toLocaleString('en-GB', optionsWeekday);

    // Ensure all values are defined before returning
    if(formattedDate && formattedTime && formattedWeekday) {
        return `<strong>${formattedDate}</strong><br/>${formattedWeekday}, ${formattedTime}`;
    } else {
        return 'Invalid date';
    }
}



