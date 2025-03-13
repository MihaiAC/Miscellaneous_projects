const TAB_ACTIVE_CLASS = "tab-active";
const tab_divs = document.querySelectorAll(".tab");
const content_divs = document.querySelectorAll(".panel");

// Quick implementation, surely not optimal.
function onTabClick(event) {
  const active_div = event.target;

  // Tag is 'panel-x'
  const tag = active_div.dataset.target;
  const active_p = document.querySelector(`p[data-target="${tag}"]`);
  const active_content_div = document.querySelector(`div.${tag}`);

  // Remove active class from every tab.
  tab_divs.forEach((tab_div) => {
    const tab_p = tab_div.querySelector("p");
    tab_p.classList.remove(TAB_ACTIVE_CLASS);
  });

  // Add hidden to all content divs.
  content_divs.forEach((content_div) => {
    content_div.classList.add("hidden");
  });

  // Put active class on active_p.
  active_p.classList.add(TAB_ACTIVE_CLASS);

  // Display active content.
  active_content_div.classList.remove("hidden");
}

// Add event listeners to the tabs
tab_divs.forEach((tab_div) => tab_div.addEventListener("click", onTabClick));
