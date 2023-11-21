document.addEventListener('DOMContentLoaded', function () {
    // Load existing entries from localStorage
    loadEntries();

    // Event listener for form submission
    document.getElementById('registrationForm').addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form values
        var name = document.getElementById('name').value;
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        var dob = document.getElementById('dob').value;
        var acceptTerms = document.getElementById('acceptTerms').checked;

        // Check if terms are accepted
        if (!acceptTerms) {
            alert('Please accept the terms and conditions.');
            return;
        }

        // Check age
        var today = new Date();
        var birthDate = new Date(dob);
        var age = today.getFullYear() - birthDate.getFullYear();

        if (age < 18 || age > 55) {
            alert('You must be between 18 and 55 years old to register.');
            return;
        }

        // Add a new entry to the table
        addEntryToTable(name, email, password, dob, acceptTerms);

        // Save the entry to localStorage
        saveEntry(name, email, password, dob, acceptTerms);

        // Reset form
        document.getElementById('registrationForm').reset();
    });
});

function loadEntries() {
    var table = document.getElementById('registrationTable').getElementsByTagName('tbody')[0];
    var entries = JSON.parse(localStorage.getItem('entries')) || [];

    entries.forEach(function (entry) {
        addEntryToTable(entry.name, entry.email, entry.password, entry.dob, entry.acceptTerms);
    });
}

function saveEntry(name, email, password, dob, acceptTerms) {
    var entries = JSON.parse(localStorage.getItem('entries')) || [];
    entries.push({ name, email, password, dob, acceptTerms });
    localStorage.setItem('entries', JSON.stringify(entries));
}

function addEntryToTable(name, email, password, dob, acceptTerms) {
    var table = document.getElementById('registrationTable').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.rows.length);
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);
    var cell5 = newRow.insertCell(4);

    // Update the new row with form values
    cell1.innerHTML = name;
    cell2.innerHTML = email;
    cell3.innerHTML = password;
    cell4.innerHTML = dob;
    cell5.innerHTML = acceptTerms ? 'Yes' : 'No';
}