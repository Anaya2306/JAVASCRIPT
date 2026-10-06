import { schedule, addClassToSchedule } from './scheduleData.js';

let notifiedForClass = "";

// Display Notification
function showNotification(message) {
  const notifBox = document.getElementById("notification");
  notifBox.innerText = message;
  notifBox.style.display = "block";

  setTimeout(function() {
    notifBox.style.display = "none";
  }, 4000);
}

// Render Table Rows
function displayScheduleTable() {
  const tbody = document.getElementById("schedule-table-body");
  tbody.innerHTML = "";
  
  schedule.forEach(function(item) {
    const row = `<tr>
      <td>${item.subject}</td>
      <td>${item.faculty}</td>
      <td>${item.room}</td>
      <td>${item.startTime} - ${item.endTime}</td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

// Update Scheduler & Timer Logic
function updateScheduler() {
  const now = new Date();
  const currentSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

  let currentClass = null;
  let nextClass = null;

  for (let i = 0; i < schedule.length; i++) {
    const c = schedule[i];

    const startParts = c.startTime.split(":");
    const startSec = parseInt(startParts[0]) * 3600 + parseInt(startParts[1]) * 60;

    const endParts = c.endTime.split(":");
    const endSec = parseInt(endParts[0]) * 3600 + parseInt(endParts[1]) * 60;

    if (currentSeconds >= startSec && currentSeconds < endSec) {
      currentClass = c;
      currentClass.endSec = endSec;
      break;
    }

    if (currentSeconds < startSec && !nextClass) {
      nextClass = c;
      nextClass.startSec = startSec;
    }
  }

  // UI Updates
  if (currentClass) {
    document.getElementById("status-title").innerText = "Current Class In Progress";
    document.getElementById("subject-name").innerText = currentClass.subject;
    document.getElementById("faculty-name").innerText = currentClass.faculty;
    document.getElementById("room-name").innerText = currentClass.room;
    document.getElementById("class-time").innerText = `${currentClass.startTime} - ${currentClass.endTime}`;

    const remainingSec = currentClass.endSec - currentSeconds;
    document.getElementById("countdown-timer").innerText = `Class in progress - ${formatTime(remainingSec)} remaining`;

  } else if (nextClass) {
    document.getElementById("status-title").innerText = "Next Scheduled Class";
    document.getElementById("subject-name").innerText = nextClass.subject;
    document.getElementById("faculty-name").innerText = nextClass.faculty;
    document.getElementById("room-name").innerText = nextClass.room;
    document.getElementById("class-time").innerText = `${nextClass.startTime} - ${nextClass.endTime}`;

    const remainingSec = nextClass.startSec - currentSeconds;
    document.getElementById("countdown-timer").innerText = `Next class starts in - ${formatTime(remainingSec)}`;

    if (remainingSec <= 300 && notifiedForClass !== nextClass.subject) {
      showNotification(`Your class "${nextClass.subject}" will start in 5 minutes.`);
      notifiedForClass = nextClass.subject;
    }

  } else {
    document.getElementById("status-title").innerText = "No More Classes Today";
    document.getElementById("subject-name").innerText = "-";
    document.getElementById("faculty-name").innerText = "-";
    document.getElementById("room-name").innerText = "-";
    document.getElementById("class-time").innerText = "-";
    document.getElementById("countdown-timer").innerText = "All classes finished!";
  }
}

// Convert seconds to HH:MM:SS format
function formatTime(totalSeconds) {
  let hrs = Math.floor(totalSeconds / 3600);
  let mins = Math.floor((totalSeconds % 3600) / 60);
  let secs = totalSeconds % 60;

  if (hrs < 10) hrs = "0" + hrs;
  if (mins < 10) mins = "0" + mins;
  if (secs < 10) secs = "0" + secs;

  return `${hrs}:${mins}:${secs}`;
}

// Handle Add Class Form Submission
document.getElementById("class-form").addEventListener("submit", function(event) {
  event.preventDefault(); // Stop page refresh

  const subject = document.getElementById("input-subject").value.trim();
  const faculty = document.getElementById("input-faculty").value.trim();
  const room = document.getElementById("input-room").value.trim();
  const startTime = document.getElementById("input-start").value;
  const endTime = document.getElementById("input-end").value;

  // Validation: Start time must be before end time
  if (startTime >= endTime) {
    alert("Error: Start time must be earlier than End time.");
    return;
  }

  // Add new object to schedule array
  addClassToSchedule({ subject, faculty, room, startTime, endTime });

  // Update UI and clear form
  displayScheduleTable();
  updateScheduler();
  document.getElementById("class-form").reset();

  showNotification(`New class "${subject}" successfully added!`);
});

// Initialization
displayScheduleTable();
updateScheduler();
setInterval(updateScheduler, 1000);