'use strict';

const LIST_NAME = 'myList';
const list = document.getElementById('myList');
const deleteButton = document.getElementsByClassName('w3-closebtn');

let ToDoApp = {
  appName: 'toDo List',
  nameContainer: document.getElementById('appName'),
  appVersion: 'v0.0.6',
  versionContainer: document.getElementById('version'),
  inputField: document.getElementById('addInput'),
  setName: function () {
    this.nameContainer.textContent = this.appName;
  },
  setVersion: function () {
    this.versionContainer.textContent = this.appVersion;
  },
  setFocusToInput: function () {
    this.inputField.focus();
  }
};
