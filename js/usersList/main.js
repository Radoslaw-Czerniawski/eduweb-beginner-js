const button = document.querySelector(".button");

function renderRows(users) {
    return users.map(user => {
        return `
        <tr>
            <th>${user.id}</th>
            <th>${user.name}</th>
            <th>${user.username}</th>
            <th><a href="mailto:${user.email}">${user.email}</a></th>
        </tr>
        `
    }).join("\n");
};

function renderTable(users) {
    const table = `
    <table class="table is-fullwidth is-bordered is-striped mt-6">
        <thead>
            <tr>
                <th>ID</th>
                <th>Imię i nazwisko</th>
                <th>Nazwa użytkownika</th>
                <th>Adres e-mail</th>
            </tr>
        </thead>
        <tbody>
            ${renderRows(users)}
        </tbody>
    </table>
    `;

    const div = document.createElement("div");
    div.innerHTML = table;
    document.querySelector(".container").append(div);
};

button.addEventListener("click", () => {
    fetch("https://jsonplaceholder.typicode.com/users")
        .then((res) => res.json())
        .then((data) => renderTable(data))
        .then(() => {
            button.remove();
        });
});
