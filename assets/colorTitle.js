window.onload = function() {
  var title = document.querySelector('.site-title');
  var words = title.textContent.split(' ');
  var newTitle = '';

  for (var i = 0; i < 2; i++) {
    var word = words[i];
    for (var j = 0; j < word.length; j++) {
      var color = '#' + Math.floor(Math.random()*16777215).toString(16);
      newTitle += '<span style="color: ' + color + ';">' + word[j] + '</span>';
    }
    newTitle += ' ';
  }

  newTitle += words.slice(2).join(' ');
  title.innerHTML = newTitle;
}
