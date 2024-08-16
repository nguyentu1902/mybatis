const apiUrl = 'http://localhost:8080/users';

function getAllUsers() {
    $.ajax({
        url: apiUrl,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            let usersTable = $('<table></table>').addClass('users-table'); // Create a table element
            let headerRow = $('<tr></tr>').appendTo(usersTable); // Create a header row
            $('<th></th>').text('Name').appendTo(headerRow); // Add headers for Name, Email, and Phone Number
            $('<th></th>').text('Email').appendTo(headerRow);
            $('<th></th>').text('Phone Number').appendTo(headerRow);

            $.each(data, function(index, user) {
                let row = $('<tr></tr>').appendTo(usersTable); // Create a new row for each user
                $('<td></td>').text(user.name).appendTo(row); // Add data cells with user information
                $('<td></td>').text(user.email).appendTo(row);
                $('<td></td>').text(user.phoneNumber).appendTo(row);
            });

            let usersDiv = $('#users');
            usersDiv.empty();
            usersDiv.append(usersTable); // Append the table to the usersDiv
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
}

function getUserById() {
    const userId = $('#userId').val();
    $.ajax({
        url: `${apiUrl}/${userId}`,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            let userDiv = $('#user');
            userDiv.html(`<p>ID: ${data.id} Name: ${data.name}</p>`);
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
}

function createUser() {
    const userName = $('#createUserName').val();
    $.ajax({
        url: apiUrl,
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ name: userName }),
        success: function(data) {
            alert('User created successfully');
            getAllUsers();
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
}

function updateUser() {
    const userId = $('#updateUserId').val();
    const userName = $('#updateUserName').val();
    $.ajax({
        url: `${apiUrl}/${userId}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify({ id: userId, name: userName }),
        success: function(data) {
            alert('User updated successfully');
            getAllUsers();
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
}

function deleteUser() {
    const userId = $('#deleteUserId').val();
    $.ajax({
        url: `${apiUrl}/${userId}`,
        method: 'DELETE',
        success: function(data) {
            alert('User deleted successfully');
            getAllUsers();
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
}

function findUsersByName() {
    const userName = $('#searchUserName').val();
    $.ajax({
        url: `${apiUrl}/findByName?name=${userName}`,
        method: 'GET',
        dataType: 'json',
        success: function(data) {
            let searchResultsDiv = $('#searchResults');
            searchResultsDiv.empty();
            let searchList = $('<ul></ul>');
            $.each(data, function(index, user) {
                searchList.append(`<li>${user.name}</li>`);
            });
            searchResultsDiv.append(searchList);
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
}
