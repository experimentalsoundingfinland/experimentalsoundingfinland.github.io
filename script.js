async function fetchUpcomingEvents() {
    try {
        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/experimentalsoundingfinland@gmail.com/events?key=AIzaSyA8ibG6fO1SGlZilUaFrtQ-oFg0fQF2ksg');
        const data = await response.json();
        const eventsList = document.getElementById('events-list');
        const cityMenu = document.getElementById('city-menu');

        const now = new Date(); // Get the current date and time

        // Create a set of cities from the events
        const cities = new Set(data.items.map(event => event.location));

        // Clear the city menu and add an option for each city
        cityMenu.innerHTML = '';
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.text = city;
            cityMenu.appendChild(option);
        });

        cityMenu.addEventListener('change', () => {
            while (eventsList.firstChild) {
                eventsList.removeChild(eventsList.firstChild);
            }
            displayEvents(data.items, cityMenu.value);
        });

        displayEvents(data.items);
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

function displayEvents(events, city = '') {
    const eventsList = document.getElementById('events-list');
    const now = new Date(); // Get the current date and time

    events.forEach((event) => {
        const eventDateTime = new Date(event.start.dateTime || event.start.date);

        // Only display upcoming events in the selected city
        if (eventDateTime >= now && (city === '' || event.location === city)) {
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
