document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const nombreInput = document.getElementById("nombre");
    const emailInput = document.getElementById("email");
    const mensajeInput = document.getElementById("mensaje");

    form.addEventListener("submit", (event) => {
        // Reiniciar mensajes de error previos
        clearErrors();

        let isValid = true;

        // Validar Nombre
        if (nombreInput.value.trim() === "") {
            showError(nombreInput, "El nombre es obligatorio.");
            isValid = false;
        } else if (nombreInput.value.length < 3) {
            showError(nombreInput, "El nombre debe tener al menos 3 caracteres.");
            isValid = false;
        }

        // Validar Correo Electrónico
        if (emailInput.value.trim() === "") {
            showError(emailInput, "El correo electrónico es obligatorio.");
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            showError(emailInput, "Ingresa un correo electrónico válido.");
            isValid = false;
        }

        // Validar Mensaje
        if (mensajeInput.value.trim() === "") {
            showError(mensajeInput, "El mensaje es obligatorio.");
            isValid = false;
        } else if (mensajeInput.value.length < 10) {
            showError(mensajeInput, "El mensaje debe tener al menos 10 caracteres.");
            isValid = false;
        }

        // Si no es válido, prevenir el envío
        if (!isValid) {
            event.preventDefault();
        }
    });

    // Función para mostrar un mensaje de error
    function showError(input, message) {
        const errorElement = document.createElement("small");
        errorElement.classList.add("text-danger");
        errorElement.textContent = message;
        input.classList.add("is-invalid");
        input.parentElement.appendChild(errorElement);
    }

    // Función para limpiar errores previos
    function clearErrors() {
        document.querySelectorAll(".text-danger").forEach((el) => el.remove());
        document.querySelectorAll(".is-invalid").forEach((el) => el.classList.remove("is-invalid"));
    }

    // Validar formato de correo electrónico
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});
