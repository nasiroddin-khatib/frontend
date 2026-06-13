const API = 'http://backend-lb-375268929.ap-south-1.elb.amazonaws.com';


// ================= REGISTER =================

async function register() {

  const name = document.getElementById('name').value;

  const email = document.getElementById('email').value;

  const password = document.getElementById('password').value;

  const response = await fetch(`${API}/register`, {

    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      name,
      email,
      password
    })
  });

  const data = await response.json();

  alert(data.message);
}


// ================= LOGIN =================

async function login() {

  const email = document.getElementById('loginEmail').value;

  const password = document.getElementById('loginPassword').value;

  const response = await fetch(`${API}/login`, {

    method: 'POST',

    headers: {
      'Content-Type': 'application/json'
    },

    body: JSON.stringify({
      email,
      password
    })
  });

  const data = await response.json();

  if (data.token) {

    localStorage.setItem('token', data.token);

    window.location = 'dashboard.html';

  } else {

    alert(data.message);
  }
}


// ================= CREATE NOTE =================

async function createNote() {

  const title = document.getElementById('title').value;

  const content = document.getElementById('content').value;

  const token = localStorage.getItem('token');

  const response = await fetch(`${API}/notes`, {

    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },

    body: JSON.stringify({
      title,
      content
    })
  });

  const data = await response.json();

  alert(data.message);

  getNotes();
}


// ================= GET NOTES =================

async function getNotes() {

  const token = localStorage.getItem('token');

  const response = await fetch(`${API}/notes`, {

    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const notes = await response.json();

  let output = '';

  notes.forEach(note => {

    output += `

      <div class="note">

        <h3>${note.title}</h3>

        <p>${note.content}</p>

        <button onclick="deleteNote(${note.id})">

          Delete

        </button>

      </div>
    `;
  });

  document.getElementById('notes').innerHTML = output;
}


// ================= DELETE NOTE =================

async function deleteNote(id) {

  const token = localStorage.getItem('token');

  await fetch(`${API}/notes/${id}`, {

    method: 'DELETE',

    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  getNotes();
}


// ================= AUTO LOAD =================

if (window.location.pathname.includes('dashboard')) {

  getNotes();
}
