const init = () => {
  initAppStructure();
  if (localStorage.length > 0){
    readData(LIST_NAME);
  }
  eventWatcher();
};

const initAppStructure = () => {
  ToDoApp.setName();
  ToDoApp.setVersion();
  ToDoApp.setFocusToInput();
};

const eventWatcher = () => {

  ToDoApp.inputField.addEventListener('keypress', e => {
    const key = e.which || e.keyCode;
    if (key == 13) {
      addElement(ToDoApp.inputField.value);
    }
  });

  list.addEventListener('click', e => {
    togglePriority(e);
  }, false);

  document.getElementById('sortList').addEventListener('click', () => {
    sortListBy();
    ToDoApp.setFocusToInput();
  } ,false);
};

const addElement = (toDoText, color='w3-red') => {
  if (toDoText.length > 0 && toDoText.length < 30) {
    let newLi = document.createElement('li');
    newLi.dataset.text = toDoText;
    newLi.dataset.color = color;
    let newTextNode = document.createTextNode(toDoText);
    let deleteButton = document.createElement('span');
    deleteButton.textContent = '×';
    deleteButton.classList.add('w3-closebtn', 'w3-margin-right', 'w3-xlarge');
    deleteButton.addEventListener('click', function(e) {
      close(e);
    }, false);
    newLi.appendChild(newTextNode);
    newLi.appendChild(deleteButton);
    newLi.classList.add(color, 'w3-animate-left');
    list.insertBefore(newLi, list.childNodes[0]);
    ToDoApp.inputField.value = '';
    prepareData();
  }
};

const prepareData = () => {
  let li = Array.from(document.getElementById('myList').childNodes);
  let listArray = [];
  for (let i = 0; li.length > i; i++) {
    listArray.unshift([li[i].dataset.text, li[i].dataset.color]);
  }
  writeData(LIST_NAME, listArray);
};

const togglePriority = e => {
  if (e.target.classList.contains('w3-red')) {
    e.target.classList.remove('w3-red');
    e.target.classList.add('w3-blue');
    e.target.dataset.color = 'w3-blue';
  } else if (e.target.classList.contains('w3-green')) {
    e.target.classList.remove('w3-green');
    e.target.classList.add('w3-red');
    e.target.dataset.color = 'w3-red';
  } else {
    e.target.classList.remove('w3-blue');
    e.target.classList.add('w3-green');
    e.target.dataset.color = 'w3-green';
  }
  prepareData();
};

const sortListBy = () => {
  const list = document.getElementById('myList');
  let switching = true;
  let shouldSwitch;
  let i;
  while (switching) {
    switching = false;
    const b = list.querySelectorAll('li');
    for (i = 0; i < (b.length - 1); i++) {
      shouldSwitch = false;
      if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
        shouldSwitch= true;
        break;
      }
    }
    if (shouldSwitch) {

      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
  prepareData();
};

const close = e => {
  e.target.parentNode.parentNode.removeChild(e.target.parentNode);
  prepareData();
};

const writeData = (listName, dataArray) => {
  localStorage.setItem(listName, JSON.stringify(dataArray));
};

const readData = (listName) => {
  let getList = JSON.parse(localStorage.getItem(listName));
  getList.forEach(e => {
    addElement(e[0], e[1]);
  });
};

init();
