// script.js
async function fetchEvents() {
    try {
        const response = await fetch('https://www.googleapis.com/calendar/v3/calendars/experimentalsoundingfinland@gmail.com/events?key=AIzaSyA8ibG6fO1SGlZilUaFrtQ-oFg0fQF2ksg');
        const data = await response.json();
        const eventsList = document.getElementById('events-list');

        data.items.forEach((event) => {
            const listItem = document.createElement('li');
            const eventDateTime = event.start.dateTime || event.start.date;
            const eventDescription = event.description || 'No description available';
            const eventLocation = event.location || 'No location specified';

            // Create a link to Google Maps using the location coordinates
            const googleMapsLink = `https://www.google.com/maps/place/${encodeURIComponent(eventLocation)}`;

            listItem.textContent = `${event.summary} - ${eventDateTime}`;
            eventsList.appendChild(listItem);

            // Add description and location details
            const descriptionItem = document.createElement('p');
            descriptionItem.textContent = `Description: ${eventDescription}`;
            eventsList.appendChild(descriptionItem);

            const locationLinkItem = document.createElement('p');
            locationLinkItem.innerHTML = `Location: <a href="${googleMapsLink}" target="_blank">${eventLocation}</a>`;
            eventsList.appendChild(locationLinkItem);
        });
    } catch (error) {
        console.error('Error fetching events:', error);
    }
}

// Call the function to fetch and display events
fetchEvents();
