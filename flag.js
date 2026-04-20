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
        var dzien = ("0" + date.getDate()).slice(-2);
        var miesiac = ("0" + (date.getMonth() + 1)).slice(-2);
        return dzien + "." + miesiac;
    }

    function formatujDoISO(date) {
        return date.getFullYear() + "-" + ("0" + (date.getMonth() + 1)).slice(-2) + "-" + ("0" + date.getDate()).slice(-2);
    }

    async function wyslijDoKalendarza(tytul, start, koniec) {
        const webhookURL = "https://hook.eu1.make.com/mdjizitdhmvgiioqfsl64mj2hr5fqpjj"; 
                        
        
        // Google Calendar traktuje datę końcową jako "do godziny 00:00 tego dnia"
        // Więc żeby post 1-5 maja był widoczny cały 5 maja, musimy wysłać datę 6 maja
        let dateEnd = new Date(koniec);
        dateEnd.setDate(dateEnd.getDate() + 1);

        try {
            await fetch(webhookURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                mode: 'no-cors',
                body: JSON.stringify({
                    title: tytul,
                    start: formatujDoISO(start),
                    end: formatujDoISO(dateEnd)
                })
            });
        } catch (e) { console.error("Błąd wysyłki", e); }
    }

    if (!isNaN(dataStartu.getTime())) {
        var dataKoncowa = new Date(dataStartu);
        dataKoncowa.setDate(dataKoncowa.getDate() + 5);
        komunikatElement.textContent = "W dniach " + formatujDate(dataStartu) + " - " + formatujDate(dataKoncowa) + " pościsz 15h";
        wyslijDoKalendarza("15h", dataStartu, dataKoncowa);

        var data24h = new Date(dataStartu);
        data24h.setDate(data24h.getDate() + 6);
        komunikat24hElement.textContent = "W dniu " + formatujDate(data24h) + " pościsz 24h";
        wyslijDoKalendarza("24h", data24h, data24h);
        
        var dataPoczatek17h = new Date(dataStartu);
        dataPoczatek17h.setDate(dataPoczatek17h.getDate() + 7);
        var dataKoniec17h = new Date(dataStartu);
        dataKoniec17h.setDate(dataKoniec17h.getDate() + 9);
        komunikat17hElement.textContent = "W dniach " + formatujDate(dataPoczatek17h) + " do " + formatujDate(dataKoniec17h) + " pościsz 17h";
        wyslijDoKalendarza("17h", dataPoczatek17h, dataKoniec17h);

        var dataPoczatek15h = new Date(dataStartu);
        dataPoczatek15h.setDate(dataPoczatek15h.getDate() + 10);
        var dataKoniec15h = new Date(dataStartu);
        dataKoniec15h.setDate(dataKoniec15h.getDate() + 15);
        komunikat15hElement.textContent = "W dniach " + formatujDate(dataPoczatek15h) + " do " + formatujDate(dataKoniec15h) + " pościsz 15h";
         wyslijDoKalendarza("15h", dataPoczatek15h, dataKoniec15h);

        var data24h_2 = new Date(dataStartu);
        data24h_2.setDate(data24h_2.getDate() + 16);
        komunikat24hElement2.textContent = "W dniu " + formatujDate(data24h_2) + " pościsz 24h";
        wyslijDoKalendarza("24h", data24h_2, data24h_2);
        

        var dataPoczatek17h_2 = new Date(dataStartu);
        dataPoczatek17h_2.setDate(dataPoczatek17h_2.getDate() + 17);
        var dataKoniec17h_2 = new Date(dataStartu);
        dataKoniec17h_2.setDate(dataKoniec17h_2.getDate() + 19);
        komunikat17hElement2.textContent = "W dniach " + formatujDate(dataPoczatek17h_2) + " do " + formatujDate(dataKoniec17h_2) + " pościsz 17h";
        wyslijDoKalendarza("17h", data17h_2, data17h_2);

        var dataPoczatek13h = new Date(dataStartu);
        dataPoczatek13h.setDate(dataPoczatek13h.getDate() + 20);

        // Opcjonalnie: ustawiamy koniec na 7 dni później, żeby widzieć to w kalendarzu jako pasek
        var dataKoniec13h = new Date(dataPoczatek13h);
        dataKoniec13h.setDate(dataKoniec13h.getDate() + 7); 

        komunikat13hElement.textContent = "Od dnia " + formatujDate(dataPoczatek13h) + " pościsz max 13h";

        // Wysyłamy przedział czasu (od 20. do 27. dnia)
        wyslijDoKalendarza("13h", dataPoczatek13h, dataKoniec13h);
        

    } else {
        komunikatElement.textContent = "Podana wartość nie jest prawidłową datą.";
    }
});
