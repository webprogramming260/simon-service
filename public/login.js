function displayControls() {
  const loggedIn = !!localStorage.getItem('userName');
  document.querySelectorAll('.logged-in').forEach((e) => (e.style.display = loggedIn ? 'block' : 'none'));
  document.querySelectorAll('.logged-out').forEach((e) => (e.style.display = loggedIn ? 'none' : 'block'));
}

function login(e) {
  const nameEl = document.querySelector('#name');
  localStorage.setItem('userName', nameEl.value);
}

function logout(e) {
  localStorage.removeItem('userName');
  displayControls();
  e.preventDefault();
}

displayControls();
