// JavaScript to handle the form submission and store emails
let emailsList = []; // Initialize an empty array to store emails

document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    const email = document.getElementById('emailInput').value; // Get the email from the input
    emailsList.push(email); // Add the email to the array

    console.log(emailsList); // For demonstration, log the updated list to the console

    document.getElementById('emailInput').value = ''; // Optionally, clear the input field
});