// Importa la biblioteca Notiflix
import Notiflix from 'notiflix';

// Función para crear una Promise
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    // Genera un valor aleatorio para decidir si la Promise se resolverá o se rechazará
    const shouldResolve = Math.random() > 0.3;

    // Función para resolver la Promise
    const fulfillPromise = () => {
      // Resuelve la Promise con un objeto que contiene la posición y el retraso
      resolve({ position, delay }); 
    };

    // Función para rechazar la Promise
    const rejectPromise = () => {
      // Rechaza la Promise con un objeto que contiene la posición y el retraso
      reject({ position, delay }); 
    };

    // Si se debe resolver la Promise, ejecutar fulfillPromise después del retraso
    if (shouldResolve) {
      setTimeout(fulfillPromise, delay);
    } else {
      // Si se debe rechazar la Promise, ejecutar rejectPromise después del retraso
      setTimeout(rejectPromise, delay);
    }
  });
}

// Espera a que el contenido del DOM se haya cargado completamente
document.addEventListener('DOMContentLoaded', () => {
  // Obtiene referencia al formulario
  const form = document.querySelector('.form');

  // Agrega un controlador de evento para el evento de envío del formulario
  form.addEventListener('submit', (event) => {
    // Evita el comportamiento predeterminado de enviar el formulario
    event.preventDefault(); 

    // Obtiene los datos del formulario
    const formData = new FormData(form);
    const firstDelay = Number(formData.get('delay')); // Primer retraso en milisegundos
    const delayStep = Number(formData.get('step')); // Paso de incremento de retraso
    const amount = Number(formData.get('amount')); // Cantidad de Promises a crear

    let currentDelay = firstDelay; // Inicializa el retraso actual

    // Itera sobre la cantidad de Promises especificada
    for (let i = 1; i <= amount; i++) {
      // Llama a la función createPromise con la posición y el retraso actual
      createPromise(i, currentDelay)
        .then(({ position, delay }) => {
          // Notifica al usuario que la Promise se ha resuelto con éxito
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          // Notifica al usuario que la Promise ha sido rechazada
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });

      // Actualiza el retraso actual para la siguiente Promise
      currentDelay += delayStep;
    }
  });
});

