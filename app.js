document.getElementById("loan-form").addEventListener("submit", function (e) {
  document.getElementById("results").style.display = "none";
  document.getElementById("loading").style.display = "block";

  // Show loading and delay calculation for demonstration purposes
  setTimeout(calculate, 2000);
  e.preventDefault();
});

function calculate() {
  // Retrieve values from input fields
  const amount = document.getElementById("loan_amount").value;
  const interest = document.getElementById("interest").value;
  const years = document.getElementById("years").value;

  // UI elements for results
  const monthlyPayment = document.getElementById("monthly_payment");
  const yearlyPayment = document.getElementById("yearly_payment");
  const totalAmount = document.getElementById("total_amount");
  const totalInterest = document.getElementById("total_interest");

  // Convert input values to numerical form
  const principal = parseFloat(amount);
  const calculatedInterest = parseFloat(interest) / 100 / 12;
  const calculatedPayments = parseFloat(years) * 12;

  // Calculate monthly payment
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  // Check if the result is a finite number
  if (isFinite(monthly)) {
    // Calculate and display monthly and yearly payment
    monthlyPayment.value = monthly.toFixed(2);
    yearlyPayment.value = (monthly * 12).toFixed(2);

    // Calculate and display total amount and total interest
    totalAmount.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    // Show results and hide loading
    document.getElementById("results").style.display = "block";
    document.getElementById("loading").style.display = "none";
  } else {
    showAlert("Please enter valid numbers for all fields.");
  }
}

function showAlert(error) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "alert alert-danger";
  errorDiv.appendChild(document.createTextNode(error));

  const card = document.querySelector(".card");
  const heading = document.querySelector(".heading");

  // Insert error message in the card, just before the heading
  card.insertBefore(errorDiv, heading);

  // Clear alert after 3 seconds
  setTimeout(() => document.querySelector(".alert").remove(), 3000);
}
