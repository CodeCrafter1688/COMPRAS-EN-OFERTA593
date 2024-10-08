// Inicializa el carrito y el total
let carrito = [];
let total = 0;

// Escucha el evento de envío del formulario de contacto
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita que se recargue la página
    alert('Mensaje enviado. ¡Gracias por contactarnos!');
});

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precioFinal) {
    carrito.push({ nombre, precio: precioFinal });
    total += precioFinal;
    mostrarCarrito();
    actualizarContadorCarrito();
    actualizarLinkWhatsApp();
    alert(`${nombre} ha sido agregado al carrito. Total actual: $${total.toFixed(2)}`);
}

// Muestra el carrito con estilo adecuado
function mostrarCarrito() {
    const carritoItems = document.getElementById('carrito-items');
    carritoItems.innerHTML = ''; // Limpia el carrito

    carrito.forEach((item, index) => {
        const div = document.createElement('div');
        div.classList.add('carrito-item');

        const productoInfo = document.createElement('span');
        productoInfo.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;

        const botonEliminar = crearBotonEliminar(index);

        div.appendChild(productoInfo);
        div.appendChild(botonEliminar);
        carritoItems.appendChild(div);
    });

    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}

// Crea un botón para eliminar productos del carrito
function crearBotonEliminar(index) {
    const boton = document.createElement('button');
    boton.textContent = 'Eliminar';
    boton.classList.add('boton-eliminar'); // Agregar clase para estilos
    boton.addEventListener('click', () => eliminarDelCarrito(index));
    return boton;
}

// Función para actualizar el contador de productos en el carrito
function actualizarContadorCarrito() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = carrito.length;
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(index) {
    total -= carrito[index].precio;
    carrito.splice(index, 1);
    mostrarCarrito();
    actualizarContadorCarrito();
    actualizarLinkWhatsApp();
}

// Evento para agregar productos al carrito
document.querySelectorAll('.producto button').forEach(button => {
    button.addEventListener('click', function() {
        const nombre = this.parentElement.querySelector('h3').textContent;
        const precioFinal = parseFloat(this.parentElement.querySelector('.precio-valor').textContent.replace('Precio Final: $', ''));
        agregarAlCarrito(nombre, precioFinal);
    });
});

// Función para proceder al pago
document.getElementById('checkout').addEventListener('click', function() {
    const bancoSeleccionado = document.getElementById('banco-select').value;

    if (carrito.length > 0) {
        if (bancoSeleccionado) {
            alert('Procediendo al pago. Gracias por su compra!');
            window.open(bancoSeleccionado, '_blank'); // Abre el banco seleccionado
        } else {
            alert('Por favor, selecciona un banco para proceder al pago.');
        }
    } else {
        alert('Tu carrito está vacío. Agrega productos antes de proceder al pago.');
    }
});

// Botón para limpiar el carrito
document.getElementById('clear-cart').addEventListener('click', function() {
    carrito = [];
    total = 0;
    mostrarCarrito();
    actualizarContadorCarrito();
    actualizarLinkWhatsApp();
});

// Actualizar el enlace de WhatsApp con los detalles del carrito
function actualizarLinkWhatsApp() {
    const linkWhatsApp = document.getElementById('whatsapp-link');
    const detallesCarrito = carrito.map(item => `${item.nombre} - $${item.precio.toFixed(2)}`).join('%0A');
    const totalCarrito = total.toFixed(2);
    const mensaje = `Estoy interesado en comprar estos productos:%0A${detallesCarrito}%0ATotal del carrito: $${totalCarrito}`;
    linkWhatsApp.href = `https://wa.me/593959759124?text=${mensaje}`;
}
