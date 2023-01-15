const url = 'https://jsonplaceholder.typicode.com/todos/1';

async function fetchTodo() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}
fetchTodo();
