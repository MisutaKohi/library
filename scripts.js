const tableBody = document.getElementById('table-body');
const form = document.getElementById('add-book-form');
const addBookBtn = document.getElementById('add-book-btn');

const titleInput = document.getElementById('book-title');
const authorInput = document.getElementById('author');
const readStatusInput = document.getElementById('read-status');

/* class declarations */

const Library = class {
    constructor() {
        this.shelf = [];
    }

    addBook(book) {
        this.shelf.push(book);
    }

    removeBook(index) {
        this.shelf.splice(index, 1);
    }
}

const Book = class {
    constructor(title, author) {
        this.title = title;
        this.author = author;
        this.readStatus = false;
    }
}

const library = new Library();

library.addBook(new Book("Fellowship of the Ring", "JRR Tolkien"));
library.addBook(new Book("The Two Towers", "JRR Tolkien"));
library.addBook(new Book("Return of the King", "JRR Tolkien"));

renderLibrary();

/* OnClick event functions */

function addBook(event) {
    event.preventDefault();

    const bookTitle = titleInput.value;
    const name = authorInput.value;

    library.addBook(new Book(bookTitle, name));

    hideForm();
    resetFormValues();

    renderLibrary();
}

function deleteBook(index) {
    library.removeBook(index);
    renderLibrary();
}

function updateStatus(index) {
    library.shelf[index].readStatus = !library.shelf[index].readStatus;
    renderLibrary();
}

/* Utility functions */

function displayForm() {
    addBookBtn.classList.add('hidden');
    form.classList.remove('hidden');
}

function hideForm() {
    addBookBtn.classList.remove('hidden');
    form.classList.add('hidden');
}

function resetFormValues() {
    titleInput.value = '';
    authorInput.value = '';
    readStatusInput.checked = false;
}

function renderLibrary() {
    tableBody.innerHTML = '';

    library.shelf.forEach((book, index) => {
    tableBody.innerHTML += `
        <tr class="${(index % 2 == 0) ? "gray" : ""}">
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td style="cursor: pointer" onclick='updateStatus(${index})'>
            ${(book.readStatus) ? "Read it" : "On the List"}
        </td>
        <td><button style='color:red;' type='button' onclick='deleteBook(${index})'>X</button></td>
        </tr>
    `;
    });
}