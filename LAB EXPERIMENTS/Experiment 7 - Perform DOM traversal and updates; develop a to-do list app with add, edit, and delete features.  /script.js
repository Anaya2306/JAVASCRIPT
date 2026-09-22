// Global State Array to track items effectively
let tasks = [];

// DOM Bindings
const taskInput = document.getElementById('task-input');
const prioritySelect = document.getElementById('priority-select');
const starToggleBtn = document.getElementById('star-toggle-btn');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const upNextText = document.getElementById('up-next-text');

// Handle Star Toggle status inside the creation deck
starToggleBtn.addEventListener('click', () => {
    const isStarred = starToggleBtn.getAttribute('data-starred') === 'true';
    starToggleBtn.setAttribute('data-starred', !isStarred);
    starToggleBtn.innerText = !isStarred ? '★ Starred' : '☆ Star Task';
});

// App Engine: Update Dashboard Previews and Priority Lists
function updateUI() {
    // Clear list nodes completely before rendering state
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        upNextText.innerText = "No pending tasks! Add one below.";
        return;
    }

    // Advanced Logic Check: Determine the absolute top priority task for "Up Next"
    // Rules Matrix: Starred High > Starred Medium > Starred Low > High > Medium > Low
    let sortedForPreview = [...tasks].sort((a, b) => {
        if (a.isStarred !== b.isStarred) return b.isStarred - a.isStarred;
        const weight = { 'High': 3, 'Medium': 2, 'Low': 1 };
        return weight[b.priority] - weight[a.priority];
    });

    // Populate Preview Window
    const nextTask = sortedForPreview[0];
    const starMarker = nextTask.isStarred ? '★ ' : '';
    upNextText.innerText = `${starMarker}${nextTask.text} [Priority: ${nextTask.priority}]`;

    // Render nodes dynamically from the structured State Array
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        if (task.isStarred) li.classList.add('starred-item');

        // Task meta description blocks
        li.innerHTML = `
            <div class="task-details">
                <span class="task-title">${task.text}</span>
                <div class="meta-badges">
                    <span class="badge ${task.priority.toLowerCase()}">${task.priority}</span>
                    ${task.isStarred ? '<span class="badge star">★ Starred</span>' : ''}
                </div>
            </div>
            <div class="action-cluster">
                <button class="edit-action" onclick="editTask(${task.id})">Edit</button>
                <button class="delete-action" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Logic Function: Insert Item to State Array
function addTask() {
    const textValue = taskInput.value.trim();
    if (textValue === '') {
        alert('Please enter a descriptive task title.');
        return;
    }

    const newTask = {
        id: Date.now(), // Unique structural timestamp string
        text: textValue,
        priority: prioritySelect.value,
        isStarred: starToggleBtn.getAttribute('data-starred') === 'true'
    };

    tasks.push(newTask);
    
    // Reset Form Input Interfaces safely
    taskInput.value = '';
    prioritySelect.value = 'Low';
    starToggleBtn.setAttribute('data-starred', 'false');
    starToggleBtn.innerText = '☆ Star Task';

    updateUI();
}

// Logic Function: Edit existing record
window.editTask = function(id) {
    const targetTask = tasks.find(t => t.id === id);
    if (!targetTask) return;

    const updatedText = prompt('Modify your task details:', targetTask.text);
    if (updatedText !== null && updatedText.trim() !== '') {
        targetTask.text = updatedText.trim();
        updateUI();
    }
};

// Logic Function: Remove entry from state array
window.deleteTask = function(id) {
    tasks = tasks.filter(t => t.id !== id);
    updateUI();
};

// Trigger Mechanics listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
