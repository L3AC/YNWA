document.addEventListener('DOMContentLoaded', function()  {
    const voiceButton = document.getElementById('voiceButton');
    const searchInput = document.getElementById('searchMain');
    let recognition;

    // Verificar compatibilidad con la API de reconocimiento de voz
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();
        recognition.lang = 'es-ES,en-US'; // Configurar los idiomas a reconocer

        // Evento de resultado del reconocimiento de voz
        recognition.onresult = function(event) {
            const transcript = event.results[event.results.length - 1][0].transcript.trim();
            searchInput.value = transcript;
        };

        // Evento de inicio/detención del reconocimiento de voz
        voiceButton.addEventListener('click', function() {
            if (recognition && recognition.isStarted) {
                recognition.stop();
            } else {
                recognition.start();
            }
        });
    } else {
        voiceButton.style.display = 'none'; // Ocultar el botón si no es compatible con la API de reconocimiento de voz
    }
});
