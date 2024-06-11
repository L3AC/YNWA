// Espera a que se cargue todo el contenido del documento HTML antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function()  {
    // Obtiene el botón de activación de voz y el campo de búsqueda del documento por su ID
    const voiceButton = document.getElementById('voiceButton');
    const searchInput = document.getElementById('searchMain');

    // Declara una variable para almacenar el objeto de reconocimiento de voz
    let recognition;

    // Verifica si el navegador es compatible con la API de reconocimiento de voz
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        // Obtiene la clase de reconocimiento de voz adecuada según la compatibilidad del navegador
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        // Crea una instancia de reconocimiento de voz
        recognition = new SpeechRecognition();

        // Configura los idiomas que se van a reconocer
        recognition.lang = 'es-ES,en-US';

        // Define el evento que se activa cuando se obtiene un resultado del reconocimiento de voz
        recognition.onresult = function(event) {
            // Obtiene el texto reconocido de la última transcripción
            const transcript = event.results[event.results.length - 1][0].transcript.trim();
            
            // Asigna el texto reconocido al campo de búsqueda
            searchInput.value = transcript;
        };

        // Define el evento de clic para activar o desactivar el reconocimiento de voz
        voiceButton.addEventListener('click', function() {
            // Si el reconocimiento de voz está en curso, se detiene; de lo contrario, se inicia
            if (recognition && recognition.isStarted) {
                recognition.stop();
            } else {
                recognition.start();
            }
        });
    } else {
        // Si el navegador no es compatible con la API de reconocimiento de voz, se oculta el botón de activación de voz
        voiceButton.style.display = 'none';
    }
});
