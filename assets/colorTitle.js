window.onload = function() {
  var title = document.querySelector('.site-title');
  var words = title.textContent.split(' ');
  var newTitle = '';

  var minChange = 6; // Minimum number of letters to change
  var maxChange = 6; // Maximum number of letters to change

  // Array of colors to use
  var colors = ['color1', 'color2', 'color3', 'color4', 'color5', 'color6', 'color7', 'color8', 'color9', 'color10', 'color11'];

  for (var i = 0; i < 2; i++) {
    var word = words[i];
    var lettersToChange = new Set(); // Set of indices of letters to change

    // Decide the number of letters to change
    var changeCount = Math.floor(Math.random() * (maxChange - minChange + 1)) + minChange;

    // Ensure at least one letter is changed
    while (lettersToChange.size < changeCount) {
      lettersToChange.add(Math.floor(Math.random() * word.length));
    }

    for (var j = 0; j < word.length; j++) {
      if (lettersToChange.has(j)) {
        // Select a random color from the array
        var color = colors[Math.floor(Math.random() * colors.length)];
        newTitle += '<span class="' + color + '">' + word[j] + '</span>';
      } else {
        newTitle += word[j];
      }
    }
    newTitle += ' ';
  }

  // Add the word "Finland" with the specified color
  newTitle += '<span class="color12">' + words[2] + '</span> ';

  // Add the rest of the title
  newTitle += words.slice(3).join(' ');

  title.innerHTML = newTitle;
}
