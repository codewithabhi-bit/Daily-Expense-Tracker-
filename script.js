let persons = [];

let expenses = [];

// Add Person

function addPerson() {

    const personName = document.getElementById("person-name").value;

    if (personName) {

        persons.push(personName);

        updatePersonList();

        updatePersonSelect();

        document.getElementById("person-name").value = "";

    }

}

// Update Person List

function updatePersonList() {

    const list = document.getElementById("person-list");

    list.innerHTML = "";

    persons.forEach((person, index) => {

        list.innerHTML += `<li class="card">

            ${person}

            <div>

                <button onclick="viewExpenses('${person}')">View</button>

                <button onclick="renamePerson(${index})">Rename</button>

                <button onclick="deletePerson(${index})">Delete</button>

            </div>

        </li>`;

    });

    updatePersonSelect();

}

// Add Expense

function addExpense() {

    const person = document.getElementById("person-select").value;

    const amount = document.getElementById("amount").value;

    const description = document.getElementById("description").value;

    const dateTime = document.getElementById("date-time").value;

    if (person !== "Select Person" && amount && description && dateTime) {

        expenses.push({ person, amount: parseFloat(amount), description, dateTime });

        updateExpenseList(expenses);

    }

}

// Update Expense List

function updateExpenseList(filteredExpenses) {

    const list = document.getElementById("expense-list");

    list.innerHTML = "";

    filteredExpenses.forEach(exp => {

        list.innerHTML += `<li class="card">

            ${exp.person} - ₹${exp.amount} | ${exp.description} | ${new Date(exp.dateTime).toLocaleString()}

        </li>`;

    });

}

// View Expenses by Person

function viewExpenses(person) {

    const filtered = expenses.filter(e => e.person === person);

    alert(`${person}'s Expenses:\n` + filtered.map(e => `₹${e.amount} - ${e.description}`).join("\n"));

}

// Rename Person

function renamePerson(index) {

    const newName = prompt("Enter new name:");

    if (newName) {

        persons[index] = newName;

        updatePersonList();

    }

}

// Delete Person

function deletePerson(index) {

    if (confirm("Are you sure you want to delete this person?")) {

        const deletedPerson = persons[index];

        persons.splice(index, 1);

        expenses = expenses.filter(exp => exp.person !== deletedPerson);

        updatePersonList();

        updateExpenseList(expenses);

    }

}

// Filters

function filterExpenses(type) {

    const today = new Date();

    let filtered = [];

    switch (type) {

        case "today":

            filtered = expenses.filter(exp => isSameDay(new Date(exp.dateTime), today));

            break;

        case "yesterday":

            const yesterday = new Date();

            yesterday.setDate(today.getDate() - 1);

            filtered = expenses.filter(exp => isSameDay(new Date(exp.dateTime), yesterday));

            break;

        case "week":

            filtered = expenses.filter(exp => isSameWeek(new Date(exp.dateTime), today));

            break;

        case "month":

            filtered = expenses.filter(exp => isSameMonth(new Date(exp.dateTime), today));

            break;

        case "year":

            filtered = expenses.filter(exp => isSameYear(new Date(exp.dateTime), today));

            break;

        case "custom":

            const startDate = new Date(prompt("Enter Start Date (YYYY-MM-DD):"));

            const endDate = new Date(prompt("Enter End Date (YYYY-MM-DD):"));

            filtered = expenses.filter(exp => new Date(exp.dateTime) >= startDate && new Date(exp.dateTime) <= endDate);

            break;

    }

    updateExpenseList(filtered);

}

function isSameDay(date1, date2) {

    return date1.toDateString() === date2.toDateString();

}

function isSameWeek(date1, today) {

    const startOfWeek = new Date(today);

    startOfWeek.setDate(today.getDate() - today.getDay());

    const endOfWeek = new Date(startOfWeek);

    endOfWeek.setDate(startOfWeek.getDate() + 6);

    return date1 >= startOfWeek && date1 <= endOfWeek;

}

function isSameMonth(date1, today) {

    return date1.getMonth() === today.getMonth() && date1.getFullYear() === today.getFullYear();

}

function isSameYear(date1, today) {

    return date1.getFullYear() === today.getFullYear();

}

// Search by Person

function searchByPerson() {

    const searchValue = document.getElementById("search-person").value.toLowerCase();

    const filtered = expenses.filter(e => e.person.toLowerCase().includes(searchValue));

    updateExpenseList(filtered);

}

// Dark Mode

document.getElementById("dark-mode-toggle").addEventListener("click", () => {

    document.body.classList.toggle("dark-mode");

});

function updatePersonSelect() {

    const select = document.getElementById("person-select");

    select.innerHTML = "<option>Select Person</option>";

    persons.forEach(person => {

        select.innerHTML += `<option>${person}</option>`;

    });

}