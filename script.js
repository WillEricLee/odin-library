var library = [];
const errorText = document.querySelector('#error-text');
const contentHalf = document.getElementsByClassName('content')[0];

function Book(title, author, pages, read) {
    this.title = title;
    this.author =  author;
    this.pages = pages;
    this.read = read;
}

function addBook(event) {
    event.preventDefault();
    const title = document.querySelector('#title-input');
    const author = document.querySelector('#author-input');
    const pages = document.querySelector('#pages-input');
    const read = document.querySelector('#read-input');

    if (checkFormEntries(title.value, author.value, pages.value)) {
        var book = new Book(title.value, author.value, pages.value, read.checked);
        library.push(book);
        errorText.textContent = "";
        document.getElementById("sidebar").removeChild(document.getElementsByClassName('book-form')[0]);
    }

    displayBooks();
}

function checkFormEntries(title, author, pages) {
    
    if (title=="" || author=="" || pages=="" || pages==0) {
        errorText.textContent = "Please fill out all fields correctly.";
        return false;
    }
    else {
        return true;
    }
}

//this function will create and show the book creation form upon the button being clicked.
function createForm() {
    //blank linebreak element
    var linebreak = document.createElement("br");

    //make overall form
    var form = document.createElement("form");
    form.setAttribute('class', 'book-form');

    //title input
    var titleInput = document.createElement("input");
    titleInput.setAttribute("type", "text");
    titleInput.setAttribute("name", "book-title");
    titleInput.setAttribute('id', 'title-input');
    titleInput.setAttribute('placeholder', 'Title');

    //author input
    var authorInput = document.createElement("input");
    authorInput.setAttribute("type", "text");
    authorInput.setAttribute("name", "book-author");
    authorInput.setAttribute('id', 'author-input');
    authorInput.setAttribute('placeholder', 'Author');

    //pages input
    var pagesInput = document.createElement("input");
    pagesInput.setAttribute("type", "number");
    pagesInput.setAttribute("name", "book-pages");
    pagesInput.setAttribute('id', 'pages-input');
    pagesInput.setAttribute('placeholder', 'Page Count');

    //read input
    var readInputDiv = document.createElement("div");
    readInputDiv.setAttribute('class', 'read-input-div');
    var readInput = document.createElement("input");
    readInput.setAttribute("type", "checkbox");
    readInput.setAttribute("name", "book-pages");
    readInput.setAttribute('id', 'read-input');
    //input label
    var readInputLabel = document.createElement("Label");
    readInputLabel.setAttribute('for', 'read-input');
    readInputLabel.innerHTML = "Already read?";
    readInputDiv.appendChild(readInput);
    readInputDiv.appendChild(readInputLabel);

    //submit button
    var submitButton = document.createElement("button");
    submitButton.setAttribute('id', 'submit-button');
    submitButton.textContent = "Create Book";
    
    //add "add book" event handler to submit button
    submitButton.addEventListener("click", addBook, false);

    //at this point, all the form entries are created.

    form.appendChild(titleInput);
    form.appendChild(linebreak);
    form.appendChild(authorInput);
    form.appendChild(linebreak);
    form.appendChild(pagesInput);
    form.appendChild(linebreak);
    form.appendChild(readInputDiv);
    form.appendChild(submitButton);

    document.getElementById("sidebar").appendChild(form);
}

function displayBooks() {
    contentHalf.innerHTML = "";

    for (const book of library) {
        const bookContainer = document.createElement('div');
        bookContainer.setAttribute('class', 'container');

        const bookTitle = document.createElement('h2');
        bookTitle.innerHTML = book.title;
        const bookAuthor = document.createElement('p');
        bookAuthor.innerHTML = "Author: " + book.author;
        const bookPages = document.createElement('p');
        bookPages.innerHTML = "Pages: " + book.pages;
        const bookRead = document.createElement('p');
        bookRead.innerHTML = "Read: " + book.read;

        //checkbox div
        const readCheckboxDiv = document.createElement('div');
        readCheckboxDiv.setAttribute('class', 'read-checkbox-div');
        //checkbox
        const readCheckbox = document.createElement('input');
        readCheckbox.setAttribute('type', 'checkbox');
        readCheckbox.setAttribute('class', 'read-checkbox')
        if (book.read) {
            readCheckbox.checked = true;
        }
        //checkbox label
        const readCheckboxLabel = document.createElement('label');
        readCheckboxLabel.innerHTML = 'Toggle read';
        readCheckboxDiv.appendChild(readCheckbox);
        readCheckboxDiv.appendChild(readCheckboxLabel);

        //toggle read status of the book
        readCheckbox.onclick = function() {
            book.read = readCheckbox.checked;
            displayBooks();
        }

        //delete book button
        const deleteBookButton = document.createElement('button');
        deleteBookButton.innerHTML = "Delete Book";

        //delete book on button press
        deleteBookButton.onclick = function() {
            library = library.filter(function(item) {
                return item !== book;
            })
            displayBooks();
            console.log('wawa')
        }

        bookContainer.appendChild(bookTitle);
        bookContainer.appendChild(bookAuthor);
        bookContainer.appendChild(bookPages);
        bookContainer.appendChild(bookRead);
        bookContainer.appendChild(readCheckboxDiv);
        bookContainer.appendChild(deleteBookButton);

        contentHalf.appendChild(bookContainer);
    }
}

document.getElementsByClassName("new-book-button")[0].onclick = createForm;