if (!sessionStorage.getItem("token")) {
  window.location.href = "login.html";
}

fetch('https://dummyjson.com/users')
  .then(res => res.json())
  .then(data => mostrarUsuarios(data.users))
  .catch(error => console.error('Error al cargar los usuarios:', error));

function mostrarUsuarios(usuarios) {
  const contenedor = document.getElementById("lista-usuarios");
  usuarios.forEach(usuario => {
    const div = document.createElement("div");
    div.classList.add("col-md-4", "mb-4");

    div.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${usuario.image}" class="card-img-top" alt="${usuario.firstName}">
        <div class="card-body">
          <h5 class="card-title">${usuario.firstName} ${usuario.lastName}</h5>
          <p class="card-text"><strong>Email:</strong> ${usuario.email}</p>
          <p class="card-text"><strong>Teléfono:</strong> ${usuario.phone}</p>
          <p class="card-text"><strong>Ciudad:</strong> ${usuario.address.city}</p>
        </div>
      </div>
    `;

    contenedor.appendChild(div);
  });
}
