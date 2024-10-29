// Speech Recognition for input
const speakBtn = document.getElementById('speakBtn');
const sourceText = document.getElementById('sourceText');
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

speakBtn.addEventListener('click', () => {
    recognition.start();
    sourceText.classList.add('speaking');
});

recognition.onresult = function(event) {
    const speechToText = event.results[0][0].transcript;
    sourceText.value = speechToText;
    sourceText.classList.remove('speaking');
};

// Translation process
document.getElementById('translateBtn').addEventListener('click', function() {
    const sourceTextValue = sourceText.value;
    const sourceLang = document.getElementById('sourceLang').value;
    const targetLang = document.getElementById('targetLang').value;

    document.getElementById('translatedText').value = '';

    // Fetch translation (this is where the translation logic comes in)
    fetch('/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ source_lang: sourceLang, target_lang: targetLang, text: sourceTextValue })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('translatedText').value = data.translated_text;
    });
});

// Speech Synthesis for translated output
const playBtn = document.getElementById('playBtn');
const translatedText = document.getElementById('translatedText');

playBtn.addEventListener('click', () => {
    const utterance = new SpeechSynthesisUtterance(translatedText.value);
    utterance.lang = document.getElementById('targetLang').value;
    window.speechSynthesis.speak(utterance);
});
