document.addEventListener('DOMContentLoaded', function () {
    const inputUah = document.querySelector('#uah'),
        inputUsd = document.querySelector('#usd'),
        inputEur = document.querySelector('#eur'),
        inputCad = document.querySelector('#cad'),
        inputUsd1 = document.querySelector('#usd1'),
        inputEur1 = document.querySelector('#eur1');

    function inputEvent(inputSelector) {
        inputSelector.addEventListener('input', () => {
            const request = new XMLHttpRequest();

            request.open('GET', './db.json');
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');
            request.send();

            request.addEventListener('load', () => {
                if (request.status === 200) {
                    const data = JSON.parse(request.response);

                    switch(inputSelector) {
                        case inputUah: 
                            inputUsd.value = (+inputUah.value / data.current.usd).toFixed(2);
                            inputEur.value = (+inputUah.value / data.current.eur).toFixed(2);
                            break;
                        case inputUsd: 
                            inputUah.value = (+inputUsd.value * data.current.usd).toFixed(2);
                            inputEur.value = (+inputUah.value / data.current.eur).toFixed(2);
                            break;
                        case inputEur: 
                            inputUah.value = (+inputEur.value * data.current.eur).toFixed(2);
                            inputUsd.value = (+inputUah.value / data.current.usd).toFixed(2);
                            break;
                    }

                } else {
                    inputSelector.value = 'something wrong';
                }
            });
            
        });
    }

    inputEvent(inputUah);
    inputEvent(inputUsd);
    inputEvent(inputEur);

    
    fetch('https://api.exchangeratesapi.io/latest')
    .then(result => result.json())
    .then(json => {
        inputEventFetch(inputCad,json);
        inputEventFetch(inputUsd1,json);
        inputEventFetch(inputEur1,json);
    });

    function inputEventFetch(inputSelector, json) {
        const rates = json.rates;
        inputSelector.addEventListener('input', () => {
            switch(inputSelector) {
                case inputCad: 
                    inputUsd1.value = (+inputCad.value / rates.USD).toFixed(2);
                    inputEur1.value = (+inputCad.value / rates.CAD).toFixed(2);
                    break;
                case inputUsd1: 
                    inputCad.value = (+inputUsd1.value * rates.USD).toFixed(2);
                    inputEur1.value = (+inputCad.value / rates.CAD).toFixed(2);
                    break;
                case inputEur1: 
                    inputCad.value = (+inputUsd1.value * rates.USD).toFixed(2);
                    inputUsd1.value = (+inputCad.value / rates.USD).toFixed(2);
                    break;
            }
        });
    }
});