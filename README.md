# MangaStore

```plaintext
MangaStore/
├── index.html          # Página principal
├── pages/
│   ├── catalogo.html   # Catálogo de productos
│   ├── reseña.html     # Reseñas de usuarios
│   └── contacto.html   # Página de contacto
├── css/
│   └── style.css       # Estilos personalizados
├── js/
│   ├── script.js       # Lógica principal
│   └── contacto.js     # Lógica para formulario de contacto
├── data/
│   └── productos.json  # Datos de productos (mangas)
└── img/                # Imágenes
```

## Funcionalidades

### 1. Catálogo de Productos

- **Cargado dinámico de productos**: Utiliza `fetch` para cargar los datos desde un archivo JSON y mostrarlos en las secciones Shonen y Seinen.
- **Interacción con el usuario**: Posibilidad de agregar productos al carrito.

### 2. Reseñas de Usuarios

- Sección dedicada a opiniones de clientes destacando la calidad de los productos y el servicio.

### 3. Formulario de Contacto

- Formulario funcional que envía los datos utilizando el servicio de [Formspree](https://formspree.io/).

### 4. Alertas Personalizadas

- Uso de SweetAlert2 para mejorar la experiencia del usuario con alertas estilizadas.

## Instalación y Configuración

1. Clona el repositorio:

   ```bash
   git clone https://github.com/tu-usuario/mangastore.git
   ```

2. Navega al directorio del proyecto:

   ```bash
   cd mangastore
   ```

3. Asegúrate de tener un servidor local configurado. Puedes usar extensiones como "Live Server" de Visual Studio Code.

4. Abre `index.html` en tu navegador.

## Datos de Ejemplo

El archivo `productos.json` contiene datos de ejemplo para los productos:

```json
{
  "shonen": [
    {
      "nombre": "Dragon Ball Super #22",
      "imagen": "path/to/image.jpg",
      "precio": "9.99"
    }
  ],
  "seinen": [
    {
      "nombre": "Berserk Vol. 1",
      "imagen": "path/to/image.jpg",
      "precio": "12.99"
    }
  ]
}
```

## Deploy

**Vercel**: Subir el proyecto para despliegue rápido.


---


