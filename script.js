// DOM Elements
const taskModal = document.getElementById('task-modal');
const closeModal = document.querySelector('.close');
const taskInput = document.getElementById('task-input');
const saveTaskBtn = document.getElementById('save-task');
const modalTitle = document.getElementById('modal-title');
const addTaskButtons = document.querySelectorAll('.add-task-btn');
const todoTasksContainer = document.getElementById('todo-tasks');
const inProgressTasksContainer = document.getElementById('inProgress-tasks');
const doneTasksContainer = document.getElementById('done-tasks');

// Variables
let tasks = [];
let currentEditTaskId = null;
let currentStatus = null;

// Event Listeners
document.addEventListener('DOMContentLoaded', loadTasks);
saveTaskBtn.addEventListener('click', saveTask);
closeModal.addEventListener('click', closeModal);
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') saveTask();
});

// Add task button events
addTaskButtons.forEach(button => {
    button.addEventListener('click', () => {
        openAddTaskModal(button.dataset.status);
    });
});

// Functions
function loadTasks() {
    const savedTasks = localStorage.getItem('trello-tasks');
    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
        renderAllTasks();
    }
    setupDragAndDrop();
}

function openAddTaskModal(status) {
    modalTitle.textContent = 'Add Task';
    taskInput.value = '';
    currentStatus = status;
    currentEditTaskId = null;
    taskModal.style.display = 'block';
    taskInput.focus();
}

function openEditTaskModal(task) {
    modalTitle.textContent = 'Edit Task';
    taskInput.value = task.text;
    currentEditTaskId = task.id;
    currentStatus = task.status;
    taskModal.style.display = 'block';
    taskInput.focus();
}

function closeTaskModal() {
    taskModal.style.display = 'none';
    currentEditTaskId = null;
    currentStatus = null;
}

function saveTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        shakeElement(taskInput);
        return;
    }
    
    if (currentEditTaskId) {
        // Editing existing task
        const taskIndex = tasks.findIndex(task => task.id === currentEditTaskId);
        if (taskIndex !== -1) {
            tasks[taskIndex].text = taskText;
            saveTasks();
            renderAllTasks();
        }
    } else {
        // Adding new task
        const newTask = {
            id: Date.now(),
            text: taskText,
            status: currentStatus || 'todo',
            createdAt: new Date()
        };
        
        tasks.push(newTask);
        saveTasks();
        renderAllTasks();
    }
    
    closeTaskModal();
}

function renderAllTasks() {
    // Clear all containers
    todoTasksContainer.innerHTML = '';
    inProgressTasksContainer.innerHTML = '';
    doneTasksContainer.innerHTML = '';
    
    // Group tasks by status
    const todoTasks = tasks.filter(task => task.status === 'todo');
    const inProgressTasks = tasks.filter(task => task.status === 'inProgress');
    const doneTasks = tasks.filter(task => task.status === 'done');
    
    // Render tasks in their respective containers
    todoTasks.forEach(task => renderTask(task, todoTasksContainer));
    inProgressTasks.forEach(task => renderTask(task, inProgressTasksContainer));
    doneTasks.forEach(task => renderTask(task, doneTasksContainer));
}

function renderTask(task, container) {
    const taskElement = document.createElement('div');
    taskElement.className = 'task slide-in';
    taskElement.setAttribute('data-id', task.id);
    taskElement.setAttribute('draggable', 'true');
    
    // Generate a random label color for visual variety
    const labelColors = ['label-green', 'label-yellow', 'label-orange', 'label-red', 'label-purple', 'label-blue'];
    const randomLabel = labelColors[Math.floor(Math.random() * labelColors.length)];
    
    taskElement.innerHTML = `
        <div class="task-label ${randomLabel}"></div>
        <div class="task-content">${escapeHTML(task.text)}</div>
        <div class="task-actions">
            <button class="task-action-btn edit-btn"><i class="fas fa-pencil-alt"></i></button>
            <button class="task-action-btn delete-btn"><i class="fas fa-trash-alt"></i></button>
        </div>
    `;
    
    const editBtn = taskElement.querySelector('.edit-btn');
    const deleteBtn = taskElement.querySelector('.delete-btn');
    
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        openEditTaskModal(task);
    });
    
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTask(task.id);
    });
    
    // Add drag events
    taskElement.addEventListener('dragstart', (e) => handleDragStart(e, task));
    taskElement.addEventListener('dragend', handleDragEnd);
    
    container.appendChild(taskElement);
    
    // Remove animation class after animation completes
    setTimeout(() => {
        taskElement.classList.remove('slide-in');
    }, 300);
}

