const menuToggle = document.querySelector(".menu-toggle");
const mobileMenu = document.querySelector(".mobile-menu");
const appointmentForm = document.querySelector(".form-card form");
const navbar = document.querySelector(".navbar");

if (menuToggle && mobileMenu) {
  const setMenuState = (isOpen) => {
    menuToggle.classList.toggle("active", isOpen);
    mobileMenu.classList.toggle("active", isOpen);
    document.body.classList.toggle("menu-open", isOpen);
    navbar?.classList.toggle("menu-open", isOpen);
  };

  menuToggle.addEventListener("click", () => {
    setMenuState(!mobileMenu.classList.contains("active"));
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      setMenuState(false);
    });
  });

  document.addEventListener("click", (event) => {
    const clickedInsideMenu = mobileMenu.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle) {
      setMenuState(false);
    }
  });
}

if (appointmentForm) {
  appointmentForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const [nameInput, phoneInput, serviceSelect] =
      appointmentForm.querySelectorAll("input, select");

    const appointmentData = {
      name: nameInput.value.trim(),
      phone: phoneInput.value.trim(),
      service: serviceSelect.value,
      createdAt: new Date().toISOString(),
    };

    if (!appointmentData.name || !appointmentData.phone || appointmentData.service === "Select Service") {
      alert("Please fill out all appointment details.");
      return;
    }

    try {
      await fakeBackendRequest(appointmentData);
      alert("Appointment request submitted successfully.");
      appointmentForm.reset();
    } catch (error) {
      console.error("Appointment request failed:", error);
      alert("Something went wrong. Please try again.");
    }
  });
}

function fakeBackendRequest(data) {
  return new Promise((resolve) => {
    console.log("Sending data to backend:", data);
    setTimeout(resolve, 800);
  });
}
