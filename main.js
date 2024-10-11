window.onload = function() {
    // Focus on the input when the page loads
    document.querySelector('.input').focus();
    
    // Display existing tasks when the page loads
    displayTasks();
};

function addTask() {
    let taskInput = document.querySelector('.input').value;
    if (taskInput) {
        let tasks = localStorage.getItem('tasks') || '';
        let tasksArray = tasks ? tasks.split(',') : [];
        
        // Add the new task with the number in front
        let newTask = `${taskInput}`;
        tasksArray.push(newTask);
        
        // Save the updated tasks array to localStorage
        localStorage.setItem('tasks', tasksArray.join(','));
        
        // Clear the input field
        document.querySelector('.input').value = '';
        
        // Refresh the displayed task list
        displayTasks();
    }
}


function displayTasks() {
    let taskList = document.querySelector('.tasks');
    taskList.innerHTML = ''; // Clear the current list
    let tasks = localStorage.getItem('tasks') || '';
    let taskArray = tasks.split(',').filter(task => task); // Ensure no empty tasks

    taskArray.forEach((task, index) => {
        let taskItem = document.createElement('div');
        taskItem.className = 'task-item';

        // Flexbox styling for task items
        taskItem.style.display = 'flex';
        taskItem.style.justifyContent = 'space-between';
        taskItem.style.alignItems = 'center';

        // Add task text
        taskItem.appendChild(document.createTextNode(task));

        // Create the delete button
        let deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';
        deleteButton.onclick = () => {
            taskArray.splice(index, 1); // Remove the task from the array
            localStorage.setItem('tasks', taskArray.join(',')); // Update localStorage
            displayTasks(); // Refresh the task list
        };

        // Button styling
        deleteButton.style.cssText = `
            font: inherit;
            border-radius: 10px;
            border-color: transparent;
            padding: 10px;
            background-color: rgb(255, 123, 0);
            color: white;
            margin-left: 20px;
            cursor: pointer;
            transition: background-color 0.3s;
        `;
        deleteButton.onmouseover = function() {
            deleteButton.style.backgroundColor = "rgb(231, 158, 90)";
        };
        deleteButton.onmouseleave = function() {
            deleteButton.style.backgroundColor = "rgb(255, 123, 0)";
        };
        taskItem.appendChild(deleteButton); // Add delete button to task item
        taskList.appendChild(taskItem); // Add task item to the list
    });
}

// Add task on button click
document.querySelector('.add').addEventListener('click', addTask);
document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        document.querySelector('.add').click();
    }
    });