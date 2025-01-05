
document.addEventListener("DOMContentLoaded", function() {
    const dt = document.querySelectorAll("dt");
    dt.forEach((item) => {
        if (item.textContent.includes("Delegierter fÃ¼r")) {
            const dd = item.nextElementSibling;
            
            // StilÃ¤nderungen fÃ¼r das <dt> und <dd> element
            item.style.width = '100%';
            item.style.borderTop = 'black 1px solid';
            item.style.paddingTop = '2px';
            item.style.marginTop = '2px';
            dd.style.fontSize = '14px';
            dd.style.marginTop = '-5px';
            dd.style.textAlign = 'left';
            dd.style.float = 'none';
            dd.style.clear = 'both';

            // Nur fÃ¼r <dd> mit Textinhalt, der ersetzt werden muss
            const text = dd.innerHTML.trim();
            if (text) {
                // Text in Flaggen aufteilen, wenn <br> vorhanden ist
                const parts = text.split('<br>').map(part => part.trim()); // Trim spaces from each part

                // Erstelle eine Flexbox, um die Flaggen nebeneinander anzuzeigen
                const flagImages = parts.map(part => {
                    const normalizedPart = normalizeString(part).replace(/\s+/g, '_').toLowerCase();
                    // Correct the template literal usage here with backticks
                    return `<img src="https://kdn.mn-netz.de/flag/${normalizedPart}.png" style="" class="flaggenbild" title="${part}">`;
                }).join(' ');

                // Correct the template literal usage here as well
                dd.innerHTML = `<div style="display: flex; gap: 5px;">${flagImages}</div>`;
            }
        }
    });
});

// Funktion zur Normalisierung der Zeichen
function normalizeString(str) {
    const map = {
        'Ã¡': 'a', 'Ã ': 'a', 'Ã¤': 'a', 'Ã¢': 'a', 'Ã£': 'a', 'Ã¥': 'a', 'Ä': 'a',
        'Ã©': 'e', 'Ã¨': 'e', 'Ã«': 'e', 'Ãª': 'e', 'Ä“': 'e',
        'Ã­': 'i', 'Ã¬': 'i', 'Ã¯': 'i', 'Ã®': 'i', 'Ä«': 'i',
        'Ã³': 'o', 'Ã²': 'o', 'Ã¶': 'o', 'Ã´': 'o', 'Ã¸': 'o', 'Å': 'o',
        'Ãº': 'u', 'Ã¹': 'u', 'Ã¼': 'u', 'Ã»': 'u', 'Å«': 'u',
        'Ä‡': 'c', 'Ä': 'c', 'Å„': 'n', 'Å›': 's', 'Å¾': 'z', 'Å¡': 's',
        "'": "_",  // Handle single quote replacement
    };

    return str.split('').map(char => map[char] || char).join('');
}
