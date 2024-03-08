document.addEventListener('DOMContentLoaded', function () {
  const list = document.querySelector('#toDoList');
  const form = document.querySelector('#add-item');
  const input = form.querySelector('#task');
  const inputDateTime = form.querySelector('#datetime');
  const searchForm = document.querySelector('#search-item');
  const inputSearch = searchForm.querySelector('#search-field');

  list.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
      event.target.closest('li').remove();
    } else if (event.target.classList.contains('edit')) {
      handleEditClick(event);
    }
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskValue = input.value;
    const dateTimeValue = inputDateTime.value;

    if (taskValue.trim() !== '' && dateTimeValue.trim() !== '') {
      const li = document.createElement('li');
      li.classList.add('list-group-item');
      li.textContent = `${taskValue} at ${new Date(dateTimeValue).toLocaleString()}`;

      const editButton = createEditButton();
      const deleteButton = createDeleteButton();

      li.appendChild(editButton);
      li.appendChild(deleteButton);
      list.appendChild(li);

      input.value = '';
      inputDateTime.value = '';
    }
  });

  searchForm.addEventListener('input', (event) => {
    event.preventDefault();
    const query = inputSearch.value.toLowerCase();
    const items = list.querySelectorAll('li');

    items.forEach((item) => {
      const text = item.textContent.toLowerCase();
      item.style.display = text.includes(query) ? 'block' : 'none';
    });
  });

  function createEditButton() {
    const editButton = document.createElement('button');
    editButton.classList.add('btn', 'btn-primary', 'float-end', 'edit');
    editButton.textContent = 'Edit';
    return editButton;
  }

  function createDeleteButton() {
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger', 'float-end', 'delete');
    deleteButton.textContent = 'Delete';
    return deleteButton;
  }

  function createEditInput(item) {
    const editInput = document.createElement('input');
    editInput.type = 'text';
    editInput.classList.add('form-control', 'edit-input');
    editInput.value = item.firstChild.nodeValue.trim();
    return editInput;
  }

  function createSaveButton() {
    const saveButton = document.createElement('button');
    saveButton.classList.add('btn', 'btn-success', 'float-end', 'save');
    saveButton.textContent = 'Save';
    return saveButton;
  }

  function handleEditClick(event) {
    const listItem = event.target.parentElement;
    const editInput = createEditInput(listItem);
    const saveButton = createSaveButton();
    const textSpan = document.createElement('span');
    textSpan.textContent = listItem.textContent.trim();

    listItem.innerHTML = '';
    listItem.appendChild(textSpan);
    listItem.appendChild(editInput);
    listItem.appendChild(saveButton);

    saveButton.addEventListener('click', () => {
      const updatedText = editInput.value.trim();
      if (updatedText !== '') {
        textSpan.textContent = updatedText;
        listItem.innerHTML = '';
        listItem.appendChild(textSpan);
        listItem.appendChild(createEditButton());
        listItem.appendChild(createDeleteButton());
      }
    });
  }
});

// Dark Mode Toggle Functionality
document.addEventListener('DOMContentLoaded', function () {
  const darkModeToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  // Check local storage for user preference
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  setDarkMode(isDarkMode);

  // Toggle dark mode on button click
  darkModeToggle.addEventListener('change', function () {
    const darkMode = this.checked;
    setDarkMode(darkMode);
    localStorage.setItem('darkMode', darkMode);
  });

  // Function to set dark mode styles
  function setDarkMode(darkMode) {
    body.classList.toggle('dark-mode', darkMode);
  }
});
