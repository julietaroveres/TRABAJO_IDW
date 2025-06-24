function verificarAutenticacion() {
  if (!sessionStorage.getItem("token")) {
    alert("Acceso no autorizado. Debes iniciar sesión.");
    window.location.href = "login.html";
  }
}
