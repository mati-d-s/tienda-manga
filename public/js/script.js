document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "./data/productos.json";
    const shonenSection = document.querySelector(".producto-shonen");
    const seinenSection = document.querySelector(".producto-seinen");
    const carrito = [];

    fetch(apiUrl)
        .then((response) => {
            if (!response.ok) throw new Error("Error al cargar el archivo JSON.");
            return response.json();
        })
        .then((productos) => {
            renderProductos(productos.shonen || [], shonenSection);
            renderProductos(productos.seinen || [], seinenSection);
        })
        .catch((error) => {
            console.error("Error:", error.message);
            alert("Hubo un problema al cargar los productos. Intenta más tarde.");
        });

    function renderProductos(productos, section) {
        productos.forEach((producto) => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="container">
                    <h4><b>${producto.nombre}</b></h4>
                    <p>$${producto.precio}</p>
                    <button class="btn-comprar" data-id="${producto.id}">Comprar</button>
                </div>
            `;
            section.appendChild(card);
        });

        section.querySelectorAll(".btn-comprar").forEach((button) =>
            button.addEventListener("click", (e) => agregarAlCarrito(e, productos))
        );
    }

    function agregarAlCarrito(event, productos) {
        const productoId = event.target.dataset.id;
        const producto = productos.find((p) => p.id == productoId);

        if (!producto) return;

        const productoExistente = carrito.find((item) => item.id == productoId);
        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }

        Swal.fire({
            title: "Producto añadido",
            text: `Has añadido ${producto.nombre} al carrito.`,
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "Finalizar compra",
            cancelButtonText: "Seguir mirando",
        }).then((result) => {
            if (result.isConfirmed) {
                actualizarCarritoUI(true); // Redirige a la página del carrito
            } else {
                actualizarCarritoUI(false); // Actualiza el carrito sin redirigir
            }
        });
    }

    function actualizarCarritoUI(redirigir = false) {
        const main = document.querySelector("main");

        if (redirigir) {
            main.innerHTML = `
                <h1 style="text-align: center;">Carrito de compras</h1>
                <div id="carrito-items"></div>
                <p id="total">Total: $${calcularTotal()}</p>
                <div class="botones">
                    <button id="finalizar-compra">Finalizar compra</button>
                    <button id="volver-inicio">Volver al inicio</button>
                </div>
            `;

            const carritoItems = document.getElementById("carrito-items");
            carrito.forEach((producto, index) => {
                const item = document.createElement("div");
                item.classList.add("carrito-item");
                item.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div>
                        <h4>${producto.nombre}</h4>
                        <p>Precio: $${producto.precio}</p>
                        <div class="cantidad">
                            <label for="cantidad-${index}">Cantidad:</label>
                            <input type="number" id="cantidad-${index}" value="${producto.cantidad}" min="1">
                        </div>
                        <button class="btn-eliminar" data-index="${index}">Eliminar</button>
                    </div>
                `;
                carritoItems.appendChild(item);

                // Agregar event listener para cambiar cantidad
                item.querySelector(`#cantidad-${index}`).addEventListener("change", (e) => cambiarCantidad(e, index));

                // Agregar event listener para eliminar producto
                item.querySelector(".btn-eliminar").addEventListener("click", eliminarDelCarrito);
            });

            document.getElementById("finalizar-compra").addEventListener("click", finalizarCompra);
            document.getElementById("volver-inicio").addEventListener("click", () => location.reload());
        } else {
            // Actualiza solo el total si no se redirige
            const totalElement = document.getElementById("total");
            if (totalElement) totalElement.textContent = `Total: $${calcularTotal()}`;
        }
    }

    function cambiarCantidad(event, index) {
        const nuevaCantidad = parseInt(event.target.value);
        if (nuevaCantidad < 1) {
            carrito.splice(index, 1);
        } else {
            carrito[index].cantidad = nuevaCantidad;
        }
        actualizarCarritoUI(true);
    }

    function eliminarDelCarrito(event) {
        const index = event.target.dataset.index;
        carrito.splice(index, 1);
        actualizarCarritoUI(true); // Actualiza la UI completa al eliminar un producto
    }

    function calcularTotal() {
        return carrito.reduce((total, producto) => total + producto.precio * producto.cantidad, 0).toFixed(2);
    }

    function finalizarCompra() {
        Swal.fire({
            title: "Compra finalizada",
            text: "Gracias por tu compra.",
            icon: "success",
        }).then(() => location.reload());
    }
});
