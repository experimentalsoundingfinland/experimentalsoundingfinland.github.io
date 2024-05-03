window.onload = function() {
    var navLinks = document.querySelectorAll('div.trigger a.page-link');
    navLinks.forEach(function(link) {
        if (link.href === window.location.href) {
            link.onclick = function(event) {
                event.preventDefault();
            }
        }
    });
}
