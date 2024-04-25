// Replace with your actual API key
const API_KEY = 'AIzaSyA8ibG6fO1SGlZilUaFrtQ-oFg0fQF2ksg';

// Replace with your Google Calendar ID (usually an email address)
const CALENDAR_ID = 'experimentalsoundingfinland@gmail.com';

// Fetch events from Google Calendar
async function fetchEvents() {
  try {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${experimentalsoundingfinland@gmail.com}/events?key=${AIzaSyA8ibG6fO1SGlZilUaFrtQ-oFg0fQF2ksg}`
    );
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

// Format events as Markdown
function formatEvents(events) {
  let markdown = '## Upcoming Events\n\n';
  events.forEach((event) => {
    const startDate = new Date(event.start.dateTime);
    markdown += `- **${event.summary}**: ${startDate.toDateString()}\n`;
  });
  return markdown;
}

// Main function
async function main() {
  const events = await fetchEvents();
  const markdownContent = formatEvents(events);

  // Now you can save `markdownContent` to a file in your GitHub repository
  // and it will display the upcoming events in Markdown format.
}

main();
