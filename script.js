let todos = [];

document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todo-input");
    const addBtn = document.getElementById("add-btn");
    const todoList = document.getElementById("todo-list");

    // Указываем URL нашего сервера Flask:
    // Если вы используете ngrok для Flask, подставьте публичный адрес оттуда.
    const SERVER_URL = "https://b854-2a02-3103-205b-db00-945d-e8ca-cc27-9e3f.ngrok-free.app/add";

    function renderTodos() {
        todoList.innerHTML = "";
        todos.forEach((task) => {
            const li = document.createElement("li");
            li.textContent = task;
            todoList.appendChild(li);
        });
    }

    addBtn.addEventListener("click", async () => {
        const task = todoInput.value.trim();
        if (task.length > 0) {
            todos.push(task);
            renderTodos();
            todoInput.value = "";

            // Отправляем POST-запрос на сервер
            try {
                const response = await fetch(SERVER_URL, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        task: task,
                        user_id: 1234 // Допустим, передаём user_id (заглушка)
                    })
                });

                const result = await response.json();
                console.log("Ответ сервера:", result);
            } catch (error) {
                console.error("Ошибка при отправке задачи:", error);
            }
        }
    });
});
