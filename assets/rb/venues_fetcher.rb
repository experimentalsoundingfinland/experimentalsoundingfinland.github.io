require 'open-uri'
require 'csv'
require 'fileutils'
require 'date'

# Google Sheet URL
url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQsOQoJpQo5IdHSKzYlaU7Kce4L67b0SnrEPNHM5tMJ8ncULoeq80iXu-23Os2rnbCY77arZ5WcDa6c/pub?output=csv'

# Ensure the _venues directory exists
FileUtils.mkdir_p('_venues')

# Fetch the CSV data from the Google Sheet
csv_data = URI.open(url).read

# Parse the CSV data
venues = CSV.parse(csv_data, headers: false).drop(1) # Skip the first row

# Create a new file for each venue
venues.each do |venue|
  next if venue.empty? # Skip empty rows
  timestamp = venue[0]
  name = venue[1]
  street_address = venue[2]
  city = venue[3]
  description = venue[4] || ''
  technical_info = venue[5] || ''
  contacts = venue[6] || '' # Ignore the "Not a robot?" column
  address = "#{street_address}, #{city}"
  filename = "_venues/#{Date.today.strftime('%Y-%m-%d')}-#{name.downcase.gsub(' ', '-').gsub(/[^0-9A-Za-z.\-]/, '-')}.md"

  # Replace email addresses with [AT] and [DOT] format
  description = description.gsub(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/) do |match|
    match.gsub('@', '[AT]').gsub('.', '[DOT]')
  end

  technical_info = technical_info.gsub(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/) do |match|
    match.gsub('@', '[AT]').gsub('.', '[DOT]')
  end

  contacts = contacts.gsub(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/) do |match|
    match.gsub('@', '[AT]').gsub('.', '[DOT]')
  end

  # Convert URLs to Markdown links
  description = description.gsub(/(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9]+\.([a-zA-Z]{2,}([^\s]*)?))/) do |match|
    if match.start_with?('http')
      "[#{match}](#{match})"
    else
      "[#{match}](http://#{match})"
    end
  end

  technical_info = technical_info.gsub(/(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9]+\.([a-zA-Z]{2,}([^\s]*)?))/) do |match|
    if match.start_with?('http')
      "[#{match}](#{match})"
    else
      "[#{match}](http://#{match})"
    end
  end

  contacts = contacts.gsub(/(https?:\/\/[^\s]+)|(www\.[^\s]+)|([a-zA-Z0-9]+\.([a-zA-Z]{2,}([^\s]*)?))/) do |match|
    if match.start_with?('http')
      "[#{match}](#{match})"
    else
      "[#{match}](http://#{match})"
    end
  end

  # Replace newline characters with Markdown syntax
  description = description.gsub("\n", "  \n")
  technical_info = technical_info.gsub("\n", "  \n")
  contacts = contacts.gsub("\n", "  \n")

  content = <<~CONTENT
    ---
    layout: venue
    title: "#{name}"
    address: "#{address}"
    ---

    #{description}

    ## Technical Information
    #{technical_info}

    ## Contacts
    #{contacts}
  CONTENT

  File.write(filename, content)
end
