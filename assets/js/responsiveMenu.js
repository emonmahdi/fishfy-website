// Mobile menu toggle
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.getElementById("mobileMenu").classList.add("open");
});
document.getElementById("closeMenu").addEventListener("click", () => {
  document.getElementById("mobileMenu").classList.remove("open");
});

// Mobile dropdown toggle with icon update
document.querySelectorAll("#mobileMenu > ul > li > a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const parentLi = this.parentElement;
    const hasSubmenu = parentLi.querySelector(".submenu");
    const icon = this.querySelector(".menu-arrow");

    if (hasSubmenu) {
      e.preventDefault();
      parentLi.classList.toggle("open");

      // Toggle icon rotation
      icon.classList.toggle("fa-chevron-right");
      icon.classList.toggle("fa-chevron-down");
    }
  });
});
