window.onload = function() {
  var title = document.querySelector('.site-title');
  var words = title.textContent.split(' ');
  var newTitle = '';

  for (var i = 0; i < 2; i++) {
    var word = words[i];
    for (var j = 0; j < word.length; j++) {
      var color;
      do {
        color = Math.floor(Math.random()*16777215).toString(16);
      } while (parseInt(color, 16) > 16777215 * 0.20); // Avoid colors that are too light
      newTitle += '<span style="color: #' + color + ';">' + word[j] + '</span>';
    }
    newTitle += ' ';
  }

  // Add the word "Finland" with the specified color
  newTitle += '<span style="color: #336699;">' + words[2] + '</span> ';

  // Add the rest of the title
  newTitle += words.slice(3).join(' ');

  title.innerHTML = newTitle;
}
