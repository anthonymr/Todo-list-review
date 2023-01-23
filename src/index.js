/* eslint-disable no-unused-vars */
import TodoList from './modules/todoList.js';
import DomEvents from './modules/domEvents.js';
import './style.css';
import '@fortawesome/fontawesome-free/js/fontawesome.js';
import '@fortawesome/fontawesome-free/js/solid.js';
import '@fortawesome/fontawesome-free/js/regular.js';

window.onload = () => {
  const myList = new TodoList('ul');

  const myEvents = new DomEvents(myList, {
    newTaskInput: 'new_task_input',
    newTaskIcon: 'new_task_icon',
    clearAllCompletedTasks: 'clear_all_completed_tasks',
  });
};