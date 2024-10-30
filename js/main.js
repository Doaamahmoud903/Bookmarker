var inputName = document.getElementById("inputName");
var inputUrl = document.getElementById("inputUrl");
var inputAddBook = document.getElementById("inputAddBook");
var tableBody = document.getElementById("tableBody");
var inputUpdateBook = document.getElementById("inputUpdateBook");
var alertName = document.getElementById("alertName");
var alertUrl = document.getElementById("alertUrl");
var bookmarkContainer;
var currentIndex = -1;

if (localStorage.getItem('bookmarks')) {
    bookmarkContainer = JSON.parse(localStorage.getItem('bookmarks'));
    displaybookmark();
} else {
    bookmarkContainer = [];
}

// Add bookmark
function addbookmark() {
    if (validateName() && validateUrl()) {
        var bookmark = {
            name: inputName.value,
            url: inputUrl.value,
        };
        bookmarkContainer.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarkContainer));
        clearbookmark();
        displaybookmark();
    }
}

inputAddBook.addEventListener('click', (e) => {
    e.preventDefault();
    addbookmark();
});

// Display bookmarks
function displaybookmark() {
    var table = ``;
    for (var i = 0; i < bookmarkContainer.length; i++) {
        table += `<tr>
        <td style="vertical-align: middle;">${i}</td>
        <td style="vertical-align: middle;"><p class="fs-5 mb-0" >${bookmarkContainer[i].name}</p></td>
        <td><a href="${bookmarkContainer[i].url}" class="text-decoration-none btn btn-success fs-6" target="_blank"><i class="fas fa-eye d-block"></i>Visit</a></td>
        <td><button class="btn btn-warning fw-bold fs-6" onclick='updatebookmark(${i})'><i class="fas fa-edit d-block"></i>Update</button></td>
        <td><button class="btn btn-danger fw-bold fs-6" onclick='deletebookmark(${i})'><i class="fas fa-trash d-block"></i>Delete</button></td>
        </tr>`;
    }
    tableBody.innerHTML = table;
}

// Clear bookmark input
function clearbookmark() {
    inputName.value = "";
    inputUrl.value = "";
}

// Delete bookmark
function deletebookmark(index) {
    bookmarkContainer.splice(index, 1);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarkContainer));
    displaybookmark();
}

// Update bookmark
function updatebookmark(index) {
    currentIndex = index;
    inputName.value = bookmarkContainer[index].name;
    inputUrl.value = bookmarkContainer[index].url;
    inputAddBook.classList.add('d-none');
    inputUpdateBook.classList.remove('d-none');
}

inputUpdateBook.addEventListener('click', (e) => {
    e.preventDefault();
    addUpdate();
});

function addUpdate() {
    if (validateName() && validateUrl()) {
        bookmarkContainer[currentIndex].name = inputName.value;
        bookmarkContainer[currentIndex].url = inputUrl.value;
        inputUpdateBook.classList.add('d-none');
        inputAddBook.classList.remove('d-none');
        localStorage.setItem('bookmarks', JSON.stringify(bookmarkContainer));
        displaybookmark();
        clearbookmark();
    }
}

// Search bookmarks
function searchbookmark(term) {
    var table = ``;
    for (var i = 0; i < bookmarkContainer.length; i++) {
        if (bookmarkContainer[i].name.toLowerCase().includes(term.toLowerCase())) {
            table += `<tr>
            <td>${i}</td>
            <td>${bookmarkContainer[i].name}</td>
            <td><a href="${bookmarkContainer[i].url}" target="_blank">${bookmarkContainer[i].url}</a></td>
            <td><button class="btn btn-warning" onclick='updatebookmark(${i})'>Update</button></td>
            <td><button class="btn btn-danger" onclick='deletebookmark(${i})'>Delete</button></td>
            </tr>`;
        }
    }
    tableBody.innerHTML = table;
}

// Validate bookmark name
function validateName() {
    var regexName = /^[a-z A-Z]{3,}/;
    if (regexName.test(inputName.value)) {
        alertName.classList.add("d-none");
        return true;
    } else {
        alertName.classList.remove("d-none");
        return false;
    }
}

// Validate bookmark URL
function validateUrl() {
    var regexUrl=/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;    
    if (regexUrl.test(inputUrl.value)) {
        alertUrl.classList.add("d-none");
        return true;
    } else {
        alertUrl.classList.remove("d-none");
        return false;
    }
}

inputName.addEventListener("blur", () => {
    validateName() && validateUrl() && enableButtons();
});

inputUrl.addEventListener("blur", () => {
    validateName() && validateUrl() && enableButtons();
});

function enableButtons() {
    inputAddBook.removeAttribute("disabled");
    inputUpdateBook.removeAttribute("disabled");
}
