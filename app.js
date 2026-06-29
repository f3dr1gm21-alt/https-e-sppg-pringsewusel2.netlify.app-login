const loginView = document.querySelector("#login-view");
const dashboardView = document.querySelector("#dashboard-view");
const form = document.querySelector("#login-form");
const error = document.querySelector("#form-error");
const welcomeCopy = document.querySelector("#welcome-copy");
const logoutButton = document.querySelector("#logout-button");

const sessionKey = "esppg-user";

function showDashboard(name) {
  loginView.hidden = true;
  dashboardView.hidden = false;
  welcomeCopy.textContent = `${name}, akses demo sudah aktif. Gunakan panel ini sebagai awal pengembangan fitur E-SPPG.`;
}

function showLogin() {
  dashboardView.hidden = true;
  loginView.hidden = false;
  form.reset();
  error.hidden = true;
  error.textContent = "";
}

const savedName = window.localStorage.getItem(sessionKey);
if (savedName) {
  showDashboard(savedName);
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const username = String(formData.get("username") || "").trim();
  const password = String(formData.get("password") || "");

  if (!username || password.length < 4) {
    error.textContent = "Isi nama pengguna dan kata sandi minimal 4 karakter.";
    error.hidden = false;
    return;
  }

  window.localStorage.setItem(sessionKey, username);
  showDashboard(username);
});

logoutButton.addEventListener("click", () => {
  window.localStorage.removeItem(sessionKey);
  showLogin();
});
