document.addEventListener('DOMContentLoaded', function () {
    const inputUah = document.querySelector('#uah'),
        inputUsd = document.querySelector('#usd'),
        inputEur = document.querySelector('#eur');

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
});