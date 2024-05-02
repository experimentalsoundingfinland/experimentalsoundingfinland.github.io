document.addEventListener('DOMContentLoaded', function() {
  var links = document.getElementsByTagName('a');
  for (var i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(e) {
      if (this.href === window.location.href) {
        e.preventDefault();
      }
    });
  }
});
