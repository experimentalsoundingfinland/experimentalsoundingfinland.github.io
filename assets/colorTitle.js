window.onload = function() {
  var title = document.querySelector('.site-title');
  var words = title.textContent.split(' ');
  var newTitle = '';

  var minChange = 2; // Minimum number of letters to change
  var maxChange = 5; // Maximum number of letters to change

  for (var i = 0; i < 2; i++) {
    var word = words[i];
    var changeCount = Math.floor(Math.random() * (maxChange - minChange + 1)) + minChange; // Number of letters to change in the current word

    for (var j = 0; j < word.length; j++) {
      if (changeCount > 0) {
        var color;
        do {
          color = Math.floor(Math.random()*16777215).toString(16);
        } while (parseInt(color, 16) > 16777215 * 0.9 || // Avoid colors that are too light
                 color > 'aaff00' && color < 'bfff00' || // Avoid light green
                 color > 'ffffaa' && color < 'ffffbf');  // Avoid light yellow
        newTitle += '<span style="color: #' + color + ';">' + word[j] + '</span>';
        changeCount--;
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
