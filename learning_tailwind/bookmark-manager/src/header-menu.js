// Mobile menu functionality
const hamburgerBtn = document.getElementById("menu-btn");
const hamburgerMenu = document.getElementById("menu");
const hamburgerLogo = document.getElementById("hamburger-logo");

function menuToggle(event) {
  hamburgerBtn.classList.toggle("open");
  hamburgerMenu.classList.toggle("flex");
  hamburgerMenu.classList.toggle("hidden");

  // Change logo to footer version (white).
  const isHamburgerOpen = hamburgerMenu.classList.contains("flex");
  if (isHamburgerOpen) {
    hamburgerLogo.setAttribute("src", "./images/logo-bookmark-footer.svg");
  } else {
    hamburgerLogo.setAttribute("src", "./images/logo-bookmark.svg");
  }
}

// Hamburger button listener.
hamburgerBtn.addEventListener("click", menuToggle);