function deleteTask(taskId) {
    const taskElement = document.querySelector(`.task[data-id="${taskId}"]`);
    
    if (taskElement) {
        // Apply delete animation
        taskElement.style.opacity = '0';
        taskElement.style.transform = 'translateY(20px)';
        taskElement.style.transition = 'all 0.3s ease';
        
        setTimeout(() => {
            tasks = tasks.filter(task => task.id !== taskId);
            saveTasks();
            renderAllTasks();
        }, 300);
    }
}

// Drag and Drop functionality
function setupDragAndDrop() {
    const containers = [todoTasksContainer, inProgressTasksContainer, doneTasksContainer];
    
    containers.forEach(container => {
        container.addEventListener('dragover', handleDragOver);
        container.addEventListener('dragleave', handleDragLeave);
        container.addEventListener('drop', handleDrop);
    });
}

function handleDragStart(e, task) {
    // Store the task data
    e.dataTransfer.setData('text/plain', task.id);
    e.target.classList.add('dragging');
    
    // Add some visual effect
    setTimeout(() => {
        e.target.style.opacity = '0.5';
    }, 0);
}

function handleDragEnd(e) {
    e.target.classList.remove('dragging');
    e.target.style.opacity = '1';
}

function handleDragOver(e) {
    e.preventDefault();
    e.currentTarget.classList.add('drop-zone-active');
}

function handleDragLeave(e) {
    e.currentTarget.classList.remove('drop-zone-active');
}

function handleDrop(e) {
    e.preventDefault();
    e.currentTarget.classList.remove('drop-zone-active');
    
    const taskId = e.dataTransfer.getData('text/plain');
    const taskElement = document.querySelector(`.task[data-id="${taskId}"]`);
    
    if (!taskElement) return;
    
    // Determine which status container this is
    let newStatus;
    if (e.currentTarget === todoTasksContainer) {
        newStatus = 'todo';
    } else if (e.currentTarget === inProgressTasksContainer) {
        newStatus = 'inProgress';
    } else if (e.currentTarget === doneTasksContainer) {
        newStatus = 'done';
    }
    
    // Update task status
    const taskIndex = tasks.findIndex(task => task.id === parseInt(taskId));
    if (taskIndex !== -1 && tasks[taskIndex].status !== newStatus) {
        tasks[taskIndex].status = newStatus;
        saveTasks();
        renderAllTasks();
    }
}

function saveTasks() {
    localStorage.setItem('trello-tasks', JSON.stringify(tasks));
}

// Helper Functions
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            "'": '&#39;',
            '"': '&quot;'
        }[tag]));
}

function shakeElement(element) {
    element.classList.add('shake');
    setTimeout(() => {
        element.classList.remove('shake');
    }, 600);
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    .shake {
        animation: shake 0.6s cubic-bezier(.36,.07,.19,.97) both;
    }
    
    @keyframes shake {
        10%, 90% {
            transform: translate3d(-1px, 0, 0);
        }
        20%, 80% {
            transform: translate3d(2px, 0, 0);
        }
        30%, 50%, 70% {
            transform: translate3d(-3px, 0, 0);
        }
        40%, 60% {
            transform: translate3d(3px, 0, 0);
        }
    }
`;
document.head.appendChild(style);

// Fix for the close modal function
closeModal.addEventListener('click', () => {
    taskModal.style.display = 'none';
});

// Add some example tasks when app loads for the first time
function addExampleTasks() {
    if (!localStorage.getItem('trello-tasks')) {
        const exampleTasks = [
            {
                id: 1,
                text: 'Welcome to Trello-Style Todo App!',
                status: 'todo',
                createdAt: new Date()
            },
            {
                id: 2,
                text: 'Drag and drop tasks between columns',
                status: 'inProgress',
                createdAt: new Date()
            },
            {
                id: 3,
                text: 'Click + to add new tasks',
                status: 'todo',
                createdAt: new Date()
            },
            {
                id: 4,
                text: 'Task completed successfully',
                status: 'done',
                createdAt: new Date()
            }
        ];
        
        tasks = exampleTasks;
        saveTasks();
    }
}

// Initialize with example tasks
addExampleTasks();
