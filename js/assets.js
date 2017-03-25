'use strict';

const inputField = document.getElementById('addInput');
const addButton = document.getElementById('addButton');
const list = document.getElementById('myList');
const deleteButton = document.getElementsByClassName('w3-closebtn');
const LIST_NAME = 'myList';

let toDoApp = {
  appName: 'toDo List',
  nameConainer: document.getElementById('appName'),
  appVersion: 'v0.0.6',
  versionConainer: document.getElementById('version'),
  setName: function () {
    nameConainer.textContent = this.appName;
  },
  setVersion: function () {
    versionConainer.textContent = this.appVersion;
  }
};
