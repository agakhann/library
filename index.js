const myLibrary = [
  {
    title: "A Game of Thrones",
    author: "George R. R. Martin",
    pages: 694,
    read: false,
  },
];

$tbody = document.querySelector(".tbody");

$titleInput = document.querySelector("#title");
$authorInput = document.querySelector("#author");
$pagesInput = document.querySelector("#pages");
$submitButton = document.querySelector("#submit");

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  let title = $titleInput.value;
  let author = $authorInput.value;
  let pages = $pagesInput.value;
  let read = getReadValue();
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

function cleanText() {
  $titleInput.value = "";
  $authorInput.value = "";
  $pagesInput.value = "";
}

function updateTable() {
  $tbody.textContent = "";

  myLibrary.forEach((book) => {
    let $row = document.createElement("tr");
    Object.keys(book).forEach((prop) => {
      let $newTd = document.createElement("td");
      $newTd.textContent = book[prop];
      if (prop == "read") {
        if (book["read"] == true) {
          $newTd.textContent = "Read";
        } else {
          $newTd.textContent = "Not Read";
        }
      }
      $row.appendChild($newTd);
    });

    $row.appendChild(toggleRead(book));
    $row.appendChild(editButton($row, book));
    $row.appendChild(deleteButton(myLibrary.indexOf(book)));
    $tbody.appendChild($row);
  });
}


$radioButtons = document.querySelectorAll('input[name="read"]');

function getReadValue() {
  if (document.querySelector('input[name="read"]:checked').value == "readed") {
    return true;
  } else {
    return false;
  }
}

const deleteButton = (index) => {
    let $deleteButtonTd = document.createElement("td");
    let $deleteButton = document.createElement("button");
    $deleteButton.textContent = "Delete";
    $deleteButton.addEventListener("click", () => {
      myLibrary.splice(index, 1);
      updateTable();
    });
    $deleteButtonTd.appendChild($deleteButton);
    return $deleteButtonTd;
  };

const toggleRead = (book) => {
  let $readStatusTd = document.createElement("td");
  let $readToggleButton = document.createElement("button");
  $readToggleButton.textContent = "Change read status";
  $readToggleButton.addEventListener("click", () => {
    book.read = !book.read;
    updateTable();
  });
  $readStatusTd.appendChild($readToggleButton);
  return $readStatusTd;
};

const validator = () => {
  if ($titleInput.value == "") alert("Please enter a title");
  if ($authorInput.value == "") alert("Please enter a author");
  if ($pagesInput.value == "") alert("Please enter pages");

  if (
    $titleInput.value == "" ||
    $pagesInput.value == "" ||
    $authorInput.value == ""
  )
    return false;
  else return true;
};

const editButton = (row, book) => {
  let $editButtonTd = document.createElement("td");
  let $editButton = document.createElement("button");
  $editButton.textContent = "Edit";
  $editButton.addEventListener("click", () => {
    $inputTds = row.querySelectorAll("td:nth-child(-n+3)");
    console.log($inputTds);
    $inputTds.forEach((cell) => {
      const content = cell.textContent;
      if (cell === $inputTds[2]) {
        cell.innerHTML = `<input type="number" value="${content}" />`; // Use number input type
      } else {
        cell.innerHTML = `<input type="text" value="${content}" />`;
      }
    });

    $editButtonTd.removeChild($editButton); // Remove the Edit button
    let $saveButton = document.createElement("button");
    $saveButton.textContent = "Save";
    $editButtonTd.appendChild($saveButton);

    $saveButton.addEventListener("click", () => {
      $inputTds.forEach((cell) => {
        const input = cell.querySelector("input");
        cell.textContent = input.value;
      });

      const newTitle = $inputTds[0].textContent;
      const newAuthor = $inputTds[1].textContent;
      const newPages = $inputTds[2].textContent;

      book.title = newTitle;
      book.author = newAuthor;
      book.pages = newPages;

      $editButtonTd.removeChild($saveButton);
      $editButtonTd.appendChild($editButton);
      
      updateTable();
    });
  });

  $editButtonTd.appendChild($editButton);
  return $editButtonTd;
};

updateTable();



$submitButton.onclick = (event) => {
  if (validator() == false) return false;
  addBookToLibrary();
  cleanText();
  updateTable();
  event.preventDefault();
  console.log(myLibrary);
};
