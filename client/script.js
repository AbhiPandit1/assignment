// Get form and input elements
const form = document.querySelector('form');
const firstNameInput = document.querySelector('#first-name');
const lastNameInput = document.querySelector('#last-name');
const emailInput = document.querySelector('#email');
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const confirmPasswordInput = document.querySelector('#confirm-password');

// Add event listener for form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault(); // Prevent form from submitting the default way

  // Get values from form inputs
  const firstName = firstNameInput.value;
  const lastName = lastNameInput.value;
  const email = emailInput.value;
  const username = usernameInput.value;
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  // Create data object to send in the POST request
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
    const response = await fetch('http://localhost:3000/api/post/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    // Check if the response is successful
    const result = await response.json();

    if (response.ok) {
      // If successful, show success message
      alert('Successfully registered!');
    } else {
      // If error, show error message
      alert(result.message || 'Registration failed. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred while processing your request. Please try again.');
  }
});
