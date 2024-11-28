// Get form and input elements
const form = document.querySelector('form');
const firstNameInput = document.querySelector('#first-name');
const lastNameInput = document.querySelector('#last-name');
const emailInput = document.querySelector('#email');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');

// Helper function to validate email format
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// event listener for form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent form from submitting the default 

  // Get values from form inputs
  const firstName = firstNameInput.value.trim();
  const lastName = lastNameInput.value.trim();
  const email = emailInput.value.trim();
  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Validation checks
  if (!firstName) {
    alert('First name is required.');
    return;
  }
  if (!firstName.length > 1) {
    alert('First name have only 1 character.');
    return;
  }

  if (!lastName) {
    alert('Last name is required.');
    return;
  }

  if (!email) {
    alert('Email is required.');
    return;
  }

  if (!isValidEmail(email)) {
    alert('Please enter a valid email address.');
    return;
  }

  if (!username) {
    alert('Username is required.');
    return;
  }

  if (username.length < 4) {
    alert('Username must be at least 4 characters long.');
    return;
  }

  if (!password) {
    alert('Password is required.');
    return;
  }

  if (password.length < 6) {
    alert('Password must be at least 6 characters long.');
    return;
  }

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  
  const data = {
    firstName,
    lastName,
    email,
    username,
    password,
    confirmPassword,
  };

  try {
    // Make POST request to server
    const response = await fetch('https://assignment-jyep.onrender.com/api/post/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Check if there is response
    const result = await response.json();

    if (response.ok) {
      // success message
      alert('Successfully registered!');
    } else {
     
      alert(result.message || 'Registration failed. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while processing your request. Please try again.');
  }
});
