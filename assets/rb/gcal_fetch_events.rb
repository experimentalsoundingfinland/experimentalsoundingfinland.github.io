# To run the script locally: 
# export GOOGLE_API_KEY=
# export GOOGLE_CALENDAR_ID=
# ruby path/to/update_posts.rb

require 'net/http'
require 'json'
require 'date'
require 'fileutils'

API_KEY = ENV["GOOGLE_API_KEY"]
CALENDAR_ID = ENV["GOOGLE_CALENDAR_ID"]
url = URI("https://www.googleapis.com/calendar/v3/calendars/#{CALENDAR_ID}/events?singleEvents=true&key=#{API_KEY}")

begin
  response = Net::HTTP.get(url)
  puts "API response: #{response}"
  data = JSON.parse(response)
  events = data['items']
  puts "Events: #{events}"
rescue StandardError => e
  puts "Error: #{e.message}"
  exit 1
end

if events.nil? || events.empty?
  puts "No events found"
  exit 0
end

# Ensure the _posts directory exists
FileUtils.mkdir_p('_posts')

# Ensure the ics directory exists
FileUtils.mkdir_p('ics')

events.each do |event|
  event_start = DateTime.parse(event['start']['dateTime'] || event['start']['date'])
  event_end = DateTime.parse(event['end']['dateTime'] || event['end']['date'])
  title = event['summary'].gsub(/[^0-9A-Za-z.\-]/, '-').downcase
  date_str = event_start.strftime('%Y-%m-%d')  # Format the date

  # Determine the portion of the event ID to use
  id_length = 8  # Desired length of the ID portion
  id_portion = event['id'][0...id_length]  # Use the first 'id_length' characters of the event ID
  id_portion = event['id'] if id_portion.length < id_length  # Use the full ID if it's shorter

  filename = "_posts/#{date_str}-#{id_portion}.md"  # Combine date and ID portion

  # Extract venue from the end of the description
  description = event['description'] || 'No description available.'
  venue_marker = 'event_venue123'
  if description.include?(venue_marker)
    venue = description.split(venue_marker).last.strip
    description = description.split(venue_marker).first.strip
  else
    venue = 'TBD'
  end

  # Convert URLs to Markdown links
  description = description.gsub(/(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9]+\.([a-zA-Z]{2,}([^\s]*)?))/) do |match|
    if match.start_with?('http')
      "[#{match}](#{match})"
    else
      "[#{match}](http://#{match})"
    end
  end

  # Replace newline characters with Markdown syntax
  description = description.gsub("\n", "  \n")

  content = <<~CONTENT
    ---
    layout: post
    title: "#{event['summary']}"
    date: #{event_start.iso8601}
    event_start: #{event_start.iso8601}
    event_end: #{event_end.iso8601}
    venue: "#{venue}"
    address: "#{event['location'] || 'TBD'}"
    ics_file: "#{date_str}-#{id_portion}.ics"
    created_date: #{event['created']}
    ---
  
    #{description}
  CONTENT

  # Generate ICS file
  date_parts = date_str.split('-')
  ics_content = <<~ICS
  BEGIN:VCALENDAR
  VERSION:2.0
  PRODID:-//#{title}//NONSGML v1.0//EN
  BEGIN:VEVENT
  UID:#{event['id']}
  DTSTART;TZID=Europe/Helsinki:#{event_start.strftime('%Y%m%dT%H%M%S')}
  DTEND;TZID=Europe/Helsinki:#{event_end.strftime('%Y%m%dT%H%M%S')}
  SUMMARY:#{event['summary']}
  DESCRIPTION:#{venue}
  LOCATION:#{event['location'] || 'TBD'}
  URL:https://experimentalsoundingfinland.github.io/experimentalsoundingfinland-v2/#{date_parts[0]}/#{date_parts[1]}/#{date_parts[2]}/#{id_portion}.html
  END:VEVENT
  END:VCALENDAR
  ICS

  ics_filename = "ics/#{date_str}-#{id_portion}.ics"
  File.write(ics_filename, ics_content)

  # Check if a file already exists for this event ID
  existing_file = Dir.glob("_posts/*").find do |file|
    file_id = File.basename(file).split('-').last.chomp('.md')  # Extract the ID from the filename
    file_id == event['id'] || file_id == event['id'][0...8]  # Match against the full ID or the first 8 characters
  end

  if existing_file
    existing_content = File.read(existing_file)

    if existing_content == content
      puts "File already exists for event: #{event['summary']}. No changes detected."
      # Also check if the ICS file exists and has the same content
      existing_ics_file = Dir.glob("ics/*").find do |file|
        file_id = File.basename(file).split('-').last.chomp('.ics')  # Extract the ID from the filename
        file_id == event['id'] || file_id == event['id'][0...8]  # Match against the full ID or the first 8 characters
      end

      if existing_ics_file
        existing_ics_content = File.read(existing_ics_file)

        if existing_ics_content == ics_content
          puts "ICS file already exists for event: #{event['summary']}. No changes detected."
        else
          puts "ICS file already exists for event: #{event['summary']}. Updating contents."
          File.write(ics_filename, ics_content)
        end
      else
        puts "Creating new ICS file for event: #{event['summary']}"
        File.write(ics_filename, ics_content)
      end
    else
      puts "File already exists for event: #{event['summary']}. Updating contents."
      File.write(existing_file, content)
      # Also update the ICS file
      existing_ics_file = Dir.glob("ics/*").find do |file|
        file_id = File.basename(file).split('-').last.chomp('.ics')  # Extract the ID from the filename
        file_id == event['id'] || file_id == event['id'][0...8]  # Match against the full ID or the first 8 characters
      end

      if existing_ics_file
        File.write(existing_ics_file, ics_content)
      else
        File.write(ics_filename, ics_content)
      end
    end
  else
    puts "Creating new file for event: #{event['summary']}"
    File.write(filename, content)
    puts "Creating new ICS file for event: #{event['summary']}"
    File.write(ics_filename, ics_content)
  end
end

# Delete files that don't match an event in the Google Calendar API response
Dir.glob("_posts/*.md").each do |file|
  filename = File.basename(file)
  file_id = filename.split('-').last.chomp('.md')  # Extract the ID from the filename

  # Check if the file ID matches any event ID
  existing_event = events.find { |event| event['id'] == file_id || event['id'][0...8] == file_id }

  if existing_event.nil?
    puts "Deleting file for event ID: #{file_id}"
    File.delete(file)
  end
end

# Also delete ICS files that don't match an event
Dir.glob("ics/*.ics").each do |file|
  filename = File.basename(file)
  file_id = filename.split('-').last.chomp('.ics')  # Extract the ID from the filename

  # Check if the file ID matches any event ID
  existing_event = events.find { |event| event['id'] == file_id || event['id'][0...8] == file_id }

  if existing_event.nil?
    puts "Deleting ICS file for event ID: #{file_id}"
    File.delete(file)
  end
end