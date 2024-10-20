// Funzione per caricare i link esistenti
async function loadLinks() {
    const response = await fetch('/links');
    const links = await response.json();

    const linkList = document.getElementById('linkList');
    linkList.innerHTML = '';

    links.forEach((link) => {
        const listItem = document.createElement('li');
        listItem.textContent = link;

        // Crea un pulsante "Sblocca"
        const unlockButton = document.createElement('button');
        unlockButton.textContent = 'Sblocca';
        unlockButton.addEventListener('click', () => unlockLink(link)); // Attiva il pulsante "Sblocca"

        listItem.appendChild(unlockButton);
        linkList.appendChild(listItem);
    });
}

// Funzione per sbloccare il link
async function unlockLink(link) {
    alert(`Sbloccando il link: ${link}`);
    startUnlockTimer(link);
}

// Funzione per avviare un timer
function startUnlockTimer(link) {
    // Mostra un messaggio per 8 minuti
    let timerDuration = 8 * 60 * 1000; // 8 minuti in millisecondi
    let countdown = timerDuration / 1000; // in secondi

    const interval = setInterval(() => {
        console.log(`Tempo rimasto per sbloccare ${link}: ${countdown--} secondi`);
        
        if (countdown < 0) {
            clearInterval(interval);
            alert(`Il link ${link} è stato sbloccato!`);
            // Qui puoi redirigere l'utente al link reale, se necessario
            // window.location.href = link; // Attiva questa riga per redirigere l'utente al link
        }
    }, 1000);
}

// Funzione per gestire l'invio del modulo
document.getElementById('linkForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Previene l'invio predefinito del modulo

    const linkInput = document.getElementById('linkInput');
    const newLink = linkInput.value;

    // Invia il nuovo link al server
    await fetch('/add-link', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ link: newLink })
    });

    linkInput.value = ''; // Pulisci il campo di input
    loadLinks(); // Ricarica i link
});

// Carica i link esistenti all'avvio
loadLinks();