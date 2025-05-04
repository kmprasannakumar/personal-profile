document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents form from submitting by default
  
    // Get input values
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
  
    // Validation logic
    if (name === "") {
      alert("Please enter your name.");
      return;
    }
  
    if (!email.includes("@") || (!email.endsWith(".com") && !email.endsWith(".in"))) {
      alert("Please enter a valid email address (e.g., example@gmail.com).");
      return;
    }
  
    if (message.length < 10) {
      alert("Message must be at least 10 characters long.");
      return;
    }
  
    // If everything is valid
    alert("Form submitted successfully! ✅");
  
    // Clear form
    document.getElementById("contactForm").reset();
  });
  