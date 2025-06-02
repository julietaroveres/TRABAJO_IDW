
function login() {
  const user = document.getElementById("username").value.trim();
  const pass = document.getElementById("password").value.trim();
  const errorDiv = document.getElementById("error");

  const admins = [
    { user: "admin1", pass: "1234" },
    { user: "admin2", pass: "5678" },
    { user: "admin3", pass: "abcd" }
  ];

  const valid = admins.find(admin => admin.user === user && admin.pass === pass);

  if (valid) {
    localStorage.setItem("adminLogged", "true");
    window.location.href = "menuadmin.html";
  } else {
    errorDiv.textContent = "Usuario o contraseña incorrectos.";
  }
}
