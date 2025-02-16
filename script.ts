// Define an interface for a task
interface Task {
    text: string;
}

// Define a class to manage tasks
class TaskManager {
    private tasks: Task[];

    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    // Function to render tasks
    renderTasks() {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        this.tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task.text;
            li.addEventListener('click', () => {
                this.tasks.splice(index, 1);
                this.saveTasks();
                this.renderTasks();
            });
            taskList.appendChild(li);
        });
    }

    // Function to save tasks to local storage
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // Function to add a task
    addTask(taskText: string) {
        const task = { text: taskText.trim() };
        if (task.text !== '') {
            this.tasks.push(task);
            this.saveTasks();
            this.renderTasks();
        }
    }

    // Function to filter tasks
    filterTasks(filterText: string) {
        const filteredTasks = this.tasks.filter(task =>
            task.text.toLowerCase().includes(filterText.toLowerCase())
        );
        this.renderFilteredTasks(filteredTasks);
    }

    // Function to render filtered tasks
    renderFilteredTasks(filteredTasks: Task[]) {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        filteredTasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task.text;
            li.addEventListener('click', () => {
                this.tasks.splice(index, 1);
                this.saveTasks();
                this.renderTasks();
            });
            taskList.appendChild(li);
        });
    }
}

// Create an instance of the TaskManager
const taskManager = new TaskManager();

// Get DOM elements
const taskInput = document.getElementById('taskInput') as HTMLInputElement;
const addTaskBtn = document.getElementById('addTaskBtn') as HTMLButtonElement;
const filterInput = document.getElementById('filterInput') as HTMLInputElement;

// Event listener for the add task button
addTaskBtn.addEventListener('click', () => {
    taskManager.addTask(taskInput.value);
    taskInput.value = '';
});

// Event listener for the filter input
filterInput.addEventListener('input', () => {
    taskManager.filterTasks(filterInput.value);
});

// Render tasks on page load
taskManager.renderTasks();