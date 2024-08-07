/*!
 * Start Bootstrap - Freelancer v7.0.6 (https://startbootstrap.com/theme/freelancer)
 * Copyright 2013-2022 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-freelancer/blob/master/LICENSE)
 */
//
// Scripts
//

window.addEventListener("DOMContentLoaded", (event) => {
  // Get Data from LocalStorage
  var data = JSON.parse(localStorage.getItem("data"));

  // Navbar shrink function
  var navbarShrink = function () {
    const navbarCollapsible = document.body.querySelector("#mainNav");
    if (!navbarCollapsible) {
      return;
    }
    if (window.scrollY === 0) {
      navbarCollapsible.classList.remove("navbar-shrink");
    } else {
      navbarCollapsible.classList.add("navbar-shrink");
    }
  };

  // Shrink the navbar
  navbarShrink();

  // Shrink the navbar when page is scrolled
  document.addEventListener("scroll", navbarShrink);

  // Activate Bootstrap scrollspy on the main nav element
  const mainNav = document.body.querySelector("#mainNav");
  if (mainNav) {
    new bootstrap.ScrollSpy(document.body, {
      target: "#mainNav",
      offset: 72,
    });
  }

  // Collapse responsive navbar when toggler is visible
  const navbarToggler = document.body.querySelector(".navbar-toggler");
  const responsiveNavItems = [].slice.call(
    document.querySelectorAll("#navbarResponsive .nav-link")
  );
  responsiveNavItems.map(function (responsiveNavItem) {
    responsiveNavItem.addEventListener("click", () => {
      if (window.getComputedStyle(navbarToggler).display !== "none") {
        navbarToggler.click();
      }
    });
  });

  function fillData() {
    // Get all required Element
    let diseaseDiv = document.querySelector("#prevent > div > div.disease");
    let medicineDiv = document.querySelector("#prevent > div > div.medicine");
    let precautionDiv = document.querySelector("#prevent > div > div.precau");

    // Fill data into Elements
    // Creating a p tag
    let p = document.createElement("p");
    // Fill Disease
    p.innerText = "According to the Symptoms You Entered There is Chance Of You Having "+data.disease;
    diseaseDiv.append(p);
    // Fill Medicine
    p = document.createElement("p");
    p.innerText = "As per Your Disease, We Recommend You To Take "+ data.medicine+" By Consulting Your Family Doctor";
    medicineDiv.append(p);
    // Fill Precaution
    let ul = document.createElement("ul");
    data.precautions.forEach((precaution) => {
      let li = document.createElement("li");
      li.innerText = precaution;
      ul.append(li);
    });
    precautionDiv.append(ul);
  }

  fillData();
});
