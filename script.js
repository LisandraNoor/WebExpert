const api_url = 'https://jsonplaceholder.typicode.com/users';
let data = []

async function getData(url) {
	const response = await fetch(url)
	data = await response.json()
	showData(data)
}

getData(api_url);

function showData(data) {
	let table = `
		<tr>
			<th>Name</th>
			<th>Actions</th>
		</tr>
	`;

	for (let d of data) {
		table += `
		<tr id='${d.id}'>
			<td>${d.name}</td>
			<td>
				<button class='update-user' onClick='updateUser(${d.id})'>Edit</button>
				<button class='delete-user' onClick='deleteUser(${d.id})'>Delete</button>
			</td>
		</tr>
	`;
	}
	document.getElementById('users').innerHTML = table;
}

function searchUser() {
	var input = document.getElementById('search');
	var filter = input.value.toUpperCase();
	var table = document.getElementById('users')
	var tr = table.getElementsByTagName('tr');

	for (var i = 0; i < tr.length; i++) {
		var td = tr[i].getElementsByTagName('td')[0];
		if (td) {
			var textValue = td.textContent || td.innerText;
			if (textValue.toUpperCase().indexOf(filter) > -1) {
				tr[i].style.display = '';
			} else {
				tr[i].style.display = 'none';
			}
		}
	} 
}

function addUser() {
	var uid = new Date().getTime().toString();
	var name = document.getElementById('name');

	const newUser = {
		id: uid,
		name: name.value,
	}
	data.push(newUser)
	localStorage.setItem('users', JSON.stringify(data))
	showData(data)
	name.value = '';
}

function updateUser(id) {
	const selectedUser = data.filter((user) => {return user.id === id})
	document.getElementById('name').value = selectedUser[0].name;
	const saveBtn = document.getElementById('save-user');
	const addBtn = document.getElementById('add-user');
	const title = document.getElementById('title');
	saveBtn.style.display = 'inline';
	addBtn.style.display = 'none';
	title.innerHTML = 'Edit user';

	saveBtn.addEventListener('click', (e) => {
		saveUser(id)
		title.innerHTML = 'Add user';
		saveBtn.style.display = 'none';
		addBtn.style.display = 'inline';
		document.getElementById('name').value = '';
	})
}

function saveUser(id) {
	let newName = document.getElementById('name');
	data.forEach((user) => {
		if(user.id == id) {
			user.name = newName.value
		}
	});
	localStorage.setItem('users', JSON.stringify(data))
	showData(data);
}

function deleteUser(id) {
	const user = document.getElementById(id);
	user.parentNode.removeChild(user);
	data = data.filter((user) => {
		return user.id != id
	});
	localStorage.setItem('users', JSON.stringify(data));
}