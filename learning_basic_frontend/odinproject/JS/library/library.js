class Book {
    static #currentId = 0;

    constructor(title, author, publisher, year) {
        this.title = title;
        this.author = author;
        this.publisher = publisher;
        this.year = year;
        this.read = false;

        this.id = "Book " + Book.#currentId.toString();
        Book.#currentId++;
    }
}

Book.prototype.PUBLIC_ATTRS = ['title', 'author', 'publisher', 'year']

class Library {
    static #myLibrary = [];

    static booksListDiv = document.querySelector(".books-list");
    static showDialogBtn = document.getElementById("show-dialog");
    static closeDialogBtn = document.getElementById("js-close");
    static dialog = document.getElementById("dialog");

    static titleInput = document.getElementById("title");
    static authorInput = document.getElementById("author");
    static publisherInput = document.getElementById("publisher");
    static yearInput = document.getElementById("year");

    static displayBook(book) {
        let attributeList = document.createElement("ul");
        attributeList.setAttribute("id", book.id);
        book.PUBLIC_ATTRS.forEach(attr => {
            let listElem = document.createElement("li");
            listElem.textContent = book[attr].toString();
            attributeList.appendChild(listElem);
        })

        // Add read checkbox
        let checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.checked = false;
        checkBox.addEventListener("click", (e) => {
            Library.toggleReadBook(book.id);
            if (checkBox.checked) {
                attributeList.style.backgroundColor = "rgb(203, 255, 120)";
            } else {
                attributeList.style.backgroundColor = "rgb(238, 238, 238)";
            }
        })

        let label = document.createElement("label");
        label.textContent = "Read";
        label.appendChild(checkBox);
        attributeList.appendChild(label);

        // Add delete button
        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = 'Delete book';
        deleteBtn.setAttribute("class", "delete-btn");
        deleteBtn.addEventListener("click", (e) => {
            Library.deleteBook(book.id);
        })
        attributeList.appendChild(deleteBtn);

        Library.booksListDiv.appendChild(attributeList);
    }

    static deleteBook(book_id) {
        let ulElement = document.getElementById(book_id);
        Library.booksListDiv.removeChild(ulElement);

        const bookIndex = Library.#myLibrary.findIndex(book => book.id === book_id);
        if (bookIndex !== -1) {
            Library.#myLibrary.splice(bookIndex, 1);
        }
    }

    static toggleReadBook(book_id) {
        const bookIndex = Library.#myLibrary.findIndex(book => book.id === book_id);
        if (bookIndex !== -1) {
            if (Library.#myLibrary[bookIndex].read) {
                Library.#myLibrary[bookIndex].read = false;
            } else {
                Library.#myLibrary[bookIndex].read = true;
            }
        }
    }

    static addBookToLibrary(title, author, publisher, year) {
        let book = new Book(title, author, publisher, year);
        Library.#myLibrary.push(book);
        Library.displayBook(book);
    }

    static readInput() {
        title = Library.titleInput.value;
        author = Library.authorInput.value;
        publisher = Library.publisherInput.value;
        year = Library.yearInput.value;

        return [title, author, publisher, year]
    }

    static isValidTextInput(text_input) {
        return text_input !== null && text_input.trim().length > 0;
    }

    static isValidYear(year_str) {
        const year_num = Number(year_str);
        return (!Number.isNaN(year_num)) && year_num >= 1700 && year_num <= 2025;
    }

    // Should use input validators instead, but it's a toy example.
    static validateInput(input) {
        for (let index = 0; index < input.length - 1; index++) {
            if (!Library.isValidTextInput(input[index])) {
                return false;
            }
        }
        return Library.isValidYear(input[3]);
    }

    static flushInput() {
        Library.titleInput.value = "";
        Library.authorInput.value = "";
        Library.publisherInput.value = "";
        Library.yearInput.value = "";
    }
}

Library.showDialogBtn.addEventListener("click", function () {
    Library.dialog.showModal();
});

Library.closeDialogBtn.addEventListener("click", (e) => {
    e.preventDefault();
    input = Library.readInput();
    if (Library.validateInput(input)) {
        Library.addBookToLibrary(...input);
        Library.flushInput(input);
    }

    Library.dialog.close();
});

Library.addBookToLibrary("The Lord of the Rings", "J.R.R.Tolkien", "Allen & Unwin", 1954);
Library.addBookToLibrary("Shogun", "James Clavell", "Hodder & Stoughton", 1975);

