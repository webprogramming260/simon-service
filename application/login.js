function login() {
  const nameEl = document.querySelector("#name");
  localStorage.setItem("userName", nameEl.value);
  window.location.href = "play.html";
}
