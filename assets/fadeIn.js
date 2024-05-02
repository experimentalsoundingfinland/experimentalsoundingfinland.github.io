document.body.classList.add('fade-in');

document.addEventListener('click', function(e) {
  var target = e.target;
  while (target && target.tagName !== 'A') {
    target = target.parentNode;
  }
  if (target && target.tagName === 'A') {
    e.preventDefault();
    document.body.classList.remove('fade-in');
    setTimeout(function() {
      window.location = target.href;
    }, 500);
  }
}, false);
