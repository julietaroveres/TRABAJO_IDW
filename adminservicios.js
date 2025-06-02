const serviciosIniciales = [
  {
    id: 1,
    nombre: "Animadores",
    descripcion: "Juegos y actividades recreativas guiadas por animadores profesionales.",
    precio: 50000,
    foto: "img/servicio2.jpg"
  },
  {
    id: 2,
    nombre: "Catering",
    descripcion: "Opciones deliciosas y adaptadas a cada tipo de evento, con ingredientes frescos y atención cuidada.",
    precio: 150000,
    foto: "img/servicio6.jpg"
  },
  {
    id: 3,
    nombre: "Decoración personalizada",
    descripcion: "Ambientación del salón según la temática elegida.",
    precio: 200000,
    foto: "img/servicio1.jpg"
  },
  {
    id: 4,
    nombre: "Música DJ",
    descripcion: "DJ profesional con equipo de sonido y luces.",
    precio: 200000,
    foto: "img/servicio4.jpg"
  },
  {
    id: 5,
    nombre: "Fotografía profesional",
    descripcion: "Cobertura del evento con fotos digitales de alta calidad.",
    precio: 80000,
    foto: "img/servicio5.jpg"
  },
  {
    id: 6,
    nombre: "Torta temática",
    descripcion: "Torta personalizada según la temática de la fiesta.",
    precio: 60000,
    foto: "img/servicio3.jpg"
  }
];

localStorage.removeItem('servicios');
localStorage.setItem('servicios', JSON.stringify(serviciosIniciales));

function cargarServicios() {
  return JSON.parse(localStorage.getItem('servicios')) || [];
}

function guardarServicios(servicios) {
  localStorage.setItem('servicios', JSON.stringify(servicios));
}

function mostrarServicios() {
  const servicios = cargarServicios();
  const tbody = document.querySelector('#tablaServicios tbody');
  tbody.innerHTML = '';

  servicios.forEach(servicio => {
    const tr = document.createElement('tr');

    tr.innerHTML = `
      <td>${servicio.nombre}</td>
      <td>${servicio.descripcion}</td>
      <td>$${servicio.precio}</td>
      <td><img src="${servicio.foto}" alt="${servicio.nombre}" style="width: 150px; height: auto;"></td>
      <td>
        <button onclick="verServicio(${servicio.id})" class="btn btn-sm btn-info" style="background-color: #333; color: white;">Ver</button>
        <button onclick="editarServicio(${servicio.id})" class="btn btn-sm btn-success">Editar</button>
        <button onclick="eliminarServicio(${servicio.id})" class="btn btn-sm btn-danger">Eliminar</button>
      </td>
    `;

    tbody.appendChild(tr);
  });
}

function editarServicio(id) {
  const servicios = cargarServicios();
  const servicio = servicios.find(s => s.id === id);

  if (servicio) {
    document.getElementById('servicioId').value = servicio.id;
    document.getElementById('nombreServicio').value = servicio.nombre;
    document.getElementById('descripcionServicio').value = servicio.descripcion;
    document.getElementById('precioServicio').value = servicio.precio;
    document.getElementById('imagenServicio').value = servicio.foto;
  }
}

function eliminarServicio(id) {
  const servicios = cargarServicios();
  const index = servicios.findIndex(s => s.id === id);

  if (index !== -1) {
    const confirmar = confirm(`¿Estás seguro de eliminar el servicio "${servicios[index].nombre}"?`);
    if (confirmar) {
      servicios.splice(index, 1);
      guardarServicios(servicios);
      mostrarServicios();
      alert("Servicio eliminado correctamente.");
    }
  }
}

function verServicio(id) {
  const servicio = cargarServicios().find(s => s.id === id);
  if (servicio) {
    document.getElementById('detalleNombreServicio').textContent = servicio.nombre;
    document.getElementById('detalleDescripcionServicio').textContent = servicio.descripcion;
    document.getElementById('detallePrecioServicio').textContent = `$${servicio.precio}`;
    document.getElementById('detalleImagenServicio').src = servicio.foto;
    document.getElementById('detalleServicio').style.display = 'block';
  }
}

function cerrarDetalleServicio() {
  document.getElementById('detalleServicio').style.display = 'none';
}

document.getElementById('formServicio').addEventListener('submit', function (e) {
  e.preventDefault();

  const id = document.getElementById('servicioId')?.value;
  const nombre = document.getElementById('nombreServicio').value;
  const descripcion = document.getElementById('descripcionServicio').value;
  const precio = parseFloat(document.getElementById('precioServicio').value);
  const foto = document.getElementById('imagenServicio').value;

  let servicios = cargarServicios();

  if (id) {
    const index = servicios.findIndex(s => s.id == id);
    if (index !== -1) {
      servicios[index].nombre = nombre;
      servicios[index].descripcion = descripcion;
      servicios[index].precio = precio;
      servicios[index].foto = foto;
    }
  } else {
    const nuevoServicio = {
      id: Date.now(),
      nombre,
      descripcion,
      precio,
      foto
    };
    servicios.push(nuevoServicio);
  }

  guardarServicios(servicios);
  mostrarServicios();
  this.reset();
  document.getElementById('servicioId').value = '';
});

document.addEventListener('DOMContentLoaded', mostrarServicios);
