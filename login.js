async function login() {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorDiv = document.getElementById("error");
  errorDiv.textContent = "";

  try {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Usuario o contraseña incorrectos.");
    }

    sessionStorage.setItem("accessToken", data.token);

    window.location.href = "menuadmin.html";

  } catch (error) {
    errorDiv.textContent = error.message;
  }
}

