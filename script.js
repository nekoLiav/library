// DOM Objects
const modalOpen = document.getElementById("addbookbtn");
const modalclose = document.getElementById("modalclose");
const modal = document.getElementById("modal");
const submitButton = document.getElementById("submitbutton");
const bl = document.getElementById("booklist");

// Array that contains every book object
let Library = [];

// 3-hit combo that takes form inputs, passes them to the object constructor,
// then pushes them to the array
class BookAdd {
  constructor(title, author, readstatus) {
    this.title = title;
    this.author = author;
    this.readstatus = readstatus;
    Library.push(this);
  }
}

class Book extends BookAdd {
  constructor(title, author, readstatus) {
    super(title, author, readstatus);
  }
}

const submitBook = () => {
  let subtitle = document.getElementById("booktitle").value;
  let subauthor = document.getElementById("bookauthor").value;
  let readstatus = document.getElementById("yesbutton").checked;
  if (readstatus === true) {
    new Book(subtitle, subauthor, readstatus)
  } else {
    new Book(subtitle, subauthor, readstatus)
  }
  closeModal();
  clearForm();
  incrementIndexes();
}

// Likely spaghetti code that is responsible for all of the DOM manipulation
const incrementIndexes = () => {
  let i = -1;
  Library.forEach((Library) => {
    i++;
  });
  generateTableRow(i);
}

const generateTableRow = (i) => {
  let tr = document.createElement("tr");
  tr.setAttribute('id', i);
  bl.appendChild(tr);
  generateTableTitle(i);
}

const generateTableTitle = (i) => {
  let tr = document.getElementById(i);
  let tdtitle = document.createElement("td");
  let tdtitletext = document.createTextNode(Library[i].title);
  tdtitle.setAttribute('id', "title" + i);
  tdtitle.appendChild(tdtitletext);
  tr.appendChild(tdtitle);
  generateTableAuthor(i);
}

const generateTableAuthor = (i) => {
  let tr = document.getElementById(i);
  let tdauthor = document.createElement("td");
  let tdauthortext = document.createTextNode(Library[i].author);
  tdauthor.appendChild(tdauthortext);
  tr.appendChild(tdauthor);
  generateTableReadStatus(i);
}

const generateTableReadStatus = (i) => {
  let tr = document.getElementById(i);
  let tdreadstatus = document.createElement("td");
  let tdreadstatustoggle = document.createElement("INPUT");
  tdreadstatustoggle.setAttribute("type", "checkbox");
  tdreadstatustoggle.setAttribute("id", "readstatustoggle" + i);
  tdreadstatus.appendChild(tdreadstatustoggle);
  tr.appendChild(tdreadstatus);
  if (Library[i].readstatus === true) {
    tdreadstatustoggle.checked = true;
  } else {
    tdreadstatustoggle.checked = false;
  }
  generateToggleListeners(i);
  generateDeleteButtons(i);
}

const generateToggleListeners = (i) => {
  let toggle = document.getElementById("readstatustoggle" + i);
  toggle.addEventListener("click", setReadStatus);
}

const generateDeleteButtons = (i) => {
  let tdtitle = document.getElementById("title" + i);
  let delbtn = document.createElement("button");
  let delbtntxt = document.createTextNode("X");
  delbtn.setAttribute('class', "delbtn");
  delbtn.appendChild(delbtntxt);
  tdtitle.appendChild(delbtn);
  delbtn.addEventListener("click", deleteBook);
}

const setReadStatus = (event) => {
  let id = event.target.parentNode.parentNode.getAttribute("id");
  let toggleStatus = event.target.checked;
  Library[id].readstatus = toggleStatus;
}

const deleteBook = (event) => event.target.parentNode.parentNode.remove();

const openModal = () => modal.style.display = "block";

const closeModal = () => modal.style.display = "none";

const clearForm = () => document.getElementById("submitform").reset();

modalOpen.addEventListener("click", openModal)
modalclose.addEventListener("click", closeModal)
submitButton.addEventListener("click", submitBook)