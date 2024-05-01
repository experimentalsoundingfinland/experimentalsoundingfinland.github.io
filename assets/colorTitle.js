window.onload = function() {
  var title = document.querySelector('.site-title');
  var words = title.textContent.split(' ');
  var newTitle = '';

  var minChange = 2; // Minimum number of letters to change
  var maxChange = 5; // Maximum number of letters to change

  // Array of colors to use
  var colors = ['#000000', '#003300', '#000033', '#330000', '#333333', '#003333', '#330033', '#333300', '#333366', '#006600', '#000066', '#660000'];

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
        newTitle += '<span style="color: ' + color + ';">' + word[j] + '</span>';
      } else {
        newTitle += word[j];
      }
    }
    newTitle += ' ';
  }

  // Add the word "Finland" with the specified color
  newTitle += '<span style="color: #002F6C;">' + words[2] + '</span> ';

  // Add the rest of the title
  newTitle += words.slice(3).join(' ');

  title.innerHTML = newTitle;
}