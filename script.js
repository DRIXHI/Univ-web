document.addEventListener("DOMContentLoaded", function () {
  // Mobile Menu Toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  mobileMenuButton.addEventListener("click", function () {
    mobileMenu.classList.toggle("hidden");
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      // Close mobile menu if open
      mobileMenu.classList.add("hidden");

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Adjust for fixed header
          behavior: "smooth",
        });

        // Update active nav link
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active");
        });
        this.classList.add("active");
      }
    });
  });

  // Back to Top Button
  const backToTopButton = document.getElementById("back-to-top");

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300) {
      backToTopButton.classList.remove("hidden");
    } else {
      backToTopButton.classList.add("hidden");
    }
  });

  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // ==============================
  // Form Validation + PHP submit
  // ==============================
const infoForm = document.getElementById("infoForm");
const formSuccess = document.getElementById("formSuccess");

infoForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let isValid = true;

  // Validate Name
  const name = document.getElementById("name");
  const nameError = document.getElementById("nameError");
  if (!name.value.trim()) { nameError.classList.remove("hidden"); isValid = false; }
  else { nameError.classList.add("hidden"); }

  // Validate Email
  const email = document.getElementById("email");
  const emailError = document.getElementById("emailError");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) { emailError.classList.remove("hidden"); isValid = false; }
  else { emailError.classList.add("hidden"); }

  // Validate Phone
  const phone = document.getElementById("phone");
  const phoneError = document.getElementById("phoneError");
  if (!phone.value.trim()) { phoneError.classList.remove("hidden"); isValid = false; }
  else { phoneError.classList.add("hidden"); }

  // Validate Sponsor
  const sponsor = document.getElementById("sponsor");
  const sponsorError = document.getElementById("sponsorError");
  if (!sponsor.value) { sponsorError.classList.remove("hidden"); isValid = false; }
  else { sponsorError.classList.add("hidden"); }

  // Validate Program
  const program = document.getElementById("program");
  const programError = document.getElementById("programError");
  if (!program.value) { programError.classList.remove("hidden"); isValid = false; }
  else { programError.classList.add("hidden"); }

  if (isValid) {
    const formData = new FormData(infoForm);

    fetch("backend/submit_form.php", {
      method: "POST",
      body: formData
    })
    .then(response => response.text())
    .then(data => {
      if (data.trim() === "success") {
        // Get uploaded file name if any
        const uploadedFile = document.getElementById("document").files[0];
        const fileName = uploadedFile ? uploadedFile.name : null;

        // Show success message
        let message = "Your application has been submitted successfully!";
        if (fileName) message += ` Uploaded file: ${fileName}`;

        formSuccess.textContent = message;
        formSuccess.classList.remove("hidden");

        // Reset form including file input
        infoForm.reset();
        setTimeout(() => formSuccess.classList.add("hidden"), 5000);
      } else {
        alert("Error: " + data);
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
    });
  }
});

  // Highlight active navigation link based on scroll position
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", function () {
    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 150) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Course card hover effect
  const courseCards = document.querySelectorAll(".course-card");
  courseCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)";
      this.style.boxShadow = "0 10px 25px rgba(0, 0, 0, 0.1)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "";
      this.style.boxShadow = "";
    });
  });
});

// Google Map init
function initMap() {
  var center = { lat: 4.88318, lng: 31.55979 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 15,
    center: center,
  });

  new google.maps.Marker({
    position: { lat: 4.88318, lng: 31.55979 },
    map: map,
    title: "Hospital",
    icon: { url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" },
  });

  new google.maps.Marker({
    position: { lat: 4.885, lng: 31.561 },
    map: map,
    title: "School",
    icon: { url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" },
  });
}

// Show colleges
function showCollege(collegeId) {
  const colleges = document.querySelectorAll(".college");
  colleges.forEach((college) => college.classList.add("hidden"));

  const selected = document.getElementById(collegeId);
  if (selected) {
    selected.classList.remove("hidden");
  }
}

// Filter courses by faculty
let hideTimeout;
let lastCollege = null;

function filterCourses(college) {
  const cards = document.querySelectorAll(".course-card");
  const messageBox = document.getElementById("course-message");

  messageBox.classList.add("hidden");
  lastCollege = college;
  clearTimeout(hideTimeout);

  cards.forEach((card) => {
    const cardCollege = card.getAttribute("data-college");
    card.style.display =
      college === "all" || cardCollege === college ? "block" : "none";
  });

  hideTimeout = setTimeout(() => {
    cards.forEach((card) => (card.style.display = "none"));
    messageBox.classList.remove("hidden");
  }, 60000); // 1 minute
}

function showLastCourses() {
  if (!lastCollege) return;
  filterCourses(lastCollege);
}

document.getElementById('mobile-menu-button').addEventListener('click', function() {
    var mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu.style.display === 'block') {
        mobileMenu.style.display = 'none';
    } else {
        mobileMenu.style.display = 'block';
    }
});

// Course filtering functionality
function filterCourses(college) {
  const courseCards = document.querySelectorAll('.course-card');
  const collegeFilters = document.querySelectorAll('.college-btn');
  
  // Update active button styling
  collegeFilters.forEach(btn => {
    if (btn.getAttribute('onclick').includes(college)) {
      btn.classList.add('college-btn-all');
      btn.classList.remove('college-btn-other');
    } else {
      btn.classList.remove('college-btn-all');
      btn.classList.add('college-btn-other');
    }
  });
  
  // Show/hide courses based on selection
  courseCards.forEach(card => {
    if (college === 'all' || card.getAttribute('data-college') === college) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}

// Show last courses function
function showLastCourses() {
  const courseMessage = document.getElementById('course-message');
  const courseCards = document.querySelectorAll('.course-card');
  
  courseCards.forEach(card => {
    card.style.display = 'block';
  });
  
  courseMessage.style.display = 'none';
}

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            const icon = mobileMenuButton.querySelector('i');
            if (mobileMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Back to top button
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.style.display = 'block';
            } else {
                backToTopButton.style.display = 'none';
            }
        });
        
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});