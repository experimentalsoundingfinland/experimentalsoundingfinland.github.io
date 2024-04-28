---
layout: page
title: Calendar
---
<html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <body>
    <style>
    /* Add this style block */
    #events-list td:first-child {
        width: 40%; /* Adjust this value as needed */
    }
    #events-list td:last-child {
        width: 60%; /* Adjust this value as needed */
    }
    #events-list td {
        vertical-align: top;
        text-align: left;
    }
</style>
    <table style="width:100%">
        <thead>
            <tr>
                <th>Date and Location</th>
                <th>Event Name and Description</th>
            </tr>
        </thead>
        <tbody id="events-list"></tbody>
    </table>
    <script src="script.js"></script>
</body>
</html>
