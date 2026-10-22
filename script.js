const bookContainer = document.querySelector(".book-grid-container");
const form = document.querySelector(".book-form");
const dialogClearButton = document.querySelector("#clear-form-btn");

const library = [];

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    library.push(book);
    showBooksOnSite();
}

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const data = new FormData(form);

    const bookTitle = data.get("book-title");
    const bookAuthor = data.get("book-author");
    const bookPage = data.get("book-pages");
    const bookReadStatus = data.get("book-status");

    const isRead = bookReadStatus === "read";

    addBookToLibrary(bookTitle, bookAuthor, bookPage, isRead);

    resetInputs();
}
);


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.id = crypto.randomUUID();
};

addBookToLibrary("House of Mirth", "Edith Wharton", 205, true);
addBookToLibrary("Goldbug", "Edgar Allen Poe", 35, false);
addBookToLibrary("Red Badge Of Courage", "Stephan Carne", 150, true);

function showBooksOnSite() {

    const bookCards = document.querySelectorAll(".book-card");
    bookCards.forEach((bookCard) => bookCard.remove());

    for (const book of library) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookContainer.append(bookCard);

        const authorTitleContainer = document.createElement("div");
        authorTitleContainer.classList.add("author-title");
        bookCard.append(authorTitleContainer);

        const bookTitle = document.createElement("h1");
        bookTitle.classList.add("title");
        bookTitle.innerText = book.title;
        authorTitleContainer.append(bookTitle);

        const bookAuthor = document.createElement("h3");
        bookAuthor.classList.add("author");
        bookAuthor.innerText = book.author;
        authorTitleContainer.append(bookAuthor);

        const pageNumberContainer = document.createElement("div");
        pageNumberContainer.classList.add("page-number");
        bookCard.append(pageNumberContainer);

        const pElement = document.createElement("p");
        pElement.innerText = "Page Number: ";
        pageNumberContainer.append(pElement);

        const pageNumber = document.createElement("span");
        pageNumber.classList.add("page")
        pageNumber.innerText = book.pages;
        pElement.append(pageNumber);

        const bookActionsContainer = document.createElement("div");
        bookActionsContainer.classList.add("book-actions");
        bookCard.append(bookActionsContainer);

        const readButton = document.createElement("button");
        readButton.innerText = "Mark as Read";
        bookActionsContainer.append(readButton);
        readButton.id = "read-btn";
        if (book.read === true) {
            readButton.classList.add("read");
            readButton.innerText = "Mark as Unread";
        }

        const removeButton = document.createElement("button");
        removeButton.innerText = "Remove";
        bookActionsContainer.append(removeButton);
        removeButton.id = "remove-btn";
    }

    const readButtons = document.querySelectorAll("#read-btn");
    const removeButtons = document.querySelectorAll("#remove-btn");

    readButtons.forEach((readButton) => readButton.addEventListener("click", () => {
        if (readButton.classList.contains("read")) {
            readButton.classList.remove("read");
            readButton.innerText = "Mark as Read";
        }
        else {
            readButton.classList.add("read");
            readButton.innerText = "Mark as Unread";
        }
    }));

    removeButtons.forEach((removeButton) => removeButton.addEventListener("click", (button) => {
        button.target.parentElement.parentElement.remove(); // book card is placed one parent away from the 'remove-btn', so there is two 'parentElement'.
        for (const book of library) {
            if (button.target.parentElement.parentElement.querySelector(".title").innerText === book.title) {
                library.splice(library.indexOf(book), 1);
            }
        }
    }));
}

dialogClearButton.addEventListener("click", () => {
    resetInputs();
});

function resetInputs() {
    const form = document.querySelector(".book-form");

    const inputFields = form.querySelectorAll("input");

    for (let i = 0; i < inputFields.length; i++) {
        if (inputFields[i].type != "radio") {
            inputFields[i].value = "";
        }
        else if (inputFields[i].id == "status-unread") {
            inputFields[i].checked = true;
        }
    }
}