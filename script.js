// Function to display winning team message
function showWinningTeam(teamId) {
  const greeting = document.getElementById("greeting");
  greeting.textContent = `Congratulations, ${teamId}!`;
  greeting.style.display = "block";
}
// Get all needed DOM elements
const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");

// Track Attendance
let count = 0;
const maxCount = 50;

// Handle form submission
form.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent default form submission

  // Get input values
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  // Show the correct team label (teamName)
  console.log(name, teamName);

  // Stop registration if max reached (prevent further check-ins)
  if (count >= maxCount) {
    form.querySelectorAll("input, select, button").forEach(function (el) {
      el.disabled = true;
    });
    return;
  }

  // Update Team Count
  const teamCounter = document.getElementById(team + "Count");
  let currentTeamCount = parseInt(teamCounter.textContent);
  if (isNaN(currentTeamCount)) {
    currentTeamCount = 0;
  }
  teamCounter.textContent = currentTeamCount + 1;

  // Calculate total attendees from team counts
  const waterCount =
    parseInt(document.getElementById("waterCount").textContent) || 0;
  const zeroCount =
    parseInt(document.getElementById("zeroCount").textContent) || 0;
  const powerCount =
    parseInt(document.getElementById("powerCount").textContent) || 0;
  count = waterCount + zeroCount + powerCount;
  console.log("Total Check-Ins: ", count);
  // Update attendee count at the top
  const attendeeCountSpan = document.getElementById("attendeeCount");
  attendeeCountSpan.textContent = count;

  // If this is the 50th attendee, show the winning team message and disable the form
  if (count === maxCount) {
    let winningTeamLabel = "";
    if (waterCount >= zeroCount && waterCount >= powerCount) {
      winningTeamLabel = "Team Water Wise";
    } else if (zeroCount >= waterCount && zeroCount >= powerCount) {
      winningTeamLabel = "Team Net Zero";
    } else {
      winningTeamLabel = "Team Renewables";
    }

    showWinningTeam(winningTeamLabel);
    form.querySelectorAll("input, select, button").forEach(function (el) {
      el.disabled = true;
    });
    return;
  }

  // Update Progress Bar
  const percentage = Math.round((count / maxCount) * 100) + "%";
  console.log(`Progress: ${percentage}`);
  const progressBar = document.getElementById("progressBar");
  progressBar.style.width = percentage;

  // Show Welcome Message
  const message = `Welcome, ${name} from ${teamName}!`;
  const greeting = document.getElementById("greeting");
  greeting.textContent = message;
  greeting.style.display = "block";

  // Reset form
  form.reset();
});
