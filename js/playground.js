'use strict';

const inputField = document.getElementById('addInput');
const list = document.getElementById('myList');
const deleteButton = document.getElementsByClassName('w3-closebtn');
const versionInfo = document.getElementById('version');
const VERSION = 'v0.0.2';
const LIST_NAME = 'myList';

const init = () => {
  setVersion(versionInfo, VERSION);
  readOutDataBase(LIST_NAME);
  eventWatcher();
};

const setVersion = (el,n) => el.textContent = n;

const eventWatcher = () => {
/*
  let addToList = document.getElementById('addButton');
  addToList.addEventListener('click', e => {
    addElement(e);
  });
*/

  inputField.addEventListener('keypress', e => {
    const key = e.which || e.keyCode;
    if (key == 13) {
      addElement(inputField.value);
    }
  });

  list.addEventListener('click', e => {
    check(e);
  }, false);
/*
  Array.from(deleteButton).forEach(element => element.addEventListener('click', function(e) {
    close(e);
  }, false));
*/
};

let addElement = (toDoText) => {
  if (toDoText.length > 0 && toDoText.length < 24) {
    let newLi = document.createElement('li');
    newLi.setAttribute('id', toDoText);
    newLi.dataset.text = toDoText;
    let newTextNode = document.createTextNode(toDoText);
    let deleteButton = document.createElement('span');
    deleteButton.textContent = '×';
    deleteButton.classList.add('w3-closebtn', 'w3-margin-right', 'w3-xlarge');
    deleteButton.addEventListener('click', function(e) {
      close(e);
    }, false);
    newLi.appendChild(newTextNode);
    newLi.appendChild(deleteButton);
    newLi.classList.add('w3-red', 'w3-animate-left');
    list.insertBefore(newLi, list.childNodes[0]);
    inputField.value = '';
    prepareData();
    }
};

const prepareData = () => {
  let li = Array.from(document.getElementById('myList').childNodes);
  let listArray = [];
  //console.log(listArray[0].dataset.text);
  //console.log(listArray.length);
  for (let i = 0; li.length-1 > i; i++) {
    listArray.push(li[i].dataset.text);
  }
  writeToDataBase(LIST_NAME, listArray);
};

let check = e => {
  e.target.classList.toggle('w3-red');
  e.target.classList.toggle('w3-green');
};

let close = e => {
  e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  prepareData();
};

const writeToDataBase = (listName, dataArray) => {
  localStorage.setItem(listName, JSON.stringify(dataArray));
  console.log('Write:');
  console.log(localStorage);
};

const readOutDataBase = (listName) => {

  let getList = JSON.parse(localStorage.getItem(listName));


  getList.forEach((e,i,a) => {
    addElement(e);
  });

  console.log('Read:');
  console.log(getList);
};

/*
  addButton.addEventListener('click', e => {
    addElement(inputField.value);
  });
*/

/*

let listData = {
  list : ['eins', 'zwei', ['mia', 'ma', 'mu']]
};


let getList = localStorage.getItem('myList');

console.log(JSON.parse(getList));

listData = {
  list : ['mia', 'ma', 'mu']
};

localStorage.setItem('myList', JSON.stringify(listData));

getList = localStorage.getItem('myList');

console.log(JSON.parse(getList));

console.log(localStorage);

localStorage.clear();

getList = localStorage.getItem('myList');

console.log(JSON.parse(getList));
console.log(localStorage.length);
*/
init();
