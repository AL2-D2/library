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

function showOnSite(){
    for(const book of library){
        
    }
}