document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('sign-up-form');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Validation (Optional)
    if (!username || !password) {
      alert('Please fill in both username and password.');
      return;
    }

    try {
      const response = await fetch(
        'https://assignment-jyep.onrender.com/api/login/user',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        alert(`Login successful! Welcome, ${data.user.firstName}`);
      } else {
        // Handle errors (e.g., invalid credentials)
        const errorData = await response.json();
        alert(`Login failed: ${errorData.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.');
    }
  });
});
