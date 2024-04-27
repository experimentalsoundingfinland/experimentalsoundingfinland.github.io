---
layout: page
title: Calendar
---

<html>
<body>
    <style>
        /* Add this style block */
        #events-list td:first-child {
            width: 30%; /* Adjust this value as needed */
        }
        #events-list td:last-child {
            width: 70%; /* Adjust this value as needed */
        }
    </style>
    <table>
        <thead>
            <tr>
                <th>Date and Location</th>
                <th>Event and Description</th>
            </tr>
        </thead>
        <tbody id="events-list"></tbody>
    </table>
    <script src="script.js"></script>
</body>
</html>

