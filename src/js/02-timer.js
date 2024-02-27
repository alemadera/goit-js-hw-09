import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

document.addEventListener("DOMContentLoaded", () => {
    // Obtiene referencia al campo de selección de fecha
    const dateTimePicker = document.getElementById("datetime-picker");
    // Obtiene referencia al botón "Start"
    const startButton = document.querySelector("[data-start]");
    // Obtiene referencia al div del temporizador
    const timerDiv = document.querySelector(".timer");

    let intervalId;

    // Función para agregar un cero a la izquierda si el número tiene menos de dos caracteres
    const addLeadingZero = (value) => String(value).padStart(2, '0');

    // Función para calcular el tiempo restante y actualizar la interfaz del temporizador
    const updateTimer = (endTime) => {
        // Calcula la diferencia de tiempo entre la fecha de finalización y la fecha actual
        const difference = endTime - Date.now();
        if (difference <= 0) {
            // Detiener el temporizador si ya ha llegado a la fecha de finalización
            clearInterval(intervalId);
            return;
        }

        // Convierte la diferencia de tiempo en días, horas, minutos y segundos
        const { days, hours, minutes, seconds } = convertMs(difference);

        // Actualiza la interfaz del temporizador con los valores de tiempo restante formateados
        document.querySelector("[data-days]").textContent = addLeadingZero(days);
        document.querySelector("[data-hours]").textContent = addLeadingZero(hours);
        document.querySelector("[data-minutes]").textContent = addLeadingZero(minutes);
        document.querySelector("[data-seconds]").textContent = addLeadingZero(seconds);
    };

    // Agrega el controlador de evento al botón "Start"
    startButton.addEventListener("click", () => {
        // Convierte la fecha seleccionada por el usuario en milisegundos
        const selectedDate = new Date(dateTimePicker.value).getTime();

        // Inicia el temporizador y actualiza la interfaz cada segundo
        intervalId = setInterval(() => {
            updateTimer(selectedDate);
        }, 1000);
    });

    // Función para convertir milisegundos en días, horas, minutos y segundos
    const convertMs = (ms) => {
        // Número de milisegundos por unidad de tiempo
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        // Calcula los valores restantes
        const days = Math.floor(ms / day);
        const hours = Math.floor((ms % day) / hour);
        const minutes = Math.floor((ms % hour) / minute);
        const seconds = Math.floor((ms % minute) / second);

        return { days, hours, minutes, seconds };
    };

    // Inicializa Flatpickr en el campo de selección de fecha
    flatpickr(dateTimePicker, {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose: (selectedDates) => {
            // Verifica si se seleccionó una fecha en el pasado
            if (selectedDates.length > 0 && selectedDates[0] < new Date()) {
                Notiflix.Notify.failure('Please choose a date in the future.');
                // Deshabilita el botón "Start" si se selecciona una fecha en el pasado
                startButton.disabled = true; 
            } else {
                // Habilita el botón "Start" si se selecciona una fecha válida en el futuro
                startButton.disabled = false; 
            }
        }
    });
});