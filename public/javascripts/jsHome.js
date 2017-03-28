// Change style of navbar on scroll
window.onscroll = function() {scrollDynamics()};
function scrollDynamics() {
    var navbar = document.getElementById("headerMenu");
    var menuAlt = document.getElementById("headerMenuAlt");
    var referTop = document.getElementById("referTop");
    var headerMenuAltDropdown = document.getElementById("headerMenuAltDropdown");
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        navbar.classList.add("displayNone");
        menuAlt.classList.remove("displayNone");
     	referTop.classList.remove("displayNone");
     	headerMenuAltDropdown.classList.remove("headerMenuAltDropdownSmallScreen");
    } else {
        navbar.classList.remove("displayNone");
        menuAlt.classList.add("displayNone");
        referTop.classList.add("displayNone");
        headerMenuAltDropdown.classList.add("displayNone");
        menuAlt.classList.remove("headerMenuAltActive");
        headerMenuAltDropdown.classList.add("headerMenuAltDropdownSmallScreen");
    }
}

function toggleHeaderMenuAlt() {
    var menuAlt = document.getElementById("headerMenuAlt");
    var menuAltDropdown = document.getElementById("headerMenuAltDropdown");
    if ( hasClass(menuAlt, "headerMenuAltActive") == true) {
    	menuAltDropdown.classList.add("displayNone");
    	menuAlt.classList.remove("headerMenuAltActive");
    }
    else {
    	menuAltDropdown.classList.remove("displayNone");
    	menuAlt.classList.add("headerMenuAltActive");
    }
}

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

function scrollUp() {
    document.body.scrollTop = 0;
}
