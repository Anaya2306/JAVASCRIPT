// Schedule Data Module (ES6 Export)
// Changed to 'let' so new classes can be added/sorted dynamically
export let schedule = [
  { subject: "Mathematics", faculty: "Dr. A. Sharma", room: "Room 101", startTime: "09:00", endTime: "10:00" },
  { subject: "Physics", faculty: "Prof. B. Verma", room: "Lab 2", startTime: "10:00", endTime: "11:00" },
  { subject: "Computer Networks", faculty: "Dr. C. Patel", room: "Room 204", startTime: "11:00", endTime: "12:00" },
  { subject: "Data Structures", faculty: "Prof. D. Gupta", room: "Lab 1", startTime: "12:00", endTime: "13:00" },
  { subject: "Web Development", faculty: "Dr. E. Singh", room: "Room 305", startTime: "13:00", endTime: "14:00" }
];

// Helper function to add new class and keep array sorted by start time
export function addClassToSchedule(newClass) {
  schedule.push(newClass);
  // Sort schedule chronologically by start time
  schedule.sort((a, b) => a.startTime.localeCompare(b.startTime));
}