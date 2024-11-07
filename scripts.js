const tableBody = document.getElementById('table-body');
const form = document.getElementById('add-book-form');
const addBookBtn = document.getElementById('add-book-btn');

const titleInput = document.getElementById('book-title');
const authorInput = document.getElementById('author');
const readStatusInput = document.getElementById('read-status');

const library = [];

function Book(title, author, readStatus) {
    this.title = title;
    this.author = author;
    this.readStatus = readStatus;
}

library.push(new Book("Fellowship of the Ring", "JRR Tolkien", true));
library.push(new Book("The Two Towers", "JRR Tolkien", true));
library.push(new Book("Return of the King", "JRR Tolkien", false));

renderLibrary();

/* OnClick event functions */

function addBook(event) {
    event.preventDefault();

    const bookTitle = titleInput.value;
    const name = authorInput.value;
    const status = readStatusInput.checked;

    library.push(new Book(bookTitle, name, status));

    hideForm();
    resetFormValues();

    renderLibrary();
}

function deleteBook(index) {
    library.splice(index, 1);
    renderLibrary();
}

function updateStatus(index) {
    library[index].readStatus = !library[index].readStatus;
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

    library.forEach((book, index) => {
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