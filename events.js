// Replace with your actual API key
const API_KEY = 'YOUR_API_KEY';

// Replace with your Google Calendar ID (usually an email address)
const CALENDAR_ID = 'YOUR_CALENDAR_ID';

// Fetch events from Google Calendar
async function fetchEvents() {
  try {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`
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
