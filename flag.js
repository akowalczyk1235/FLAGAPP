// 1. Pomocnicze funkcje formatowania
function formatujDate(date) {
    var d = ("0" + date.getDate()).slice(-2);
    var m = ("0" + (date.getMonth() + 1)).slice(-2);
    return d + "." + m;
}

function formatujDoISO(date) {
    return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
}

const pauza = ms => new Promise(res => setTimeout(res, ms));

// 2. Funkcja wysyłająca dane do Make
async function wyslijDoKalendarza(tytul, start, koniec) {
    const webhookURL = "https://hook.eu1.make.com/mdjizitdhmvgiioqfsl64mj2hr5fqpjj"; 
    
    let dateEnd = new Date(koniec);
    dateEnd.setDate(dateEnd.getDate() + 1);

    try {
        await fetch(webhookURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: tytul,
                start: formatujDoISO(start),
                end: formatujDoISO(dateEnd)
            })
        });
        console.log("Wysłano: " + tytul);
    } catch (e) { 
        console.error("Błąd wysyłki: " + tytul, e); 
    }
}

// 3. Obsługa przycisku - TUTAJ DODAŁEM "async" przed function
document.getElementById('okButton').addEventListener('click', async function () {
    var dataStartuStr = document.getElementById('dataInput').value;
    if (!dataStartuStr) return;

    var czesciDaty = dataStartuStr.split('-');
    var dzien = parseInt(czesciDaty[0], 10);
    var miesiac = parseInt(czesciDaty[1], 10);
    var rok = new Date().getFullYear();
    var dataStartu = new Date(rok, miesiac - 1, dzien);

    if (!isNaN(dataStartu.getTime())) {
        
        // ETAP 1
        var dataK15 = new Date(dataStartu);
        dataK15.setDate(dataK15.getDate() + 5);
        document.getElementById('komunikat').textContent = "W dniach " + formatujDate(dataStartu) + " - " + formatujDate(dataK15) + " pościsz 15h";
        await wyslijDoKalendarza("15h", dataStartu, dataK15);
        await pauza(2000);

        // ETAP 2
        var d24 = new Date(dataStartu);
        d24.setDate(d24.getDate() + 6);
        document.getElementById('komunikat24h').textContent = "W dniu " + formatujDate(d24) + " pościsz 24h";
        await wyslijDoKalendarza("24h", d24, d24);
        await pauza(2000);

        // ETAP 3
        var dP17 = new Date(dataStartu); dP17.setDate(dP17.getDate() + 7);
        var dK17 = new Date(dataStartu); dK17.setDate(dK17.getDate() + 9);
        document.getElementById('komunikat17h').textContent = "W dniach " + formatujDate(dP17) + " do " + formatujDate(dK17) + " pościsz 17h";
        await wyslijDoKalendarza("17h", dP17, dK17);
        await pauza(2000);

        // ETAP 4
        var dP15b = new Date(dataStartu); dP15b.setDate(dP15b.getDate() + 10);
        var dK15b = new Date(dataStartu); dK15b.setDate(dK15b.getDate() + 15);
        document.getElementById('komunikat15h').textContent = "W dniach " + formatujDate(dP15b) + " do " + formatujDate(dK15b) + " pościsz 15h";
        await wyslijDoKalendarza("15h", dP15b, dK15b);
        await pauza(2000);

        // ETAP 5
        var d24b = new Date(dataStartu); d24b.setDate(d24b.getDate() + 16);
        document.getElementById('komunikat24h_2').textContent = "W dniu " + formatujDate(d24b) + " pościsz 24h";
        await wyslijDoKalendarza("24h", d24b, d24b);
        await pauza(2000);

        // ETAP 6
        var dP17b = new Date(dataStartu); dP17b.setDate(dP17b.getDate() + 17);
        var dK17b = new Date(dataStartu); dK17b.setDate(dK17b.getDate() + 19);
        document.getElementById('komunikat17h_2').textContent = "W dniach " + formatujDate(dP17b) + " do " + formatujDate(dK17b) + " pościsz 17h";
        await wyslijDoKalendarza("17h", dP17b, dK17b);
        await pauza(2000);

        // ETAP 7
        var dP13 = new Date(dataStartu); dP13.setDate(dP13.getDate() + 20);
        var dK13 = new Date(dP13); dK13.setDate(dK13.getDate() + 7);
        document.getElementById('komunikat13h').textContent = "Od dnia " + formatujDate(dP13) + " pościsz max 13h";
        await wyslijDoKalendarza("13h", dP13, dK13);

    } else {
        document.getElementById('komunikat').textContent = "Błędna data!";
    }
});

// Obsługa Entera
document.getElementById('dataInput').addEventListener('keydown', function(event) {
    if(event.key === 'Enter') document.getElementById('okButton').click();
});
