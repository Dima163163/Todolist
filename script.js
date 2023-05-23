"use strict";
//необходимые селекторы
let addMessage = document.querySelector(".message");
let addBtn = document.querySelector(".add");
let todo = document.querySelector(".todo");

//Создаем массив где будем хранеить объеекты со списком дел
let toDoList = [];
//Если информация есть в localStorage то парсим инфу из него
let initSrorage = localStorage.getItem("todo");
if (initSrorage) {
  toDoList = JSON.parse(initSrorage);
  displayMessages();
}

//считываем событие по клику на кнопку добавить
addBtn.addEventListener("click", function () {
  //если input addMessage нет значения то выходим из функции
  if (!addMessage.value) return;
  //если значение есть то создаем обект newTodo
  let newTodo = {
    id: Math.round(Math.random() * 10000),
    //в объекте будет значение из инпута
    todo: addMessage.value,
    //чекбокс со значением true или false
    checked: false,
    //подключение свойства
    important: false,
  };
  //добавляем объект newTodo в массив toDoList
  toDoList.push(newTodo);
  //запускаем функцию для создания input со значением
  displayMessages();
  //записываем в localStorage  дела через JSON.stringify
  localStorage.setItem("todo", JSON.stringify(toDoList));
  //чистим input строку после добавления дела
  addMessage.value = "";
});

function displayMessages() {
  todo.innerHTML = "";
  //создаем переменную со значением строка
  // let displayMessage = "";
  //если длина объекта ToDoList равна нулю
  if (toDoList.length === 0) {
    //то значение todo равно пустой строке
    todo.innerHTML = "";
  }
  //проходимся по массиву toDoList методом перебора массива forEach и внутри записываем фуникцию callback с параметрами item и index
  toDoList.forEach(function (item, index) {
    const li = document.createElement("li");
    const input = document.createElement("input");
    const label = document.createElement("label");

    li.appendChild(input);
    input.type = "checkbox";
    input.id = `item_${index}`;

    if (item.checked !== false) {
      input.checked = true;
      input.setAttribute("checked", "");
    }

    li.appendChild(label);
    label.setAttribute("for", `item_${index}`);
    label.id = item.id;
    if (item.important === true) {
      label.classList.add("important");
    }
    label.value = `${item.todo}`;
    label.innerHTML = label.value;
    todo.appendChild(li);

    //добавляем в переменную displayMessage строку с элементами
    //item и index  добавляем при переборе массива toDoList
    // li.innerHTML = `
    // 	<input type='checkbox' id='item_${index}' ${item.checked ? "checked" : ""}>
    // 	<label for='item_${index}' class='${item.important ? "important" : ""}'>${
    //   item.todo
    // }</label>
    // `;
    // todo.appendChild(li);
    // localStorage.setItem("todo", JSON.stringify(toDoList));
    //добавляем элемент на страницу и передаем ему значение пременной displayMessage
    // todo.innerHTML = displayMessage;
  });
  localStorage.setItem("todo", JSON.stringify(toDoList));
}

//Отслеживаем событие change в зачении todo
//передаем callback функцию со значением event -элемент на котором происходит событие
todo.addEventListener("change", function (event) {
  //создаем пременную и значение for конкатенируем со значением элемента который вызвал событие с атрибутом id и берем его innerHTML
  let valueLabel = todo.querySelector(
    "[for=" + event.target.getAttribute("id") + "]"
  ).innerHTML;

  if (event.target.checked === true) {
    event.target.setAttribute("checked", "");
  } else {
    event.target.removeAttribute("checked", "");
  }
  //проходим методом перебора массива по toDoList c функцией callback и параметром item
  toDoList.forEach(function (item) {
    //если значение item.todo(место где хранится название нашего дела) строго равно  значению переменной let valueLabel
    if (item.todo === valueLabel) {
      //то меняем значение чека item.checked (если false то true, а если true то false)
      item.checked = !item.checked;
    }
  });
  //добавляем значение в loclStorage
  localStorage.setItem("todo", JSON.stringify(toDoList));
});

//отслеживаем событие вызова contextmenu правой кнопкой мыши у элемента на котором происходит событие
todo.addEventListener("contextmenu", function (event) {
  //пишем event.preventDefault котрое отменяет стандартное поведение браузера по умолчанию
  event.preventDefault();

  //проходимся методом перебора массива по toDoList c callback функуцией со значениями item и index
  toDoList.forEach(function (item, index) {
    //если значение item.todo  строго равно innerHTML на элементе на котором происходит событие
    if (item.id == event.target.id) {
      //если нажата ctrlKey на windows или metaKey на  macos
      if (event.metaKey) {
        //удаляем элемент из массива toDoList с индексом 1
        toDoList.splice(index, 1);
      } else {
        //иначе если ctrl не нажат добавляем или убираем свойство important
        item.important = !item.important;
      }
    }
  });
  //добавляем значение в localStorage
  localStorage.setItem("todo", JSON.stringify(toDoList));
  //вызываем функцию displayMessages()
  displayMessages();
});
