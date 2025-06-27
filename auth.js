function verificarAutenticacion() {
  if (!sessionStorage.getItem("accessToken")) {
    alert("Acceso no autorizado. Debes iniciar sesión.");
    window.location.href = "login.html";
  }
}

const botonCerrarSesion = document.getElementById("cerrarSesion");

if (botonCerrarSesion) {
  botonCerrarSesion.addEventListener("click", function () {
    sessionStorage.removeItem("accessToken");
    window.location.href = "login.html";
  });
}
