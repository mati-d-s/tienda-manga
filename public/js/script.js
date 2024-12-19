document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "./data/productos.json"; // Ruta del archivo JSON
    const shonenSection = document.querySelector(".producto-shonen");
    const seinenSection = document.querySelector(".producto-seinen");
  
    // Cargar productos
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error al cargar el archivo JSON.");
        }
        return response.json();
      })
      .then((productos) => {
        // Acceder a las categorías directamente
        const shonenProductos = productos.shonen || [];
        const seinenProductos = productos.seinen || [];
  
        // Verificar si hay productos en cada categoría
        if (shonenProductos.length === 0) {
          shonenSection.innerHTML = '<p>No se encontraron productos en la categoría Shonen.</p>';
          console.warn("No se encontraron productos en la categoría 'Shonen'.");
        }
        if (seinenProductos.length === 0) {
          seinenSection.innerHTML = '<p>No se encontraron productos en la categoría Seinen.</p>';
          console.warn("No se encontraron productos en la categoría 'Seinen'.");
        }
  
        // Renderizar productos en sus respectivas secciones
        renderProductos(shonenProductos, shonenSection);
        renderProductos(seinenProductos, seinenSection);
      })
      .catch((error) => {
        console.error("Error:", error.message);
        alert("Hubo un problema al cargar los productos. Intenta más tarde.");
      });
  
    // Renderizar productos
    function renderProductos(productos, section) {
      if (productos.length === 0) return; // No renderizar si no hay productos en esta categoría
  
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
  
      // Asignar eventos a botones de compra
      section.querySelectorAll(".btn-comprar").forEach((button) =>
        button.addEventListener("click", agregarAlCarrito)
      );
    }
  
    // Carrito de compras
    const carrito = [];
  
    function agregarAlCarrito(event) {
      const productoId = event.target.dataset.id;
  
      // Agregar producto al carrito
      fetch(apiUrl)
        .then((response) => response.json())
        .then((productos) => {
          const producto = productos.shonen.concat(productos.seinen).find((p) => p.id == productoId);
          if (!producto) {
            console.error("Producto no encontrado.");
            return;
          }
          carrito.push(producto);
  
          // Confirmar al usuario
          Swal.fire({
            title: "Producto añadido",
            text: `Has añadido ${producto.nombre} al carrito.`,
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "Finalizar compra",
            cancelButtonText: "Seguir comprando",
          }).then((result) => {
            if (result.isConfirmed) {
              mostrarCarrito();
            }
          });
        })
        .catch((error) => {
          console.error("Error al agregar producto al carrito:", error);
          Swal.fire({
            title: "Error",
            text: "Hubo un problema al agregar el producto al carrito. Intenta más tarde.",
            icon: "error",
          });
        });
    }
  
    function mostrarCarrito() {
      // Mostrar los productos del carrito
      const carritoSection = document.createElement("section");
      carritoSection.innerHTML = `
        <h2>Carrito de compras</h2>
        <div id="carrito-items"></div>
        <p id="total">Total: $${calcularTotal()}</p>
        <button id="finalizar-compra">Finalizar compra</button>
      `;
      document.body.innerHTML = ""; // Limpiar la página
      document.body.appendChild(carritoSection);
  
      const carritoItems = document.getElementById("carrito-items");
      carrito.forEach((producto) => {
        const item = document.createElement("div");
        item.innerHTML = `
          <h4>${producto.nombre}</h4>
          <p>Precio: $${producto.precio}</p>
        `;
        carritoItems.appendChild(item);
      });
  
      document.getElementById("finalizar-compra").addEventListener("click", finalizarCompra);
    }
  
    function calcularTotal() {
      return carrito.reduce((total, producto) => total + producto.precio, 0);
    }
  
    function finalizarCompra() {
      Swal.fire({
        title: "Compra finalizada",
        text: "Gracias por tu compra.",
        icon: "success",
        confirmButtonText: "Aceptar",
      }).then(() => {
        location.reload(); // Recargar la página
      });
    }
  });
  