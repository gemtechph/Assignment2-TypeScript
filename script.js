// Define a class to manage tasks
var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }
    // Function to render tasks
    TaskManager.prototype.renderTasks = function () {
        var _this = this;
        var taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        this.tasks.forEach(function (task, index) {
            var li = document.createElement('li');
            li.textContent = task.text;
            li.addEventListener('click', function () {
                _this.tasks.splice(index, 1);
                _this.saveTasks();
                _this.renderTasks();
            });
            taskList.appendChild(li);
        });
    };
    // Function to save tasks to local storage
    TaskManager.prototype.saveTasks = function () {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    };
    // Function to add a task
    TaskManager.prototype.addTask = function (taskText) {
        var task = { text: taskText.trim() };
        if (task.text !== '') {
            this.tasks.push(task);
            this.saveTasks();
            this.renderTasks();
        }
    };
    // Function to filter tasks
    TaskManager.prototype.filterTasks = function (filterText) {
        var filteredTasks = this.tasks.filter(function (task) {
            return task.text.toLowerCase().includes(filterText.toLowerCase());
        });
        this.renderFilteredTasks(filteredTasks);
    };
    // Function to render filtered tasks
    TaskManager.prototype.renderFilteredTasks = function (filteredTasks) {
        var _this = this;
        var taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        filteredTasks.forEach(function (task, index) {
            var li = document.createElement('li');
            li.textContent = task.text;
            li.addEventListener('click', function () {
                _this.tasks.splice(index, 1);
                _this.saveTasks();
                _this.renderTasks();
            });
            taskList.appendChild(li);
        });
    };
    return TaskManager;
}());
// Create an instance of the TaskManager
var taskManager = new TaskManager();
// Get DOM elements
var taskInput = document.getElementById('taskInput');
var addTaskBtn = document.getElementById('addTaskBtn');
var filterInput = document.getElementById('filterInput');
// Event listener for the add task button
addTaskBtn.addEventListener('click', function () {
    taskManager.addTask(taskInput.value);
    taskInput.value = '';
});
// Event listener for the filter input
filterInput.addEventListener('input', function () {
    taskManager.filterTasks(filterInput.value);
});
// Render tasks on page load
taskManager.renderTasks();
