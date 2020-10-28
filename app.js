const loanForm = document.querySelector("#loan-form");
console.log(loanForm);

loanForm.addEventListener("submit", function (e) {
  // hide results
  document.getElementById("results").style.display = "none";

  // show loading
  document.getElementById("loading").style.display = "block";

  setTimeout(calculateResults, 2000);

  e.preventDefault();
});

// Calculate Result
function calculateResults() {
  // UI var
  const amount = document.getElementById("amount");
  const interest = document.getElementById("interest");
  const years = document.getElementById("years");
  const monthlyPayment = document.getElementById("monthly-payment");
  const totalPayment = document.getElementById("total-payment");
  const totalInterest = document.getElementById("total-interest");

  const principal = parseFloat(amount.value);
  const calculatedInterest = parseFloat(interest.value) / 100 / 12;
  const calculatedPayments = parseFloat(years.value) * 12;

  // Compute monthly payments
  const x = Math.pow(1 + calculatedInterest, calculatedPayments);
  const monthly = (principal * x * calculatedInterest) / (x - 1);

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatedPayments).toFixed(2);
    totalInterest.value = (monthly * calculatedPayments - principal).toFixed(2);

    // show results
    document.getElementById("results").style.display = "block";

    // hide loading
    document.getElementById("loading").style.display = "none";
  } else {
    showError("check your numbers");
  }
}

// Show Error
function showError(error) {
  // hide results
  document.getElementById("results").style.display = "none";
  // hide loading
  document.getElementById("loading").style.display = "none";

  // create a div
  const errorDiv = document.createElement("div");
  // Add class
  errorDiv.className = "alert alert-danger";
  // Create text node and append to div
  errorDiv.append(document.createTextNode(error));

  // Get element .card
  const card = document.querySelector(".card");
  // Insert error above heading
  card.prepend(errorDiv);

  // Clear error after 3 seconds
  setTimeout(clearError, 3000);
}

// Clear error
function clearError() {
  document.querySelector(".alert").remove();
}
