import LocalStorage from './localStorage.js';

export default class DomEvents {
  constructor(list, domElements) {
    DomEvents.list = list;

    this.addInput = document.querySelector(`#${domElements.newTaskInput}`);
    this.addIcon = document.querySelector(`#${domElements.newTaskIcon}`);
    this.clearButton = document.querySelector(`#${domElements.clearAllCompletedTasks}`);

    this.addInput.addEventListener('keypress', DomEvents.addEvent.bind(this));
    this.addIcon.addEventListener('click', DomEvents.addEvent.bind(this));
    this.clearButton.addEventListener('click', list.clearAllCompleted.bind(list));

    const storedTasks = LocalStorage.loadLocalStorage();

    storedTasks.forEach((task) => {
      DomEvents.list.addTask(task.description, task.completed);
    });
  }

  static list;

  static refreshTasksEvents() {
    DomEvents.list.tasks.forEach((task) => {
      task.domElement.classList.remove('editing');
      task.editing = false;

      task.domElement.addEventListener('dragstart', DomEvents.dragTask.bind(task));
      task.domElement.addEventListener('drop', DomEvents.dropTask.bind(task));
      task.domElement.addEventListener('dragover', DomEvents.allowDropTask.bind(task));

      task.domElement.addEventListener('click', DomEvents.editEvent.bind(task));
      task.domDeleteIcon.addEventListener('click', DomEvents.removeEvent.bind(task));
      task.domCheck.addEventListener('change', DomEvents.toggleCompleted.bind(task));
    });
  }

  static addEvent(event) {
    if (event.key === 'Enter' || event.type === 'click') {
      DomEvents.list.addTask(this.addInput.value);
      this.addInput.value = '';
    }
  }

  static removeEvent() {
    this.editing = false;
    DomEvents.list.removeTask(this.index);
    DomEvents.list.drawTable();
    DomEvents.refreshTasksEvents();
  }

  static toggleCompleted(event) {
    if (event.currentTarget.checked) {
      DomEvents.list.completeTask(this);
    } else {
      DomEvents.list.uncompleteTask(this);
    }
  }

  static editEvent() {
    if (this.editing) {
      return;
    }

    this.domElement.classList.add('editing');
    this.domInput.value = this.domSpan.innerHTML;
    this.domInput.focus();
    this.editing = true;

    this.domInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        DomEvents.list.editTask(this);
      }
    });
  }

  static dragTask(e) {
    e.dataTransfer.setData('index', this.index);
  }

  static allowDropTask(e) {
    e.preventDefault();
  }

  static dropTask(e) {
    e.preventDefault();

    const origin = e.dataTransfer.getData('index');
    const target = this.index;
    DomEvents.list.switchIndexes(origin, target);
  }
}