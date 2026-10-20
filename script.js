const bookContainer = document.querySelector(".book-grid-container");


const library = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.id = crypto.randomUUID();

    this.info = function () {
        // TODO: add read checker here and assign some value to it according to the check result.

        return `${this.title} by ${this.author}, ${this.pages} pages.`;
    }
};

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    library.push(book);
}

addBookToLibrary("House of Mirth", "Edith Wharton", 205, true);
addBookToLibrary("Goldbug", "Edgar Allen Poe", 35, false);
addBookToLibrary("Red Badge Of Courage", "Stephan Carne", 150, true);

function showBooksOnSite() {
    for (const book of library) {
        const bookCard = document.createElement("div");
        bookCard.classList.add("book-card");
        bookContainer.append(bookCard);

        const authorTitleContainer = document.createElement("div");
        authorTitleContainer.classList.add("title");
        bookCard.append(authorTitleContainer);

        const bookTitle = document.createElement("h1");
        bookTitle.classList.add("author-title");
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
}

showBooksOnSite();

const authorAndTitleSection = document.querySelector(".author-title");
const pageNumberSection = document.querySelector(".page-number");
const bookActionsSection = document.querySelector(".book-actions");
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
}))