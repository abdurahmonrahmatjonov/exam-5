let tasks = {
 todo: [],
 inProgress: [],
 done: [],
};

function allowDrop(event) {
 event.preventDefault();
}

function dragStart(event) {
 event.dataTransfer.setData('text/plain', event.target.innerText);

 const originListId = event.target.closest('.list').id;
 event.dataTransfer.setData('originList', originListId);
}

function drop(event) {
 event.preventDefault();
 const taskContent = event.dataTransfer.getData('text/plain');
 const targetListId = event.target.closest('.list').id;

 const originListId = event.dataTransfer.getData('originList');
 if (targetListId === originListId || event.target.tagName === 'BUTTON') return;

 tasks[targetListId].push(taskContent);

 const targetList = document.getElementById(targetListId + '-list');
 const newTask = document.createElement('li');
 newTask.innerText = taskContent;
 newTask.draggable = true;
 newTask.ondragstart = dragStart;
 targetList.appendChild(newTask);

 const originList = document.getElementById(originListId + '-list');
 originList.innerHTML = '';
 tasks[originListId].forEach((task) => {
   const taskElement = document.createElement('li');
   taskElement.innerText = task;
   taskElement.draggable = true;
   taskElement.ondragstart = dragStart;
   originList.appendChild(taskElement);
 });

 const taskIndex = tasks[originListId].indexOf(taskContent);
 tasks[originListId].splice(taskIndex-1, 1);
}


function addTask(listId) {
 const newTaskContent = prompt('Enter the task content:');
 if (newTaskContent) {
   tasks[listId].push(newTaskContent);

   const targetList = document.getElementById(listId + '-list');
   const newTask = document.createElement('li');
   newTask.innerText = newTaskContent;
   newTask.draggable = true;
   newTask.ondragstart = dragStart;
   targetList.appendChild(newTask);
 }
}