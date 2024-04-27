---
layout: page
title: Calendar
---
<html>
    <body>
    <style>
        /* Add this style block */
        #events-list td:first-child {
            width: 40%; /* Adjust this value as needed */
        }
        #events-list td:last-child {
            width: 60%; /* Adjust this value as needed */
        }
        /* Add this to set the z-index of your table */
        table {
            position: relative;
            z-index: 0; /* Adjust this value as needed */
        }
    </style>
    <table>
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
