var pageContent = document.querySelector('.page-content');
if (pageContent) {
  pageContent.classList.add('fade-in');
}

document.addEventListener('click', function(e) {
  var target = e.target;
  while (target && target.tagName !== 'A') {
    target = target.parentNode;
  }
  if (target && target.tagName === 'A') {
    e.preventDefault();
    if (pageContent) {
      pageContent.classList.remove('fade-in');
    }
    setTimeout(function() {
      window.location = target.href;
    }, 500);
  }
}, false);
