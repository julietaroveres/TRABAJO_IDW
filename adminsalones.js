const salonesIniciales = [
  {
    id: 1,
    nombre: "Salón Arcoíris",
    capacidad: "30-50 personas",
    direccion: "Av. Colorida 123",
    imagen: "img/salon1.jpg",
    descripcion: "Colorido y seguro, ideal para los más pequeños.",
    popular: true
  },
  {
    id: 2,
    nombre: "Castillo de Sueños",
    capacidad: "40-60 personas",
    direccion: "Calle de Fantasía 456",
    imagen: "img/salon2.jpg",
    descripcion: "Un salón temático que hará volar la imaginación.",
    popular: true
  },
  {
    id: 3,
    nombre: "Fiesta Express",
    capacidad: "20-40 personas",
    direccion: "Av. Rápida 789",
    imagen: "img/salon3.jpg",
    descripcion: "Práctico, moderno y fácil de reservar.",
    popular: true
  },
  {
    id: 4,
    nombre: "Colores",
    capacidad: "50-70 personas",
    direccion: "Pasaje Alegre 321",
    imagen: "img/salon4.jpg",
    descripcion: "Incluye bombas de colores, ideal para los más grandes.",
    popular: false
  },
  {
    id: 5,
    nombre: "Aventura Park",
    capacidad: "60-80 personas",
    direccion: "Ruta Natural 654",
    imagen: "img/salon5.jpg",
    descripcion: "Diversión garantizada con juegos interactivos y espacios al aire libre seguros.",
    popular: false
  },
  {
    id: 6,
    nombre: "Pequeños Héroes",
    capacidad: "30-50 personas",
    direccion: "Calle Héroes 987",
    imagen: "img/salon6.jpg",
    descripcion: "Inspirado en superhéroes, ideal para fiestas temáticas.",
    popular: false
  }
];


if (!localStorage.getItem('salones')) {
  localStorage.setItem('salones', JSON.stringify(salonesIniciales));
}








function cargarSalones(){
 const salones = JSON.parse(localStorage.getItem('salones')) || [];
  return salones;
}
 function guardarSalones(salones) {
  localStorage.setItem('salones', JSON.stringify(salones));
}
function editarSalon(id) {
  const salones = cargarSalones();
  const salon = salones.find(s => s.id === id);

  if (salon) {
    document.getElementById('salonId').value = salon.id;
    document.getElementById('nombreSalon').value = salon.nombre;
    document.getElementById('capacidadSalon').value = salon.capacidad;
    document.getElementById('direccionSalon').value = salon.direccion;
  }
}
function eliminarSalon(id) {
  const salones = cargarSalones();
  const index = salones.findIndex(s => s.id === id);

  if (index !== -1) {
    
    const salonAEliminar = salones.slice(index, index + 1)[0];

    const confirmacion = confirm(`¿Estás seguro de que querés eliminar el salón "${salonAEliminar.nombre}"?`);

    if (confirmacion) {
      salones.splice(index, 1);
      guardarSalones(salones);
      mostrarSalones();

      alert(`Salón "${salonAEliminar.nombre}" eliminado correctamente.`);
    }
  }
}
function verSalon(id) {
  const salones = cargarSalones();
  const salon = salones.find(s => s.id === id);
  if (salon) {
    document.getElementById('detalleNombre').textContent = salon.nombre;
    document.getElementById('detalleCapacidad').textContent = salon.capacidad;
    document.getElementById('detalleDireccion').textContent = salon.direccion;
    document.getElementById('detalleImagen').src = salon.imagen;
    document.getElementById('detalleSalon').style.display = 'block';
  }
}

function cerrarDetalle() {
  document.getElementById('detalleSalon').style.display = 'none';
}

function irAEditar(id) {
  localStorage.setItem('editarSalonId', id);
  window.location.href = 'catalogo.html';
}
function mostrarSalones() {
  const salones = cargarSalones ();
  const tbody = document.querySelector ('#tabladeSalones tbody'); 
  tbody.innerHTML = '';

  salones.forEach(salon => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${salon.nombre}</td>
      <td>${salon.capacidad}</td>
      <td>${salon.direccion}</td>
      <td>
      <img src="${salon.imagen}" alt="${salon.nombre}" style="width: 150px; height: auto;"></td>
      
       <td>
        <button class="btn btn-info btn-sm" onclick="verSalon(${salon.id})"
        style="background-color: #333; color: white;">Ver</button>

        <button onclick="irAEditar(${salon.id})" class="btn btn-sm btn-success me-2">Editar</button>
        <button onclick="eliminarSalon(${salon.id})" class="btn btn-sm btn-danger">Eliminar</button>
      </td>

      
    `;

    tbody.appendChild(tr); 
  });
}
document.getElementById('formSalon').addEventListener('submit', function (e) {
  e.preventDefault();

  const id = document.getElementById('salonId').value;
  const nombre = document.getElementById('nombreSalon').value;
  const capacidad = document.getElementById('capacidadSalon').value;
  const direccion = document.getElementById('direccionSalon').value;
  const imagen = document.getElementById('imagenSalon').value;

  const salones = cargarSalones();

  if (id) {
    // EDITAR salón existente
    const index = salones.findIndex(s => s.id == id);
    if (index !== -1) {
      salones[index].nombre = nombre;
      salones[index].capacidad = capacidad;
      salones[index].direccion = direccion;
      salones[index].imagen = imagen; 
    }
  } else {
    
    const nuevoSalon = {
      id: Date.now(),
      nombre,
      capacidad,
      direccion,
      imagen, 
      descripcion: ""
    };
    salones.push(nuevoSalon);
  }

  guardarSalones(salones);
  mostrarSalones();
  this.reset();
  document.getElementById('salonId').value = '';
});

document.addEventListener('DOMContentLoaded', mostrarSalones);