document.addEventListener("DOMContentLoaded", function() {
    // Obtener referencias a los botones de inicio y detención
    var startButton = document.querySelector("[data-start]");
    var stopButton = document.querySelector("[data-stop]");
    var intervalId;

    // Función para cambiar el color del fondo del body
    function changeBackgroundColor() {
        document.body.style.backgroundColor = getRandomHexColor();
    }

    // Agrega el controlador de evento al botón de inicio
    startButton.addEventListener("click", function() {
        // Deshabilita el botón de inicio y habilita el botón de detención
        startButton.disabled = true;
        stopButton.disabled = false;

        // Cambia el color del fondo del body cada segundo
        intervalId = setInterval(changeBackgroundColor, 1000);

        // Cambia el color por primera vez sin esperar 1 segundo
        changeBackgroundColor();
    });

    // Agrega el controlador de evento al botón de detención
    stopButton.addEventListener("click", function() {
        // Habilita el botón de inicio y deshabilita el botón de detención
        startButton.disabled = false;
        stopButton.disabled = true;

        // Detiene el cambio de color del fondo del body
        clearInterval(intervalId);
    });

    // Función para generar un color hexadecimal aleatorio
    function getRandomHexColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    }
});

