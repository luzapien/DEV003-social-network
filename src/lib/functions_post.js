
async function addTodo(text) {
    try {
      const todo = {
        id: getUUID(),
        text: text,
        completed: false,
        userid: currentUser.uid,
      };
      const response = await insert(todo);
      loadTodos();
    } catch (error) {
      console.error(error);
    }
  }
  
  async function loadTodos() {
    todosContainer.innerHTML = "";
    todos = [];
  
    try {
      const response = await getItems(currentUser.uid);
  
      todos = [...response];
      renderTodos();
    } catch (error) {
      console.error(error);
    }
  }
  
  function renderTodos() {
    let html = "";
    todos.forEach((todo) => {
      html += `
        <li>
          <input type="checkbox" id="${todo.id}" ${
        todo.completed ? "checked" : ""
      } />
          <label for="${todo.id}">${todo.text}</label>
        </li>
      `;
    });
  
    todosContainer.innerHTML = html;
  
    document
      .querySelectorAll('#todos-container input[type="checkbox"]')
      .forEach((checkbox) => {
        checkbox.addEventListener("change", async (e) => {
          const id = e.target.id;
          try {
            await update(id, e.target.checked);
          } catch (error) {
            console.error(error);
          }
        });
      });
  }

async function addTodo(text) {
    try {
      const todo = {
        id: getUUID(),
        text: text,
        completed: false,
        userid: currentUser.uid,
      };
      const response = await insert(todo);
      loadTodos();
    } catch (error) {
      console.error(error);
    }
  }
  
  async function loadTodos() {
    todosContainer.innerHTML = "";
    todos = [];
  
    try {
      const response = await getItems(currentUser.uid);
  
      todos = [...response];
      renderTodos();
    } catch (error) {
      console.error(error);
    }
  }
  
  function renderTodos() {
    let html = "";
    todos.forEach((todo) => {
      html += `
        <li>
          <input type="checkbox" id="${todo.id}" ${
        todo.completed ? "checked" : ""
      } />
          <label for="${todo.id}">${todo.text}</label>
        </li>
      `;
    });