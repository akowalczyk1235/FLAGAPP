document.getElementById('dataInput').addEventListener('keydown', function(event) {
    if(event.key === 'Enter') {
        document.getElementById('okButton').click();
    }
});

document.getElementById('okButton').addEventListener('click', function () {
    var dataStartuStr = document.getElementById('dataInput').value;

    var czesciDaty = dataStartuStr.split('-');
    var dzien = parseInt(czesciDaty[0], 10);
    var miesiac = parseInt(czesciDaty[1], 10);
    var rok = new Date().getFullYear();
    var dataStartu = new Date(rok, miesiac - 1, dzien);

    var komunikatElement = document.getElementById('komunikat');
    var komunikat24hElement = document.getElementById('komunikat24h');
    var komunikat17hElement = document.getElementById('komunikat17h');
    var komunikat15hElement = document.getElementById('komunikat15h');
    var komunikat24hElement2 = document.getElementById('komunikat24h_2');
    var komunikat17hElement2 = document.getElementById('komunikat17h_2');
    var komunikat13hElement = document.getElementById('komunikat13h');

    function formatujDate(date) {
        var d = ("0" + date.getDate()).slice(-2);
        var m = ("0" + (date.getMonth() + 1)).slice(-2);
        return d + "." + m;
    }

    function formatujDoISO(date) {
        return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
    }

    async function wyslijDoKalendarza(tytul, start, koniec) {
        const webhookURL = "https://hook.eu1.make.com/mdjizitdhmvgiioqfsl64mj2hr5fqpjj"; 
        
        // Korekta dla Google Calendar (data końcowa +1 dzień)
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
            console.log("Wysłano do Make: " + tytul);
        } catch (e) { 
            console.error("Błąd wysyłki dla " + tytul, e); 
        }
    }

    if (!isNaN(dataStartu.getTime())) {
        // 1. Etap 15h
        var dataKoncowa15h = new Date(dataStartu);
        dataKoncowa15h.setDate(dataKoncowa15h.getDate() + 5);
        komunikatElement.textContent = "W dniach " + formatujDate(dataStartu) + " - " + formatujDate(dataKoncowa15h) + " pościsz 15h";
        wyslijDoKalendarza("15h", dataStartu, dataKoncowa15h);
        await pauza(2000);

        // 2. Etap 24h
        var data24h = new Date(dataStartu);
        data24h.setDate(data24h.getDate() + 6);
        komunikat24hElement.textContent = "W dniu " + formatujDate(data24h) + " pościsz 24h";
        wyslijDoKalendarza("24h", data24h, data24h);
        await pauza(2000);
        
        // 3. Etap 17h
        var dataPoczatek17h = new Date(dataStartu);
        dataPoczatek17h.setDate(dataPoczatek17h.getDate() + 7);
        var dataKoniec17h = new Date(dataStartu);
        dataKoniec17h.setDate(dataKoniec17h.getDate() + 9);
        komunikat17hElement.textContent = "W dniach " + formatujDate(dataPoczatek17h) + " do " + formatujDate(dataKoniec17h) + " pościsz 17h";
        wyslijDoKalendarza("17h", dataPoczatek17h, dataKoniec17h);
        await pauza(2000);

        // 4. Drugi etap 15h
        var dataPoczatek15h_2 = new Date(dataStartu);
        dataPoczatek15h_2.setDate(dataPoczatek15h_2.getDate() + 10);
        var dataKoniec15h_2 = new Date(dataStartu);
        dataKoniec15h_2.setDate(dataKoniec15h_2.getDate() + 15);
        komunikat15hElement.textContent = "W dniach " + formatujDate(dataPoczatek15h_2) + " do " + formatujDate(dataKoniec15h_2) + " pościsz 15h";
        wyslijDoKalendarza("15h", dataPoczatek15h_2, dataKoniec15h_2);
        await pauza(2000);

        // 5. Drugi etap 24h
        var data24h_2 = new Date(dataStartu);
        data24h_2.setDate(data24h_2.getDate() + 16);
        komunikat24hElement2.textContent = "W dniu " + formatujDate(data24h_2) + " pościsz 24h";
        wyslijDoKalendarza("24h", data24h_2, data24h_2);
        await pauza(2000);

        // 6. Drugi etap 17h (Tutaj był błąd w nazwie zmiennej - JUŻ POPRAWIONE)
        var dataPoczatek17h_2 = new Date(dataStartu);
        dataPoczatek17h_2.setDate(dataPoczatek17h_2.getDate() + 17);
        var dataKoniec17h_2 = new Date(dataStartu);
        dataKoniec17h_2.setDate(dataKoniec17h_2.getDate() + 19);
        komunikat17hElement2.textContent = "W dniach " + formatujDate(dataPoczatek17h_2) + " do " + formatujDate(dataKoniec17h_2) + " pościsz 17h";
        wyslijDoKalendarza("17h", dataPoczatek17h_2, dataKoniec17h_2);
        await pauza(2000);

        // 7. Etap 13h
        var dataPoczatek13h = new Date(dataStartu);
        dataPoczatek13h.setDate(dataPoczatek13h.getDate() + 20);
        var dataKoniec13h = new Date(dataPoczatek13h);
        dataKoniec13h.setDate(dataKoniec13h.getDate() + 7); 
        komunikat13hElement.textContent = "Od dnia " + formatujDate(dataPoczatek13h) + " pościsz max 13h";
        wyslijDoKalendarza("13h", dataPoczatek13h, dataKoniec13h);

    } else {
        komunikatElement.textContent = "Podana wartość nie jest prawidłową datą.";
    }
});
